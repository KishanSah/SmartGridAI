// 'use client';
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
// } from 'recharts';

// type DataPoint = {
//     Timestamp: string;
//     totalSolarEnergyGeneration: number;
//     totalWindEnergyGeneration: number;
//     totalBatteryEnergyGeneration: number;
//     totalGasEnergyGeneration: number;
//     otherEnergyGeneration: number;
//   };
  
//   type Props = {
//     data: DataPoint[];
//   };


// const getTotals = (data: DataPoint[]) => {
//   return data.reduce(
//     (totals, item) => {
//       totals.totalSolarEnergyGeneration += item.totalSolarEnergyGeneration;
//       totals.totalWindEnergyGeneration += item.totalWindEnergyGeneration;
//       totals.totalBatteryEnergyGeneration += item.totalBatteryEnergyGeneration;
//       totals.totalGasEnergyGeneration += item.totalGasEnergyGeneration;
//       totals.otherEnergyGeneration += item.otherEnergyGeneration;
//       return totals;
//     },
//     { totalSolarEnergyGeneration: 0, totalWindEnergyGeneration: 0, totalBatteryEnergyGeneration: 0, totalGasEnergyGeneration: 0, otherEnergyGeneration: 0 }
//   );
// };

// const Card = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
//   <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
//     <div className="text-blue-600 text-3xl">{icon}</div>
//     <div>
//       <h4 className="text-gray-600 text-sm">{title}</h4>
//       <p className="text-xl font-semibold">{value} MWh</p>
//     </div>
//   </div>
// );

// export default function EnergyGenerationCards({ data }: Props) {
//   const totals = getTotals(data);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       <Card title="Solar Energy" value={totals.totalSolarEnergyGeneration.toString()} icon="☀️" />
//       <Card title="Wind Energy" value={totals.totalWindEnergyGeneration.toString()} icon="🌬️" />
//       <Card title="Battery Energy" value={totals.totalBatteryEnergyGeneration.toString()} icon="🔋" />
//       <Card title="Gas Energy" value={totals.totalGasEnergyGeneration.toString()} icon="🔥" />
//       <Card title="Other Energy" value={totals.otherEnergyGeneration.toString()} icon="⚡" />
//     </div>
//   );
// }

'use client';

import React from 'react';

type DataPoint = {
  Timestamp: string;
  totalSolarEnergyGeneration: number;
  totalWindEnergyGeneration: number;
  totalBatteryEnergyGeneration: number;
  totalGasEnergyGeneration: number;
  otherEnergyGeneration: number;
};

type Props = {
  data: DataPoint[];
};

const getTotals = (data: DataPoint[]) => {
  return data.reduce(
    (totals, item) => {
      totals.totalSolarEnergyGeneration += item.totalSolarEnergyGeneration;
      totals.totalWindEnergyGeneration += item.totalWindEnergyGeneration;
      totals.totalBatteryEnergyGeneration += item.totalBatteryEnergyGeneration;
      totals.totalGasEnergyGeneration += item.totalGasEnergyGeneration;
      totals.otherEnergyGeneration += item.otherEnergyGeneration;
      return totals;
    },
    {
      totalSolarEnergyGeneration: 0,
      totalWindEnergyGeneration: 0,
      totalBatteryEnergyGeneration: 0,
      totalGasEnergyGeneration: 0,
      otherEnergyGeneration: 0,
    }
  );
};

const Card = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <h4 className="text-gray-600 text-sm">{title}</h4>
      <p className="text-xl font-semibold">{value} MWh</p>
    </div>
  </div>
);

export default function EnergyGenerationCards({ data }: Props) {
  const totals = getTotals(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Solar Energy" value={totals.totalSolarEnergyGeneration.toFixed(2)} icon="☀️" />
      <Card title="Wind Energy" value={totals.totalWindEnergyGeneration.toFixed(2)} icon="🌬️" />
      <Card title="Battery Energy" value={totals.totalBatteryEnergyGeneration.toFixed(2)} icon="🔋" />
      <Card title="Gas Energy" value={totals.totalGasEnergyGeneration.toFixed(2)} icon="🔥" />
      <Card title="Other Energy" value={totals.otherEnergyGeneration.toFixed(2)} icon="⚡" />
    </div>
  );
}
