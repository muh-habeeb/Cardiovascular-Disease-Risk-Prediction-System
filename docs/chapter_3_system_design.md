# Chapter 3: System Design

## 3.1 Introduction
System design defines how the CVD Risk Prediction System operates, integrates, and processes data to deliver real-time cardiovascular risk assessments. The architecture ensures a highly secure, scalable, and seamless interaction through modular components that handle user input validation, secure data transmission, and complex machine learning inference. The system focuses on automation and reliability—managing form state, conducting live API calls, and presenting results visually. It uses React for an engaging frontend experience, Express.js for robust backend routing, and ONNX Runtime for high-speed model execution. The design supports smooth synchronization between the user's browser and the server while maintaining peak performance and strict data security. The architecture is intentionally decoupled and extensible, allowing for future integration with electronic health records (EHR), user authentication platforms, or mobile application wrappers, thereby ensuring long-term scalability and adaptability.

## 3.2 Assumptions and Constraints
**Assumptions:**
- Users possess the required clinical data (e.g., blood pressure, cholesterol levels) to receive an accurate prediction.
- The application is accessed via modern web browsers that fully support JavaScript and CSS animations.
- The backend environment has the necessary native bindings to support `onnxruntime-node`.

**Constraints:**
- The system's prediction accuracy is strictly bounded by the performance metrics of the pre-trained neural network model.
- Real-time prediction capabilities depend on the latency of the user's internet connection to the API gateway.
- The stateless design inherently prevents longitudinal tracking of a single user's risk over time unless they manually save their generated PDF reports.

## 3.3 Functional Decomposition
The system is divided into the following major modules:

1. **Presentation & Interaction Layer (Frontend)**
   - Manages the multi-step user interface and strict form validation.
   - Handles the state of 13 individual clinical parameters.
   - Renders animated results and interactive dashboards.

2. **Application Processing Layer (Backend API)**
   - Exposes RESTful endpoints for the frontend to communicate with.
   - Validates incoming data shapes and sanitizes inputs.
   - Maps JSON data to multi-dimensional tensor arrays.

3. **Machine Learning Inference Layer (ONNX Runtime)**
   - Manages the loading and execution of the `.onnx` model file.
   - Processes the tensor data through the neural network to output the risk probability.

4. **Document Generation Utility**
   - Extracts data from the active application state.
   - Formats and styles the data into a professional PDF layout using jsPDF.

## 3.4 Context Flow Diagram (Level 0)
The Context Diagram represents the entire CVD Risk Prediction System as a single macroscopic process interacting with external entities.
- The **End User** interacts with the system by submitting 13 precise clinical parameters (such as age, BMI indicators, and blood pressure).
- The **CVD Prediction System** processes this raw data through its internal machine learning pipeline.
- The system then returns a calculated **Risk Score** and provides a comprehensive, structured **PDF Medical Report** back to the End User.

## 3.5 Data Flow Diagram (Level 1)
1. **Process 1.0 (Data Collection):** The user interface collects raw input data across multiple structured form steps. Local state management ensures data is held temporarily.
2. **Process 2.0 (Validation & Formatting):** The client-side logic checks for invalid entries (e.g., negative/null values) and constructs a standardized JSON payload.
3. **Process 3.0 (API Transmission):** The standardized payload is transmitted securely via HTTP POST requests using Axios to the Node.js API gateway.
4. **Process 4.0 (Tensor Conversion & Inference):** The backend translates the JSON data into an ONNX-compatible tensor format, executes the model inference, and extracts the resulting probability float.
5. **Process 5.0 (Result Visualization & Output):** The probability score is returned to the client. The UI consumes this score to update the animated risk gauge and dynamically populates the PDF generator module for the user to download.

## 3.6 Description of Components
- **Multi-Step Form Component:** An advanced React component that segments the 13 required inputs into logical categories, preventing user fatigue and ensuring higher data quality.
- **ONNX Inference Controller:** A Node.js module specifically designed to initialize the ONNX session once during server startup and rapidly process arrays of floats into prediction outputs.
- **Gauge Visualization Module:** A highly visual UI component utilizing Framer Motion to provide immediate, color-coded feedback (Green, Yellow, Red) based on the specific risk severity returned by the AI model.
- **PDF Report Engine:** A robust client-side script that translates raw state variables into a nicely formatted document, complete with headers, data tables, and AI-generated risk context.
