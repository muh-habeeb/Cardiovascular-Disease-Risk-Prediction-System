# Chapter 5: Detailed Design

## 5.1 Introduction
The detailed design chapter explores the internal architecture, module logic, and implementation specifics of the Cardiovascular Disease Risk Prediction System. This section breaks down the application into its foundational building blocks, explaining how the frontend interface communicates with the backend processing systems and how the machine learning model is seamlessly integrated. The design prioritizes modularity, ensuring that individual components—whether they handle user input, data formatting, or model inference—can be updated, tested, and maintained independently.

## 5.2 Structure of the Software Package (Structure Chart)

```text
CVD Risk Prediction System
│
├── Authentication & User Module (Module 1)
│ ├── Login & Registration UI (Future Scope)
│ ├── Session Management
│ └── Profile Data Input
│
├── Data Collection Module (Module 2)
│ ├── Multi-Step Input Form
│ ├── Real-Time Field Validation
│ └── Quick-Fill Presets Configuration
│
├── Prediction API Gateway (Module 3)
│ ├── Express.js Routing & Endpoints
│ ├── Request Payload Validation
│ └── Error Handling & Response Formatting
│
├── ONNX Inference Engine (Module 4)
│ ├── Model Loading (.onnx)
│ ├── JSON to Tensor Data Transformation
│ └── Risk Probability Calculation
│
├── Results & Visualization Module (Module 5)
│ ├── Animated Risk Gauge Display
│ ├── Risk Level Classification (Low/High)
│ └── Interactive Results Dashboard
│
└── Report Generation Module (Module 6)
  ├── PDF Layout & Branding Setup
  ├── Data Formatting (Binary to Text)
  └── Document Download Trigger
```

## 5.3 Modular Decomposition

### 5.3.1 Module 1: Client-Side Input & Validation

#### 5.3.1.1 Inputs
- User interactions through a multi-step form (Personal Details, Vitals, Lab Results).
- Click events on Quick-fill presets (Low Risk, High Risk).

#### 5.3.1.2 Procedural Details
- Guides the user through steps to prevent cognitive overload.
- Validates inputs aggressively on the client side (e.g., checks for negative values or empty fields).
- Updates the React state dynamically with each valid entry.

#### 5.3.1.3 File I/O Interfaces
- None (All data is managed in transient React state).

#### 5.3.1.4 Outputs
- A fully validated JSON object containing 13 clinical parameters.
- Inline red error text if invalid data is detected.

#### 5.3.1.5 Implementation Aspects
- Requires a responsive frontend environment.
- Implemented using React Context and state hooks for real-time validation without reloading the page.

### 5.3.2 Module 2: Prediction API Gateway

#### 5.3.2.1 Inputs
- An HTTP POST request containing the validated JSON payload of clinical data.

#### 5.3.2.2 Procedural Details
- Intercepts requests at the `/api/predict` route using Express.js.
- Verifies that the JSON schema strictly matches what the neural network expects.
- Acts as a critical middleman to protect the inference engine from crashing due to malformed data.

#### 5.3.2.3 File I/O Interfaces
- Receives HTTP payload data; no persistent file I/O operations.

#### 5.3.2.4 Outputs
- Forwards a sanitized data structure to the inference engine.
- Returns appropriate HTTP status codes and error messages if data is malformed.

#### 5.3.2.5 Implementation Aspects
- Requires Node.js and Express.js environment.
- Must include robust try-catch blocks and strict error handling logic.

### 5.3.3 Module 3: ONNX Inference Engine

#### 5.3.3.1 Inputs
- Validated clinical data array forwarded from the API Gateway.
- Pre-trained `.onnx` machine learning model file.

#### 5.3.3.2 Procedural Details
- Loads the neural network model directly into memory upon server initialization.
- Translates the JSON payload into a structured `Float32Array` tensor.
- Executes the inference session, passing the tensor through the neural network layers.

#### 5.3.3.3 File I/O Interfaces
- Reads the static `.onnx` model file from the `/model` directory.

#### 5.3.3.4 Outputs
- The final output is a positive class probability float (percentage likelihood of cardiovascular disease).

#### 5.3.3.5 Implementation Aspects
- Relies heavily on the `onnxruntime-node` library.
- Highly CPU-bound; must execute rapidly to ensure low-latency predictions.

### 5.3.4 Module 4: PDF Report Generator

#### 5.3.4.1 Inputs
- The final calculated risk score.
- The user's input state (the 13 clinical parameters).

#### 5.3.4.2 Procedural Details
- Translates raw numerical state data (e.g., Gender: 0) into human-readable text (Female).
- Dynamically constructs a multi-page document featuring professional branding, timestamps, and data tables.

#### 5.3.4.3 File I/O Interfaces
- Client-side browser file save dialog (generates and downloads a `.pdf` file).

#### 5.3.4.4 Outputs
- A downloadable, high-quality medical PDF report.

#### 5.3.4.5 Implementation Aspects
- Utilizes the client-side `jsPDF` library.
- Operates entirely within the browser to maintain the stateless, privacy-preserving architecture.
