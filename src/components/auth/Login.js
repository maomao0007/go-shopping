import React, { useState } from "react";
import axios from "axios";
import api from "../../api";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!formData.email || !formData.password) {
       console.error("Email and password are required");
       return;
     }

    try {
      const response = await axios.post(
        "api/auth/login",
        formData
      );

      console.log("Login successful:", response.data);
    } catch (error) {
       if (error.response?.data?.message === "Invalid credentials") {
            console.error("Email or password was incorrect");
        } else {
            console.error('Login failed:', error.response?.data);
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {" "}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {" "}
            Login
          </h2>{" "}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
          >
            Don't have account yet? Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
