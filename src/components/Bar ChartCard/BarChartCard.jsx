import React from 'react';
import { Card } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BarChartCard = ({ title, data, backgroundColor }) => {
  // Determine the dataKey dynamically based on the first data entry
  const dataKey =
    data.length > 0
      ? Object.keys(data[0]).find((key) => key !== 'name')
      : 'value';

  return (
    <Card title={title} style={{ backgroundColor }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#3b7b7a" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BarChartCard;
