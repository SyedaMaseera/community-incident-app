import React from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '../components/LayoutWrapper';
import { getUserFromToken } from '../utils/auth';
import HomeBg from '../styles/assets/homepage-bg.jpg';

export default function Home() {
  const user = getUserFromToken();

  return (
    <LayoutWrapper>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-cover bg-center relative text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)), url(${HomeBg})`,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
          rel="stylesheet"
        />

        {/* Main Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-10 md:p-14 rounded-3xl shadow-xl max-w-3xl text-center border border-white border-opacity-20 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-md animate-slideUp">
            Welcome to <span className="text-yellow-400">CityFix</span>
          </h1>
          <p className="text-md md:text-lg font-medium text-gray-200 animate-fadeIn delay-100">
            Report city issues like potholes, garbage, or broken streetlights.  
            <br />
            <span className="text-yellow-300 font-semibold">
              Your reports can improve your neighborhood!
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 animate-slideUp delay-200">
          <Link
  to={user ? "/report" : "/login"}
  className="px-8 py-4 rounded-xl font-semibold bg-yellow-400 text-gray-900 shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:bg-yellow-300 transform transition duration-300"
>
  Report an Issue
</Link>


          <Link
            to={user ? "/user-dashboard" : "/login"}
            className="px-8 py-4 rounded-xl font-semibold bg-white text-indigo-700 hover:-translate-y-1 hover:shadow-2xl transform
 hover:scale-105 hover:bg-gray-100 transition duration-300"
          >
            Your Reports
          </Link>

          <Link
            to={user?.role === 'admin' ? "/admin-dashboard" : "/login"}
            className="px-8 py-4 rounded-xl font-semibold bg-indigo-800 text-white hover:-translate-y-1 hover:shadow-2xl transform
 hover:scale-105 hover:bg-indigo-700 transition duration-300"
          >
            Admin Dashboard
          </Link>
        </div>

        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn { animation: fadeIn 1s ease forwards; }
            .animate-slideUp { animation: slideUp 1s ease forwards; }
          `}
        </style>
      </div>
    </LayoutWrapper>
  );
}
