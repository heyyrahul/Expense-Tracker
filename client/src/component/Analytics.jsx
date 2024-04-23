import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const Analytics = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [expenseData, setExpenseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://expense-tracker-q2q6.onrender.com/transactions');
        const data = response.data;

        const incomeTransactions = data.filter(transaction => transaction.type === 'Income');
        const expenseTransactions = data.filter(transaction => transaction.type === 'Expense');

        const totalIncome = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);

        const totalExpense = expenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);

        const incomeChartLabels = [...incomeTransactions.map(transaction => transaction.category), 'Total Income'];
        const incomeChartData = [...incomeTransactions.map(transaction => transaction.amount), totalIncome];

        const expenseChartLabels = [...expenseTransactions.map(transaction => transaction.category), 'Total Expense'];
        const expenseChartData = [...expenseTransactions.map(transaction => transaction.amount), totalExpense];

        setIncomeData({
          labels: incomeChartLabels,
          datasets: [
            {
              label: 'Income',
              data: incomeChartData,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(153, 102, 255, 0.6)', 
              ],
            },
          ],
        });

        setExpenseData({
          labels: expenseChartLabels,
          datasets: [
            {
              label: 'Expense',
              data: expenseChartData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 159, 64, 0.6)', 
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Analytics Component</h3>
      <div style={{ width: '50%', float: 'left' }}>
        <h4>Income Chart</h4>
        {incomeData && (
          <div style={{ width: '300px', height: '300px' }}>
            <Pie
              data={incomeData}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'right',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.label + ': ' + context.formattedValue;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        )}
      </div>
      <div style={{ width: '50%', float: 'left' }}>
        <h4>Expense Chart</h4>
        {expenseData && (
          <div style={{ width: '300px', height: '300px' }}>
            <Pie
              data={expenseData}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'right',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.label + ': ' + context.formattedValue;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
