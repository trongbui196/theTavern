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

type MonthData = {
  labels: string[];
  data: number[];
};

type MonthlyData = {
  [key: string]: MonthData;
};

export default function FinanceChart() {
  const [selectedMonth, setSelectedMonth] = useState<string>('May');

  // Monthly spending data
  const monthlyData: MonthlyData = {
    'January': {
      labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Others'],
      data: [30, 15, 20, 10, 20, 5],
    },
    'February': {
      labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Others'],
      data: [25, 20, 15, 15, 20, 5],
    },
    'March': {
      labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Others'],
      data: [35, 10, 25, 5, 20, 5],
    },
    'April': {
      labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Others'],
      data: [28, 18, 22, 12, 15, 5],
    },
    'May': {
      labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Others'],
      data: [32, 15, 18, 15, 15, 5],
    },
  };

  const chartData = {
    labels: monthlyData[selectedMonth].labels,
    datasets: [
      {
        data: monthlyData[selectedMonth].data,
        backgroundColor: [
          '#F59E0B', // Food - Amber
          '#3B82F6', // Transport - Blue
          '#EC4899', // Shopping - Pink
          '#10B981', // Entertainment - Emerald
          '#8B5CF6', // Bills - Purple
          '#6B7280', // Others - Gray
        ],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
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
      {/* Month Selection Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-[#4B2E2B] text-[#D97706] px-4 py-2 pr-8 rounded border border-[#D97706]/30 
                     hover:bg-[#D97706]/10 transition-colors duration-200 font-medieval focus:outline-none focus:border-[#D97706]"
          >
            {Object.keys(monthlyData).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current text-[#D97706]" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-center h-[300px] w-full">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}