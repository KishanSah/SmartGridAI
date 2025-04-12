"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Energy source data
const energySources = [
  {
    name: "Solar",
    icon: "☀️",
    color: "bg-amber-500",
    currentGeneration: 0,
    currentPercentage: 0.0,
    monthlyCapacity: 29491,
    iconBgColor: "bg-amber-100",
  },
  {
    name: "Wind",
    icon: "💨",
    color: "bg-sky-500",
    currentGeneration: 10300,
    currentPercentage: 25.7,
    monthlyCapacity: 39788,
    iconBgColor: "bg-sky-100",
  },
  {
    name: "Hydro",
    icon: "💧",
    color: "bg-cyan-500",
    currentGeneration: 0,
    currentPercentage: 0.0,
    monthlyCapacity: 575,
    iconBgColor: "bg-cyan-100",
  },
  {
    name: "Power Storage",
    icon: "🔋",
    color: "bg-red-700",
    currentGeneration: 247,
    currentPercentage: 0.6,
    monthlyCapacity: 11085,
    iconBgColor: "bg-red-100",
  },
  {
    name: "Other",
    icon: "⚙️",
    color: "bg-gray-500",
    currentGeneration: 0,
    currentPercentage: 0.0,
    monthlyCapacity: 172,
    iconBgColor: "bg-gray-100",
  },
  {
    name: "Natural Gas",
    icon: "🔥",
    color: "bg-purple-700",
    currentGeneration: 16603,
    currentPercentage: 41.4,
    monthlyCapacity: 68678,
    iconBgColor: "bg-purple-100",
  },
  {
    name: "Coal and Lignite",
    icon: "⚫",
    color: "bg-slate-800",
    currentGeneration: 7854,
    currentPercentage: 19.6,
    monthlyCapacity: 14713,
    iconBgColor: "bg-slate-200",
  },
  {
    name: "Nuclear",
    icon: "⚛️",
    color: "bg-yellow-400",
    currentGeneration: 5064,
    currentPercentage: 12.6,
    monthlyCapacity: 5268,
    iconBgColor: "bg-yellow-100",
  },
]

// Calculate total current generation
const totalCurrentGeneration = energySources.reduce((total, source) => total + source.currentGeneration, 0)

export default function FuelMixChart() {
  const [activeTab, setActiveTab] = useState<"real-time" | "previous" | "current">("real-time")
  const currentDate = new Date("2025-04-10T03:21:00")

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Fuel Mix</CardTitle>
        <ArrowUpRight className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <div className="px-6 text-sm text-gray-600">
        Last Updated:{" "}
        {currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}{" "}
        {currentDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        })}
      </div>
      <CardContent className="pt-4">
        <div className="flex">
          {/* Left side - Vertical bar chart */}
          <div className="relative w-12 h-80 mr-4 rounded-md overflow-hidden border border-gray-200">
            {energySources.map((source, index) => {
              // Skip sources with 0% for the visual bar
              if (source.currentPercentage === 0) return null

              // Calculate height based on percentage
              const height = `${source.currentPercentage}%`

              return (
                <div
                  key={source.name}
                  className={`absolute w-full ${source.color}`}
                  style={{
                    height,
                    bottom: `${energySources.slice(index + 1).reduce((acc, curr) => acc + curr.currentPercentage, 0)}%`,
                  }}
                  title={`${source.name}: ${source.currentPercentage}%`}
                />
              )
            })}
          </div>

          {/* Right side - Energy source details */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-x-4 mb-4">
              <div className="text-center font-semibold text-gray-800">
                CURRENT
                <br />
                GENERATION
              </div>
              <div className="text-center font-semibold text-gray-800">
                MONTHLY
                <br />
                CAPACITY
              </div>
            </div>

            <div className="space-y-3">
              {energySources.map((source) => (
                <div key={source.name} className="flex items-center">
                  <div className="w-full grid grid-cols-[auto_1fr_1fr] gap-2 items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${source.iconBgColor}`}>
                      <span className="text-lg">{source.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-sm text-gray-600">
                        {source.currentGeneration.toLocaleString()} MW ({source.currentPercentage}%)
                      </div>
                    </div>
                    <div className="text-right text-sm font-medium">{source.monthlyCapacity.toLocaleString()} MW</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation tabs */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 text-sm">
              <button
                className={`${activeTab === "previous" ? "text-blue-500" : "text-gray-400"}`}
                onClick={() => setActiveTab("previous")}
              >
                Previous Day
              </button>
              <span className="mx-1 text-gray-300">|</span>
              <button
                className={`${activeTab === "real-time" ? "text-blue-500 font-medium" : "text-gray-400"}`}
                onClick={() => setActiveTab("real-time")}
              >
                Real-Time
              </button>
              <span className="mx-1 text-gray-300">|</span>
              <button
                className={`${activeTab === "current" ? "text-blue-500" : "text-gray-400"}`}
                onClick={() => setActiveTab("current")}
              >
                Current Day
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}