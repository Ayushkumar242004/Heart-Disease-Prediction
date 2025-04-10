"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import PredictionForm from "@/components/prediction-form"
import PredictionResults from "@/components/prediction-results"
import { Button } from "@/components/ui/button"
import { Heart, LogOut, User, Activity, ChevronRight } from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)
  const [predictionData, setPredictionData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/")
    } else {
      setUser(JSON.parse(currentUser))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  // const handlePredictionSubmit = (data: any) => {
  //   // Simulate API call with mock data
  //   setTimeout(() => {
  //     const mockPredictionResult = {
  //       prediction: {
  //         value: Math.random() > 0.5 ? 1 : 0,
  //         probability: Math.random().toFixed(2),
  //         risk_category: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
  //       },
  //       uncertainty: {
  //         level: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
  //         reliability: (Math.random() * 10).toFixed(1),
  //       },
  //       abnormal_features: {
  //         age: {
  //           value: data.age,
  //           z_score: (Math.random() * 3 - 1.5).toFixed(2),
  //           severity: ["Mild", "Moderate", "Severe"][Math.floor(Math.random() * 3)],
  //           note: "Age is a significant risk factor",
  //         },
  //         cp: {
  //           value: data.cp,
  //           label: ["Typical Angina", "Atypical Angina", "Non-anginal Pain", "Asymptomatic"][data.cp],
  //           z_score: (Math.random() * 3 - 1.5).toFixed(2),
  //           severity: ["Mild", "Moderate", "Severe"][Math.floor(Math.random() * 3)],
  //           note: "Chest pain type is indicative of heart condition",
  //         },
  //       },
  //       key_contributors: {
  //         cp: {
  //           contribution: (Math.random() * 0.5).toFixed(2),
  //           value: data.cp,
  //           mean: (Math.random() * 3).toFixed(1),
  //         },
  //         thal: {
  //           contribution: (Math.random() * 0.5).toFixed(2),
  //           value: data.thal,
  //           mean: (Math.random() * 3).toFixed(1),
  //         },
  //       },
  //       report_date: new Date().toISOString(),
  //       clinical_insights: {
  //         general: "Based on your profile, regular monitoring is recommended.",
  //         specific: "Consider lifestyle modifications to improve heart health.",
  //       },
  //       visualization_url: "/placeholder.svg?height=300&width=500",
  //     }

  //     setPredictionData(mockPredictionResult)
  //     setShowResults(true)
  //   }, 1500)
  // }

  const handlePredictionSubmit = () => {
    // Extract the prediction response from localStorage
    const storedResponse = localStorage.getItem("predictionResponse");
  
    if (!storedResponse) {
      console.error("No prediction response found in localStorage");
      return;
    }
  
    const predictionData = JSON.parse(storedResponse);
  
    // Set the prediction data and show the results
    setPredictionData(predictionData);
    setShowResults(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Activity className="h-16 w-16 text-purple-500 animate-spin" />
      </div>
    )
  }

  // Background animation elements
  const circles = Array.from({ length: 10 }, (_, i) => i)

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden bg-grid">
      {/* Animated background elements */}
      {circles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500 opacity-5"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: 20 + Math.random() * 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
          }}
        />
      ))}

      {/* ECG Line Animation */}
      <svg className="absolute top-20 left-0 w-full h-20 opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path
          d="M0,100 L30,100 L40,80 L50,120 L60,80 L70,140 L80,20 L90,180 L100,60 L110,100 L300,100 L310,100 L320,80 L330,120 L340,80 L350,140 L360,20 L370,180 L380,60 L390,100 L600,100 L610,100 L620,80 L630,120 L640,80 L650,140 L660,20 L670,180 L680,60 L690,100 L900,100 L910,100 L920,80 L930,120 L940,80 L950,140 L960,20 L970,180 L980,60 L990,100 L1200,100"
          fill="none"
          stroke="rgba(239, 68, 68, 0.5)"
          strokeWidth="2"
          className="ecg-line"
        />
      </svg>

      <header className="glass-effect shadow-lg border-b border-purple-900/50 relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
              <Heart className="h-6 w-6 text-red-500" />
            </motion.div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Heart Health Predictor
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-purple-300">
              <User className="h-4 w-4 mr-1" />
              <span>{user.username}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {!showResults ? (
            <PredictionForm onSubmit={handlePredictionSubmit} />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Your Heart Health Results
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="border-purple-700 text-purple-400 hover:bg-purple-900/20 group"
                >
                  New Prediction
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <PredictionResults data={predictionData} />
            </div>
          )}
        </motion.div>
      </main>

      {/* Animated medical icons */}
      <div className="absolute bottom-10 right-10">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <Activity className="h-10 w-10 text-purple-500 opacity-20" />
        </motion.div>
      </div>
      <div className="absolute top-40 left-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        >
          <Activity className="h-16 w-16 text-pink-500 opacity-20" />
        </motion.div>
      </div>
    </div>
  )
}
