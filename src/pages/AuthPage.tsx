import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signinImage from "../assets/AuthImage.jpg";
import signupImage from "../assets/AuthImage.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../reducer/auth-reducer";
import {jwtDecode} from "jwt-decode";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          user: { email, password },
        });
        const { accessToken } = response.data;
        dispatch(login(accessToken));
        localStorage.setItem("token", accessToken);
        
        const decodedToken = jwtDecode(accessToken);
        const { role } = decodedToken as { role: string };
        
        if (role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          navigate("/userdashboard");
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  };

  const handleSignUp = async () => {
    if (username && email && password) {
      try {
        await axios.post("http://localhost:3001/auth/register", {
          user: { username, email, password, role: "USER" },
        });
        setIsSignUp(false);
      } catch (error) {
        console.error("Registration failed", error);
      }
    }
  };    

  return (
    <div className="flex items-center justify-center bg-white min-h-screen relative overflow-hidden">
      {/* Left Image */}
      <div
        className={`hidden lg:block w-1/2 h-full bg-cover bg-center absolute left-0 top-0 transition-all duration-1000 ease-in-out ${
          isSignUp ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <img
          src={signupImage}
          alt="Sign Up"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Image */}
      <div
        className={`hidden lg:block w-1/2 h-full bg-cover bg-center absolute right-0 top-0 transition-all duration-1000 ease-in-out ${
          isSignUp ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <img
          src={signinImage}
          alt="Sign In"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Form */}
      <div className="w-full max-w-md p-12 -mt-96 flex flex-col justify-center items-center h-full">
        <div className="relative w-full flex flex-col justify-center items-center space-y-6">
          {/* Transition Wrapper */}
          <div
            className={`absolute top-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isSignUp
                ? "transform translate-x-full"
                : "transform -translate-x-full"
            }`}
          >
            {/* Sign In Form */}
            {!isSignUp && (
              <div className="absolute w-full flex flex-col justify-center items-center space-y-6">
                <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                <form className="w-full max-w-xs">
                  {/* Email Field */}
                  <div className="relative mb-6">
                    <input
                      required
                      className="w-full h-10 px-4 bg-white border border-black rounded-md outline-none text-base peer"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      className={`absolute left-4 text-gray-500 text-sm transition-all duration-300 bg-white px-1 
                        ${email ? "top-0 -translate-y-1/2 text-xs" : "top-1/2 -translate-y-1/2"} 
                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs`}
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Password Field */}
                  <div className="relative mb-4">
                    <input
                      required
                      className="w-full h-10 px-4 bg-white border border-black rounded-md outline-none text-base peer"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      className={`absolute left-4 text-gray-500 text-sm transition-all duration-300 bg-white px-1 
                        ${password ? "top-0 -translate-y-1/2 text-xs" : "top-1/2 -translate-y-1/2"} 
                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs`}
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                </form>
                <button
                  className="w-full max-w-xs h-10 text-white font-semibold rounded-md bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 hover:bg-indigo-600 mb-4"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>

                <p className="mt-4 text-center text-gray-800">
                  Don't have an account?{" "}
                  <span
                    className="text-indigo-600 cursor-pointer"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            )}

            {/* Sign Up Form */}
            {isSignUp && (
              <div className="absolute w-full flex flex-col justify-center items-center space-y-6">
                <h1 className="text-3xl font-bold mb-4">Create Account</h1>
                <form className="w-full max-w-xs">
                  {/* Username Field */}
                  <div className="relative mb-6">
                    <input
                      required
                      className="w-full h-10 px-4 bg-white border border-black rounded-md outline-none text-base peer"
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label
                      className={`absolute left-4 text-gray-500 text-sm transition-all duration-300 bg-white px-1 
                        ${username ? "top-0 -translate-y-1/2 text-xs" : "top-1/2 -translate-y-1/2"} 
                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs`}
                      htmlFor="username"
                    >
                      Username
                    </label>
                  </div>

                  {/* Email Field */}
                  <div className="relative mb-6">
                    <input
                      required
                      className="w-full h-10 px-4 bg-white border border-black rounded-md outline-none text-base peer"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      className={`absolute left-4 text-gray-500 text-sm transition-all duration-300 bg-white px-1 
                        ${email ? "top-0 -translate-y-1/2 text-xs" : "top-1/2 -translate-y-1/2"} 
                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs`}
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Password Field */}
                  <div className="relative mb-6">
                    <input
                      required
                      className="w-full h-10 px-4 bg-white border border-black rounded-md outline-none text-base peer"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      className={`absolute left-4 text-gray-500 text-sm transition-all duration-300 bg-white px-1 
                        ${password ? "top-0 -translate-y-1/2 text-xs" : "top-1/2 -translate-y-1/2"} 
                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs`}
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>

                </form>
                <button
                  className="w-full max-w-xs h-10 text-white font-semibold rounded-md bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 hover:bg-indigo-600 mb-6"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>

                <p className="mt-4 text-center text-gray-800">
                  Already have an account?{" "}
                  <span
                    className="text-indigo-600 cursor-pointer"
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
