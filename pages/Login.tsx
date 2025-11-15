"use client";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier && password) {
      login();
      navigate('/');
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f85718e1-fc6d-495c-9ca0-9b7921481df2/4a0dd472-9974-42ac-8d5c-15f258440485/US-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center opacity-50 -z-10" />
      
      <div className="bg-black/75 p-8 md:p-16 rounded-lg w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Email or phone number"
              className="w-full bg-[#333] text-white px-5 py-3.5 rounded focus:outline-none focus:bg-[#454545]"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-[#333] text-white px-5 py-3.5 rounded focus:outline-none focus:bg-[#454545]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-netflix-red text-white font-bold py-3.5 rounded mt-8 hover:bg-red-700 transition-colors"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="text-gray-400 text-sm mt-4">
          <p>
            {isSignUp ? 'Already have an account?' : 'New to StreamFlix?'}
            {' '}
            <span 
              onClick={toggleMode} 
              className="text-white hover:underline cursor-pointer font-medium"
            >
              {isSignUp ? 'Sign in now.' : 'Sign up now.'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;