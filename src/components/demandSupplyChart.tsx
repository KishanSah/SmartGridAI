'use client';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

type DataPoint = {
  Timestamp: string;
  Demand: number;
  Supply: number;
  Available_Capacity: number;
};

type Props = {
  data: DataPoint[];
};

export default function DemandSupplyChart({ data }: Props) {
    const processedData = data.map(d => ({
    time: d.Timestamp,
    demand: d.Demand,
    supply: d.Supply,
    availableCapacity: Math.max(0, d.Available_Capacity), // Clamp negatives to 0
    }));
  return (
    <div className="w-full h-[500px] p-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={processedData}>
          <defs>
            <linearGradient id="demand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4136" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FF4136" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="supply" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2ECC40" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2ECC40" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="available" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0074D9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0074D9" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Area type="monotone" dataKey="demand" stroke="#FF4136" fill="url(#demand)" />
          <Area type="monotone" dataKey="supply" stroke="#2ECC40" fill="url(#supply)" />
          <Area type="monotone" dataKey="availableCapacity" stroke="#0074D9" fill="url(#available)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}