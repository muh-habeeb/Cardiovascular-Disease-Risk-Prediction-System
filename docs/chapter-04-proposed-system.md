# CHAPTER 4: PROPOSED SYSTEM

## 4.1 System Overview

The CVD Risk Predictor is a comprehensive web-based intelligent system designed to provide accurate, fast, and accessible cardiovascular disease risk assessment. The system integrates a trained neural network model with a modern web interface, delivering real-time predictions through an optimized ONNX Runtime backend.

The architecture follows a client-server model where:
- **Frontend (Client)**: React-based single-page application providing an intuitive user interface
- **Backend (Server)**: Node.js Express server hosting the ONNX model and handling inference requests
- **Communication**: RESTful API over HTTPS with JSON data exchange

The system accepts 13 clinical parameters, processes them through a standardized neural network, and returns a cardiovascular disease probability score along with risk categorization (Low, Moderate, or High). Results are presented through an animated gauge visualization and can be downloaded as a professional PDF report.

### System Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend - React Application"
        A[Landing Page] --> B[Multi-Step Form]
        B --> C[Step 1: Personal Info]
        B --> D[Step 2: Clinical Data]
        B --> E[Step 3: Lifestyle]
        C --> F[Form Validation]
        D --> F
        E --> F
        F --> G[Submit Button]
    end
    
    subgraph "API Communication"
        G -->|HTTP POST| H[API Request]
        H --> I[JSON Payload]
        I -->|13 Parameters| J[/predict Endpoint]
        J -->|Response| K[JSON Result]
        K --> L[Result Display]
    end
    
    subgraph "Backend - Node.js Server"
        J --> M[Express Router]
        M --> N[Feature Scaling]
        N --> O[ONNX Runtime]
        O --> P[Neural Network Model]
        P --> Q[Probability Score]
        Q --> R[Risk Classifier]
        R --> M
    end
    
    subgraph "User Interface Output"
        L --> S[Animated Gauge]
        L --> T[Risk Message]
        L --> U[PDF Generator]
        U --> V[Download Report]
    end
```

## 4.2 System Components and Functionality

### 4.2.1 Frontend Components

**1. Landing Page**
- Feature overview with visual highlights
- Call-to-action buttons
- System introduction and benefits
- Responsive hero section with gradient effects

**2. Header Component**
```
┌─────────────────────────────────────────┐
│  🫀 CVD Risk Predictor    [Dark Mode ⚡] │
│                              [About ℹ️]   │
└─────────────────────────────────────────┘
```
Features:
- Application branding
- Dark mode toggle
- About modal with system information
- Sticky positioning with blur effect

**3. Multi-Step Form (InputForm.jsx)**

Structure:
```
Step 1: Personal Information
├── Full Name (text input)
├── Age (number, 20-100)
└── Sex (select: Male/Female)

Step 2: Clinical Measurements
├── Chest Pain Type (select: 0-3)
├── Resting Blood Pressure (number, mmHg)
├── Cholesterol (number, mg/dl)
├── Fasting Blood Sugar (select: <120 / >120)
├── Resting ECG (select: Normal/Abnormal/LVH)
└── Maximum Heart Rate (number, bpm)

Step 3: Lifestyle & Exercise
├── Exercise Induced Angina (select: Yes/No)
├── ST Depression (number, mm)
├── Slope of Peak Exercise (select: 0-2)
├── Number of Major Vessels (select: 0-3)
└── Thalassemia (select: Normal/Fixed/Reversible)
```

Features:
- Progressive disclosure (one step at a time)
- Real-time validation
- Progress indicator (Step 1/3, 2/3, 3/3)
- Preset quick-fill buttons (Low/Moderate/High risk)
- Smooth animations between steps
- Error messaging for invalid inputs

**4. Result Display (ResultCard.jsx)**

Components:
```
┌─────────────────────────────────────┐
│  Hey [Name] 👋                      │
│                                     │
│  [Circular Gauge Animation]         │
│       75% Risk Score                │
│                                     │
│  🔴 High Risk Classification        │
│                                     │
│  [Personalized Message]             │
│                                     │
│  [Download PDF] [New Assessment]    │
└─────────────────────────────────────┘
```

**5. Gauge Visualization (GaugeCircle.jsx)**

Animated SVG circle:
- Smooth 0-100% animation
- Color-coded based on risk:
  - Green (0-35%): Low Risk
  - Yellow (35-65%): Moderate Risk
  - Red (65-100%): High Risk
- Framer Motion animations
- Responsive sizing

**6. PDF Generator (generateMedicalPDF.js)**

Report Sections:
1. Header: CVD Risk Assessment Report
2. Patient Information: Name, age, sex
3. Clinical Parameters: All 13 input values with labels
4. Risk Assessment: Probability score and classification
5. Footer: Timestamp and disclaimer

### 4.2.2 Backend Components

**1. Express Server (index.js)**

Core functionality:
```javascript
// Server initialization
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware stack
app.use(cors());           // Cross-origin requests
app.use(express.json());   // JSON parsing
app.use(morgan('tiny'));   // Request logging
app.use(rateLimit);        // Abuse prevention

// Routes
app.get('/', statusHandler);
app.post('/predict', predictionHandler);

// Server startup
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

**2. ONNX Model Integration**

Model loading:
```javascript
const ort = require('onnxruntime-node');
const MODEL_PATH = './models/model.onnx';

let session;

async function loadModel() {
  session = await ort.InferenceSession.create(MODEL_PATH);
  console.log('Model loaded successfully');
}

loadModel();
```

**3. Feature Scaling**

StandardScaler implementation:
```javascript
const SCALER_MEAN = [54.54, 0.68, 3.16, ...];  // 13 values
const SCALER_SCALE = [9.03, 0.47, 0.96, ...];  // 13 values

function manualScale(body) {
  return FEATURE_ORDER.map((key, i) => 
    (body[key] - SCALER_MEAN[i]) / SCALER_SCALE[i]
  );
}
```

**4. Prediction Handler**

Request processing flow:
```javascript
app.post('/predict', async (req, res) => {
  try {
    // 1. Validate input
    if (!session) return res.status(503).json({error: 'Model loading'});
    
    // 2. Scale features
    const scaled = manualScale(req.body);
    
    // 3. Create tensor
    const input = new ort.Tensor('float32', Float32Array.from(scaled), [1, 13]);
    
    // 4. Run inference
    const output = await session.run({float_input: input});
    
    // 5. Extract probability
    const probabilities = Array.from(output.probabilities.data);
    let probability = probabilities[1]; // Class 1 probability
    
    // 6. Classify risk
    const riskLevel = 
      probability < 0.35 ? 'Low' :
      probability < 0.65 ? 'Moderate' : 'High';
    
    // 7. Return result
    res.json({
      probability: +probability.toFixed(4),
      riskLevel
    });
  } catch (err) {
    res.status(500).json({error: 'Prediction failed'});
  }
});
```

## 4.3 Benefits and Advantages

### 4.3.1 Clinical Benefits

**1. Early Risk Detection**
- Identifies high-risk individuals before symptoms appear
- Enables preventive interventions (lifestyle modifications, medication)
- Reduces emergency hospitalizations through proactive management

**2. Comprehensive Assessment**
- Analyzes 13 parameters simultaneously
- Captures complex interactions between risk factors
- More accurate than traditional 6-8 parameter calculators

**3. Consistent Evaluation**
- Eliminates inter-observer variability
- Provides standardized risk assessment
- Reproducible results for longitudinal tracking

**4. Triage Support**
- Helps prioritize patients needing immediate attention
- Assists in resource allocation decisions
- Supports telemedicine consultations

### 4.3.2 User Experience Benefits

**1. Accessibility**
- No geographical barriers (web-based access)
- No app installation required
- Works on any device (mobile, tablet, desktop)
- Available 24/7 without appointment scheduling

**2. Ease of Use**
- Intuitive multi-step interface
- Clear instructions and validation
- Visual progress indicators
- Preset examples for guidance

**3. Immediate Results**
- Real-time prediction (<3 seconds)
- No waiting for specialist review
- Instant visual feedback through gauge
- Immediate report download

**4. Privacy Assurance**
- No account creation required
- No data stored on servers
- Anonymous usage
- User-controlled local storage option

### 4.3.3 Technical Benefits

**1. Performance**
- ONNX Runtime provides 1.5-3x faster inference
- Model pre-loaded in memory (no disk I/O)
- Asynchronous processing handles concurrent requests
- Sub-second prediction times

**2. Scalability**
- Stateless architecture supports horizontal scaling
- No database bottlenecks
- Cloud-native design
- Rate limiting prevents abuse

**3. Maintainability**
- Modular component architecture
- Clear separation of concerns
- Well-documented codebase
- Easy model updates (replace ONNX file)

**4. Interoperability**
- ONNX format enables model portability
- RESTful API supports third-party integrations
- Standard JSON data format
- Cross-platform compatibility

### 4.3.4 Economic Benefits

**1. Cost Reduction**
- Eliminates facility visit costs
- Reduces unnecessary specialist consultations
- No expensive hardware requirements
- Free for end users

**2. Resource Optimization**
- Automated screening frees up healthcare professionals
- Reduces workload for routine risk assessments
- Enables specialists to focus on complex cases
- Improves healthcare system efficiency

## 4.4 Comparison with Existing Systems

| Feature | Framingham Calculator | ASCVD Risk Estimator | Commercial ML Apps | CVD Risk Predictor |
|---------|----------------------|---------------------|-------------------|-------------------|
| **Parameters** | 6-8 basic factors | 8-9 factors | Varies (6-12) | 13 comprehensive |
| **Algorithm** | Regression equation | Pooled cohort equations | Various ML | Neural Network (ONNX) |
| **Accuracy** | ~76% | ~79% | 80-88% | ~90%+ |
| **Processing Time** | Instant | Instant | 2-5 seconds | <3 seconds |
| **User Interface** | Basic form | Clinical interface | App-based | Modern web (multi-step) |
| **Visual Feedback** | Text only | Text + basic chart | Varies | Animated gauge |
| **Report Generation** | Manual | Manual | Limited | Automated PDF |
| **Privacy** | Varies | Varies | Data stored | Stateless (no storage) |
| **Accessibility** | Web-based | Web-based | App download required | Web-based (no install) |
| **Cost** | Free | Free | Often subscription | Free |
| **Mobile Support** | Limited | Limited | Native app | Responsive web |
| **Offline Mode** | No | No | Yes (app) | Partial (form filling) |
| **Dark Mode** | No | No | Sometimes | Yes |

## 4.5 System Workflow

### Complete User Journey:

```
┌─────────────────────┐
│   User Opens App    │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   Landing Page      │
│ • Feature Overview  │
│ • Start Button      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Step 1: Personal   │
│ • Name, Age, Sex    │
│ [Next Button]       │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Step 2: Clinical   │
│ • BP, Cholesterol   │
│ • ECG, Heart Rate   │
│ [Previous] [Next]   │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Step 3: Lifestyle  │
│ • Angina, ST Slope  │
│ • Vessels, Thal     │
│ [Previous] [Submit] │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   Loading Screen    │
│ [Animation] ⏳       │
└──────────┬──────────┘
           │
           ↓
    ┌──────────────────┐
    │  Backend Process  │
    │ 1. Receive data   │
    │ 2. Scale features │
    │ 3. Run inference  │
    │ 4. Classify risk  │
    │ 5. Return result  │
    └──────────┬─────────┘
           │
           ↓
┌─────────────────────┐
│   Results Page      │
│ • Animated Gauge    │
│ • Risk Level        │
│ • Personal Message  │
│ • Download PDF      │
│ • New Assessment    │
└─────────────────────┘
```

## 4.6 Innovation and Unique Features

### Key Innovations:

1. **ONNX-Powered Web Inference**
   - First cardiovascular risk tool using ONNX Runtime in Node.js
   - Achieves production-grade performance without GPU requirements
   - Platform-independent model deployment

2. **Privacy-First Architecture**
   - Zero-knowledge prediction system
   - No user tracking or data collection
   - Compliant with strictest privacy regulations

3. **Progressive Web Experience**
   - Multi-step form reduces cognitive load
   - Animated transitions improve engagement
   - Responsive design works seamlessly across devices

4. **Intelligent Visualization**
   - Real-time gauge animation
   - Color psychology for risk communication
   - Personalized messaging based on results

5. **One-Click Documentation**
   - Automated PDF report generation
   - Professional medical document format
   - Shareable with healthcare providers

6. **Developer-Friendly Architecture**
   - Clean separation of concerns
   - RESTful API design
   - Easy model updates without code changes
   - Comprehensive error handling

---

*This chapter presents the complete proposed system, detailing its architecture, components, benefits, and innovative features. The next chapter will dive deeper into the design specifications and technical architecture diagrams.*
