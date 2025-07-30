import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Register submitted', { email, password, firstName, lastName });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="block mb-1 font-semibold">First Name</label>
        <input
          id="firstName"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="lastName" className="block mb-1 font-semibold">Last Name</label>
        <input
          id="lastName"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
