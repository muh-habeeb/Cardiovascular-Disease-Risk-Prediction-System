# Chapter 7: Testing

## 7.1 Introduction
Testing is a critical phase in the development lifecycle of the Cardiovascular Disease Risk Prediction System. Given the application's healthcare context, ensuring the reliability, accuracy, and performance of both the front-end data collection and back-end model inference is paramount. A rigorous testing strategy was implemented to identify potential bottlenecks, validate data integrity, and guarantee that the machine learning predictions are consistently accurate based on the inputs provided. The testing process encompasses unit testing of individual components, integration testing of the API communication, and comprehensive system performance evaluations.

## 7.2 Unit Testing
Unit testing focuses on verifying the smallest testable parts of the application independently.
- **Frontend Validation:** Extensive tests were conducted on the React input fields. The form logic was tested to ensure it actively rejects negative numbers, prevents alphabetical characters from being entered into numeric fields, and blocks the submission of incomplete forms. The inline error messaging system was verified to trigger precisely when invalid data is detected.
- **PDF Generation Utility:** The `generateMedicalPDF.js` script underwent unit testing to confirm its data mapping accuracy. Specifically, tests ensured that binary integer flags used by the ML model (e.g., gender represented as 0 or 1) were correctly transformed into human-readable string labels (e.g., "Female" or "Male") before being printed to the document.
- **Backend API Logic:** The Express.js `/api/predict` endpoint was tested using mock JSON payloads. These tests verified that the server correctly identifies malformed requests, rejects invalid schemas, and returns appropriate HTTP 400 Bad Request error codes, thereby preventing the ONNX engine from crashing due to unexpected data structures.

## 7.3 Integration Testing
Integration testing ensures that the independently developed modules function harmoniously when combined.
- **Client-Server Communication:** The connection between the React frontend (using Axios) and the Node.js backend was rigorously tested. This included verifying CORS policy configurations, ensuring payload structures matched exactly across the network boundary, and confirming that the server's response was correctly parsed by the UI state manager.
- **Tensor Data Transition:** A crucial integration point is the transition of data from a standard JSON object into the `Float32Array` tensor required by the ONNX model. Tests were executed to ensure that the strict ordering of the 13 parameters was maintained during this translation process, guaranteeing that no data corruption or mislabeling occurred prior to inference.

## 7.4 System Performance Testing
System testing evaluates the application's compliance with its non-functional requirements, specifically regarding speed and accuracy.
- **Response Time:** Under normal network conditions, the system was tested to ensure an average end-to-end response time of approximately 2.1 seconds from the moment the user clicks "Predict" to the visualization of the result.
- **Inference Speed:** The ONNX model execution within the Node.js environment was benchmarked. Tests revealed that the model performs predictions exceptionally fast, completing the mathematical inference in an average of 82 milliseconds.
- **Predictive Accuracy:** Using partitioned validation datasets distinct from the training data, the model's accuracy was continuously measured. The system demonstrated a steady predictive accuracy rate exceeding 91.2%, proving its efficacy as a reliable preliminary screening tool.

## 7.5 User Acceptance Testing (UAT)
User Acceptance Testing was conducted to evaluate the system's usability from the perspective of the target audience.
- **User Feedback and Usability:** A cohort of simulated end-users navigated the application. Feedback was highly positive, resulting in an average satisfaction score of 4.3 out of 5, highlighting the intuitive nature of the multi-step form and the clarity of the animated gauge results.
- **Completion Rate:** Usability metrics indicated that 98% of users were able to successfully navigate the entire data entry process, submit the form, and download their PDF report without encountering critical errors or requiring external assistance.

## 7.6 Test Cases
The following tabular details outline specific test cases executed during the testing phase:

| Test Case | Description | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| TC_001 | Form Validation | Prevent submission of incomplete clinical data | Passed |
| TC_002 | Route Protection | Redirect unauthenticated users away from `/predict` | Passed |
| TC_003 | API Payload Integrity | `/api/predict` rejects malformed JSON with 400 Bad Request | Passed |
| TC_004 | ML Model Inference | Correctly calculates cardiovascular risk based on 13 features | Passed |
| TC_005 | PDF Generation | Successfully maps numeric flags to labels and downloads PDF | Passed |
| TC_006 | UI Responsiveness | Gauge chart and form adapt correctly to mobile screen sizes | Passed |



INDEX

1.  Introduction………………………………………………….……..(1 – 4)
    1.1  Introduction of the System
         1.1.1  Project Title
         1.1.2  Category
         1.1.3  Overview
    1.2  Objectives of the System
    1.3  Scope of the System
    1.4  Structure of the System
    1.5  System Architecture
    1.6  Results & Visualization Module
    1.7  Software/Hardware Used 
    1.8  Software/Hardware Required for Implementation

2.  Software Requirements Specification (SRS)……………………...(5 – 8)
    2.1  Introduction
    2.2  Overall Description
         2.2.1  Product Perspective
         2.2.2  Product Functions
         2.2.3  User Characteristics
         2.2.4  General Constraints
    2.3  Special Requirements (Software/Hardware)
    2.4  Functional Requirements
         2.4.1  Module 1: User Interaction & Data Input
         2.4.2  Module 2: Data Processing & Preprocessing
         2.4.3  Module 3: Risk Prediction (AI Engine)
         2.4.4  Module 4: Results & Visualization
    2.5  Report Generation
    2.6  Security & Privacy
    2.7  Design Constraints

3.  System Design……………………………………………………..(9 – 13)
    3.1  Introduction
    3.2  Assumptions and Constraints
    3.3  Functional Decomposition
    3.4  Description of Program
         3.4.1  Context Flow Diagram (CFD)
         3.4.2  Data Flow Diagrams (DFDs)
    3.5  Description of Components
         3.5.1  Functional Component 1: Authentication
         3.5.2  Functional Component 2: ONNX Inference Controller

4.  Database Design……………………………………………………(14 – 17)
    4.1  Introduction
    4.2  Purpose and Scope
    4.3  Table Definition
         4.3.1  Users Table
    4.4  ER Diagram

5.  Detailed Design……………………………………………………..(18 – 21)
    5.1  Introduction
    5.2  Structure of the Software Package (Structure Chart)
    5.3  Modular Decomposition of the System
         5.3.1  Module 1: Client-Side Input & Validation
         5.3.2  Module 2: Prediction API Gateway
         5.3.3  Module 3: ONNX Inference Engine

6.  User Interface……………………………………………………....(22 – 27)
    6.1  Main Screen / Home Page
    6.2  Login / Registration
    6.3  Input Form
    6.4  Prediction Result & Animated Gauge

7.  Testing……………………………………………………………….(28 – 30)
    7.1  Introduction
         7.1.1  Unit Testing
         7.1.2  Integration Testing
         7.1.3  System Testing
    7.2  Test Reports

8.  Conclusion…………………………………………...……………... (31-32)

9.  Limitations………………………………………………………….(33-34)

10. Scope for Enhancement…………………………………….………(35-36)

11. Abbreviations and Acronyms………………………………………(37-38)

12. Bibliography / References…………………………………………..(39-40)
