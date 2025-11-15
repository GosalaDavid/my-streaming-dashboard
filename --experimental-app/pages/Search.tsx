"use client";
import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      const data = await searchMovies(query);
      setMovies(data.results);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-12 pb-12">
      <h1 className="text-2xl text-gray-400 mb-6">
        Results for: <span className="text-white font-semibold">"{query}"</span>
      </h1>

      {loading ? (
        <div className="text-white text-center mt-20">Searching...</div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="w-full flex justify-center">
               <MovieCard movie={movie} orientation="portrait" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white text-center mt-20 text-lg">
          No movies found for "{query}".
        </div>
      )}
    </div>
  );
};

export default Search;