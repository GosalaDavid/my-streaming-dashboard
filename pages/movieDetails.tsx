"use client";
import React, {useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'react-router-dom';
import { MovieDetail as MovieDetailType } from '../types';
import { fetchMovieDetail, getImageUrl } from '../services/api';
import { Star, Clock, Calendar, Play, Plus, ThumbsUp } from 'lucide-react';

const MovieDetail: React.FC = () => {
  const { id } = useParams() as { id?: string };
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchMovieDetail(id);
      setMovie(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center text-white bg-netflix-black">Loading...</div>;
  }

  if (!movie) {
    return <div className="h-screen w-full flex items-center justify-center text-white bg-netflix-black">Movie not found.</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="hidden md:block flex-shrink-0 w-64 rounded-lg shadow-2xl overflow-hidden border-4 border-gray-800 relative">
             <Image
               src={getImageUrl(movie.poster_path, 'w500')}
               alt={movie.title}
               fill
               className="w-full h-full object-cover"
             />
          </div>

          <div className="flex-1 space-y-6 animate-slide-up">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-gray-400 text-lg italic">{movie.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
               <span className="flex items-center gap-1 text-green-500 font-bold">
                 <Star className="w-4 h-4 fill-current" /> {movie.vote_average.toFixed(1)} Match
               </span>
               <span className="flex items-center gap-1">
                 <Calendar className="w-4 h-4" /> {new Date(movie.release_date).getFullYear()}
               </span>
               <span className="flex items-center gap-1 border border-gray-600 px-2 py-0.5 rounded">
                 HD
               </span>
               {movie.runtime > 0 && (
                 <span className="flex items-center gap-1">
                   <Clock className="w-4 h-4" /> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                 </span>
               )}
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors">
                <Play className="w-5 h-5 fill-black" /> Play
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-600/50 hover:bg-gray-600/80 border border-gray-500 text-white p-3 rounded-full transition-colors">
                <Plus className="w-5 h-5" />
              </button>
               <button className="flex items-center justify-center gap-2 bg-gray-600/50 hover:bg-gray-600/80 border border-gray-500 text-white p-3 rounded-full transition-colors">
                <ThumbsUp className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            <div className="pt-4">
               <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Genres</h3>
               <div className="flex flex-wrap gap-2">
                 {movie.genres?.map(g => (
                   <span key={g.id} className="text-xs md:text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-700 cursor-pointer transition-colors">
                     {g.name}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;