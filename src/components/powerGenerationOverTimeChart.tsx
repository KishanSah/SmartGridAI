'use client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

type DataPoint = {
  Timestamp: string;
  totalSolarEnergyGeneration: number;
  totalWindEnergyGeneration: number;
  totalBatteryEnergyGeneration: number;
  totalGasEnergyGeneration: number;
  totalOtherEnergyGeneration: number;
};

type Props = {
  data: DataPoint[];
};

export default function PowerSourceDistributionChart({ data }: Props) {
    const powerChartData = data.map((item) => {
        const date = new Date(item.Timestamp);
        return {
          name: item.Timestamp,
          solar: item.totalSolarEnergyGeneration  || 0,
          wind: item.totalWindEnergyGeneration || 0,
          battery: item.totalBatteryEnergyGeneration || 0,
          gas: item.totalGasEnergyGeneration || 0,
          other: item.totalOtherEnergyGeneration || 0,
        };
      });
  return (
    <div className="w-full h-[500px] p-6">
      <LineChart width={600} height={300} data={powerChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="solar" stroke="#FCD34D" />
            <Line type="monotone" dataKey="wind" stroke="#60A5FA" />
            <Line type="monotone" dataKey="battery" stroke="#A78BFA" />
            <Line type="monotone" dataKey="gas" stroke="#F87171" />
            <Line type="monotone" dataKey="other" stroke="#34D399" />
        </LineChart>
    </div>
  );
}