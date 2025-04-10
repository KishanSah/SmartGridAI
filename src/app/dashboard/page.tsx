"use client";

import { useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Battery, Sun, Wind } from "lucide-react";
import AOS from "aos";

const powerData = [
  { name: "00:00", solar: 0, wind: 150, battery: 200 },
  { name: "04:00", solar: 0, wind: 180, battery: 180 },
  { name: "08:00", solar: 300, wind: 200, battery: 150 },
  { name: "12:00", solar: 400, wind: 180, battery: 120 },
  { name: "16:00", solar: 200, wind: 220, battery: 160 },
  { name: "20:00", solar: 0, wind: 190, battery: 190 },
];

const sourceDistribution = [
  { name: "Solar", value: 35 },
  { name: "Wind", value: 40 },
  { name: "Battery", value: 25 },
];

const COLORS = ["#FCD34D", "#60A5FA", "#A78BFA"];

export default function Dashboard() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Power Grid Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Power Generation Over Time */}
        <div className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Power Generation Over Time</h2>
          <LineChart width={600} height={300} data={powerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="solar" stroke="#FCD34D" />
            <Line type="monotone" dataKey="wind" stroke="#60A5FA" />
            <Line type="monotone" dataKey="battery" stroke="#A78BFA" />
          </LineChart>
        </div>

        {/* Source Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Power Source Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={sourceDistribution}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {sourceDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Power Source Stats */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Current Power Source Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
              <Sun className="w-12 h-12 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Solar Power</h3>
                <p className="text-2xl font-bold">400 MW</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <Wind className="w-12 h-12 text-blue-500" />
              <div>
                <h3 className="font-semibold">Wind Power</h3>
                <p className="text-2xl font-bold">220 MW</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
              <Battery className="w-12 h-12 text-purple-500" />
              <div>
                <h3 className="font-semibold">Battery Storage</h3>
                <p className="text-2xl font-bold">160 MW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}