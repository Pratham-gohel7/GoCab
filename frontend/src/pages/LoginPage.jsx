import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={submitHandler} className="flex flex-col gap-6 max-w-md bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-3xl font-semibold text-blue-600 text-center relative">
          Login
          {/* <span className="absolute -left-8 top-0 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span> */}
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Sign in to access your account.
        </p>

        {/* Email Field */}
        <label className="relative w-full">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder=" "
          />
          <span className="absolute text-gray-500 text-sm left-3 top-2 -translate-y-1/2 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
            Email
          </span>
        </label>

        {/* Password Field */}
        <label className="relative w-full">
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder=" "
          />
          <span className="absolute text-gray-500 text-sm left-3 top-2 -translate-y-1/2 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
            Password
          </span>
        </label>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all">
          Login
        </button>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p> 
      </form>
    </div>
  )
}

export default LoginPage