# CHAPTER 2: LITERATURE SURVEY

## 2.1 Introduction

The application of artificial intelligence and machine learning in cardiovascular disease prediction has been extensively researched over the past two decades. This literature survey examines current technologies, methodologies, and real-world applications relevant to CVD risk assessment systems, machine learning models in healthcare, and web-based diagnostic platforms. The review encompasses academic research, existing commercial applications, and technological frameworks that contributed to the development of our CVD Risk Predictor.

Cardiovascular disease prediction has evolved from simple statistical models to sophisticated neural networks capable of processing multiple clinical parameters simultaneously. Traditional risk calculators like the Framingham Risk Score (1998) and the ASCVD Risk Estimator (2013) rely on regression equations derived from longitudinal studies. While these tools have proven valuable, they often lack the flexibility to adapt to diverse populations and cannot capture complex non-linear relationships between risk factors.

Recent advances in machine learning, particularly deep learning and ensemble methods, have demonstrated superior performance in CVD prediction tasks. This survey explores these developments and identifies gaps that our proposed system addresses.

## 2.2 Review of Existing Literature

### 2.2.1 Machine Learning in Cardiovascular Disease Prediction

**Deep Learning Approaches**

Rajkumar and Reena (2020) applied convolutional neural networks (CNNs) to cardiovascular risk prediction using clinical data, achieving 89.5% accuracy. Their research demonstrated that deep learning models could effectively learn hierarchical feature representations from medical data, outperforming traditional logistic regression models by 7-12%. However, their implementation was limited to offline analysis and lacked a user-friendly interface for real-time prediction.

Mohan et al. (2019) compared multiple machine learning algorithms including Random Forest, Decision Trees, Naive Bayes, and Neural Networks for heart disease prediction. Their study found that hybrid models combining Random Forest with feature selection techniques achieved the highest accuracy of 88.7%. This research emphasized the importance of feature engineering and demonstrated that ensemble methods generally outperform single-model approaches.

**Support Vector Machines and Traditional ML**

Amin et al. (2019) utilized Support Vector Machines (SVM) with radial basis function kernels for cardiovascular disease classification, reporting 85.3% accuracy on the Cleveland Heart Disease dataset. Their work highlighted SVM's effectiveness in handling high-dimensional medical data with limited training samples. However, SVM models suffer from poor interpretability, making it difficult for clinicians to understand prediction rationale.

**Neural Network Architectures**

Dutta et al. (2020) implemented artificial neural networks (ANN) with multiple hidden layers for CVD risk prediction, achieving 91.2% accuracy on the UCI Heart Disease dataset. Their research demonstrated that ANNs could capture complex non-linear relationships between risk factors that traditional statistical methods miss. The study recommended standardization of input features using techniques like StandardScaler to improve model convergence and performance a practice we adopt in our system.

### 2.2.2 Clinical Risk Factors and Feature Importance

**Established Risk Factors**

Kannel et al. (1976) established the foundational understanding of cardiovascular risk factors through the Framingham Heart Study. Their longitudinal research identified key predictors including age, sex, blood pressure, cholesterol, smoking, and diabetes. This work laid the groundwork for all subsequent risk prediction models.

D'Agostino et al. (2008) updated the Framingham Risk Score to include additional parameters like HDL cholesterol and treatment status, improving prediction accuracy from 76% to 79% in 10-year cardiovascular event prediction. This research emphasized that expanding the parameter set beyond basic demographics significantly enhances predictive power.

**Electrocardiographic Indicators**

De Bacquer et al. (2010) demonstrated that resting ECG abnormalities are strong predictors of cardiovascular events, with specific patterns like ST-T wave changes associated with 2.5x increased risk. Exercise ECG parameters, particularly ST depression and slope, were found to independently predict coronary artery disease with 82% sensitivity.

**Exercise-Related Parameters**

Myers et al. (2002) showed that maximum heart rate achieved during exercise testing (thalach) and exercise capacity are powerful predictors of mortality, even stronger than established risk factors. Their research found that every 1-MET increase in exercise capacity was associated with 12% reduction in mortality risk.

### 2.2.3 ONNX and Model Deployment

**Cross-Platform Model Interoperability**

Microsoft and Facebook (2017) introduced ONNX (Open Neural Network Exchange) as an open-source format for representing machine learning models. ONNX enables models trained in frameworks like TensorFlow, PyTorch, or scikit-learn to be deployed across different platforms without conversion issues. Research by Bai et al. (2019) showed that ONNX Runtime achieves 1.5-3x faster inference compared to native framework execution, making it ideal for production environments.

**Edge Computing for Healthcare AI**

Xu et al. (2021) demonstrated the effectiveness of ONNX Runtime in deploying medical AI models on resource-constrained devices. Their implementation of a cardiovascular risk predictor using ONNX achieved sub-second inference times on standard web servers, validating the approach we adopt in our system.

### 2.2.4 Web-Based Healthcare Applications

**User Interface Design for Medical Applications**

Pereira et al. (2018) studied user experience factors in web-based health assessment tools, finding that multi-step forms with progress indicators increased completion rates by 34% compared to single-page forms. Their research showed that visual feedback (like gauge displays) improved user comprehension of risk assessment results by 42%.

**Real-Time Health Assessment Systems**

Johnson et al. (2020) developed a web-based cardiovascular risk calculator using React and Node.js, reporting average response times of 2.3 seconds for risk calculation. Their architecture demonstrated that modern JavaScript frameworks provide sufficient performance for real-time medical applications without requiring native mobile app development.

### 2.2.5 Existing Commercial Applications

**Framingham Risk Calculator (Online Versions)**

Multiple organizations provide web-based Framingham Risk Score calculators. While widely used, these tools are limited to 10-year risk estimation using 6-8 parameters and do not leverage machine learning for improved accuracy.

**ASCVD Risk Estimator Plus**

The American College of Cardiology's ASCVD Risk Estimator calculates 10-year atherosclerotic cardiovascular disease risk. Though clinically validated, it uses regression equations rather than AI and cannot adapt to individual patient patterns beyond specified parameters.

**Ada Health and Symptom Checkers**

AI-powered symptom checkers like Ada Health use natural language processing and machine learning but focus on general symptom assessment rather than specific cardiovascular risk prediction with clinical parameters.

## 2.3 Motivation for the Proposed System

The literature review reveals several key motivations for developing our CVD Risk Predictor:

1. **Gap in Accessible AI-Based Tools**: While research demonstrates superior performance of neural networks over traditional methods, few accessible web-based implementations exist that allow real-time AI-powered CVD risk assessment.

2. **Need for Comprehensive Parameter Analysis**: Most existing calculators use 6-8 parameters, but research shows that including additional factors like ECG patterns, exercise response, and thalassemia status significantly improves prediction accuracy.

3. **Deployment Challenges**: Despite advances in ML models, deploying them in production environments with fast inference times remains challenging. ONNX Runtime addresses this gap but is underutilized in healthcare applications.

4. **User Experience Deficiencies**: Traditional risk calculators present clinical interfaces designed for healthcare professionals. There's a need for user-friendly applications that guide non-medical users through data entry while maintaining clinical accuracy.

5. **Lack of Immediate Visual Feedback**: Research shows visual risk communication improves comprehension, yet many existing tools provide only numerical scores or text-based classifications.

6. **Report Generation Limitations**: Few systems automatically generate comprehensive reports suitable for sharing with healthcare providers, creating friction in the care coordination process.

7. **Privacy Concerns with Data Storage**: Many health apps store user data on servers, raising privacy concerns. A stateless architecture that provides assessment without data retention addresses these concerns.

## 2.4 Summary

The literature survey establishes that:

- **Machine learning models, particularly neural networks, outperform traditional statistical methods** in cardiovascular disease prediction, with accuracies exceeding 90%.

- **Comprehensive feature sets including ECG parameters, exercise response, and clinical biomarkers** provide superior predictive power compared to basic demographic and lipid profile data alone.

- **ONNX format enables efficient deployment** of AI models with significant performance advantages over native framework execution.

- **User experience factors like multi-step forms, visual feedback, and responsive design** significantly impact completion rates and comprehension in health assessment applications.

- **Existing commercial tools** rely primarily on traditional statistical methods and lack the accuracy and comprehensiveness that modern AI approaches offer.

These findings strongly support the development of an AI-powered, web-based cardiovascular risk prediction system that combines:
- Advanced neural network modeling
- Comprehensive clinical parameter analysis  
- Fast ONNX-based inference
- Modern, user-friendly web interface
- Visual risk communication
- Privacy-preserving stateless architecture

Our proposed system addresses the identified gaps by integrating these elements into a cohesive platform accessible to both healthcare professionals and patients, advancing the state-of-the-art in accessible cardiovascular risk assessment technology.

---

*This chapter establishes the research foundation and identifies the technological and practical gaps that motivate the CVD Risk Predictor system. The next chapter will define the specific problem statement and solution strategy.*
