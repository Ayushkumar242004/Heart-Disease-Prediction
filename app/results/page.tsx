"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  AlertTriangle,
  Activity,
  Download,
  Calendar,
  FileText,
  BarChart4,
  Lightbulb,
  Zap,
  Info,
  AlertCircle,
  Droplets,
  Thermometer,
  UserCheck,
} from "lucide-react"

interface PredictionResultsProps {
  data: any
}

export default function PredictionResults({ data }: PredictionResultsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!data) return null

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-900/30 text-green-400 border-green-800"
      case "medium":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-800"
      case "high":
        return "bg-red-900/30 text-red-400 border-red-800"
      default:
        return "bg-blue-900/30 text-blue-400 border-blue-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "text-yellow-400"
      case "moderate":
        return "text-orange-400"
      case "severe":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-2xl glass-effect neon-border overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 pb-2 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
            <Heart className="h-5 w-5 text-red-500 mr-2 heartbeat" />
            Heart Disease Prediction Results
          </CardTitle>
          <CardDescription className="text-gray-400">Analysis based on your health information</CardDescription>
        </CardHeader>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">
                Detailed Analysis
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                Clinical Insights
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="overview" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="border-0 card-gradient neon-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                        <Activity className="h-4 w-4 text-purple-400 mr-2" />
                        Prediction Result
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Prediction:</span>
                          <Badge
                            variant="outline"
                            className={`text-sm font-medium ${data.prediction.value === 1 ? "bg-red-900/30 text-red-400 border-red-800" : "bg-green-900/30 text-green-400 border-green-800"}`}
                          >
                            {data.prediction.value === 1 ? "Positive" : "Negative"}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Probability:</span>
                          <span className="text-sm font-medium text-white">
                            {(Number.parseFloat(data.prediction.probability) * 100).toFixed(1)}%
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Risk Category:</span>
                          <Badge
                            variant="outline"
                            className={`text-sm font-medium ${getRiskColor(data.prediction.risk_category)}`}
                          >
                            {data.prediction.risk_category} Risk
                          </Badge>
                        </div>

                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Number.parseFloat(data.prediction.probability) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-2.5 rounded-full ${
                              data.prediction.risk_category === "Low"
                                ? "bg-gradient-to-r from-green-500 to-green-700"
                                : data.prediction.risk_category === "Medium"
                                  ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
                                  : "bg-gradient-to-r from-red-500 to-red-700"
                            }`}
                          ></motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="border-0 card-gradient neon-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
                        Uncertainty Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Uncertainty Level:</span>
                          <Badge
                            variant="outline"
                            className={`text-sm font-medium ${
                              data.uncertainty.level === "Low"
                                ? "bg-green-900/30 text-green-400 border-green-800"
                                : data.uncertainty.level === "Medium"
                                  ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
                                  : "bg-red-900/30 text-red-400 border-red-800"
                            }`}
                          >
                            {data.uncertainty.level}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Reliability Score:</span>
                          <span className="text-sm font-medium text-white">{data.uncertainty.reliability}/10</span>
                        </div>

                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Number.parseFloat(data.uncertainty.reliability) * 10}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          ></motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="border-0 card-gradient neon-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                      <Calendar className="h-4 w-4 text-purple-400 mr-2" />
                      Report Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-400">Report Generated:</span>
                      <span className="text-sm font-medium text-white">{getFormattedDate(data.report_date)}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="relative overflow-hidden rounded-lg border-0 neon-border"
              >
                <div className="p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                  <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                    <BarChart4 className="h-4 w-4 text-purple-400 mr-2" />
                    Visualization
                  </h3>
                </div>
                <div className="p-4 flex justify-center bg-gray-900/50">
                  <div className="relative group">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={data.visualization_url || "/placeholder.svg"}
                        alt="Heart Disease Prediction Visualization"
                        width={500}
                        height={300}
                        className="rounded-md transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                      />
                    </motion.div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900/80 border-purple-700 text-purple-400 hover:bg-purple-900/20"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6 mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 card-gradient neon-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
                      Abnormal Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data.abnormal_features && Object.keys(data.abnormal_features).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(data.abnormal_features).map(([key, value]: [string, any], index: number) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-3 bg-gray-800/50 rounded-md border border-purple-900/50"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium capitalize text-white flex items-center">
                                {key === "age" && <UserCheck className="h-4 w-4 mr-1 text-purple-400" />}
                                {key === "cp" && <Thermometer className="h-4 w-4 mr-1 text-purple-400" />}
                                {key === "trestbps" && <Activity className="h-4 w-4 mr-1 text-purple-400" />}
                                {key === "chol" && <Droplets className="h-4 w-4 mr-1 text-purple-400" />}
                                {key === "fbs" && <Droplets className="h-4 w-4 mr-1 text-purple-400" />}
                                {key}:
                              </span>
                              <Badge variant="outline" className="bg-purple-900/30 text-purple-400 border-purple-800">
                                {value.value}
                                {key === "cp" && ` (${value.label})`}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-400">Z-Score:</span>
                                <span className="ml-1 font-medium text-white">{value.z_score}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Severity:</span>
                                <span className={`ml-1 font-medium ${getSeverityColor(value.severity)}`}>
                                  {value.severity}
                                </span>
                              </div>
                              <div className="col-span-3 mt-1 text-gray-300 italic">{value.note}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No abnormal features detected.</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="border-0 card-gradient neon-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                      <Zap className="h-4 w-4 text-yellow-400 mr-2" />
                      Key Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data.key_contributors && Object.keys(data.key_contributors).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(data.key_contributors).map(([key, value]: [string, any], index: number) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-3 bg-gray-800/50 rounded-md border border-purple-900/50"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium capitalize text-white">{key}:</span>
                              <Badge variant="outline" className="bg-pink-900/30 text-pink-400 border-pink-800">
                                Contribution: {(Number.parseFloat(value.contribution) * 100).toFixed(0)}%
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-400">Your Value:</span>
                                <span className="ml-1 font-medium text-white">{value.value}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Dataset Mean:</span>
                                <span className="ml-1 font-medium text-white">{value.mean}</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Number.parseFloat(value.contribution) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                              ></motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No key contributors identified.</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6 mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 card-gradient neon-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                      <Lightbulb className="h-4 w-4 text-yellow-400 mr-2" />
                      Clinical Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.clinical_insights.general && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="p-4 bg-blue-900/20 rounded-md border border-blue-900/50"
                      >
                        <h4 className="font-medium text-blue-400 mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          General Insights
                        </h4>
                        <p className="text-gray-300">{data.clinical_insights.general}</p>
                      </motion.div>
                    )}

                    {data.clinical_insights.specific && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="p-4 bg-purple-900/20 rounded-md border border-purple-900/50"
                      >
                        <h4 className="font-medium text-purple-400 mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Specific Recommendations
                        </h4>
                        <p className="text-gray-300">{data.clinical_insights.specific}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="border-0 card-gradient neon-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
                      <FileText className="h-4 w-4 text-purple-400 mr-2" />
                      Disclaimer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">
                      This prediction is based on statistical models and should not replace professional medical advice.
                      Please consult with a healthcare provider for proper diagnosis and treatment recommendations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </motion.div>
  )
}
