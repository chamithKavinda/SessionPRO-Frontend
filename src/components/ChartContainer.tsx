import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartContainerProps {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
  type: 'bar' | 'line';
  title: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ options, series, type, title }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-md w-full lg:w-1/2">
      <Chart options={options} series={series} type={type} width="500" height="300" />
      <h3 className="text-center mt-2 text-sm">{title}</h3>
    </div>
  );
};

export default ChartContainer;
