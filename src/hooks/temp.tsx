
"use client";

import { useState, useEffect, JSX } from "react";
import { Battery, Sun, Wind, Zap, Power, Activity, Loader2 } from "lucide-react";
import AOS from "aos";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PowerSource {
  id: string;
  name: string;
  capacity: number;
  current: number;
  icon: JSX.Element;
  color: string;
  x?: number;
  y?: number;
}

// CSV data from edge devices
const csvData = `Timestamp,Battery_Active_Power,Battery_Active_Power_Set_Response,PVPCS_Active_Power,GE_Body_Active_Power,GE_Active_Power,GE_Body_Active_Power_Set_Response,FC_Active_Power_FC_END_Set,FC_Active_Power,FC_Active_Power_FC_end_Set_Response,Island_mode_MCCB_Active_Power,MG-LV-MSB_AC_Voltage,Receiving_Point_AC_Voltage,Island_mode_MCCB_AC_Voltage,Island_mode_MCCB_Frequency,MG-LV-MSB_Frequency,Inlet_Temperature_of_Chilled_Water,Outlet_Temperature
2023/04/01 00:00:01,-0.1,0.0,0.0,110.0,87.0,122.0,40.0,38.0,40.0,-123.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
2023/04/01 00:00:11,-0.3,0.0,0.0,118.0,120.0,122.0,40.0,38.0,40.0,-87.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
2023/04/01 00:00:21,0.0,0.0,0.0,116.0,124.0,122.0,40.0,38.0,40.0,-116.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
2023/04/01 00:00:31,-0.1,0.0,0.0,110.0,94.300003,122.0,40.0,38.0,40.0,-115.0,488.0,486.0,488.0,60.049999,60.049999,15.1,15.5
2023/04/01 00:00:41,0.0,0.0,0.0,116.0,116.0,122.0,40.0,38.0,40.0,-128.0,488.0,486.0,488.0,60.049999,60.049999,15.1,15.5
2023/04/01 00:00:51,0.0,0.0,0.0,115.0,109.800003,122.0,40.0,38.0,40.0,-109.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
2023/04/01 00:01:01,0.0,0.0,0.0,114.0,96.0,122.0,40.0,38.0,40.0,-115.0,488.0,486.0,488.0,60.040001,60.029999,15.1,15.5
2023/04/01 00:01:11,0.1,0.0,0.0,78.0,133.5,122.0,40.0,38.0,40.0,-98.0,487.0,486.0,487.0,60.040001,60.060001,15.1,15.6
2023/04/01 00:01:21,-0.1,0.0,0.0,124.0,121.5,122.0,40.0,38.0,40.0,-125.0,488.0,486.0,488.0,60.049999,60.049999,15.1,15.5
2023/04/01 00:01:31,-0.3,0.0,0.0,113.0,115.5,122.0,40.0,38.0,40.0,-119.0,487.0,485.0,488.0,60.040001,60.029999,15.1,15.5`;




export default function Simulator() {
  const [loading, setLoading] = useState(true);
  const [mainGridActive, setMainGridActive] = useState(true);
  const [totalDemand] = useState(1000); // Example: 1000 MW demand
  const [powerSources, setPowerSources] = useState<PowerSource[]>([]);
  
  // Data visualization controls
  const [flowSpeed, setFlowSpeed] = useState(2); // Default flow speed in seconds
  const [batchSize, setBatchSize] = useState(3); // Default batch size
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState("");
  const [extractedData, setExtractedData] = useState<{ [key: string]: number[] }>({});
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string>("");
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Simulate fetching data from edge devices
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2500));


      const res = await fetch('data.csv'); // adjust the path
        if (!res.ok) throw new Error("Network response was not ok");

        const text = await res.text();
        setCsvData(text);
        setFileError("");
      
      // Parse CSV data
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      
      // Extract timestamps and data points
      const extractedTimestamps: string[] = [];
      const extractedValues: { [key: string]: number[] } = {
        "Battery": [],
        "ERCOT Grid": [],
        "Solar Array": [],
        "Wind Farm": [],
        "Backup Generator": [],
      };
      
      // Process each row of data
      rows.slice(1).forEach(row => {
        const values = row.split(',');
        extractedTimestamps.push(values[0]);
        
        // Map CSV columns to our power sources
        extractedValues["Battery"].push(Math.abs(parseFloat(values[1])) * 100); // Battery_Active_Power
        extractedValues["ERCOT Grid"].push(Math.abs(parseFloat(values[10])) * 5); // Island_mode_MCCB_Active_Power
        extractedValues["Solar Array"].push(parseFloat(values[3]) + 300); // PVPCS_Active_Power (adjusted for visibility)
        extractedValues["Wind Farm"].push(parseFloat(values[4]) + 200); // GE_Active_Power (adjusted for visibility)
        extractedValues["Backup Generator"].push(parseFloat(values[8]) * 3); // FC_Active_Power (adjusted for multiplier)
      });
      
      setTimestamps(extractedTimestamps);
      setExtractedData(extractedValues);
      setCurrentTimestamp(extractedTimestamps[0] || "");
      
      // Create power sources with positions for visualization
      const sourcesData: PowerSource[] = [
        {
          id: "ercot",
          name: "ERCOT Grid",
          capacity: 1200,
          current: Math.abs(parseFloat(rows[1].split(',')[10])) * 5,
          icon: <Zap className="w-8 h-8" />,
          color: "bg-blue-500",
          x: 200,
          y: 150
        },
        {
          id: "solar",
          name: "Solar Array",
          capacity: 400,
          current: parseFloat(rows[1].split(',')[3]) + 300,
          icon: <Sun className="w-8 h-8" />,
          color: "bg-yellow-500",
          x: 600,
          y: 150
        },
        {
          id: "wind",
          name: "Wind Farm",
          capacity: 300,
          current: parseFloat(rows[1].split(',')[4]) + 200,
          icon: <Wind className="w-8 h-8" />,
          color: "bg-green-500",
          x: 600,
          y: 450
        },
        {
          id: "battery",
          name: "Battery",
          capacity: 200,
          current: Math.abs(parseFloat(rows[1].split(',')[1])) * 100,
          icon: <Battery className="w-8 h-8" />,
          color: "bg-purple-500",
          x: 200,
          y: 450
        },
        {
          id: "generator",
          name: "Backup Generator",
          capacity: 150,
          current: parseFloat(rows[1].split(',')[8]) * 3,
          icon: <Power className="w-8 h-8" />,
          color: "bg-red-500",
          x: 400,
          y: 550
        },
      ];
      
      setPowerSources(sourcesData);
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  // Set up the data cycling interval
  useEffect(() => {
    if (!loading && timestamps.length > 0) {
      const interval = setInterval(() => {
        setCurrentDataIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % timestamps.length;
          setCurrentTimestamp(timestamps[newIndex] || "");
          
          // Update current values for each power source
          setPowerSources(prevSources => {
            return prevSources.map(source => ({
              ...source,
              current: extractedData[source.name][newIndex] || source.current
            }));
          });
          
          return newIndex;
        });
      }, flowSpeed * 1000);

      return () => clearInterval(interval);
    }
  }, [loading, flowSpeed, extractedData, timestamps]);

  const calculateAvailablePower = () => {
    return powerSources.reduce((total, source) => {
      if (source.id === "ercot" && !mainGridActive) return total;
      return total + source.current;
    }, 0);
  };

  const toggleMainGrid = () => {
    setMainGridActive(!mainGridActive);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Getting Data from Edge Devices</h2>
          <p className="text-gray-600">Please wait while we fetch the latest power grid data...</p>
        </div>
      </div>
    );
  }

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

        {/* Visualization Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="flowSpeed">
                Data Flow Speed (seconds): {flowSpeed.toFixed(1)}
              </Label>
              <Slider
                id="flowSpeed"
                min={0.5}
                max={5}
                step={0.1}
                value={[flowSpeed]}
                onValueChange={(value) => setFlowSpeed(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="batchSize">
                Data Batch Size: {batchSize}
              </Label>
              <Slider
                id="batchSize"
                min={1}
                max={10}
                step={1}
                value={[batchSize]}
                onValueChange={(value) => setBatchSize(value[0])}
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">Current Timestamp: {currentTimestamp}</p>
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
                <p className="text-3xl font-bold">{calculateAvailablePower().toFixed(1)} MW</p>
                <p className="text-gray-600">Total Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Power Grid Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h3 className="text-xl font-semibold mb-4 text-center">Power Grid Visualization</h3>
          <svg
            viewBox="0 0 800 600"
            className="w-full h-auto border border-gray-200 rounded-lg"
          >
            {/* Central AI Hub */}
            <circle cx="400" cy="300" r="50" fill="#4CAF50" />
            <text
              x="400"
              y="300"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              dy=".3em"
            >
              AI Hub
            </text>

            {/* Power Sources and Connections */}
            {powerSources.map((source, index) => (
              source.x && source.y ? (
                <g key={source.id}>
                  <circle
                    cx={source.x}
                    cy={source.y}
                    r="30"
                    fill={source.color.replace('bg-', 'fill-').replace('500', '500')}
                  />
                  <foreignObject
                    x={source.x - 15}
                    y={source.y - 15}
                    width="30"
                    height="30"
                    className="text-white"
                  >
                    <div className="flex items-center justify-center h-full">
                      {source.icon}
                    </div>
                  </foreignObject>
                  <text
                    x={source.x}
                    y={source.y + 50}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="14"
                  >
                    {source.name}
                  </text>
                  <text
                    x={source.x}
                    y={source.y + 70}
                    textAnchor="middle"
                    fill="#555"
                    fontSize="12"
                  >
                    {source.current.toFixed(1)} MW
                  </text>
                  
                  {/* Connection lines */}
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2="400"
                    y2="300"
                    stroke={source.id === "ercot" && !mainGridActive ? "#ccc" : "#90A4AE"}
                    strokeWidth="2"
                  />
                  
                  {/* Animated data packets */}
                  {source.id !== "ercot" || mainGridActive ? Array.from({ length: batchSize }).map((_, i) => (
                    <motion.g
                      key={`${source.id}-${i}`}
                      initial={{ x: 0, y: 0 }}
                      animate={{
                        x: [0, 400 - source.x!],
                        y: [0, 300 - source.y!],
                      }}
                      transition={{
                        duration: flowSpeed,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: (i / batchSize) * flowSpeed,
                      }}
                    >
                      <motion.circle 
                        cx={source.x} 
                        cy={source.y} 
                        r="8" 
                        fill={source.color.replace('bg-', 'fill-').replace('500', '500')} 
                      />
                      <motion.text
                        x={source.x}
                        y={source.y}
                        fill="white"
                        fontSize="10"
                        textAnchor="middle"
                        dy=".3em"
                      >
                        {(source.current / batchSize).toFixed(0)}
                      </motion.text>
                    </motion.g>
                  )) : null}
                </g>
              ) : null
            ))}
          </svg>
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
                    {source.current.toFixed(1)} MW / {source.capacity} MW
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