# System Flow Diagram

Below is the simplified ASCII representation of the application's system flow:

```text
+---------------------+
|    User / Patient   |
+----------+----------+
           |
           | 1. Navigates to Web App
           v
+---------------------+
|    Landing Page     |
| (React Component)   |
+----------+----------+
           |
           | 2. Clicks "Predict Now"
           v
+---------------------+
|  Multi-Step Form    |
| (Input Validation)  |
+----------+----------+
           |
           | 3. Submits 13 Parameters
           v
+---------------------+       JSON Payload        +---------------------+
| React Frontend      | ------------------------> | Express API Gateway |
| (Axios HTTP Client) |                           | (Node.js)           |
+---------------------+ <------------------------ +----------+----------+
           ^                Risk Score (%)                   |
           |                                                 | 4. Data to Tensor
           |                                                 v
+----------+----------+                           +---------------------+
| Results Dashboard   |                           |  ONNX Inference     |
| (Animated Gauge)    |                           |  Engine (ML Model)  |
+----------+----------+                           +---------------------+
           |
           | 5. Clicks "Download PDF"
           v
+---------------------+
| PDF Generator       |
| (jsPDF Utility)     |
+---------------------+
           |
           | 6. Downloads Report
           v
+---------------------+
| Local Machine       |
| (Saved medical PDF) |
+---------------------+
```
