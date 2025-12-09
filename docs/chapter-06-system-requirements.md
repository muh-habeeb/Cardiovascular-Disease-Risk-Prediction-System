# CHAPTER 6: SYSTEM REQUIREMENTS ANALYSIS AND SPECIFICATION

## 6.1 Introduction

This chapter outlines the comprehensive requirements specification for the CVD Risk Predictor system. It defines the software, hardware, functional, and non-functional requirements necessary for successful system implementation. These requirements ensure the system meets its objectives of providing accurate, fast, accessible, and user-friendly cardiovascular disease risk assessment.

The requirements are categorized into:
- Software requirements (development and runtime)
- Hardware requirements (development and user devices)
- Functional requirements (system capabilities)
- Non-functional requirements (performance, security, usability)

All specifications are derived from the implemented system architecture described in previous chapters.

## 6.2 Software Requirements

### 6.2.1 Frontend Development Stack

**Core Framework**
- **React 18.3.1**: Component-based UI library for building interactive interfaces
- **Vite 5.4+**: Next-generation build tool for fast development and optimized production builds
- **JavaScript/ES6+**: Modern JavaScript for component logic

**UI/UX Libraries**
- **Tailwind CSS 3.4+**: Utility-first CSS framework for responsive design
- **PostCSS 8.4+**: CSS processing tool
- **Autoprefixer 10.4+**: Automatic vendor prefixing for CSS

**Component Libraries**
- **@radix-ui/react-dialog 1.1.2**: Accessible modal dialogs
- **@radix-ui/react-switch 1.1.1**: Toggle switch components
- **Lucide React 0.458**: Icon library
- **class-variance-authority 0.7+**: Utility for managing component variants
- **tailwind-merge 2.5+**: Intelligent Tailwind class merging

**Animation & Visualization**
- **Framer Motion 11.11+**: Production-ready animation library for React
- **Custom SVG components**: For gauge visualization

**PDF Generation**
- **jsPDF 3.0+**: Client-side PDF generation
- **jspdf-autotable 5.0+**: Table plugin for jsPDF
- **html2canvas 1.4+**: HTML to canvas rendering (if needed)

**HTTP Client**
- **Axios 1.7+**: Promise-based HTTP client for API requests

### 6.2.2 Backend Development Stack

**Runtime Environment**
- **Node.js 18+**: JavaScript runtime (LTS version required)
- **npm 9+** or **yarn 1.22+**: Package manager

**Backend Framework**
- **Express.js 4.19+**: Minimalist web framework for Node.js

**Machine Learning**
- **onnxruntime-node 1.19+**: ONNX Runtime for Node.js inference
- **Pre-trained model**: model.onnx (neural network in ONNX format)

**Middleware & Utilities**
- **cors 2.8+**: Cross-Origin Resource Sharing middleware
- **morgan 1.10+**: HTTP request logger
- **express-rate-limit 7.1+**: Rate limiting middleware
- **path**: Built-in Node.js module for file path operations

### 6.2.3 Development Tools

**Code Editor/IDE**
- Visual Studio Code (recommended)
- WebStorm
- Sublime Text with appropriate plugins

**Version Control**
- Git 2.30+
- GitHub/GitLab for repository hosting

**Browser Support** (for testing and production)
- Google Chrome 90+ (recommended)
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Safari 14+ (macOS/iOS)

**Development Browser Extensions**
- React Developer Tools
- Redux DevTools (if state management added)
- Network inspector tools

### 6.2.4 Operating System Requirements

**Development Environment**
- Windows 10/11 (64-bit)
- macOS 11+ (Big Sur or later)
- Linux (Ubuntu 20.04+, Fedora 34+, or equivalent)

**Server Environment**
- Linux (Ubuntu Server 20.04 LTS recommended)
- Container support: Docker-compatible system (optional)

## 6.3 Hardware Requirements

### 6.3.1 Development Hardware

**Minimum Specifications**
- **Processor**: Intel Core i3 / AMD Ryzen 3 or equivalent (2 cores)
- **RAM**: 8 GB
- **Storage**: 5 GB free disk space for development environment
- **Display**: 1366x768 resolution
- **Network**: Stable internet connection (minimum 5 Mbps)

**Recommended Specifications**
- **Processor**: Intel Core i5/i7 / AMD Ryzen 5/7 or equivalent (4+ cores)
- **RAM**: 16 GB or higher
- **Storage**: 10 GB free disk space (SSD preferred)
- **Display**: 1920x1080 or higher resolution
- **Network**: High-speed internet (25+ Mbps)

### 6.3.2 Server Hardware (Backend Hosting)

**Minimum Specifications**
- **CPU**: 1 vCPU (2.0 GHz+)
- **RAM**: 512 MB
- **Storage**: 1 GB free space
- **Network**: 100 Mbps network interface
- **Concurrent Users**: ~50-100

**Recommended Specifications**
- **CPU**: 2+ vCPUs (2.5 GHz+)
- **RAM**: 2 GB or higher
- **Storage**: 5 GB free space (SSD preferred)
- **Network**: 1 Gbps network interface
- **Concurrent Users**: 500+

**Note**: ONNX Runtime CPU inference does not require GPU. For GPU acceleration (optional future enhancement), CUDA-compatible GPU would be needed.

### 6.3.3 User Device Requirements

**Desktop/Laptop**
- **Processor**: Any modern processor (Intel Pentium / AMD equivalent or better)
- **RAM**: 4 GB minimum
- **Browser**: Any modern browser (Chrome, Firefox, Edge, Safari)
- **Display**: 1024x768 minimum resolution
- **Network**: 2+ Mbps internet connection

**Mobile Devices**
- **Smartphone**: Android 8+ or iOS 13+
- **RAM**: 2 GB minimum
- **Browser**: Chrome Mobile, Safari Mobile, Firefox Mobile
- **Display**: 320px minimum width
- **Network**: 3G/4G/5G or WiFi (2+ Mbps)

**Tablet**
- **OS**: Android 8+ or iPadOS 13+
- **RAM**: 2 GB minimum
- **Browser**: Modern mobile browsers
- **Display**: 768px minimum width
- **Network**: WiFi or cellular data (2+ Mbps)

## 6.4 Functional Requirements

### 6.4.1 User Interface Requirements

**FR1: Landing Page**
- System SHALL display an informative landing page
- Landing page SHALL include feature overview
- Landing page SHALL have "Start Assessment" call-to-action button
- Landing page SHALL support dark mode toggle

**FR2: Multi-Step Form Interface**
- System SHALL provide a three-step data entry form
- Form SHALL validate inputs in real-time
- Form SHALL display progress indicator showing current step (1/3, 2/3, 3/3)
- Form SHALL allow navigation between steps (Next, Previous, Submit)
- Form SHALL persist data when navigating between steps

**FR3: Data Input Fields**

*Step 1 - Personal Information*
- Full Name (text, required)
- Age (number, 20-100, required)
- Sex (select: Male/Female, required)

*Step 2 - Clinical Measurements*
- Chest Pain Type (select: 0-3, required)
- Resting Blood Pressure (number, 80-200 mmHg, required)
- Cholesterol (number, 100-600 mg/dl, required)
- Fasting Blood Sugar (select: <120 / >120, required)
- Resting ECG (select: 0-2, required)
- Maximum Heart Rate (number, 60-220 bpm, required)

*Step 3 - Lifestyle & Exercise*
- Exercise Induced Angina (select: Yes/No, required)
- ST Depression (number, 0-10 mm, required)
- Slope of Peak Exercise (select: 0-2, required)
- Number of Major Vessels (select: 0-3, required)
- Thalassemia (select: 0-2, required)

**FR4: Input Validation**
- System SHALL validate all required fields
- System SHALL check numeric ranges for each parameter
- System SHALL display error messages for invalid inputs
- System SHALL prevent submission with incomplete data

**FR5: Preset Test Cases**
- System SHALL provide quick-fill buttons for:
  - Low Risk profile
  - Moderate Risk profile
  - High Risk profile
- Preset SHALL populate all form fields with example values
- Preset SHALL be clearly labeled as "Example" or "Demo"

### 6.4.2 Prediction Engine Requirements

**FR6: Risk Assessment Calculation**
- System SHALL accept 13 clinical parameters as input
- System SHALL scale input features using pre-computed mean and standard deviation
- System SHALL perform inference using ONNX neural network model
- System SHALL calculate probability score (0-1 range)
- System SHALL classify risk into three categories:
  - Low Risk: probability < 0.35
  - Moderate Risk: 0.35 ≤ probability < 0.65
  - High Risk: probability ≥ 0.65

**FR7: API Endpoint**
- Backend SHALL expose POST /predict endpoint
- Endpoint SHALL accept JSON payload with 13 parameters
- Endpoint SHALL return JSON response with:
  - probability (float, 4 decimal places)
  - riskLevel (string: "Low", "Moderate", "High")
- Endpoint SHALL handle errors gracefully with appropriate HTTP status codes

### 6.4.3 Result Display Requirements

**FR8: Result Visualization**
- System SHALL display results on a dedicated results page
- Results page SHALL include:
  - Personalized greeting with patient name
  - Animated circular gauge showing risk percentage
  - Color-coded risk level indicator
  - Personalized risk interpretation message
- Gauge SHALL animate from 0% to calculated percentage over 1-2 seconds
- Color coding SHALL be:
  - Green (0-35%): Low Risk
  - Yellow (35-65%): Moderate Risk
  - Red (65-100%): High Risk

**FR9: Result Actions**
- System SHALL provide "Download PDF Report" button
- System SHALL provide "Take New Assessment" button
- Download button SHALL trigger PDF generation and download
- New Assessment button SHALL reset form and return to Step 1

### 6.4.4 Report Generation Requirements

**FR10: PDF Report**
- System SHALL generate comprehensive PDF report including:
  - Report title: "Cardiovascular Risk Assessment Report"
  - Patient demographic information
  - All 13 clinical parameters with labels and values
  - Risk probability score and classification
  - Timestamp of assessment
  - Medical disclaimer
- PDF SHALL be formatted professionally
- PDF SHALL be downloadable with auto-generated filename
- PDF filename format: `CVD_Risk_Report_[Name]_[Date].pdf`

### 6.4.5 User Experience Requirements

**FR11: Theme Support**
- System SHALL support light and dark mode themes
- Theme toggle SHALL be accessible from header
- Theme preference SHALL persist in browser localStorage (optional)
- All components SHALL render correctly in both themes

**FR12: Responsive Design**
- Interface SHALL be fully responsive across devices:
  - Desktop (1024px+)
  - Tablet (768px-1023px)
  - Mobile (320px-767px)
- Layout SHALL adapt to screen size
- Touch targets SHALL be minimum 44x44px on mobile

**FR13: Loading States**
- System SHALL display loading indicator during API request
- Loading state SHALL disable form submission during processing
- Loading animation SHALL be visually clear

**FR14: Error Handling**
- System SHALL display user-friendly error messages for:
  - Network errors
  - Server errors
  - Validation errors
  - Model loading errors
- Error messages SHALL be clear and actionable
- Error states SHALL not crash the application

## 6.5 Non-Functional Requirements

### 6.5.1 Performance Requirements

**NFR1: Response Time**
- Backend prediction SHALL complete within 500ms (excluding network latency)
- Total end-to-end response time SHALL be < 3 seconds on standard internet connection
- Frontend SHALL render results within 200ms after receiving API response

**NFR2: Model Loading**
- ONNX model SHALL load within 2 seconds on server startup
- Model SHALL remain in memory for fast inference
- Server SHALL be ready to accept requests within 5 seconds of startup

**NFR3: Scalability**
- System SHALL handle minimum 100 concurrent users
- API rate limiting SHALL be set to 200 requests per minute per IP
- System SHALL scale horizontally by adding more server instances

**NFR4: Resource Efficiency**
- Backend process SHALL consume < 200 MB RAM under normal load
- Frontend bundle size SHALL be < 2 MB (gzipped)
- Page load time SHALL be < 2 seconds on 4G connection

### 6.5.2 Security Requirements

**NFR5: Data Privacy**
- System SHALL NOT store user data on backend servers
- System SHALL process requests in stateless manner
- User data SHALL exist only during active request-response cycle
- Optional localStorage SHALL be client-side only

**NFR6: API Security**
- Backend SHALL implement CORS to restrict API access
- Backend SHALL implement rate limiting to prevent abuse
- HTTPS SHALL be used for all communications (production)
- Input validation SHALL prevent injection attacks

**NFR7: Secure Communication**
- All data transmission SHALL use HTTPS in production
- API requests SHALL include appropriate headers
- Sensitive data SHALL NOT be logged on server

### 6.5.3 Reliability Requirements

**NFR8: Availability**
- System SHALL have 99% uptime (excluding planned maintenance)
- Backend SHALL auto-restart on failure
- Frontend SHALL handle backend unavailability gracefully

**NFR9: Error Recovery**
- Failed API requests SHALL provide retry mechanism
- Form data SHALL persist in browser during errors
- System SHALL recover from temporary network issues

**NFR10: Data Integrity**
- Feature scaling SHALL use exact pre-computed parameters
- Model predictions SHALL be consistent for identical inputs
- PDF reports SHALL accurately reflect input data

### 6.5.4 Usability Requirements

**NFR11: Ease of Use**
- New users SHALL be able to complete assessment without training
- Form fields SHALL have clear labels and hints
- UI elements SHALL follow standard web conventions
- Help text SHALL be available for medical terms

**NFR12: Accessibility**
- Interface SHALL follow WCAG 2.1 Level AA guidelines
- Color contrast SHALL meet accessibility standards
- Keyboard navigation SHALL be supported
- Screen reader compatibility SHALL be maintained

**NFR13: Browser Compatibility**
- System SHALL work on all major browsers:
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- Degradation SHALL be graceful on older browsers

### 6.5.5 Maintainability Requirements

**NFR14: Code Quality**
- Code SHALL follow ESLint and Prettier standards
- Components SHALL be modular and reusable
- Functions SHALL have single responsibility
- Code SHALL include comments for complex logic

**NFR15: Documentation**
- README SHALL include setup instructions
- API endpoints SHALL be documented
- Component props SHALL be documented
- Environment variables SHALL be documented

**NFR16: Version Control**
- All code SHALL be tracked in Git repository
- Commits SHALL have descriptive messages
- Branches SHALL follow naming conventions
- Pull requests SHALL be reviewed before merge

**NFR17: Model Updateability**
- ONNX model file SHALL be replaceable without code changes
- Model update SHALL require only server restart
- Scaling parameters SHALL be configurable
- Backward compatibility SHALL be maintained

### 6.5.6 Portability Requirements

**NFR18: Platform Independence**
- Frontend SHALL run on any OS with modern browser
- Backend SHALL run on Windows, macOS, and Linux
- Docker containerization SHALL be supported (optional)

**NFR19: Cloud Deployment**
- System SHALL be deployable on:
  - Traditional VPS servers
  - Cloud platforms (AWS, Azure, GCP)
  - Container orchestration (Kubernetes)
  - Serverless platforms (with modifications)

## 6.6 System Flow Diagram

The system flow diagram illustrates the complete operational flow from user entry to result delivery:

```
                    ┌─────────────────────┐
                    │   User Opens App    │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │   Landing Page      │
                    │  • Feature Overview │
                    │  • Start Button     │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │   Step 1: Personal  │
                    │  • Name, Age, Sex   │
                    └──────────┬──────────┘
                               │
                         [Validation]
                               │
                               ↓
                    ┌─────────────────────┐
                    │   Step 2: Clinical  │
                    │  • BP, Cholesterol  │
                    │  • ECG, Heart Rate  │
                    └──────────┬──────────┘
                               │
                         [Validation]
                               │
                               ↓
                    ┌─────────────────────┐
                    │  Step 3: Lifestyle  │
                    │  • Angina, ST Dep.  │
                    │  • Vessels, Thal    │
                    └──────────┬──────────┘
                               │
                         [Validation]
                               │
                               ↓
                    ┌─────────────────────┐
                    │   Submit for        │
                    │   Prediction        │
                    └──────────┬──────────┘
                               │
                               ↓
            ┌──────────────────────────────────────┐
            │        Backend Processing            │
            │                                      │
            │  1. Receive JSON Request             │
            │          ↓                           │
            │  2. Validate Model Loaded            │
            │          ↓                           │
            │  3. Feature Scaling                  │
            │     (StandardScaler)                 │
            │          ↓                           │
            │  4. Create ONNX Tensor               │
            │     [1, 13] Float32Array             │
            │          ↓                           │
            │  5. Run Model Inference              │
            │     (Neural Network)                 │
            │          ↓                           │
            │  6. Extract Probability              │
            │          ↓                           │
            │  7. Classify Risk Level              │
            │     • Low (< 0.35)                   │
            │     • Moderate (0.35-0.65)           │
            │     • High (> 0.65)                  │
            │          ↓                           │
            │  8. Return JSON Response             │
            └──────────────┬───────────────────────┘
                           │
                           ↓
                ┌─────────────────────┐
                │  Frontend Receives  │
                │  Response           │
                └──────────┬──────────┘
                           │
                           ↓
                ┌─────────────────────┐
                │  Display Results    │
                │  • Animated Gauge   │
                │  • Risk Level       │
                │  • Color Coding     │
                │  • Personal Message │
                └──────────┬──────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ↓                     ↓
    ┌─────────────────────┐  ┌─────────────────────┐
    │  Download PDF       │  │  New Assessment     │
    │  Report             │  │  (Reset Form)       │
    └─────────────────────┘  └─────────────────────┘
```

### Flow Description:

**Phase 1: Data Collection (Steps 1-3)**
- User progresses through three-step form
- Each step validates inputs before allowing progression
- Data persists across steps

**Phase 2: Submission & Processing**
- Form data sent as JSON to backend `/predict` endpoint
- Backend validates model availability
- Features normalized using StandardScaler parameters
- ONNX tensor created with correct dimensions

**Phase 3: AI Inference**
- Neural network processes normalized features
- Model outputs probability score (0-1)
- Risk classification applied based on threshold

**Phase 4: Result Presentation**
- Frontend receives probability and risk level
- Animated gauge displays result visually
- Color-coded risk indicator (green/yellow/red)
- Personalized message based on risk category

**Phase 5: User Actions**
- Download comprehensive PDF report
- Start new assessment (clears form)

### Error Handling Flow:

```
   Any Step Error
        ↓
   [Validation Failed]
        ↓
   Display Error Message
        ↓
   User Corrects Input
        ↓
   Continue Flow
```

## 6.7 System Constraints

### 6.7.1 Technical Constraints

1. **Model Format**: Must use ONNX format for ML model
2. **No Database**: System architecture requires stateless operation
3. **Browser Dependency**: Requires JavaScript-enabled modern browser
4. **Internet Requirement**: Online connectivity required for API access
5. **CPU-Only Inference**: Current implementation does not utilize GPU

### 6.7.2 Regulatory Constraints

1. **Medical Disclaimer**: System must display clear disclaimer that it's not a diagnostic tool
2. **Privacy Compliance**: Must comply with HIPAA (US), GDPR (EU) data privacy standards
3. **Professional Consultation**: Results must recommend consulting healthcare providers
4. **Not FDA Approved**: System is for educational/research purposes only

### 6.7.3 Business Constraints

1. **Free Access**: System should remain freely accessible
2. **Open Source**: Consider open-source licensing for wider adoption
3. **No User Accounts**: Maintains simplicity and privacy
4. **Self-Hosted**: Organizations can host their own instances

## 6.8 System Interfaces

### 6.8.1 User Interface Specifications

**Screen Resolution Support**
- Minimum: 320px width (mobile)
- Maximum: Unlimited (responsive)
- Optimal: 1024px+ (desktop)

**Color Scheme**
- Light mode: White/gray backgrounds, dark text
- Dark mode: Dark backgrounds, light text
- Accent colors: Blue, green, yellow, red (risk indicators)

**Typography**
- Font family: System font stack (sans-serif)
- Font sizes: 12px-48px responsive
- Line height: 1.5-1.75 for readability

### 6.8.2 API Interface Specification

**Endpoint**: POST /predict

**Request Format**:
```json
{
  "fullName": "string",
  "age": number,
  "sex": number,
  "cp": number,
  "trestbps": number,
  "chol": number,
  "fbs": number,
  "restecg": number,
  "thalach": number,
  "exang": number,
  "oldpeak": number,
  "slope": number,
  "ca": number,
  "thal": number
}
```

**Response Format**:
```json
{
  "probability": number,
  "riskLevel": "Low" | "Moderate" | "High"
}
```

**Error Response**:
```json
{
  "error": "string"
}
```

### 6.8.3 External Interface Requirements

**Network Protocols**
- HTTP/HTTPS for API communication
- WebSocket: Not required (stateless architecture)

**Data Formats**
- JSON for API requests/responses
- PDF for report generation
- SVG for gauge visualization

---

*This chapter provides comprehensive requirements specifications covering all aspects of the CVD Risk Predictor system. The next chapter will detail the implementation approach and testing strategies.*
