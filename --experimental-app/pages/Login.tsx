"use client";
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier && password) {
      login();
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f85718e1-fc6d-495c-9ca0-9b7921481df2/4a0dd472-9974-42ac-8d5c-15f258440485/US-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center opacity-40 -z-10" />
      <div className="bg-black/80 p-8 md:p-12 rounded-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-white">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email or phone number"
            className="w-full bg-[#333] text-white px-4 py-3 rounded focus:outline-none"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-[#333] text-white px-4 py-3 rounded focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="w-full bg-netflix-red text-white py-3 rounded font-semibold">
            Sign In
          </button>
        </form>

        <div className="text-gray-400 text-sm">
          New to StreamFlix? <span className="text-white underline cursor-pointer" onClick={() => window.location.href = '/'}>Browse content</span>
        </div>
      </div>
    </div>
  );
};

export default Login;