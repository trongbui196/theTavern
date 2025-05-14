import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const [activeChart, setActiveChart] = useState<'assets' | 'allocation' | 'risk'>('assets');

  const chartData = {
    assets: {
      labels: ['Bitcoin', 'Ethereum', 'Solana', 'USDT', 'Mutual Funds'],
      datasets: [{
        data: [33.8, 23.1, 11.6, 1.4, 30.1],
        backgroundColor: [
          '#F7931A',
          '#627EEA',
          '#00FFA3',
          '#26A17B',
          '#D97706',
        ],
        borderWidth: 0,
      }],
    },
    allocation: {
      labels: ['Crypto', 'Stocks', 'Bonds', 'Cash', 'Real Estate'],
      datasets: [{
        data: [45.0, 25.0, 15.0, 10.0, 5.0],
        backgroundColor: [
          '#D97706',
          '#3B82F6',
          '#A855F7',
          '#22C55E',
          '#94A3B8',
        ],
        borderWidth: 0,
      }],
    },
    risk: {
      labels: ['High Risk', 'Medium Risk', 'Low Risk', 'Very Low Risk'],
      datasets: [{
        data: [40.0, 30.0, 20.0, 10.0],
        backgroundColor: [
          '#EF4444',
          '#F59E0B',
          '#10B981',
          '#3B82F6',
        ],
        borderWidth: 0,
      }],
    },
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#D97706',
          font: {
            family: 'unical',
            size: 15
          },
          padding: 10,
          boxWidth: 15
        }
      },
      tooltip: {
        backgroundColor: '#4B2E2B',
        titleColor: '#D97706',
        bodyColor: '#fff',
        borderColor: '#D97706',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveChart('assets')}
          className={`px-3 py-1 rounded font-medieval ${
            activeChart === 'assets'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#4B2E2B] text-[#D97706] border border-[#D97706]/30'
          }`}
        >
          Assets
        </button>
        <button
          onClick={() => setActiveChart('allocation')}
          className={`px-3 py-1 rounded font-medieval ${
            activeChart === 'allocation'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#4B2E2B] text-[#D97706] border border-[#D97706]/30'
          }`}
        >
          Allocation
        </button>
        <button
          onClick={() => setActiveChart('risk')}
          className={`px-3 py-1 rounded  font-medieval ${
            activeChart === 'risk'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#4B2E2B] text-[#D97706] border border-[#D97706]/30'
          }`}
        >
          Risk Level
        </button>
      </div>
      <div className="flex items-center h-[300px] w-full">
        <Pie data={chartData[activeChart]} options={options} />
      </div>
    </div>
  );
}