"use client";
import React from 'react';

const MovieDetail: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-black text-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Movie detail moved</h2>
        <p className="mt-2 text-gray-400">The movie detail page has moved to <code>/movie/[id]</code>. Use the movie cards or links to visit that route.</p>
      </div>
    </div>
  );
};

export default MovieDetail;