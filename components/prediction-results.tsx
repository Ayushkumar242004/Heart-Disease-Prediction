"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

interface PredictionResultsProps {
  data: any;
}

export default function PredictionResults({ data }: PredictionResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!data) return null;

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-900/30 text-green-400 border-green-800";
      case "medium":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-800";
      case "high":
      case "very high":
        return "bg-red-900/30 text-red-400 border-red-800";
      default:
        return "bg-blue-900/30 text-blue-400 border-blue-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "text-yellow-400";
      case "moderate":
        return "text-orange-400";
      case "severe":
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
            <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="abnormal_features"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                Abnormal Features
              </TabsTrigger>
              <TabsTrigger
                value="key_contributors"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                Key Contributors
              </TabsTrigger>
              <TabsTrigger
                value="visualization"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                Visualization
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
            {/* Overview Tab */}
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
                          <span className="text-sm font-medium text-gray-400">Binary Prediction:</span>
                          <Badge
                            variant="outline"
                            className={`text-sm font-medium ${
                              data.prediction.binary_prediction === 1
                                ? "bg-red-900/30 text-red-400 border-red-800"
                                : "bg-green-900/30 text-green-400 border-green-800"
                            }`}
                          >
                            {data.prediction.binary_prediction === 1 ? "Positive" : "Negative"}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Probability:</span>
                          <span className="text-sm font-medium text-white">
                            {(data.prediction.heart_disease_probability * 100).toFixed(1)}%
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Risk Level:</span>
                          <Badge
                            variant="outline"
                            className={`text-sm font-medium ${getRiskColor(data.prediction.risk_level)}`}
                          >
                            {data.prediction.risk_level}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Risk Category:</span>
                          <Badge
                            variant="outline"
                            className={`text-sm font-medium ${getRiskColor(data.prediction.risk_category)}`}
                          >
                            {data.prediction.risk_category}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Report Date:</span>
                          <span className="text-sm font-medium text-white">{getFormattedDate(data.report_date)}</span>
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
                          <span className="text-sm font-medium text-gray-400">Uncertainty Percent:</span>
                          <span className="text-sm font-medium text-white">
                            {data.uncertainty.uncertainty_percent}%
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Reliability Percent:</span>
                          <span className="text-sm font-medium text-white">
                            {data.uncertainty.reliability_percent}%
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-400">Assessment:</span>
                          <span className="text-sm font-medium text-white">{data.uncertainty.assessment}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>



              </div>
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
                    {data.clinical_insights.key_insights.map((insight: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 bg-blue-900/20 rounded-md border border-blue-900/50"
                      >
                        <p className="text-gray-300">{insight}</p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>


            {/* Abnormal Features Tab */}
            <TabsContent value="abnormal_features" className="space-y-6 mt-0">
              {Object.entries(data.abnormal_features).map(([key, feature]: any) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-blue-900/20 rounded-md border border-blue-900/50"
                >
                  <h4 className="font-medium text-blue-400 mb-2">{feature.feature_name}</h4>
                  <p className="text-gray-300">Value: {feature.readable_value}</p>
                  <p className="text-gray-300">Z-Score: {feature.z_score.toFixed(2)}</p>
                  <p className="text-gray-300">Severity: <span className={getSeverityColor(feature.severity)}>{feature.severity}</span></p>
                  <p className="text-gray-300">Clinical Context: {feature.clinical_context}</p>
                </motion.div>
              ))}
            </TabsContent>

            {/* Key Contributors Tab */}
            <TabsContent value="key_contributors" className="space-y-6 mt-0">
              {Object.entries(data.key_contributors).map(([key, contributor]: any) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-purple-900/20 rounded-md border border-purple-900/50"
                >
                  <h4 className="font-medium text-purple-400 mb-2">{contributor.feature_name}</h4>
                  <p className="text-gray-300">Value: {contributor.value}</p>
                  <p className="text-gray-300">Importance: {contributor.importance.toFixed(3)}</p>
                  <p className="text-gray-300">Contribution: {contributor.contribution.toFixed(3)}</p>
                </motion.div>
              ))}
            </TabsContent>

            {/* Visualization Tab */}
            <TabsContent value="visualization" className="space-y-6 mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <img
                  src={data.visualization}
                  alt="Visualization"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}