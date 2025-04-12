// "use client";

// import { useState, useEffect, JSX } from "react";
// import { Battery, Sun, Wind, Zap, Power, Activity } from "lucide-react";
// import AOS from "aos";

// interface PowerSource {
//   id: string;
//   name: string;
//   capacity: number;
//   current: number;
//   icon: JSX.Element;
//   color: string;
// }

// export default function Simulator() {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

//   const [mainGridActive, setMainGridActive] = useState(true);
//   const [totalDemand] = useState(1000); // Example: 1000 MW demand

//   const [powerSources, setPowerSources] = useState<PowerSource[]>([
//     {
//       id: "ercot",
//       name: "ERCOT Grid",
//       capacity: 1200,
//       current: 1000,
//       icon: <Zap className="w-8 h-8" />,
//       color: "bg-blue-500",
//     },
//     {
//       id: "solar",
//       name: "Solar Array",
//       capacity: 400,
//       current: 300,
//       icon: <Sun className="w-8 h-8" />,
//       color: "bg-yellow-500",
//     },
//     {
//       id: "wind",
//       name: "Wind Farm",
//       capacity: 300,
//       current: 200,
//       icon: <Wind className="w-8 h-8" />,
//       color: "bg-green-500",
//     },
//     {
//       id: "battery",
//       name: "Battery Storage",
//       capacity: 200,
//       current: 150,
//       icon: <Battery className="w-8 h-8" />,
//       color: "bg-purple-500",
//     },
//     {
//       id: "generator",
//       name: "Backup Generator",
//       capacity: 150,
//       current: 100,
//       icon: <Power className="w-8 h-8" />,
//       color: "bg-red-500",
//     },
//   ]);

//   const calculateAvailablePower = () => {
//     return powerSources.reduce((total, source) => {
//       if (source.id === "ercot" && !mainGridActive) return total;
//       return total + source.current;
//     }, 0);
//   };

//   const toggleMainGrid = () => {
//     setMainGridActive(!mainGridActive);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">
//           Power Grid Simulator
//         </h1>

//         {/* Main Controls */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-4 md:mb-0">
//               <h2 className="text-2xl font-semibold mb-2">Main Grid Status</h2>
//               <div className="flex items-center">
//                 <div className={`w-4 h-4 rounded-full mr-2 ${mainGridActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                 <span>{mainGridActive ? 'Active' : 'Inactive'}</span>
//               </div>
//             </div>
//             <button
//               onClick={toggleMainGrid}
//               className={`px-6 py-3 rounded-lg text-white transition-all ${
//                 mainGridActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
//               }`}
//             >
//               {mainGridActive ? 'Simulate Grid Failure' : 'Restore Main Grid'}
//             </button>
//           </div>
//         </div>

//         {/* Power Status Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-right">
//             <h3 className="text-xl font-semibold mb-4">Power Demand</h3>
//             <div className="flex items-center">
//               <Activity className="w-8 h-8 text-blue-500 mr-3" />
//               <div>
//                 <p className="text-3xl font-bold">{totalDemand} MW</p>
//                 <p className="text-gray-600">Current Demand</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-left">
//             <h3 className="text-xl font-semibold mb-4">Available Power</h3>
//             <div className="flex items-center">
//               <Zap className="w-8 h-8 text-green-500 mr-3" />
//               <div>
//                 <p className="text-3xl font-bold">{calculateAvailablePower()} MW</p>
//                 <p className="text-gray-600">Total Available</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Power Sources Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {powerSources.map((source, index) => (
//             <div
//               key={source.id}
//               className={`bg-white rounded-xl shadow-lg p-6 ${
//                 source.id === 'ercot' && !mainGridActive ? 'opacity-50' : ''
//               }`}
//               data-aos="fade-up"
//               data-aos-delay={index * 100}
//             >
//               <div className="flex items-center mb-4">
//                 <div className={`p-3 rounded-lg ${source.color} text-white mr-3`}>
//                   {source.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold">{source.name}</h3>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-gray-600 mb-1">Current Output</p>
//                   <div className="h-2 bg-gray-200 rounded-full">
//                     <div
//                       className={`h-2 ${source.color} rounded-full transition-all`}
//                       style={{
//                         width: `${(source.current / source.capacity) * 100}%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {source.current} MW / {source.capacity} MW
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, JSX } from "react";
// import { Battery, Sun, Wind, Zap, Power, Activity, Loader2 } from "lucide-react";
// import AOS from "aos";

// interface PowerSource {
//   id: string;
//   name: string;
//   capacity: number;
//   current: number;
//   icon: JSX.Element;
//   color: string;
// }

// // Sample CSV data that would come from edge devices
// const csvData = `id,name,capacity,current
// ercot,ERCOT Grid,1200,1000
// solar,Solar Array,400,300
// wind,Wind Farm,300,200
// battery,Battery Storage,200,150
// generator,Backup Generator,150,100`;

// export default function Simulator() {
//   const [loading, setLoading] = useState(true);
//   const [mainGridActive, setMainGridActive] = useState(true);
//   const [totalDemand] = useState(1000); // Example: 1000 MW demand
//   const [powerSources, setPowerSources] = useState<PowerSource[]>([]);

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });

//     // Simulate fetching data from edge devices
//     const fetchData = async () => {
//       setLoading(true);
      
//       // Simulate network delay
//       await new Promise(resolve => setTimeout(resolve, 2500));
      
//       // Parse CSV data
//       const rows = csvData.split('\n');
//       const headers = rows[0].split(',');
      
//       const parsedData: PowerSource[] = rows.slice(1).map(row => {
//         const values = row.split(',');
//         const source = {
//           id: values[0],
//           name: values[1],
//           capacity: parseInt(values[2]),
//           current: parseInt(values[3]),
//           icon: getIconForSource(values[0]),
//           color: getColorForSource(values[0])
//         };
//         return source;
//       });
      
//       setPowerSources(parsedData);
//       setLoading(false);
//     };
    
//     fetchData();
//   }, []);

//   const getIconForSource = (id: string): JSX.Element => {
//     switch (id) {
//       case 'ercot':
//         return <Zap className="w-8 h-8" />;
//       case 'solar':
//         return <Sun className="w-8 h-8" />;
//       case 'wind':
//         return <Wind className="w-8 h-8" />;
//       case 'battery':
//         return <Battery className="w-8 h-8" />;
//       case 'generator':
//         return <Power className="w-8 h-8" />;
//       default:
//         return <Zap className="w-8 h-8" />;
//     }
//   };

//   const getColorForSource = (id: string): string => {
//     switch (id) {
//       case 'ercot':
//         return 'bg-blue-500';
//       case 'solar':
//         return 'bg-yellow-500';
//       case 'wind':
//         return 'bg-green-500';
//       case 'battery':
//         return 'bg-purple-500';
//       case 'generator':
//         return 'bg-red-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const calculateAvailablePower = () => {
//     return powerSources.reduce((total, source) => {
//       if (source.id === "ercot" && !mainGridActive) return total;
//       return total + source.current;
//     }, 0);
//   };

//   const toggleMainGrid = () => {
//     setMainGridActive(!mainGridActive);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//           <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
//           <h2 className="text-2xl font-semibold mb-2">Getting Data from Edge Devices</h2>
//           <p className="text-gray-600">Please wait while we fetch the latest power grid data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">
//           Power Grid Simulator
//         </h1>

//         {/* Main Controls */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-4 md:mb-0">
//               <h2 className="text-2xl font-semibold mb-2">Main Grid Status</h2>
//               <div className="flex items-center">
//                 <div className={`w-4 h-4 rounded-full mr-2 ${mainGridActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                 <span>{mainGridActive ? 'Active' : 'Inactive'}</span>
//               </div>
//             </div>
//             <button
//               onClick={toggleMainGrid}
//               className={`px-6 py-3 rounded-lg text-white transition-all ${
//                 mainGridActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
//               }`}
//             >
//               {mainGridActive ? 'Simulate Grid Failure' : 'Restore Main Grid'}
//             </button>
//           </div>
//         </div>

//         {/* Power Status Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-right">
//             <h3 className="text-xl font-semibold mb-4">Power Demand</h3>
//             <div className="flex items-center">
//               <Activity className="w-8 h-8 text-blue-500 mr-3" />
//               <div>
//                 <p className="text-3xl font-bold">{totalDemand} MW</p>
//                 <p className="text-gray-600">Current Demand</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-left">
//             <h3 className="text-xl font-semibold mb-4">Available Power</h3>
//             <div className="flex items-center">
//               <Zap className="w-8 h-8 text-green-500 mr-3" />
//               <div>
//                 <p className="text-3xl font-bold">{calculateAvailablePower()} MW</p>
//                 <p className="text-gray-600">Total Available</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Power Sources Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {powerSources.map((source, index) => (
//             <div
//               key={source.id}
//               className={`bg-white rounded-xl shadow-lg p-6 ${
//                 source.id === 'ercot' && !mainGridActive ? 'opacity-50' : ''
//               }`}
//               data-aos="fade-up"
//               data-aos-delay={index * 100}
//             >
//               <div className="flex items-center mb-4">
//                 <div className={`p-3 rounded-lg ${source.color} text-white mr-3`}>
//                   {source.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold">{source.name}</h3>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-gray-600 mb-1">Current Output</p>
//                   <div className="h-2 bg-gray-200 rounded-full">
//                     <div
//                       className={`h-2 ${source.color} rounded-full transition-all`}
//                       style={{
//                         width: `${(source.current / source.capacity) * 100}%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {source.current} MW / {source.capacity} MW
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, JSX } from "react";
// import { Battery, Sun, Wind, Zap, Power, Activity, Loader2 } from "lucide-react";
// import AOS from "aos";
// import { motion } from "framer-motion";
// import { Slider } from "@/components/ui/slider";
// import { Label } from "@/components/ui/label";

// interface PowerSource {
//   id: string;
//   name: string;
//   capacity: number;
//   current: number;
//   icon: JSX.Element;
//   color: string;
//   x?: number;
//   y?: number;
// }

// // CSV data from edge devices
// const csvData = `Timestamp,Battery_Active_Power,Battery_Active_Power_Set_Response,PVPCS_Active_Power,GE_Body_Active_Power,GE_Active_Power,GE_Body_Active_Power_Set_Response,FC_Active_Power_FC_END_Set,FC_Active_Power,FC_Active_Power_FC_end_Set_Response,Island_mode_MCCB_Active_Power,MG-LV-MSB_AC_Voltage,Receiving_Point_AC_Voltage,Island_mode_MCCB_AC_Voltage,Island_mode_MCCB_Frequency,MG-LV-MSB_Frequency,Inlet_Temperature_of_Chilled_Water,Outlet_Temperature
// 2023/04/01 00:00:01,-0.1,0.0,0.0,110.0,87.0,122.0,40.0,38.0,40.0,-123.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
// 2023/04/01 00:00:11,-0.3,0.0,0.0,118.0,120.0,122.0,40.0,38.0,40.0,-87.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
// 2023/04/01 00:00:21,0.0,0.0,0.0,116.0,124.0,122.0,40.0,38.0,40.0,-116.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
// 2023/04/01 00:00:31,-0.1,0.0,0.0,110.0,94.300003,122.0,40.0,38.0,40.0,-115.0,488.0,486.0,488.0,60.049999,60.049999,15.1,15.5
// 2023/04/01 00:00:41,0.0,0.0,0.0,116.0,116.0,122.0,40.0,38.0,40.0,-128.0,488.0,486.0,488.0,60.049999,60.049999,15.1,15.5
// 2023/04/01 00:00:51,0.0,0.0,0.0,115.0,109.800003,122.0,40.0,38.0,40.0,-109.0,488.0,486.0,488.0,60.040001,60.040001,15.1,15.5
// 2023/04/01 00:01:01,0.0,0.0,0.0,114.0,96.0,122.0,40.0,38.0,40.0,-115.0,488.0,486.0,488.0,60.040001,60.029999,15.1,15.5
// 2023/04/01 00:01:11,0.1,0.0,0.0,78.0,133.5,122.0,40.0,38.0,40.0,-98.0,487.0,486.0,487.0,60.040001,60.060001,15.1,15.6
// 2023/04/01 00:01:21,-0.1,0.0,0.0,124.0,121.5,122.0,40.0,38.0,40.0,-125.0,488.0,486.0,488.0,60.049999,60.049999,15.1,15.5
// 2023/04/01 00:01:31,-0.3,0.0,0.0,113.0,115.5,122.0,40.0,38.0,40.0,-119.0,487.0,485.0,488.0,60.040001,60.029999,15.1,15.5`;




// export default function Simulator() {
//   const [loading, setLoading] = useState(true);
//   const [mainGridActive, setMainGridActive] = useState(true);
//   const [totalDemand] = useState(1000); // Example: 1000 MW demand
//   const [powerSources, setPowerSources] = useState<PowerSource[]>([]);
  
//   // Data visualization controls
//   const [flowSpeed, setFlowSpeed] = useState(2); // Default flow speed in seconds
//   const [batchSize, setBatchSize] = useState(3); // Default batch size
//   const [currentDataIndex, setCurrentDataIndex] = useState(0);
//   const [currentTimestamp, setCurrentTimestamp] = useState("");
//   const [extractedData, setExtractedData] = useState<{ [key: string]: number[] }>({});
//   const [timestamps, setTimestamps] = useState<string[]>([]);
//   const [csvData, setCsvData] = useState<string | null>(null);
//   const [fileError, setFileError] = useState<string>("");
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });

//     // Simulate fetching data from edge devices
//     const fetchData = async () => {
//       setLoading(true);
      
//       // Simulate network delay
//       await new Promise(resolve => setTimeout(resolve, 2500));


//       const res = await fetch('data.csv'); // adjust the path
//         if (!res.ok) throw new Error("Network response was not ok");

//         const text = await res.text();
//         setCsvData(text);
//         setFileError("");
      
//       // Parse CSV data
//       const rows = text.split('\n');
//       const headers = rows[0].split(',');
      
//       // Extract timestamps and data points
//       const extractedTimestamps: string[] = [];
//       const extractedValues: { [key: string]: number[] } = {
//         "Battery": [],
//         "ERCOT Grid": [],
//         "Solar Array": [],
//         "Wind Farm": [],
//         "Backup Generator": [],
//       };
      
//       // Process each row of data
//       rows.slice(1).forEach(row => {
//         const values = row.split(',');
//         extractedTimestamps.push(values[0]);
        
//         // Map CSV columns to our power sources
//         extractedValues["Battery"].push(Math.abs(parseFloat(values[1])) * 100); // Battery_Active_Power
//         extractedValues["ERCOT Grid"].push(Math.abs(parseFloat(values[10])) * 5); // Island_mode_MCCB_Active_Power
//         extractedValues["Solar Array"].push(parseFloat(values[3]) + 300); // PVPCS_Active_Power (adjusted for visibility)
//         extractedValues["Wind Farm"].push(parseFloat(values[4]) + 200); // GE_Active_Power (adjusted for visibility)
//         extractedValues["Backup Generator"].push(parseFloat(values[8]) * 3); // FC_Active_Power (adjusted for multiplier)
//       });
      
//       setTimestamps(extractedTimestamps);
//       setExtractedData(extractedValues);
//       setCurrentTimestamp(extractedTimestamps[0] || "");
      
//       // Create power sources with positions for visualization
//       const sourcesData: PowerSource[] = [
//         {
//           id: "ercot",
//           name: "ERCOT Grid",
//           capacity: 1200,
//           current: Math.abs(parseFloat(rows[1].split(',')[10])) * 5,
//           icon: <Zap className="w-8 h-8" />,
//           color: "bg-blue-500",
//           x: 200,
//           y: 150
//         },
//         {
//           id: "solar",
//           name: "Solar Array",
//           capacity: 400,
//           current: parseFloat(rows[1].split(',')[3]) + 300,
//           icon: <Sun className="w-8 h-8" />,
//           color: "bg-yellow-500",
//           x: 600,
//           y: 150
//         },
//         {
//           id: "wind",
//           name: "Wind Farm",
//           capacity: 300,
//           current: parseFloat(rows[1].split(',')[4]) + 200,
//           icon: <Wind className="w-8 h-8" />,
//           color: "bg-green-500",
//           x: 600,
//           y: 450
//         },
//         {
//           id: "battery",
//           name: "Battery",
//           capacity: 200,
//           current: Math.abs(parseFloat(rows[1].split(',')[1])) * 100,
//           icon: <Battery className="w-8 h-8" />,
//           color: "bg-purple-500",
//           x: 200,
//           y: 450
//         },
//         {
//           id: "generator",
//           name: "Backup Generator",
//           capacity: 150,
//           current: parseFloat(rows[1].split(',')[8]) * 3,
//           icon: <Power className="w-8 h-8" />,
//           color: "bg-red-500",
//           x: 400,
//           y: 550
//         },
//       ];
      
//       setPowerSources(sourcesData);
//       setLoading(false);
//     };
    
//     fetchData();
//   }, []);
  
//   // Set up the data cycling interval
//   useEffect(() => {
//     if (!loading && timestamps.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentDataIndex((prevIndex) => {
//           const newIndex = (prevIndex + 1) % timestamps.length;
//           setCurrentTimestamp(timestamps[newIndex] || "");
          
//           // Update current values for each power source
//           setPowerSources(prevSources => {
//             return prevSources.map(source => ({
//               ...source,
//               current: extractedData[source.name][newIndex] || source.current
//             }));
//           });
          
//           return newIndex;
//         });
//       }, flowSpeed * 1000);

//       return () => clearInterval(interval);
//     }
//   }, [loading, flowSpeed, extractedData, timestamps]);

//   const calculateAvailablePower = () => {
//     return powerSources.reduce((total, source) => {
//       if (source.id === "ercot" && !mainGridActive) return total;
//       return total + source.current;
//     }, 0);
//   };

//   const toggleMainGrid = () => {
//     setMainGridActive(!mainGridActive);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//           <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
//           <h2 className="text-2xl font-semibold mb-2">Getting Data from Edge Devices</h2>
//           <p className="text-gray-600">Please wait while we fetch the latest power grid data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">
//           Power Grid Simulator
//         </h1>

//         {/* Main Controls */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-4 md:mb-0">
//               <h2 className="text-2xl font-semibold mb-2">Main Grid Status</h2>
//               <div className="flex items-center">
//                 <div className={`w-4 h-4 rounded-full mr-2 ${mainGridActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                 <span>{mainGridActive ? 'Active' : 'Inactive'}</span>
//               </div>
//             </div>
//             <button
//               onClick={toggleMainGrid}
//               className={`px-6 py-3 rounded-lg text-white transition-all ${
//                 mainGridActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
//               }`}
//             >
//               {mainGridActive ? 'Simulate Grid Failure' : 'Restore Main Grid'}
//             </button>
//           </div>
//         </div>

//         {/* Visualization Controls */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="flowSpeed">
//                 Data Flow Speed (seconds): {flowSpeed.toFixed(1)}
//               </Label>
//               <Slider
//                 id="flowSpeed"
//                 min={0.5}
//                 max={5}
//                 step={0.1}
//                 value={[flowSpeed]}
//                 onValueChange={(value) => setFlowSpeed(value[0])}
//               />
//             </div>
//             <div>
//               <Label htmlFor="batchSize">
//                 Data Batch Size: {batchSize}
//               </Label>
//               <Slider
//                 id="batchSize"
//                 min={1}
//                 max={10}
//                 step={1}
//                 value={[batchSize]}
//                 onValueChange={(value) => setBatchSize(value[0])}
//               />
//             </div>
//           </div>
//           <div className="mt-4 text-center">
//             <p className="text-lg font-semibold">Current Timestamp: {currentTimestamp}</p>
//           </div>
//         </div>

//         {/* Power Status Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-right">
//             <h3 className="text-xl font-semibold mb-4">Power Demand</h3>
//             <div className="flex items-center">
//               <Activity className="w-8 h-8 text-blue-500 mr-3" />
//               <div>
//                 <p className="text-3xl font-bold">{totalDemand} MW</p>
//                 <p className="text-gray-600">Current Demand</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-left">
//             <h3 className="text-xl font-semibold mb-4">Available Power</h3>
//             <div className="flex items-center">
//               <Zap className="w-8 h-8 text-green-500 mr-3" />
//               <div>
//                 <p className="text-3xl font-bold">{calculateAvailablePower().toFixed(1)} MW</p>
//                 <p className="text-gray-600">Total Available</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Power Grid Visualization */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
//           <h3 className="text-xl font-semibold mb-4 text-center">Power Grid Visualization</h3>
//           <svg
//             viewBox="0 0 800 600"
//             className="w-full h-auto border border-gray-200 rounded-lg"
//           >
//             {/* Central AI Hub */}
//             <circle cx="400" cy="300" r="50" fill="#4CAF50" />
//             <text
//               x="400"
//               y="300"
//               textAnchor="middle"
//               fill="white"
//               fontSize="20"
//               dy=".3em"
//             >
//               AI Hub
//             </text>

//             {/* Power Sources and Connections */}
//             {powerSources.map((source, index) => (
//               source.x && source.y ? (
//                 <g key={source.id}>
//                   <circle
//                     cx={source.x}
//                     cy={source.y}
//                     r="30"
//                     fill={source.color.replace('bg-', 'fill-').replace('500', '500')}
//                   />
//                   <foreignObject
//                     x={source.x - 15}
//                     y={source.y - 15}
//                     width="30"
//                     height="30"
//                     className="text-white"
//                   >
//                     <div className="flex items-center justify-center h-full">
//                       {source.icon}
//                     </div>
//                   </foreignObject>
//                   <text
//                     x={source.x}
//                     y={source.y + 50}
//                     textAnchor="middle"
//                     fill="#333"
//                     fontSize="14"
//                   >
//                     {source.name}
//                   </text>
//                   <text
//                     x={source.x}
//                     y={source.y + 70}
//                     textAnchor="middle"
//                     fill="#555"
//                     fontSize="12"
//                   >
//                     {source.current.toFixed(1)} MW
//                   </text>
                  
//                   {/* Connection lines */}
//                   <line
//                     x1={source.x}
//                     y1={source.y}
//                     x2="400"
//                     y2="300"
//                     stroke={source.id === "ercot" && !mainGridActive ? "#ccc" : "#90A4AE"}
//                     strokeWidth="2"
//                   />
                  
//                   {/* Animated data packets */}
//                   {source.id !== "ercot" || mainGridActive ? Array.from({ length: batchSize }).map((_, i) => (
//                     <motion.g
//                       key={`${source.id}-${i}`}
//                       initial={{ x: 0, y: 0 }}
//                       animate={{
//                         x: [0, 400 - source.x!],
//                         y: [0, 300 - source.y!],
//                       }}
//                       transition={{
//                         duration: flowSpeed,
//                         repeat: Infinity,
//                         repeatType: "loop",
//                         ease: "linear",
//                         delay: (i / batchSize) * flowSpeed,
//                       }}
//                     >
//                       <motion.circle 
//                         cx={source.x} 
//                         cy={source.y} 
//                         r="8" 
//                         fill={source.color.replace('bg-', 'fill-').replace('500', '500')} 
//                       />
//                       <motion.text
//                         x={source.x}
//                         y={source.y}
//                         fill="white"
//                         fontSize="10"
//                         textAnchor="middle"
//                         dy=".3em"
//                       >
//                         {(source.current / batchSize).toFixed(0)}
//                       </motion.text>
//                     </motion.g>
//                   )) : null}
//                 </g>
//               ) : null
//             ))}
//           </svg>
//         </div>

//         {/* Power Sources Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {powerSources.map((source, index) => (
//             <div
//               key={source.id}
//               className={`bg-white rounded-xl shadow-lg p-6 ${
//                 source.id === 'ercot' && !mainGridActive ? 'opacity-50' : ''
//               }`}
//               data-aos="fade-up"
//               data-aos-delay={index * 100}
//             >
//               <div className="flex items-center mb-4">
//                 <div className={`p-3 rounded-lg ${source.color} text-white mr-3`}>
//                   {source.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold">{source.name}</h3>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-gray-600 mb-1">Current Output</p>
//                   <div className="h-2 bg-gray-200 rounded-full">
//                     <div
//                       className={`h-2 ${source.color} rounded-full transition-all`}
//                       style={{
//                         width: `${(source.current / source.capacity) * 100}%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {source.current.toFixed(1)} MW / {source.capacity} MW
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import type React from "react"

import { useState, useEffect, type JSX, useRef } from "react"
import {
  Battery,
  Sun,
  Wind,
  Zap,
  Power,
  Loader2,
  Upload,
  Home,
  Factory,
  Building,
  Plus,
  Minus,
  AirVent,
} from "lucide-react"
import AOS from "aos"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PowerSource {
  id: string
  name: string
  capacity: number
  current: number
  icon: JSX.Element
  color: string
  x?: number
  y?: number
  controllable?: boolean
  priority?: number // Lower number = higher priority
}

interface ConsumerNode {
  id: string
  name: string
  demand: number
  maxDemand: number
  baselineDemand: number
  icon: JSX.Element
  color: string
  x?: number
  y?: number
}

export default function Simulator() {
  const [loading, setLoading] = useState(false)
  const [mainGridActive, setMainGridActive] = useState(true)
  const [powerSources, setPowerSources] = useState<PowerSource[]>([])
  const [consumers, setConsumers] = useState<ConsumerNode[]>([])
  const [totalAvailablePower, setTotalAvailablePower] = useState(0)
  const [totalDemand, setTotalDemand] = useState(0)
  const [energySurplus, setEnergySurplus] = useState(0)
  const [autoBalance, setAutoBalance] = useState(true)

  // Add this near the top with your other state declarations
  const isBalancing = useRef(false)

  // Data visualization controls
  const [flowSpeed, setFlowSpeed] = useState(2) // Default flow speed in seconds
  const [batchSize, setBatchSize] = useState(3) // Default batch size
  const [currentDataIndex, setCurrentDataIndex] = useState(0)
  const [currentTimestamp, setCurrentTimestamp] = useState("")
  const [extractedData, setExtractedData] = useState<{ [key: string]: number[] }>({})
  const [timestamps, setTimestamps] = useState<string[]>([])

  // File handling
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<string>("")
  const [fileError, setFileError] = useState<string>("")
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)

  // Scenario simulation
  const [scenarioActive, setScenarioActive] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<string>("")

  // Handle file upload


  // Process the CSV data when available
  const processCSVData = () => {
    
    if (!csvData) {
      setFileError("No CSV data to process. Please upload a file first.")
      return
    }

    setLoading(true)
    setFileError("")

    try {
      // Parse CSV data
      const rows = csvData.split("\n")
      if (rows.length < 2) {
        setFileError("CSV file doesn't contain enough data.")
        setLoading(false)
        return
      }

      const headers = rows[0].split(",")

      // Extract timestamps and data points
      const extractedTimestamps: string[] = []
      const extractedValues: { [key: string]: number[] } = {
        Battery: [],
        "ERCOT Grid": [],
        "Solar Array": [],
        "Wind Farm": [],
        "Backup Generator": [],
      }

      // Process each row of data
      rows.slice(1).forEach((row) => {
        if (!row.trim()) return // Skip empty rows

        const values = row.split(",")
        if (values.length < 11) return // Skip malformed rows

        extractedTimestamps.push(values[0])

        // Map CSV columns to our power sources
        extractedValues["Battery"].push(Math.abs(Number.parseFloat(values[1] || "0")) * 100)
        extractedValues["ERCOT Grid"].push(Math.abs(Number.parseFloat(values[10] || "0")) * 5)
        extractedValues["Solar Array"].push(Number.parseFloat(values[3] || "0") + 300)
        extractedValues["Wind Farm"].push(Number.parseFloat(values[4] || "0") + 200)
        extractedValues["Backup Generator"].push(Number.parseFloat(values[8] || "0") * 3)
      })

      if (extractedTimestamps.length === 0) {
        setFileError("No valid data rows found in the CSV file.")
        setLoading(false)
        return
      }

      setTimestamps(extractedTimestamps)
      setExtractedData(extractedValues)
      setCurrentTimestamp(extractedTimestamps[0] || "")

      // Create power sources with positions for visualization
      const sourcesData: PowerSource[] = [
        {
          id: "ercot",
          name: "ERCOT Grid",
          capacity: 1200,
          current: Math.abs(Number.parseFloat(rows[1].split(",")[10] || "0")) * 5,
          icon: <Zap className="w-8 h-8" />,
          color: "bg-blue-500",
          x: 150,
          y: 150,
          controllable: false,
          priority: 5, // Last resort
        },
        {
          id: "solar",
          name: "Solar Array",
          capacity: 400,
          current: Number.parseFloat(rows[1].split(",")[3] || "0") + 300,
          icon: <Sun className="w-8 h-8" />,
          color: "bg-yellow-500",
          x: 600,
          y: 100,
          controllable: false,
          priority: 1, // Highest priority
        },
        {
          id: "wind",
          name: "Wind Farm",
          capacity: 300,
          current: Number.parseFloat(rows[1].split(",")[4] || "0") + 200,
          icon: <Wind className="w-8 h-8" />,
          color: "bg-green-500",
          x: 650,
          y: 250,
          controllable: false,
          priority: 2,
        },
        {
          id: "battery",
          name: "Battery",
          capacity: 200,
          current: Math.abs(Number.parseFloat(rows[1].split(",")[1] || "0")) * 100,
          icon: <Battery className="w-8 h-8" />,
          color: "bg-purple-500",
          x: 150,
          y: 450,
          controllable: true,
          priority: 3,
        },
        {
          id: "generator",
          name: "Backup Generator",
          capacity: 150,
          current: Number.parseFloat(rows[1].split(",")[8] || "0") * 3,
          icon: <Power className="w-8 h-8" />,
          color: "bg-red-500",
          x: 250,
          y: 300,
          controllable: true,
          priority: 4,
        },
      ]

      // Create consumer nodes
      const consumersData: ConsumerNode[] = [
        {
          id: "residential",
          name: "Residential",
          demand: 400,
          maxDemand: 800,
          baselineDemand: 400,
          icon: <Home className="w-8 h-8" />,
          color: "bg-emerald-500",
          x: 500,
          y: 450,
        },
        {
          id: "industrial",
          name: "Industrial",
          demand: 300,
          maxDemand: 600,
          baselineDemand: 300,
          icon: <Factory className="w-8 h-8" />,
          color: "bg-amber-500",
          x: 350,
          y: 500,
        },
        {
          id: "commercial",
          name: "Commercial",
          demand: 200,
          maxDemand: 400,
          baselineDemand: 200,
          icon: <Building className="w-8 h-8" />,
          color: "bg-indigo-500",
          x: 450,
          y: 350,
        },
        {
          id: "datacenter",
          name: "Data Center",
          demand: 100,
          maxDemand: 200,
          baselineDemand: 100,
          icon: <AirVent className="w-8 h-8" />,
          color: "bg-cyan-500",
          x: 690,
          y: 450,
        },
      ]

      setPowerSources(sourcesData)
      setConsumers(consumersData)
      setDataLoaded(true)
      setLoading(false)
    } catch (error) {
      console.error("Error processing CSV:", error)
      setFileError("Error processing the CSV file. Please check the format.")
      setLoading(false)
    }
  }

  // Calculate total available power and demand
  useEffect(() => {
    // Calculate total demand
    const totalConsumerDemand = consumers.reduce((total, consumer) => total + consumer.demand, 0)
    setTotalDemand(totalConsumerDemand)

    // Calculate total available power
    const availablePower = powerSources.reduce((total, source) => {
      if (source.id === "ercot" && !mainGridActive) return total
      return total + source.current
    }, 0)
    setTotalAvailablePower(availablePower)

    // Calculate surplus or deficit
    setEnergySurplus(availablePower - totalConsumerDemand)

    // Balance the grid if auto-balance is enabled
    // Only call balanceGrid if we're not already in the middle of balancing
    if (autoBalance && !isBalancing.current) {
      isBalancing.current = true
      balanceGrid()
      isBalancing.current = false
    }
  }, [powerSources, consumers, mainGridActive, autoBalance])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })

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
          x: 450,
          y: 520
        },
      ];

      // Create consumer nodes
      const consumersData: ConsumerNode[] = [
        {
          id: "residential",
          name: "Residential",
          demand: 400,
          maxDemand: 800,
          baselineDemand: 400,
          icon: <Home className="w-8 h-8" />,
          color: "bg-emerald-500",
          x: 500,
          y: 450,
        },
        {
          id: "industrial",
          name: "Industrial",
          demand: 300,
          maxDemand: 600,
          baselineDemand: 300,
          icon: <Factory className="w-8 h-8" />,
          color: "bg-amber-500",
          x: 350,
          y: 500,
        },
        {
          id: "commercial",
          name: "Commercial",
          demand: 200,
          maxDemand: 400,
          baselineDemand: 200,
          icon: <Building className="w-8 h-8" />,
          color: "bg-indigo-500",
          x: 640,
          y: 350,
        },
        {
          id: "datacenter",
          name: "Data Center",
          demand: 100,
          maxDemand: 200,
          baselineDemand: 100,
          icon: <AirVent className="w-8 h-8" />,
          color: "bg-cyan-500",
          x: 650,
          y: 220,
        },
      ]
      
      setPowerSources(sourcesData);
      setConsumers(consumersData)
      setDataLoaded(true)
      setLoading(false);
    };
    fetchData();
    
  }, [])

  // Set up the data cycling interval
  useEffect(() => {
    if (dataLoaded && timestamps.length > 0) {
      const interval = setInterval(() => {
        setCurrentDataIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % timestamps.length
          setCurrentTimestamp(timestamps[newIndex] || "")

          // Update current values for each power source only if they've changed
          setPowerSources((prevSources) => {
            return prevSources.map((source) => {
              const newValue = extractedData[source.name][newIndex] || source.current
              // Only update if the value has changed significantly
              if (Math.abs(source.current - newValue) > 0.1) {
                return { ...source, current: newValue }
              }
              return source
            })
          })

          return newIndex
        })
      }, flowSpeed * 1000)

      return () => clearInterval(interval)
    }
  }, [dataLoaded, flowSpeed, extractedData, timestamps])

  const toggleMainGrid = () => {
    setMainGridActive(!mainGridActive)
  }

  // Balance energy production based on consumer demand
  const balanceGrid = () => {
    // Only execute if we have sources and consumers
    if (powerSources.length === 0 || consumers.length === 0) return

    const totalConsumerDemand = consumers.reduce((total, consumer) => total + consumer.demand, 0)

    // Make a copy of power sources sorted by priority
    const sortedSources = [...powerSources].sort((a, b) => (a.priority || 999) - (b.priority || 999))

    let remainingDemand = totalConsumerDemand
    let ercotUsage = 0

    // First pass: Use renewable sources to their max capacity
    sortedSources.forEach((source) => {
      if (source.id !== "ercot") {
        const sourceContribution = Math.min(source.current, remainingDemand)
        remainingDemand -= sourceContribution
      }
    })

    // Second pass: If we still have demand, use ERCOT grid
    if (remainingDemand > 0 && mainGridActive) {
      const ercotSource = sortedSources.find((s) => s.id === "ercot")
      if (ercotSource) {
        ercotUsage = Math.min(ercotSource.capacity, remainingDemand)
        remainingDemand -= ercotUsage
      }
    }

    // Only update ERCOT usage if it's different from current value
    const currentErcotSource = powerSources.find((s) => s.id === "ercot")
    if (currentErcotSource && Math.abs(currentErcotSource.current - ercotUsage) > 0.1) {
      setPowerSources((prevSources) =>
        prevSources.map((source) => (source.id === "ercot" ? { ...source, current: ercotUsage } : source)),
      )
    }
  }

  // Simulate sudden demand increase
  const simulateDemandIncrease = () => {
    setScenarioActive(true)
    setCurrentScenario("High Demand")

    // Increase demand for all consumers
    setConsumers((prevConsumers) =>
      prevConsumers.map((consumer) => ({
        ...consumer,
        demand: Math.min(consumer.maxDemand, consumer.demand * 1.5), // 50% increase up to max
      })),
    )
  }

  // Simulate demand decrease
  const simulateDemandDecrease = () => {
    setScenarioActive(true)
    setCurrentScenario("Low Demand")

    // Decrease demand for all consumers
    setConsumers((prevConsumers) =>
      prevConsumers.map((consumer) => ({
        ...consumer,
        demand: Math.max(consumer.baselineDemand * 0.6, consumer.demand * 0.6), // 40% decrease
      })),
    )
  }

  // Reset demand to baseline
  const resetScenario = () => {
    setScenarioActive(false)
    setCurrentScenario("")

    // Reset all consumers to baseline demand
    setConsumers((prevConsumers) =>
      prevConsumers.map((consumer) => ({
        ...consumer,
        demand: consumer.baselineDemand,
      })),
    )
  }

  // Modify specific consumer demand
  const modifyConsumerDemand = (consumerId: string, change: number) => {
    setConsumers((prevConsumers) =>
      prevConsumers.map((consumer) => {
        if (consumer.id === consumerId) {
          const newDemand = Math.max(0, Math.min(consumer.maxDemand, consumer.demand + change))
          return { ...consumer, demand: newDemand }
        }
        return consumer
      }),
    )
  }



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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" data-aos="fade-down">
            Power Grid Simulator
          </h1>
        </div>

        {/* Energy Balance Summary */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Energy Balance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Available Power</h3>
              <p className="text-3xl font-bold text-blue-600">{totalAvailablePower.toFixed(1)} MW</p>
            </div>
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Demand</h3>
              <p className="text-3xl font-bold text-amber-600">{totalDemand.toFixed(1)} MW</p>
            </div>
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Energy Balance</h3>
              <p className={`text-3xl font-bold ${energySurplus >= 0 ? "text-green-600" : "text-red-600"}`}>
                {energySurplus >= 0 ? `+${energySurplus.toFixed(1)}` : energySurplus.toFixed(1)} MW
              </p>
            </div>
          </div>
        </div> */}
               {/* Energy Balance Summary */}
               <div className="bg-white rounded-xl shadow-lg p-4 mb-4" data-aos="fade-up">
          <div className="flex flex-wrap items-center">
            <h2 className="text-lg font-semibold mr-4 w-full sm:w-auto mb-2 sm:mb-0">Energy Balance:</h2>
            <div className="flex flex-wrap gap-4 flex-1">
              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium mr-2">Available:</span>
                <span className="text-lg font-bold text-blue-600">{totalAvailablePower.toFixed(1)} MW</span>
              </div>
              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium mr-2">Demand:</span>
                <span className="text-lg font-bold text-amber-600">{totalDemand.toFixed(1)} MW</span>
              </div>
              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium mr-2">Balance:</span>
                <span className={`text-lg font-bold ${energySurplus >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {energySurplus >= 0 ? `+${energySurplus.toFixed(1)}` : energySurplus.toFixed(1)} MW
                </span>
              </div>
            </div>
          </div>
        </div>

        

        {/* Main Controls and Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Main Grid Controls */}
          <div className="bg-white rounded-xl shadow-lg p-4" data-aos="fade-right">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Main Grid Controls</h2>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-1 ${mainGridActive ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm">{mainGridActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <Button
                onClick={toggleMainGrid}
                size="sm"
                className={`${mainGridActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
              >
                {mainGridActive ? "Simulate Grid Failure" : "Restore Main Grid"}
              </Button>
              <div className="flex items-center">
                <span className="text-sm mr-2">Auto-Balance:</span>
                <button
                  onClick={() => setAutoBalance(!autoBalance)}
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    autoBalance ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {autoBalance ? "Enabled" : "Disabled"}
                </button>
              </div>
            </div>
          </div>

          {/* Demand Scenarios */}
          <div className="bg-white rounded-xl shadow-lg p-4" data-aos="fade-left">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Demand Scenarios</h2>
              {scenarioActive && (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{currentScenario}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={simulateDemandIncrease}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
                disabled={scenarioActive && currentScenario === "High Demand"}
              >
                High Demand
              </Button>
              <Button
                onClick={simulateDemandDecrease}
                size="sm"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={scenarioActive && currentScenario === "Low Demand"}
              >
                Low Demand
              </Button>
              <Button onClick={resetScenario} variant="outline" size="sm" disabled={!scenarioActive}>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Visualization Controls */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="flowSpeed">Data Flow Speed (seconds): {flowSpeed.toFixed(1)}</Label>
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
              <Label htmlFor="batchSize">Data Batch Size: {batchSize}</Label>
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
            <p className="text-sm text-gray-600 mt-1">
              Data points: {timestamps.length} | Current: {currentDataIndex + 1}
            </p>
          </div>
        </div> */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-4" data-aos="fade-up">
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="text-lg font-semibold mb-2 sm:mb-0">Visualization Controls</h2>
            <div className="flex items-center text-sm">
              <span className="mr-2">Timestamp: {currentTimestamp}</span>
              <span className="text-xs text-gray-600">
                ({currentDataIndex + 1}/{timestamps.length})
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-center">
              <Label htmlFor="flowSpeed" className="text-sm w-24">
                Flow Speed:
              </Label>
              <Slider
                id="flowSpeed"
                min={0.5}
                max={5}
                step={0.1}
                value={[flowSpeed]}
                onValueChange={(value) => setFlowSpeed(value[0])}
                className="flex-1 mr-2"
              />
              <span className="text-xs w-10">{flowSpeed.toFixed(1)}s</span>
            </div>
            <div className="flex items-center">
              <Label htmlFor="batchSize" className="text-sm w-24">
                Batch Size:
              </Label>
              <Slider
                id="batchSize"
                min={1}
                max={10}
                step={1}
                value={[batchSize]}
                onValueChange={(value) => setBatchSize(value[0])}
                className="flex-1 mr-2"
              />
              <span className="text-xs w-10">{batchSize}</span>
            </div>
          </div>
        </div>

        {/* Power Grid Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h3 className="text-xl font-semibold mb-4 text-center">Power Grid Visualization</h3>
          <svg viewBox="0 0 800 600" className="w-full h-auto border border-gray-200 rounded-lg">
            {/* Central AI Hub */}
            <circle cx="400" cy="300" r="40" fill="#4CAF50" />
            <text x="400" y="300" textAnchor="middle" fill="white" fontSize="16" dy=".3em">
              Hub
            </text>

            {/* Power Sources and Connections */}
            {powerSources.map((source) =>
              source.x && source.y ? (
                <g key={source.id}>
                  <circle
                    cx={source.x}
                    cy={source.y}
                    r="25"
                    fill={source.color.replace("bg-", "").replace("500", "")}
                    className={source.color}
                    opacity={source.id === "ercot" && !mainGridActive ? 0.5 : 1}
                  />
                  <foreignObject x={source.x - 12} y={source.y - 12} width="24" height="24" className="text-white">
                    <div className="flex items-center justify-center h-full">{source.icon}</div>
                  </foreignObject>
                  <text x={source.x} y={source.y + 40} textAnchor="middle" fill="#333" fontSize="12">
                    {source.name}
                  </text>
                  <text x={source.x} y={source.y + 55} textAnchor="middle" fill="#555" fontSize="10">
                    {source.current.toFixed(1)} MW
                  </text>

                  {/* Connection lines to AI Hub */}
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2="400"
                    y2="300"
                    stroke={source.id === "ercot" && !mainGridActive ? "#ccc" : "#90A4AE"}
                    strokeWidth="2"
                  />

                  {/* Animated data packets to AI Hub */}
                  {(source.id !== "ercot" || mainGridActive || consumers) && source.current > 0
                    ? // Fix: Ensure batchSize is a positive integer
                      Array.from({ length: Math.max(0, Math.floor(batchSize)) }).map((_, i) => (
                        <motion.g
                          key={`${source.id}-to-hub-${i}`}
                          initial={{ x: 0, y: 0 }}
                          animate={{
                            x: [0, 400 - source.x!],
                            y: [0, 300 - source.y!],
                          }}
                          transition={{
                            duration: flowSpeed,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "linear",
                            delay: (i / Math.max(1, batchSize)) * flowSpeed,
                          }}
                        >
                          <motion.circle
                            cx={source.x}
                            cy={source.y}
                            r="7"
                            fill={source.color.replace("bg-", "").replace("500", "")}
                            className={source.color}
                          />
                           <motion.text
                                                  x={source.x}
                                                  y={source.y}
                                                  fill="white"
                                                  fontSize="8"
                                                  textAnchor="middle"
                                                  dy=".3em"
                                                >
                                                  {(source.current / batchSize).toFixed(0)}
                                                </motion.text>
                        </motion.g>
                      ))
                    : null}
                </g>
              ) : null,
            )}

            {/* Consumers and Connections */}
            {consumers.map((consumer) =>
              consumer.x && consumer.y ? (
                <g key={consumer.id}>
                  <circle
                    cx={consumer.x}
                    cy={consumer.y}
                    r="25"
                    fill={consumer.color.replace("bg-", "").replace("500", "")}
                    className={consumer.color}
                  />
                  <foreignObject x={consumer.x - 12} y={consumer.y - 12} width="24" height="24" className="text-white">
                    <div className="flex items-center justify-center h-full">{consumer.icon}</div>
                  </foreignObject>
                  <text x={consumer.x} y={consumer.y + 40} textAnchor="middle" fill="#333" fontSize="12">
                    {consumer.name}
                  </text>
                  <text x={consumer.x} y={consumer.y + 55} textAnchor="middle" fill="#555" fontSize="10">
                    {consumer.demand.toFixed(1)} MW
                  </text>

                  {/* Connection lines to AI Hub */}
                  <line x1={consumer.x} y1={consumer.y} x2="400" y2="300" stroke="#90A4AE" strokeWidth="2" />

                  {/* Animated data packets from AI Hub to consumers */}
                  {/* Fix: Ensure we're creating a valid array length */}
                  {Array.from({
                    length: Math.max(0, Math.floor(batchSize * (consumer.demand / Math.max(1, totalDemand)))),
                  }).map((_, i) => (
                    <motion.g
                      key={`hub-to-${consumer.id}-${i}`}
                      initial={{ x: 0, y: 0 }}
                      animate={{
                        x: [0, consumer.x! - 400],
                        y: [0, consumer.y! - 300],
                      }}
                      transition={{
                        duration: flowSpeed,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "linear",
                        delay: (i / Math.max(1, batchSize)) * flowSpeed,
                      }}
                    >
                      <motion.circle
                        cx={400}
                        cy={300}
                        r="6"
                        fill={consumer.color.replace("bg-", "").replace("500", "")}
                      />
                      
                    </motion.g>
                  ))}
                </g>
              ) : null,
            )}
          </svg>
        </div>

        {/* Power Sources and Consumer Controls */}
        {/* Power Sources and Consumer Controls */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          <Tabs defaultValue="sources" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sources">Power Sources</TabsTrigger>
              <TabsTrigger value="consumers">Energy Consumers</TabsTrigger>
            </TabsList>

            {/* Power Sources Tab */}
            <TabsContent value="sources" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {powerSources.map((source) => (
                  <div
                    key={source.id}
                    className={`bg-white rounded-lg shadow p-3 ${
                      source.id === "ercot" && !mainGridActive ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-lg ${source.color} text-white mr-2`}>{source.icon}</div>
                      <h3 className="text-sm font-semibold">{source.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Output:</span>
                          <span>
                            {source.current.toFixed(1)} / {source.capacity} MW
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full">
                          <div
                            className={`h-1.5 ${source.color} rounded-full transition-all`}
                            style={{
                              width: `${(source.current / source.capacity) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      {source.controllable && (
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs">Adjust:</span>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-0 h-6 w-6"
                              
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-0 h-6 w-6"
                              
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Consumers Tab */}
            <TabsContent value="consumers" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {consumers.map((consumer) => (
                  <div key={consumer.id} className="bg-white rounded-lg shadow p-3">
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-lg ${consumer.color} text-white mr-2`}>{consumer.icon}</div>
                      <h3 className="text-sm font-semibold">{consumer.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Demand:</span>
                          <span>
                            {consumer.demand.toFixed(1)} / {consumer.maxDemand} MW
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full">
                          <div
                            className={`h-1.5 ${consumer.color} rounded-full transition-all`}
                            style={{
                              width: `${(consumer.demand / consumer.maxDemand) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs">Adjust:</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-0 h-6 w-6"
                            onClick={() => modifyConsumerDemand(consumer.id, -25)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-0 h-6 w-6"
                            onClick={() => modifyConsumerDemand(consumer.id, 25)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>


        {/* System Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h3 className="text-xl font-semibold mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Current Status</h4>
              <div
                className={`p-4 rounded-lg ${energySurplus >= 0 ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
              >
                <p className="font-medium">
                  {energySurplus >= 0 ? "System Stable: Sufficient Power Available" : "Warning: Power Deficit"}
                </p>
                <p className="text-sm mt-1">
                  {energySurplus >= 0
                    ? `Surplus: ${energySurplus.toFixed(1)} MW can be stored or sold back to the grid.`
                    : `Deficit: ${Math.abs(energySurplus).toFixed(1)} MW needed. Risk of brownouts.`}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Power Distribution</h4>
              <div className="space-y-2">
                {powerSources.map((source) => (
                  <div key={source.id} className="flex justify-between items-center">
                    <span>{source.name}</span>
                    <span className="font-medium">
                      {totalAvailablePower > 0 ? ((source.current / totalAvailablePower) * 100).toFixed(1) : "0.0"}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
