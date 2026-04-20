"use client";
import { useEffect, useEffectEvent, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useUser from "../hooks/useUser";
import Papa from "papaparse";
import * as pdfjsLib from "pdfjs-dist";

// Properly set up PDF.js worker for Vite/React
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ORDER = [
  "age",
  "sex",
  "cp",
  "trestbps",
  "chol",
  "fbs",
  "restecg",
  "thalach",
  "exang",
  "oldpeak",
  "slope",
  "ca",
  "thal",
];

// Helper: Extract numbers from text
const extractNumbers = (text) => {
  const matches = text.match(/\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
};

// Helper: Parse CSV file
const parseCSVFile = (content) => {
  return new Promise((resolve, reject) => {
    Papa.parse(content, {
      complete: (results) => {
        try {
          const data = results.data || [];
          const extracted = {};
          
          if (data.length === 0) throw new Error("CSV file is empty.");
          
          // Check if first row contains headers matching our ORDER fields
          const firstRow = data[0];
          const headerRow = firstRow.map((h) => h.toString().toLowerCase().trim());
          const hasHeaders = ORDER.some((field) => 
            headerRow.some((h) => h.includes(field))
          );
          
          // If headers exist, use them; otherwise use first data row
          const dataRow = hasHeaders ? data[1] : data[0];
          
          if (!dataRow) throw new Error("CSV file has no data rows.");
          
          if (hasHeaders) {
            // Map by header names
            ORDER.forEach((field) => {
              const headerIdx = headerRow.findIndex((h) => h.includes(field));
              extracted[field] = String(headerIdx >= 0 ? (dataRow[headerIdx] || "") : "");
            });
          } else {
            // Map sequentially if no headers
            ORDER.forEach((field, idx) => {
              extracted[field] = String(dataRow[idx] || "");
            });
          }
          
          resolve(extracted);
        } catch (err) {
          reject(new Error("Invalid CSV format."));
        }
      },
      error: (err) => reject(new Error("Failed to parse CSV.")),
    });
  });
};

// Helper: Parse PDF file
const parsePDFFile = (arrayBuffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let allText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        allText += textContent.items.map((item) => item.str).join(" ") + " ";
      }
      
      const extracted = {};
      let foundAnyField = false;
      
      // Try to extract values by looking for field names in the text
      // Handles formats like: "oldpeak: 0.5", "oldpeak = 0.5", "oldpeak 0.5"
      ORDER.forEach((field) => {
        // Create regex patterns to match the field name followed by a value
        const patterns = [
          new RegExp(`${field}\\s*[:=]\\s*([\\d.]+)`, "i"),
          new RegExp(`${field}\\s+([\\d.]+)`, "i"),
        ];
        
        for (let pattern of patterns) {
          const match = allText.match(pattern);
          if (match && match[1]) {
            extracted[field] = String(match[1]);
            foundAnyField = true;
            break;
          }
        }
        
        // If not found, leave empty
        if (!extracted[field]) {
          extracted[field] = "";
        }
      });
      
      // If no fields were found by name, fall back to sequential extraction
      if (!foundAnyField) {
        const numbers = extractNumbers(allText);
        ORDER.forEach((field, idx) => {
          extracted[field] = String(numbers[idx] || "");
        });
      }
      
      if (Object.values(extracted).every((v) => v === "")) {
        throw new Error("No numerical data found in PDF.");
      }
      
      resolve(extracted);
    } catch (err) {
      reject(new Error("Failed to parse PDF. Ensure it contains numerical medical data."));
    }
  });
};

function Field({ label, name, children, hint, error }) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm opacity-90">
        <span className="font-medium">{label}</span>
        {hint && (
          <span className="text-xs opacity-200 ">
            ({hint})
          </span>
        )}
      </label>
      {children}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
}
export default function InputForm({ onSubmit, isLoading }) {
  const [step, setStep] = useState(1);
  const {user} = useUser();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    fullName: user?.username ? user?.username.split("@")[0] : "",
    age: "",
    sex: "1",
    cp: "0",
    trestbps: "",
    chol: "",
    fbs: "0",
    restecg: "0",
    thalach: "",
    exang: "0",
    oldpeak: "",
    slope: "0",
    ca: "0",
    thal: "0",
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFileMode, setIsFileMode] = useState(false);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setIsFileMode(false);
      localStorage.removeItem("tempFileData");
      return;
    }

    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    const isJSON = fileType === "application/json" || fileName.endsWith(".json");
    const isCSV = fileType === "text/csv" || fileName.endsWith(".csv");
    const isPDF = fileType === "application/pdf" || fileName.endsWith(".pdf");

    if (!isJSON && !isCSV && !isPDF) {
      setError("Only JSON, CSV, and PDF files are supported.");
      setIsFileMode(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        let extractedData = {};

        if (isJSON) {
          const content = JSON.parse(event.target.result);
          // Normalize field names to lowercase for comparison
          const normalizedContent = {};
          Object.keys(content).forEach((key) => {
            const lowerKey = key.toLowerCase().trim();
            normalizedContent[lowerKey] = content[key];
          });
          
          // Map to ORDER fields
          ORDER.forEach((field) => {
            extractedData[field] = 
              normalizedContent[field] !== undefined 
                ? String(normalizedContent[field]) 
                : "";
          });
          
          // If JSON has fullName, preserve it
          if (normalizedContent.fullname) {
            extractedData.fullName = String(normalizedContent.fullname);
          }
        } else if (isCSV) {
          extractedData = await parseCSVFile(event.target.result);
        } else if (isPDF) {
          extractedData = await parsePDFFile(event.target.result);
        }

        localStorage.setItem("tempFileData", JSON.stringify(extractedData));

        const newForm = { ...form };
        let foundAny = false;
        Object.keys(extractedData).forEach((key) => {
          if (key in newForm) {
            newForm[key] = String(extractedData[key]);
            foundAny = true;
          }
        });

        if (!foundAny) {
          setError("File contains no valid medical parameters.");
          setIsFileMode(false);
          localStorage.removeItem("tempFileData");
          return;
        }

        setForm(newForm);
        setIsFileMode(true);
        setError(null);
        setFieldErrors({});
      } catch (err) {
        setError(err.message || "Failed to parse file. Please check the file format.");
        setIsFileMode(false);
        localStorage.removeItem("tempFileData");
      }
    };

    if (isJSON || isCSV) {
      reader.readAsText(file);
    } else if (isPDF) {
      reader.readAsArrayBuffer(file);
    }
  };

  const clearFile = () => {
    setIsFileMode(false);
    localStorage.removeItem("tempFileData");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError(null);
    setFieldErrors({});
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    
    // Limit numeric inputs to 10 characters max
    if (e.target.type === "number" && value.length > 10) {
      return;
    }
    
    setForm((f) => ({ ...f, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const errors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!form.fullName || form.fullName.trim() === "") {
        errors.fullName = "Full name is required.";
        isValid = false;
      }
      if (!form.age) {
        errors.age = "Age is required.";
        isValid = false;
      } else if (Number(form.age) <= 0) {
        errors.age = "Age must be greater than 0.";
        isValid = false;
      } else if (Number(form.age) > 120) {
        errors.age = "Age must be less than or equal to 120.";
        isValid = false;
      }
    }

    if (currentStep === 2) {
      if (!form.trestbps) {
        errors.trestbps = "Resting blood pressure is required.";
        isValid = false;
      } else if (Number(form.trestbps) <= 0) {
        errors.trestbps = "Resting blood pressure must be greater than 0.";
        isValid = false;
      } else if (Number(form.trestbps) > 380) {
        errors.trestbps = "Resting blood pressure cannot exceed 380.";
        isValid = false;
      }

      if (!form.chol) {
        errors.chol = "Serum cholesterol is required.";
        isValid = false;
      } else if (Number(form.chol) <= 0) {
        errors.chol = "Serum cholesterol must be greater than 0.";
        isValid = false;
      } else if (Number(form.chol) > 600) {
        errors.chol = "Serum cholesterol cannot exceed 600.";
        isValid = false;
      }

      if (!form.thalach) {
        errors.thalach = "Max heart rate is required.";
        isValid = false;
      } else if (Number(form.thalach) <= 0) {
        errors.thalach = "Max heart rate must be greater than 0.";
        isValid = false;
      } else if (Number(form.thalach) > 220) {
        errors.thalach = "Max heart rate cannot exceed 220.";
        isValid = false;
      }
    }

    if (currentStep === 3) {
      if (form.oldpeak === "") {
        errors.oldpeak = "ST depression is required.";
        isValid = false;
      } else if (Number(form.oldpeak) < 0) {
        errors.oldpeak = "Must be 0 or greater.";
        isValid = false;
      } else if (Number(form.oldpeak) > 10) {
        errors.oldpeak = "ST depression cannot exceed 10.";
        isValid = false;
      }
    }

    setFieldErrors(errors);
    return isValid;
  };

  const goSubmit = () => {
    if (!validateStep(3)) return;

    const payload = { fullName: form.fullName };
    ORDER.forEach((k) => {
      payload[k] = Number(form[k]);
    });
    
    // Clear temp file data after use as requested
    localStorage.removeItem("tempFileData");
    
    onSubmit(payload);
  };

  const presets = {
    low: {
      fullName: "Priya Sharma",
      age: "45",
      sex: "0",
      cp: "1",
      trestbps: "120",
      chol: "200",
      fbs: "0",
      restecg: "1",
      thalach: "180",
      exang: "0",
      oldpeak: "0.5",
      slope: "2",
      ca: "0",
      thal: "1",
    },
    moderate: {
      fullName: "Arjun Kumar",
      age: "55",
      sex: "1",
      cp: "2",
      trestbps: "135",
      chol: "240",
      fbs: "0",
      restecg: "1",
      thalach: "160",
      exang: "0",
      oldpeak: "1.2",
      slope: "1",
      ca: "1",
      thal: "2",
    },
    high: {
      fullName: "Neha Singh",
      age: "68",
      sex: "1",
      cp: "3",
      trestbps: "160",
      chol: "300",
      fbs: "1",
      restecg: "2",
      thalach: "120",
      exang: "1",
      oldpeak: "3.2",
      slope: "0",
      ca: "2",
      thal: "3",
    },
  };

  // to control user can be able to select prefilled info
  //  if user is filling the form or not if user is filling the form
  // then user can not select prefilled info and if user is not filling the form then user can select prefilled info
  const [onFullName, setOnFullName] = useState(false);
  // useEffect(() => {
  //   const isFullNamePresent = form.fullName.trim() !== "";
  //   if (isFullNamePresent) {
  //     setOnFullName(true);
  //   } else {
  //     setOnFullName(false);
  //   }
  //   return () => {
  //     setOnFullName(false);
  //   };
  // }, [form.fullName]);
  return (
// NEW LINE 125:
<div className="rounded-3xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-lg bg-zinc-900 text-white dark:bg-white dark:text-black border border-white/30 p-8">      {/* Step indicator */}
      <div className="flex justify-center mb-4 text-sm opacity-70">
  Step {step} of 3
</div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-inherit">
              Personal Information
            </h2>

            {/* File Upload Section */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Upload Patient Data (JSON/CSV/PDF)
                  {isFileMode && <span className="text-xs text-emerald-400 ml-2">✓ Loaded</span>}
                </span>
                {isFileMode && (
                  <button 
                    onClick={clearFile}
                    className="text-xs px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.pdf"
                onChange={onFileChange}
                disabled={isFileMode}
                className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {isFileMode && (
                <p className="text-[10px] text-emerald-400">
                  ✨ File data loaded. Form fields are disabled for submission.
                </p>
              )}
            </div>

            <Field label="Full name" name="fullName" error={fieldErrors.fullName}>
              <input
                name="fullName"
                type="text"
                placeholder="Enter Your Full Name "
                value={form.fullName}
                onChange={onChange}
                disabled={isFileMode}
                className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </Field>
            {form.fullName && (
              <div className="text-sm opacity-80">
  Hey <span className="font-semibold">{form.fullName}</span> — let’s check your heart.
</div>
            )}
            <Field label="Age" name="age" hint="years" error={fieldErrors.age}>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={onChange}
                disabled={isFileMode}
                className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </Field>
            <Field label="Sex" name="sex">
              <select
                name="sex"
                value={form.sex}
                onChange={onChange}
                disabled={isFileMode}
                className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all [&>option]:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </Field>
          </motion.div>
        )}
        {/* Step 2: Clinical Information */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-inherit">
              Clinical Information
            </h2>
            {[
              {
                label: "Chest Pain Type (cp)",
                name: "cp",
                hint: "0–3",
                options: [
                  "Typical angina",
                  "Atypical angina",
                  "Non-anginal pain",
                  "Asymptomatic",
                ],
              },
              {
                label: "Resting Blood Pressure",
                name: "trestbps",
                type: "number",
                hint: "mm Hg",
              },
              {
                label: "Serum Cholesterol",
                name: "chol",
                type: "number",
                hint: "mg/dl",
              },
              {
                label: "Fasting Blood Sugar (fbs)",
                name: "fbs",
                hint: ">120 mg/dl: 1 yes, 0 no",
                options: ["No", "Yes"],
              },
              {
                label: "Resting ECG (restecg)",
                name: "restecg",
                hint: "0–2",
                options: ["0", "1", "2"],
              },
              {
                label: "Max Heart Rate (thalach)",
                name: "thalach",
                type: "number",
                hint: "bpm",
              },
            ].map((f) => (
              <Field key={f.name} label={f.label} name={f.name} hint={f.hint} error={fieldErrors[f.name]}>
                {f.options ? (
                  <select
                    name={f.name}
                    value={form[f.name]}
                    onChange={onChange}
                    disabled={isFileMode}
                    className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all [&>option]:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {f.options.map((o, i) => (
                      <option key={i} value={i}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={onChange}
                    disabled={isFileMode}
                    className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}
              </Field>
            ))}
          </motion.div>
        )}
        Step 3: Lifestyle
        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
<h2 className="text-xl font-bold text-inherit">              Lifestyle & Test Results
            </h2>
            {[
              {
                label: "Exercise-induced Angina (exang)",
                name: "exang",
                hint: "1 yes, 0 no",
                options: ["No", "Yes"],
              },
              {
                label: "ST Depression (oldpeak)",
                name: "oldpeak",
                type: "number",
                step: "0.1",
              },
              {
                label: "Slope of Peak Exercise ST",
                name: "slope",
                hint: "0–2",
                options: ["0", "1", "2"],
              },
              {
                label: "Smoking (placeholder uses ca)",
                name: "ca",
                hint: "0–3",
                options: ["0", "1", "2", "3"],
              },
              {
                label: "Thalassemia (thal)",
                name: "thal",
                hint: "0–3",
                options: ["0", "1", "2", "3"],
              },
            ].map((f) => (
              <Field key={f.name} label={f.label} name={f.name} hint={f.hint} error={fieldErrors[f.name]}>
                {f.options ? (
                  <select
                    name={f.name}
                    value={form[f.name]}
                    onChange={onChange}
                    disabled={isFileMode}
                    className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all [&>option]:text-black disabled:opacity-50 disabled:cursor-not-allowed"                  >
                    {f.options.map((o, i) => (
                      <option key={i} value={i}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={f.name}
                    type={f.type}
                    step={f.step}
                    value={form[f.name]}
                    onChange={onChange}
                    disabled={isFileMode}
                    className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"                  />
                )}
              </Field>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error display */}
      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      {/* ⚙️ Quick Presets */}
      <div
        className={`mt-5 flex items-center gap-2 text-sm opacity-70 ${isFileMode ? "opacity-40 pointer-events-none" : ""}`}
      >
        <span>Quick fill examples:</span>
        <select
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            setForm((prev) => ({ ...prev, ...presets[v] }));
            setFieldErrors({});
          }}
          disabled={isFileMode}
          className="bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-2 py-1 focus:ring-2 focus:ring-amber-400 outline-none transition [&>option]:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select preset...</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="px-4 py-2 rounded-lg bg-white/80 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:bg-white/90 dark:hover:bg-neutral-700 disabled:opacity-50 active:scale-95 transition"
        >
          Back
        </button>
        {step < 3 ? (
          <button
            onClick={() => {
              if (validateStep(step)) {
                setStep((s) => Math.min(3, s + 1));
              }
            }}
            className="px-4 py-2 rounded-lg bg-amber-400 text-black hover:bg-amber-300 active:scale-95 transition shadow"
          >
            Next
          </button>
        ) : (
          <button
            onClick={goSubmit}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-emerald-400 text-black hover:bg-emerald-300 disabled:opacity-50 active:scale-95 transition shadow"
          >
            {isLoading ? "Analyzing..." : "Predict"}
          </button>
        )}
      </div>
    </div>
  );
}
