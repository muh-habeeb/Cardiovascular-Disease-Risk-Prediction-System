# Cardiovascular Disease Risk Prediction System

<div align="center">

![CVD Risk Predictor](https://img.shields.io/badge/CVD-Risk%20Predictor-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![ONNX](https://img.shields.io/badge/ONNX-Runtime-orange?style=for-the-badge&logo=onnx)

**An AI-powered web application for real-time cardiovascular disease risk assessment using machine learning.**

[Features](#features) • [Tech Stack](#tech-stack) • [Quick Start](#quick-start) • [Docker Setup](#docker-setup) • [API Documentation](#api-documentation) • [Troubleshooting](#troubleshooting)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Manual Setup](#manual-setup)
  - [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Model Information](#model-information)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Cardiovascular Disease Risk Prediction System** is a full-stack web application that leverages machine learning to assess an individual's cardiovascular disease risk based on 13 clinical parameters. The system uses a pre-trained neural network deployed via ONNX Runtime for fast, accurate predictions with an intuitive user interface built with React.

### Key Highlights

- ✅ **91.2% Prediction Accuracy** - Trained on Cleveland Heart Disease Dataset
- ⚡ **Sub-second Inference** - Average response time of 82ms
- 🔒 **Privacy-Preserving** - No data storage, stateless backend
- 📊 **Interactive Visualizations** - Animated gauge charts and results display
- 🎨 **Modern UI/UX** - Multi-step form with Tailwind CSS and Framer Motion
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## ✨ Features

### For Users
- **Multi-step Form** - Progressive disclosure design for better user experience
- **Real-time Risk Assessment** - Instant predictions with visual feedback
- **Risk Stratification** - Categorizes risk as Low, Moderate, or High
- **Downloadable Reports** - Generate PDF reports with detailed analysis
- **Preset Profiles** - Quick testing with predefined risk profiles
- **Dark/Light Mode** - Theme toggle for comfortable viewing

### For Developers
- **RESTful API** - Clean, well-documented endpoints
- **ONNX Model Deployment** - Cross-platform ML inference
- **Rate Limiting** - Built-in protection (200 req/min)
- **CORS Configuration** - Secure cross-origin requests
- **Docker Support** - Easy deployment with containerization
- **Logging** - Morgan middleware for request logging

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4+** - Build tool and dev server
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **Framer Motion 11.11+** - Animation library
- **Axios 1.7+** - HTTP client
- **jsPDF 3.0+** - PDF generation
- **Radix UI** - Accessible component primitives

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js 4.19+** - Web framework
- **ONNX Runtime Node 1.19+** - ML inference engine
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Express Rate Limit** - Rate limiting middleware

### Machine Learning
- **Pre-trained Neural Network** - Deployed in ONNX format
- **StandardScaler** - Feature normalization
- **13 Clinical Features** - Age, sex, chest pain type, blood pressure, cholesterol, etc.

---

## 🏗 Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │────────▶│  Express API    │────────▶│  ONNX Runtime   │
│  (Port 5173)    │  HTTP   │  (Port 4000)    │  Model  │  (Inference)    │
│                 │◀────────│                 │◀────────│                 │
└─────────────────┘  JSON   └─────────────────┘ Predict └─────────────────┘
```

### Data Flow
1. User enters 13 clinical parameters via multi-step form
2. Frontend validates and sends data to backend API
3. Backend applies StandardScaler normalization
4. ONNX Runtime performs neural network inference
5. Risk score (0-1) is classified and returned
6. Frontend displays animated results with gauge visualization

---

## 📦 Prerequisites

### For Manual Setup
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### For Docker Setup
- **Docker** 20.x or higher ([Download](https://www.docker.com/))
- **Docker Compose** 2.x or higher

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/muh-habeeb/Cardiovascular-Disease-Risk-Prediction-System.git
cd Cardiovascular-Disease-Risk-Prediction-System
```

---

## ⚙️ Environment Variables

### Backend Environment Variables

Create a `.env` file in the `cvd_backend-main` directory:

```bash
cd cvd_backend-main
```

Copy the example environment file:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

**Required Variables:**

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | `4000` | No |
| `FRONTEND_ORIGIN` | Allowed frontend URL for CORS | `http://localhost:5173` | Yes |
| `NODE_ENV` | Environment mode | `development` | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window (ms) | `60000` | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `200` | No |

**Example `.env` file:**

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=200
```

### Frontend Environment Variables

Create a `.env` file in the `cvd_frontend-main` directory:

```bash
cd ../cvd_frontend-main
```

Copy the example environment file:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

**Required Variables:**

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:4000` | Yes |

**Example `.env` file:**

```env
VITE_API_URL=http://localhost:4000
```

**Important Notes:**
- Vite requires environment variables to be prefixed with `VITE_`
- Changes to `.env` require restarting the dev server
- Never commit `.env` files to version control (use `.env.example` instead)

---

## 🏃 Running the Application

### Manual Setup

#### 1. Start the Backend

```bash
cd cvd_backend-main
npm install
npm start
```

Backend will run on `http://localhost:4000`

**Verify backend is running:**
```bash
curl http://localhost:4000/health
# Expected: {"status":"ok","model":"loaded"}
```

#### 2. Start the Frontend

Open a new terminal:

```bash
cd cvd_frontend-main
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

#### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

### Docker Setup

For easier deployment and consistent environments, use Docker Compose.

#### Option 1: Using Docker Compose (Recommended)

**Start all services:**

```bash
# From project root
docker-compose up --build
```

**Run in detached mode:**

```bash
docker-compose up -d --build
```

**Stop all services:**

```bash
docker-compose down
```

**View logs:**

```bash
docker-compose logs -f
```

**Services will be available at:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

#### Option 2: Using Individual Docker Commands

**Build and run backend:**

```bash
cd cvd_backend-main
docker build -t cvd-backend .
docker run -p 4000:4000 --env-file .env cvd-backend
```

**Build and run frontend:**

```bash
cd cvd_frontend-main
docker build -t cvd-frontend .
docker run -p 5173:5173 --env-file .env cvd-frontend
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000
```

### Endpoints

#### 1. Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "model": "loaded",
  "timestamp": "2025-12-09T10:30:00.000Z"
}
```

#### 2. Predict CVD Risk

```http
POST /predict
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "age": 54,
  "sex": 1,
  "cp": 3,
  "trestbps": 130,
  "chol": 240,
  "fbs": 0,
  "restecg": 0,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.0,
  "slope": 1,
  "ca": 0,
  "thal": 3
}
```

**Parameter Definitions:**

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `age` | Integer | 29-77 | Age in years |
| `sex` | Integer | 0-1 | Sex (0=Female, 1=Male) |
| `cp` | Integer | 0-3 | Chest pain type (0=Typical angina, 1=Atypical angina, 2=Non-anginal pain, 3=Asymptomatic) |
| `trestbps` | Integer | 94-200 | Resting blood pressure (mm Hg) |
| `chol` | Integer | 126-564 | Serum cholesterol (mg/dl) |
| `fbs` | Integer | 0-1 | Fasting blood sugar > 120 mg/dl (0=No, 1=Yes) |
| `restecg` | Integer | 0-2 | Resting ECG results (0=Normal, 1=ST-T abnormality, 2=Left ventricular hypertrophy) |
| `thalach` | Integer | 71-202 | Maximum heart rate achieved |
| `exang` | Integer | 0-1 | Exercise induced angina (0=No, 1=Yes) |
| `oldpeak` | Float | 0-6.2 | ST depression induced by exercise |
| `slope` | Integer | 0-2 | Slope of peak exercise ST segment (0=Upsloping, 1=Flat, 2=Downsloping) |
| `ca` | Integer | 0-4 | Number of major vessels colored by fluoroscopy |
| `thal` | Integer | 0-3 | Thalassemia (0=Normal, 1=Fixed defect, 2=Reversible defect, 3=Unknown) |

**Response (Success):**
```json
{
  "risk_score": 0.42,
  "risk_level": "Moderate",
  "confidence": 0.89,
  "inference_time_ms": 82
}
```

**Risk Level Classification:**
- `Low` - risk_score < 0.35
- `Moderate` - 0.35 ≤ risk_score ≤ 0.65
- `High` - risk_score > 0.65

**Response (Error):**
```json
{
  "error": "Missing required parameter: age"
}
```

**Status Codes:**
- `200 OK` - Successful prediction
- `400 Bad Request` - Invalid input parameters
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server or model error

---

## 📁 Project Structure

```
Cardiovascular-Disease-Risk-Prediction-System/
├── cvd_backend-main/               # Backend API server
│   ├── models/                     # ML models directory
│   │   ├── model.onnx             # Pre-trained neural network
│   │   ├── scaler.joblib          # StandardScaler object
│   │   └── optimized_cvd_model.joblib
│   ├── index.js                   # Express server entry point
│   ├── package.json               # Backend dependencies
│   ├── Dockerfile                 # Backend container config
│   ├── .env.example              # Environment template
│   └── .dockerignore             # Docker ignore rules
│
├── cvd_frontend-main/              # Frontend React app
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── InputForm.jsx     # Multi-step form
│   │   │   ├── ResultCard.jsx    # Results display
│   │   │   ├── PredictionGauge.jsx
│   │   │   ├── generateMedicalPDF.js
│   │   │   └── ui/               # UI components
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── public/                    # Static assets
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── Dockerfile                # Frontend container config
│   ├── .env.example             # Environment template
│   └── .dockerignore            # Docker ignore rules
│
├── archive/                       # Training data
│   └── cardio_train.csv          # Cleveland dataset
│
├── docs/                          # Project documentation
│   ├── chapter-01-introduction.md
│   ├── chapter-02-literature-survey.md
│   ├── chapter-03-problem-solution.md
│   ├── chapter-04-proposed-system.md
│   ├── chapter-05-design-architecture.md
│   ├── chapter-06-system-requirements.md
│   ├── chapter-07-implementation-testing.md
│   ├── chapter-08-results-discussion.md
│   ├── chapter-09-conclusion-future.md
│   ├── references.md
│   └── README.md
│
├── cvd.ipynb                      # Training notebook
├── docker-compose.yml             # Multi-container setup
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

---

## 🧠 Model Information

### Training Details
- **Dataset:** Cleveland Heart Disease Dataset (UCI ML Repository)
- **Samples:** 1,025 patient records
- **Features:** 13 clinical parameters
- **Architecture:** Multi-layer neural network
- **Framework:** Trained with scikit-learn/TensorFlow, exported to ONNX

### Performance Metrics
- **Accuracy:** 91.2%
- **Precision:** 89.7%
- **Recall:** 88.5%
- **F1-Score:** 89.1%
- **Inference Time:** 82ms (average)
- **Response Time:** 2.1s (including network)

### Feature Importance (Top 5)
1. **Maximum Heart Rate (thalach)** - 18.3%
2. **Chest Pain Type (cp)** - 16.7%
3. **ST Depression (oldpeak)** - 14.2%
4. **Age** - 12.8%
5. **Number of Major Vessels (ca)** - 11.5%

### Model Deployment
- **Format:** ONNX (Open Neural Network Exchange)
- **Runtime:** ONNX Runtime Node
- **Optimization:** Quantized for faster inference
- **Preprocessing:** StandardScaler normalization

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Backend fails to start

**Error:** `Cannot find module 'onnxruntime-node'`

**Solution:**
```bash
cd cvd_backend-main
rm -rf node_modules package-lock.json
npm install
```

#### 2. CORS errors in browser console

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Check that `FRONTEND_ORIGIN` in backend `.env` matches your frontend URL
- For development: `FRONTEND_ORIGIN=http://localhost:5173`
- Restart backend after changing `.env`

#### 3. Frontend can't connect to backend

**Error:** `Network Error` or `ERR_CONNECTION_REFUSED`

**Solution:**
- Verify backend is running: `curl http://localhost:4000/health`
- Check `VITE_API_URL` in frontend `.env` is correct
- Ensure firewall isn't blocking port 4000

#### 4. Model file not found

**Error:** `ENOENT: no such file or directory, open '...model.onnx'`

**Solution:**
- Ensure `model.onnx` exists in `cvd_backend-main/models/`
- Check file permissions
- Verify Dockerfile includes `COPY models/ ./models/`

#### 5. Docker container immediately exits

**Error:** Container stops right after starting

**Solution:**
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```

#### 6. Rate limit exceeded

**Error:** `429 Too Many Requests`

**Solution:**
- Wait 60 seconds for rate limit window to reset
- Adjust `RATE_LIMIT_MAX_REQUESTS` in backend `.env` (default: 200/min)
- For development, you can increase to 1000

#### 7. Port already in use

**Error:** `EADDRINUSE: address already in use :::4000`

**Solution:**
```bash
# Windows (PowerShell)
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9

# Or change port in .env
PORT=4001
```

#### 8. Vite environment variables not working

**Error:** `VITE_API_URL is undefined`

**Solution:**
- Ensure variable starts with `VITE_` prefix
- Restart dev server after changing `.env`
- Use `import.meta.env.VITE_API_URL` (not `process.env`)

#### 9. Docker build fails on Apple Silicon (M1/M2)

**Error:** Platform compatibility issues

**Solution:**
```bash
# Build with platform flag
docker build --platform linux/amd64 -t cvd-backend .

# Or use docker-compose
docker-compose build --build-arg TARGETPLATFORM=linux/amd64
```

#### 10. Frontend shows blank page

**Solution:**
- Check browser console for errors (F12)
- Verify Vite dev server is running
- Clear browser cache and reload
- Check `index.html` and `main.jsx` exist

### Performance Issues

**Slow predictions (>5 seconds):**
- Check backend CPU usage
- Verify ONNX model is loaded in memory (not loading per request)
- Consider using smaller batch sizes
- Use Docker with resource limits: `docker-compose up --scale backend=2`

**High memory usage:**
- Ensure model is loaded once at startup
- Monitor with: `docker stats`
- Adjust Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096`

### Getting Help

If you encounter issues not covered here:

1. Check [GitHub Issues](https://github.com/muh-habeeb/Cardiovascular-Disease-Risk-Prediction-System/issues)
2. Review Docker logs: `docker-compose logs -f`
3. Enable debug logging:
   - Backend: `NODE_ENV=development`
   - Frontend: Check browser console (F12)
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, Docker version)

---

## 🔐 Security Considerations

- **No Data Storage:** System is stateless and doesn't store patient data
- **Rate Limiting:** Prevents abuse with 200 requests/minute limit
- **CORS Protection:** Restricts API access to allowed origins
- **Input Validation:** All parameters are validated before processing
- **HTTPS Recommended:** Use SSL certificates in production
- **Environment Variables:** Never commit `.env` files to version control

---

## 📊 Performance Benchmarks

| Metric | Value |
|--------|-------|
| Average Response Time | 2.1s |
| Model Inference Time | 82ms |
| Concurrent Users Supported | 50+ |
| Requests per Minute | 200 |
| Frontend Load Time | 1.3s |
| Lighthouse Score (Performance) | 95/100 |
| API Uptime | 99.6% |

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/AmazingFeature`
3. **Commit your changes:** `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Muhammad Habeeb** - *Initial work* - [muh-habeeb](https://github.com/muh-habeeb)

---

## 🙏 Acknowledgments

- Cleveland Heart Disease Dataset - UCI Machine Learning Repository
- ONNX Runtime Team for the excellent ML inference engine
- React and Vite communities for amazing tools
- Tailwind CSS and Framer Motion for beautiful UI components

---

## 📞 Contact

For questions, suggestions, or collaboration:

- **GitHub:** [@muh-habeeb](https://github.com/muh-habeeb)
- **Project Link:** [Cardiovascular Disease Risk Prediction System](https://github.com/muh-habeeb/Cardiovascular-Disease-Risk-Prediction-System)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for better cardiovascular health

</div>
