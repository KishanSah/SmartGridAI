"use client";

import { useEffect } from "react";
import { Tooltip, Legend,PieChart,Pie,Cell } from "recharts";
import { Battery, Sun, Wind } from "lucide-react";
import AOS from "aos";
import EnergyChart from "../../components/demandSupplyChart";
import data from './demand-supply.json';
import EnergyGenerationCards from '../../components/totalEnergyGenerationChart';
import PowerGenerationOverTimeChart from "../../components/powerGenerationOverTimeChart";
import FuelMixChart from "@/components/fuel-mix-chart";

let totalSolar = 0, totalGas = 0, totalBattery = 0, totalOther = 0;

  data.forEach((item) => {
    totalSolar += item.totalSolarEnergyGeneration;
    totalGas += item.totalGasEnergyGeneration;
    totalBattery += item.totalBatteryEnergyGeneration;
    totalOther += item.totalOtherEnergyGeneration;
  });

  const totalAll = totalSolar + totalGas + totalBattery + totalOther;

  // Step 2: Calculate percentages
  const chartData = [
    { name: 'Solar', value: Math.round((totalSolar / totalAll) * 100) },
    { name: 'Gas', value: Math.round((totalGas / totalAll) * 100) },
    { name: 'Battery', value: Math.round((totalBattery / totalAll) * 100) },
    { name: 'Other', value: Math.round((totalOther / totalAll) * 100) },
  ];

const transformedData = data.map((item) => ({
  ...item,  
  otherEnergyGeneration: item.totalOtherEnergyGeneration,
}));
const COLORS = ['#FFD700', '#FF6347', '#00BFFF', '#9370DB'];

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
        <div className="bg-white p-3 rounded-xl shadow-lg" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Demand and Supply Chart</h2>
          <EnergyChart data={data}/>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Power Generation Over Time</h2>
          <PowerGenerationOverTimeChart data = {data}/>
        </div>

        {/* Source Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Grid Energy Stats</h2>
          <EnergyGenerationCards data={transformedData}/>
        </div>
        {/* Source Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Power Source Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Power Source Stats */}
        {/* <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2" data-aos="fade-up">
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
        </div> */}
      </div>
    </div>
  );
}