import React from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/DashboardCard';
import ChartContainer from '../components/ChartContainer';

const Dashboard = () => {
  const chartOptions = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
      },
      colors: ['#91b9fa', '#ca82fa'],
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };

  return (
    <div>
      <NavBar />

      {/* Main Content */}
      <div className="p-6">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5">
          <Card count={20} label="Sessions" navigateTo="/sessions" />
          <Card count={10} label="Speakers" navigateTo="/speakers" />
          <Card count={15} label="Users" navigateTo="/users" />
          <Card count={3} label="My Sessions" navigateTo="/my-sessions" />
        </div>

        {/* Placeholder for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 mt-4 ml-60">
          <ChartContainer options={chartOptions.options} series={chartOptions.series} type="bar" title="Users Reach Each Year" />
          <ChartContainer options={chartOptions.options} series={chartOptions.series} type="line" title="Users Reach Each Year" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
