"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Activity,
  Heart,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Droplets,
  Gauge,
  Stethoscope,
  Thermometer,
  Pill,
  LineChart,
  UserCheck,
} from "lucide-react"

interface FormData {
  age: number
  cp: number
  trestbps: number
  chol: number
  fbs: number
  restecg: number
  thalach: number
  exang: number
  oldpeak: number
  slope: number
  ca: number
  thal: number
  sex: number
}

interface PredictionFormProps {
  onSubmit: (data: FormData) => void
}

export default function PredictionForm({ onSubmit }: PredictionFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    cp: 0,
    trestbps: 0,
    chol: 0,
    fbs: 0,
    restecg: 0,
    thalach: 0,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    thal: 0,
    sex: 0,
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("formData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    }
  }, [])

  const handleChange = (field: keyof FormData, value: any) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    }
    setFormData(updatedFormData)

    // Save to localStorage
    localStorage.setItem("formData", JSON.stringify(updatedFormData))
  }

  const validateStep = (step: number) => {
    setError("")

    if (step === 1) {
      if (!formData.age || formData.age < 18 || formData.age > 120) {
        setError("Please enter a valid age between 18 and 120")
        return false
      }
      if (formData.cp < 0 || formData.cp > 3) {
        setError("Please select a chest pain type")
        return false
      }
      if (!formData.trestbps || formData.trestbps < 80 || formData.trestbps > 240) {
        setError("Please enter a valid resting blood pressure (80-240 mm Hg)")
        return false
      }
      if (!formData.chol || formData.chol < 100 || formData.chol > 600) {
        setError("Please enter a valid cholesterol level (100-600 mg/dl)")
        return false
      }
    } else if (step === 2) {
      if (formData.fbs !== 0 && formData.fbs !== 1) {
        setError("Please select fasting blood sugar status")
        return false
      }
      if (formData.restecg < 0 || formData.restecg > 2) {
        setError("Please select a resting ECG result")
        return false
      }
      if (!formData.thalach || formData.thalach < 60 || formData.thalach > 220) {
        setError("Please enter a valid maximum heart rate (60-220)")
        return false
      }
      if (formData.exang !== 0 && formData.exang !== 1) {
        setError("Please select exercise induced angina status")
        return false
      }
    } else if (step === 3) {
      if (formData.oldpeak < 0 || formData.oldpeak > 10) {
        setError("Please enter a valid ST depression value (0-10)")
        return false
      }
      if (formData.slope < 0 || formData.slope > 2) {
        setError("Please select a slope value")
        return false
      }
      if (formData.ca < 0 || formData.ca > 4) {
        setError("Please select a number of major vessels")
        return false
      }
      if (formData.thal < 0 || formData.thal > 3) {
        setError("Please select a thalassemia value")
        return false
      }
      if (formData.sex !== 0 && formData.sex !== 1) {
        setError("Please select your sex")
        return false
      }
    }

    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
  
      try {
        // Extract data from localStorage
        const storedData = localStorage.getItem("formData");
        console.log("Stored data:", storedData);
        if (!storedData) {
          setError("No data found in localStorage");
          setIsSubmitting(false);
          return;
        }
  
        const formData = JSON.parse(storedData);
  
        // Send POST request to the API
        const response = await fetch("https://heart-disease-prediction-backend-ji6p.onrender.com/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send formData as JSON
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch prediction");
        }
        onSubmit(formData);
  
        const responseData = await response.json();
  
        // Store the API response in localStorage
        localStorage.setItem("predictionResponse", JSON.stringify(responseData));
  
        // Optionally, handle the response (e.g., show a success message)
        console.log("Prediction response:", responseData);
      } catch (error) {
        console.error("Error during prediction:", error);
        setError("An error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <UserCheck className="h-5 w-5" />
      case 2:
        return <Stethoscope className="h-5 w-5" />
      case 3:
        return <LineChart className="h-5 w-5" />
      default:
        return <Heart className="h-5 w-5" />
    }
  }
  return (
    <Card className="border-0 shadow-2xl glass-effect neon-border max-w-3xl mx-auto">
      <CardHeader className="space-y-1 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <Heart className="h-8 w-8 text-red-500 heartbeat" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Heart Disease Prediction
          </CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          Please provide your health information for an accurate prediction
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className={`flex flex-col items-center ${currentStep === step ? "text-purple-400" : "text-gray-600"}`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === step
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white pulse-border"
                      : currentStep > step
                        ? "bg-green-600 text-white"
                        : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {currentStep > step ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                      ✓
                    </motion.div>
                  ) : (
                    getStepIcon(step)
                  )}
                </div>
                <span className="text-xs">Step {step}</span>
              </motion.div>
            ))}
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500"
              initial={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="age" className="text-purple-300 flex items-center">
                      <UserCheck className="h-4 w-4 mr-2 text-purple-400" />
                      Age (years)
                    </Label>
                    <div className="relative">
                      <Input
                        id="age"
                        type="number"
                        value={formData.age || ""}
                        onChange={(e) => handleChange("age", Number.parseInt(e.target.value) || 0)}
                        placeholder="Enter your age"
                        className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-xs text-purple-400">years</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="cp" className="text-purple-300 flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-purple-400" />
                      Chest Pain Type
                    </Label>
                    <Select
                      value={formData.cp.toString()}
                      onValueChange={(value) => handleChange("cp", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select chest pain type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">Typical Angina</SelectItem>
                        <SelectItem value="1">Atypical Angina</SelectItem>
                        <SelectItem value="2">Non-anginal Pain</SelectItem>
                        <SelectItem value="3">Asymptomatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="trestbps" className="text-purple-300 flex items-center">
                      <Gauge className="h-4 w-4 mr-2 text-purple-400" />
                      Resting Blood Pressure (mm Hg)
                    </Label>
                    <div className="relative">
                      <Input
                        id="trestbps"
                        type="number"
                        value={formData.trestbps || ""}
                        onChange={(e) => handleChange("trestbps", Number.parseInt(e.target.value) || 0)}
                        placeholder="Enter resting blood pressure"
                        className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-xs text-purple-400">mm Hg</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="chol" className="text-purple-300 flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-purple-400" />
                      Serum Cholesterol (mg/dl)
                    </Label>
                    <div className="relative">
                      <Input
                        id="chol"
                        type="number"
                        value={formData.chol || ""}
                        onChange={(e) => handleChange("chol", Number.parseInt(e.target.value) || 0)}
                        placeholder="Enter cholesterol level"
                        className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-xs text-purple-400">mg/dl</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="fbs" className="text-purple-300 flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-purple-400" />
                      Fasting Blood Sugar {">"}120 mg/dl
                    </Label>
                    <Select
                      value={formData.fbs.toString()}
                      onValueChange={(value) => handleChange("fbs", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select fasting blood sugar status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="restecg" className="text-purple-300 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-purple-400" />
                      Resting ECG Results
                    </Label>
                    <Select
                      value={formData.restecg.toString()}
                      onValueChange={(value) => handleChange("restecg", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select resting ECG result" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">Normal</SelectItem>
                        <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                        <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="thalach" className="text-purple-300 flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-purple-400" />
                      Maximum Heart Rate Achieved
                    </Label>
                    <div className="relative">
                      <Input
                        id="thalach"
                        type="number"
                        value={formData.thalach || ""}
                        onChange={(e) => handleChange("thalach", Number.parseInt(e.target.value) || 0)}
                        placeholder="Enter maximum heart rate"
                        className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-xs text-purple-400">bpm</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="exang" className="text-purple-300 flex items-center">
                      <Stethoscope className="h-4 w-4 mr-2 text-purple-400" />
                      Exercise Induced Angina
                    </Label>
                    <Select
                      value={formData.exang.toString()}
                      onValueChange={(value) => handleChange("exang", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select angina status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="oldpeak" className="text-purple-300 flex items-center">
                      <LineChart className="h-4 w-4 mr-2 text-purple-400" />
                      ST Depression Induced by Exercise
                    </Label>
                    <Input
                      id="oldpeak"
                      type="number"
                      step="0.1"
                      value={formData.oldpeak || ""}
                      onChange={(e) => handleChange("oldpeak", Number.parseFloat(e.target.value) || 0)}
                      placeholder="Enter ST depression value"
                      className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="slope" className="text-purple-300 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-purple-400" />
                      Slope of Peak Exercise ST Segment
                    </Label>
                    <Select
                      value={formData.slope.toString()}
                      onValueChange={(value) => handleChange("slope", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select slope value" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">Upsloping</SelectItem>
                        <SelectItem value="1">Flat</SelectItem>
                        <SelectItem value="2">Downsloping</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="ca" className="text-purple-300 flex items-center">
                      <Pill className="h-4 w-4 mr-2 text-purple-400" />
                      Number of Major Vessels Colored by Fluoroscopy
                    </Label>
                    <Select
                      value={formData.ca.toString()}
                      onValueChange={(value) => handleChange("ca", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select number of vessels" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="thal" className="text-purple-300 flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-purple-400" />
                      Thalassemia
                    </Label>
                    <Select
                      value={formData.thal.toString()}
                      onValueChange={(value) => handleChange("thal", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select thalassemia value" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">Normal</SelectItem>
                        <SelectItem value="1">Fixed Defect</SelectItem>
                        <SelectItem value="2">Reversible Defect</SelectItem>
                        <SelectItem value="3">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Label htmlFor="sex" className="text-purple-300 flex items-center">
                      <UserCheck className="h-4 w-4 mr-2 text-purple-400" />
                      Sex
                    </Label>
                    <Select
                      value={formData.sex.toString()}
                      onValueChange={(value) => handleChange("sex", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-purple-800 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-800 text-white">
                        <SelectItem value="0">Female</SelectItem>
                        <SelectItem value="1">Male</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Alert variant="destructive" className="bg-red-900/50 text-red-200 border border-red-800">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="border-purple-700 text-purple-400 hover:bg-purple-900/20 group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
<Button
  type="button" // Changed to "button" to handle the click manually
  onClick={(e) => {
    if (!isSubmitting) {
      setIsSubmitting(true); // Set submitting state
      handleSubmit(e); // Pass the event object to handleSubmit
    }
  }}
  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
  disabled={isSubmitting}
>
  {isSubmitting ? (
    <>
      <Activity className="mr-2 h-4 w-4 animate-spin" />
      Processing...
    </>
  ) : (
    <>
      Get Prediction
      <ArrowRight className="ml-2 h-4 w-4" />
    </>
  )}
</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
