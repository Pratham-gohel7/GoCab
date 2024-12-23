import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <p className="text-2xl font-semibold text-blue-600 relative flex items-center justify-center">
          {/* <span className="absolute left-0 w-4 h-4 rounded-full bg-blue-600 animate-pulse"></span> */}
          Register
        </p>
        <p className="text-sm text-gray-600">Signup now and get full access to our app.</p>

        <div className="flex gap-4">
          <label className="relative w-full">
            <input
              type="text"
              required
              placeholder=" "
              className="peer w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <span className="absolute text-gray-500 text-sm left-3 top-2 -translate-y-1/2 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
              Firstname
            </span>
          </label>
          <label className="relative w-full">
            <input
              type="text"
              required
              placeholder=" "
              className="peer w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <span className="absolute text-gray-500 text-sm left-3 top-2 -translate-y-1/2 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
              Lastname
            </span>
          </label>
        </div>

        <label className="relative w-full">
          <input
            required
            type="email"
            className="peer w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder=" "
          />
          <span className="absolute text-gray-500 text-sm left-3 top-2 -translate-y-1/2 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
            Email
          </span>
        </label>

        <label className="relative w-full">
          <input
            required
            type="password"
            className="peer w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder=" "
          />
          <span className="absolute text-gray-500 text-sm left-3 top-2 -translate-y-1/2 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
            Password
          </span>
        </label>

        <label className="relative w-full">
          <input
            required
            type="password"
            className="peer w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder=" "
          />
          <span className="absolute text-gray-500 text-sm left-3 top-2 -translate-y-1/2 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
            Confirm Password
          </span>
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUpPage