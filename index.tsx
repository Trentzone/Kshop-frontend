import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to KShop</h1>
      <p className="mb-4 text-lg text-gray-700">
        Your campus e-commerce platform for student entrepreneurs.
      </p>
      <div className="space-x-4">
        <Link href="/login">
          <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </a>
        </Link>
        <Link href="/register">
          <a className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Register
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
