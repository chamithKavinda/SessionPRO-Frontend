import React from "react";
import { NavLink } from "react-router-dom";
import Chart from "react-apexcharts"; 

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
      {/* Navigation Bar */}
      <nav className="bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <img src="src\\assets\\SessionPro Icon.png" alt="Logo" className="h-16 w-20 mt-1" />
            <h1 className="text-2xl font-bold">SessionPRO</h1>
          </div>
          <ul className="flex space-x-14 ml-56">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sessions"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Sessions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/speakers"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Speakers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-sessions"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                My Sessions
              </NavLink>
            </li>
          </ul>
          <button
            className="group flex items-center justify-start w-8 h-8 mr-8 bg-black rounded-full cursor-pointer relative overflow-hidden transition-all duration-700 shadow-lg hover:bg-gradient-to-r hover:from-teal-400 hover:via-blue-500 hover:to-purple-500 hover:w-32 active:translate-x-1 active:translate-y-1"
            style={{ marginLeft: 'auto' }} 
          >
            <div
              className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
            </div>
            <div
              className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-1000 group-hover:translate-x-0 group-hover:opacity-100"
            >
              Logout
            </div>
          </button>
        </div>
      </nav>

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
