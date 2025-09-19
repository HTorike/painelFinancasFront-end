import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeExpenseChart = ({ incomeTotal, expenseTotal }) => {
  const data = [
    {
      name: 'Entradas/Saídas',
      Receitas: incomeTotal,
      Despesas: expenseTotal,
    },
  ];

  return (
    <ResponsiveContainer width="50%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Receitas" fill="#2e7d32" />
        <Bar dataKey="Despesas" fill="#d32f2f" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;