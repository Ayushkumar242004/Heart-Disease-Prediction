"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Activity, Lock, Mail, User, ArrowRight, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()


  const [circles, setCircles] = useState<any[]>([])


  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("currentUser")
    if (user) {
      router.push("/dashboard")
    }
  }, [router])

  useEffect(() => {
    // Ensure this runs only on the client side
    const generatedCircles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
      size: Math.random() * 100 + 50,
    }))
    setCircles(generatedCircles)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => (u.email === email || u.username === email) && u.password === password)

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !username || !password) {
      setError("All fields are required")
      return
    }

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if user already exists
      const userExists = users.some((u: any) => u.email === email || u.username === username)

      if (userExists) {
        setError("User with this email or username already exists")
        return
      }

      // Add new user
      const newUser = { email, username, password }
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(newUser))

      router.push("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden bg-dots">
      {/* Animated background elements */}
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full bg-purple-500 opacity-10"
          initial={{
            x: circle.x,
            y: circle.y,
            scale: circle.scale,
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
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20 + Math.random() * 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
          }}
        />
      ))}


      {/* ECG Line Animation */}
      <svg className="absolute top-1/4 left-0 w-full h-20 opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path
          d="M0,100 L30,100 L40,80 L50,120 L60,80 L70,140 L80,20 L90,180 L100,60 L110,100 L300,100 L310,100 L320,80 L330,120 L340,80 L350,140 L360,20 L370,180 L380,60 L390,100 L600,100 L610,100 L620,80 L630,120 L640,80 L650,140 L660,20 L670,180 L680,60 L690,100 L900,100 L910,100 L920,80 L930,120 L940,80 L950,140 L960,20 L970,180 L980,60 L990,100 L1200,100"
          fill="none"
          stroke="rgba(239, 68, 68, 0.5)"
          strokeWidth="2"
          className="ecg-line"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-0 shadow-2xl glass-effect neon-border">
          <CardHeader className="space-y-2 text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
            <div className="flex justify-center mb-2">
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-16 w-16 text-red-500 heartbeat" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.4)",
                      "0 0 0 10px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-bold text-white glow-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Heart Disease Prediction
            </CardTitle>
            <CardDescription className="text-gray-300">
              Monitor and predict your heart health with advanced analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary">
                <TabsTrigger value="login" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email or username"
                        className="pl-10 bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10 bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="destructive" className="bg-red-900/50 text-red-200 border border-red-800">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center w-full">
                      Login
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10 bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        className="pl-10 bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="pl-10 bg-secondary/50 border-purple-800 focus:border-purple-500 text-white"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="destructive" className="bg-red-900/50 text-red-200 border border-red-800">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center w-full">
                      Sign Up
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-400">
            <div className="flex items-center">
              <Lock className="h-3 w-3 mr-1 text-purple-400" />
              Secure authentication for your heart health data
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Animated medical icons */}
      <div className="absolute bottom-10 right-10">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <Activity className="h-10 w-10 text-purple-500 opacity-20" />
        </motion.div>
      </div>
      <div className="absolute top-20 left-10">
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
