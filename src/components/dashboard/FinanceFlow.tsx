import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FinanceFlow() {
  const monthlyData = {
    income: [12, 15, 13, 14, 16, 17, 15],
    expenses: [8, 10, 7, 9, 8, 11, 9]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#D97706',
          font: {
            family: 'MedievalSharp',
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: '#D97706',
          lineWidth: 0.2
        },
        ticks: {
          color: '#D97706',
          font: {
            family: 'MedievalSharp',
            size: 12
          },
          callback: function(value) {
            return `$${value}k`;
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          color: '#D97706',
          font: {
            family: 'MedievalSharp',
            size: 14
          },
          padding: 15,
          boxWidth: 12,
          filter: (legendItem) => Boolean(legendItem.text)
        }
      },
      tooltip: {
        backgroundColor: '#4B2E2B',
        titleColor: '#D97706',
        bodyColor: '#FFF',
        borderColor: '#D97706',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 4,
        titleFont: {
          family: 'MedievalSharp',
          size: 14
        },
        bodyFont: {
          family: 'MedievalSharp',
          size: 13
        },
        callbacks: {
          title: (tooltipItems) => {
            if (tooltipItems.length > 0) {
              return `${tooltipItems[0].label} Treasury`;
            }
            return '';
          },
          label: (context) => {
            if (context.dataset.label) {
              const value = context.parsed.y;
              const income = monthlyData.income[context.dataIndex];
              const expense = monthlyData.expenses[context.dataIndex];
              const net = income - expense;
              return [
                `${context.dataset.label}: $${value}k`,
                `Net: ${net >= 0 ? '+' : ''}$${net}k`
              ];
            }
            return '';
          }
        }
      }
    }
  };

  // Process data to ensure larger value is behind smaller value
  const processedData = monthlyData.income.map((inc, i) => ({
    income: inc,
    expense: monthlyData.expenses[i],
    isIncomeHigher: inc >= monthlyData.expenses[i]
  }));

  const data: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Income',
        data: processedData.map(d => d.isIncomeHigher ? d.income : d.expense),
        backgroundColor: '#059669', // A rich emerald green for income
        borderWidth: 0,
        barPercentage: 1,
        categoryPercentage: 0.8,
        order: 2
      },
      {
        label: 'Expenses',
        data: processedData.map(d => d.isIncomeHigher ? d.expense : d.income),
        backgroundColor: '#991B1B', // A deep red for expenses
        borderWidth: 0,
        barPercentage: 1,
        categoryPercentage: 0.8,
        order: 1
      }
    ],
  };

  return (
    <div className="h-[300px] w-full">
      <Bar 
        data={data} 
        options={options} 
        className="filter drop-shadow-lg"
      />
    </div>
  );
}