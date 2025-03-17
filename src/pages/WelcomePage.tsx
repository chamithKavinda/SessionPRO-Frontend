import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <img src="src\\assets\\SessionPro Icon.png" alt="Logo" className="mb-2 w-24 sm:w-32 h-auto" />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Welcome to Session Management System</h1>
      <p className="text-base sm:text-lg mb-8 text-gray-600 text-center">
        Organize, Manage, Engage – All in One Platform.
      </p>
      <div className="flex items-center justify-center">
        <div className="relative">
          <button
            className="relative inline-block p-px font-semibold leading-6 text-white shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-all duration-300 ease-in-out bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500"
            onClick={() => navigate("/auth")}
          >
            <span
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0"
            ></span>
            <span className="relative z-10 block px-4 py-2 sm:px-6 sm:py-2 rounded-xl bg-[1D347A]">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500">
                  Let's get started
                </span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
