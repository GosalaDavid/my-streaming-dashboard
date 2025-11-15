"use client";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetail from '../pages/movieDetails';
import Login from '../pages/Login';
import Search from '../pages/Search';

const App: React.FC = () => {
  return (
    <div className="bg-netflix-black min-h-screen text-white font-sans antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default App;