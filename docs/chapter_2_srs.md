# Chapter 2: Software Requirements Specification (SRS)

## 2.1 Introduction
This Software Requirement Specification (SRS) defines the functional and non-functional requirements of the CVD Risk Predictor system. It outlines the software, hardware, and system specifications required to ensure accurate, efficient, and reliable cardiovascular disease risk assessment. The document describes how the system processes user inputs, performs AI-based predictions, and delivers results in real time. It also details user interaction, system features, security measures, and performance expectations. This SRS serves as a foundation for system design, development, and testing while ensuring clarity among stakeholders including developers, testers, and end users. By providing a structured definition of requirements, it helps reduce ambiguity, supports scalability, and ensures the system meets its objectives of accuracy, accessibility, speed, and user-friendliness throughout its lifecycle.

## 2.2 Overall Description

### 2.2.1 Product Perspective
The CVD Risk Predictor is a web-based intelligent healthcare platform designed to assess an individual’s risk of cardiovascular disease using AI-powered algorithms. Unlike traditional static risk calculators, it evaluates 13 distinct clinical and lifestyle parameters to provide a highly comprehensive and statistically accurate assessment. The system is built with a React frontend (powered by Vite) for a fast and responsive user interface, and a Node.js with Express.js backend that communicates with a neural network model deployed via ONNX Runtime for efficient, cross-platform inference. It operates entirely online without requiring installation and supports secure, real-time data processing with a strictly privacy-focused, stateless architecture.

### 2.2.2 Product Functions
- User input collection of personal, clinical, and lifestyle parameters through a structured multi-step form to prevent cognitive overload.
- AI-based cardiovascular risk prediction utilizing a trained neural network model operating within the ONNX Runtime environment.
- Real-time generation of risk probability scores categorized logically into Low, Moderate, or High-risk tiers.
- Interactive and dynamic visualization of the prediction results using animated gauge indicators and modern UI components.
- Automated, client-side generation of downloadable PDF reports summarizing patient data, test outcomes, and general recommendations.
- Inclusion of preset testing profiles (e.g., "Low Risk Preset", "High Risk Preset") to allow users to quickly evaluate the system's capabilities.

### 2.2.3 User Characteristics
- **General Users:** Individuals seeking to assess their cardiovascular health. They are expected to have basic web navigation skills and access to their personal health metrics (such as blood pressure and cholesterol levels).
- **Healthcare Professionals:** Medical staff utilizing the system for rapid preliminary risk evaluation. They require high reliability, clear data presentation, and downloadable reports for patient files.
- **System Administrators/Developers:** Technical teams managing the server deployment, monitoring system performance, and updating the machine learning models.

### 2.2.4 General Constraints
- The system requires a stable internet connection for accessing the web application and transmitting data to the prediction API.
- The accuracy of the prediction is entirely dependent on the accuracy of the user-provided clinical data.
- The platform supports modern web browsers (Chrome, Edge, Safari, Firefox) but may degrade gracefully on outdated legacy browsers.
- Due to its privacy-first stateless design, the system does not store user data persistently, which means historical tracking or record retrieval across sessions is not supported.

### 2.2.5 Special Requirements
**Software:**
- Frontend: React.js, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js
- Inference: ONNX Runtime Node
- Report Generation: jsPDF
**Hardware:**
- Client: Any modern computer, tablet, or smartphone with internet connectivity.
- Server: Standard cloud hosting infrastructure capable of running Node.js environments with sufficient memory for ONNX model loading.

## 2.3 Functional Requirements

### Module 1: Data Collection & Validation
- The system shall provide a multi-step form interface categorized into Personal Details, Vitals, and Lifestyle factors.
- The system must validate all inputs in real-time, strictly prohibiting negative values, alphabetical characters in numeric fields, and empty submissions.
- The system shall present clear, inline error messages to guide user correction.

### Module 2: Prediction API Gateway
- The backend API must expose a secure endpoint to receive the JSON payload of 13 clinical parameters.
- The API must normalize the incoming data to match the tensor format expected by the ONNX machine learning model.
- The system must gracefully handle request failures and return appropriate HTTP error codes and messages to the client.

### Module 3: ONNX Inference Engine
- The system shall load the pre-trained neural network model into memory upon server initialization.
- The engine must execute the inference synchronously upon receiving a request and extract the positive class probability (the risk score).
- The prediction process must execute rapidly to support real-time user feedback.

### Module 4: Reporting & Visualization
- The system shall dynamically render an animated gauge reflecting the calculated risk score.
- The system must provide a feature to generate a PDF report based on the current session's state, mapping numerical flags to human-readable strings (e.g., Gender: 0 -> Female).

## 2.4 Design Constraints
- Must deliver real-time communication between the client and server with minimal latency.
- Must feature a cross-platform, responsive UI that adapts to mobile, tablet, and desktop screens.
- Must ensure that sensitive medical data is processed entirely in memory and immediately discarded.

## 2.5 System Attributes
- **Reliability:** The system must maintain stable operations, handling unexpected input gracefully without crashing.
- **Availability:** Designed for 24/7 access through cloud hosting platforms.
- **Security:** Operates statelessly to prevent data breaches involving personal health information. Utilizes HTTPS for secure data transmission.
- **Usability:** Features a clean, distraction-free dashboard and an intuitive, guided form flow.
- **Maintainability:** Modular React component structure and a decoupled Express.js backend allow for easy updates and model retraining.

## 2.6 Other Requirements
- System error logs must be maintained on the server to diagnose inference failures or API issues.
- The generated PDF reports must include a clear disclaimer stating that the system is an AI prediction tool and not a definitive medical diagnosis.
