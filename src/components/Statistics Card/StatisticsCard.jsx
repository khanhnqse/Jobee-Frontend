import React from 'react';
import { Card, Statistic } from 'antd';

const StatisticsCard = ({ title, value, prefix, backgroundColor }) => (
  <Card style={{ backgroundColor }}>
    <Statistic title={title} value={value} prefix={prefix} />
  </Card>
);

export default StatisticsCard;
