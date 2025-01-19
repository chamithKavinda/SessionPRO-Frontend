import React from "react";
import Chart from "react-apexcharts"; 
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const chartOptions = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
      },
      colors: ['#91b9fa', '#ca82fa'],
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70]
      }
    ]
  };

  return (
    <div>
      <NavBar/>

      {/* Main Content */}
      <div className="p-6">
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5">
          {/* Card 1 */}
          <div className="div h-[7em] w-[16em] bg-gray-100 m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden">
            <div className="h-[7em] w-[7em] bg-[#5b97f7] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"></div>
            <div className="h-[6em] w-[6em] bg-[#5acdff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"></div>
            <div className="h-[5em] w-[5em] bg-[#996dff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold group-hover:text-white duration-100">124</h2>
            </div>
            <button className="text-[0.8em] absolute bottom-[1em] left-[1em] group-hover:text-white duration-100">
              <span className="relative before:h-[0.02em] before:absolute before:w-full before:content-[''] before:bg-black group-hover:before:bg-white duration-100 before:bottom-0 before:left-0">See More</span>
            </button>
            <h1 className="z-20 font-bold font-Poppin text-[1.4em] group-hover:text-white duration-100">Sessions</h1>
          </div>

          {/* Card 2 */}
          <div className="div h-[7em] w-[16em] bg-gray-100 m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden">
            <div className="h-[7em] w-[7em] bg-[#5b97f7] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"></div>
            <div className="h-[6em] w-[6em] bg-[#5acdff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"></div>
            <div className="h-[5em] w-[5em] bg-[#996dff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold group-hover:text-white duration-100">26</h2>
            </div>
            <button className="text-[0.8em] absolute bottom-[1em] left-[1em] group-hover:text-white duration-100">
              <span className="relative before:h-[0.02em] before:absolute before:w-full before:content-[''] before:bg-black group-hover:before:bg-white duration-100 before:bottom-0 before:left-0">See More</span>
            </button>
            <h1 className="z-20 font-bold font-Poppin text-[1.4em] group-hover:text-white duration-[400ms]">Speakers</h1>
          </div>

          {/* Card 3 */}
          <div className="div h-[7em] w-[16em] bg-gray-100 m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden">
            <div className="h-[7em] w-[7em] bg-[#5b97f7] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"></div>
            <div className="h-[6em] w-[6em] bg-[#5acdff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"></div>
            <div className="h-[5em] w-[5em] bg-[#996dff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold group-hover:text-white duration-100">358</h2>
            </div>
            <button className="text-[0.8em] absolute bottom-[1em] left-[1em]  group-hover:text-white duration-100">
              <span className="relative before:h-[0.02em] before:absolute before:w-full before:content-[''] before:bg-black group-hover:before:bg-white duration-100 before:bottom-0 before:left-0">See More</span>
            </button>
            <h1 className="z-20 font-bold font-Poppin text-[1.4em] group-hover:text-white duration-100">Users</h1>
          </div>
          
          {/* Card 4 */}
          <div className="div h-[7em] w-[16em] bg-gray-100 m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden">
            <div className="h-[7em] w-[7em] bg-[#5b97f7] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"></div>
            <div className="h-[6em] w-[6em] bg-[#5acdff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"></div>
            <div className="h-[5em] w-[5em] bg-[#996dff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold group-hover:text-white duration-100">3</h2>
            </div>
            <button className="text-[0.8em] absolute bottom-[1em] left-[1em] group-hover:text-white duration-100">
              <span className="relative before:h-[0.02em] before:absolute before:w-full before:content-[''] before:bg-black group-hover:before:bg-white duration-100 before:bottom-0 before:left-0">See More</span>
            </button>
            <h1 className="z-20 font-bold font-Poppin text-[1.4em] group-hover:text-white duration-100">My Sessions</h1>
          </div>
        </div>

        {/* Placeholder for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 mt-4 ml-60">
          {/* Chart 1 */}
          <div className="flex flex-col items-center bg-white p-4 rounded-md w-full lg:w-1/2">
            <Chart options={chartOptions.options} series={chartOptions.series} type="bar" width="500" height="300" />
            <h3 className="text-center mt-2 text-sm">Users Reach Each Year</h3>
          </div>
          {/* Chart 2 */}
          <div className="flex flex-col items-center bg-white p-4 rounded-md w-full lg:w-1/2">
            <Chart options={chartOptions.options} series={chartOptions.series} type="line" width="500" height="300" />
            <h3 className="text-center mt-2 text-sm">Users Reach Each Year</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
