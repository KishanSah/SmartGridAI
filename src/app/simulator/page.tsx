"use client";

import { useState, useEffect, JSX } from "react";
import { Battery, Sun, Wind, Zap, Power, Activity } from "lucide-react";
import AOS from "aos";

interface PowerSource {
  id: string;
  name: string;
  capacity: number;
  current: number;
  icon: JSX.Element;
  color: string;
}

export default function Simulator() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [mainGridActive, setMainGridActive] = useState(true);
  const [totalDemand] = useState(1000); // Example: 1000 MW demand

  const [powerSources, setPowerSources] = useState<PowerSource[]>([
    {
      id: "ercot",
      name: "ERCOT Grid",
      capacity: 1200,
      current: 1000,
      icon: <Zap className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      id: "solar",
      name: "Solar Array",
      capacity: 400,
      current: 300,
      icon: <Sun className="w-8 h-8" />,
      color: "bg-yellow-500",
    },
    {
      id: "wind",
      name: "Wind Farm",
      capacity: 300,
      current: 200,
      icon: <Wind className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      id: "battery",
      name: "Battery Storage",
      capacity: 200,
      current: 150,
      icon: <Battery className="w-8 h-8" />,
      color: "bg-purple-500",
    },
    {
      id: "generator",
      name: "Backup Generator",
      capacity: 150,
      current: 100,
      icon: <Power className="w-8 h-8" />,
      color: "bg-red-500",
    },
  ]);

  const calculateAvailablePower = () => {
    return powerSources.reduce((total, source) => {
      if (source.id === "ercot" && !mainGridActive) return total;
      return total + source.current;
    }, 0);
  };

  const toggleMainGrid = () => {
    setMainGridActive(!mainGridActive);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">
          Power Grid Simulator
        </h1>

        {/* Main Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold mb-2">Main Grid Status</h2>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${mainGridActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{mainGridActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
            <button
              onClick={toggleMainGrid}
              className={`px-6 py-3 rounded-lg text-white transition-all ${
                mainGridActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {mainGridActive ? 'Simulate Grid Failure' : 'Restore Main Grid'}
            </button>
          </div>
        </div>

        {/* Power Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-right">
            <h3 className="text-xl font-semibold mb-4">Power Demand</h3>
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-3xl font-bold">{totalDemand} MW</p>
                <p className="text-gray-600">Current Demand</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-left">
            <h3 className="text-xl font-semibold mb-4">Available Power</h3>
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-3xl font-bold">{calculateAvailablePower()} MW</p>
                <p className="text-gray-600">Total Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Power Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {powerSources.map((source, index) => (
            <div
              key={source.id}
              className={`bg-white rounded-xl shadow-lg p-6 ${
                source.id === 'ercot' && !mainGridActive ? 'opacity-50' : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${source.color} text-white mr-3`}>
                  {source.icon}
                </div>
                <h3 className="text-xl font-semibold">{source.name}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Current Output</p>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 ${source.color} rounded-full transition-all`}
                      style={{
                        width: `${(source.current / source.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {source.current} MW / {source.capacity} MW
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}