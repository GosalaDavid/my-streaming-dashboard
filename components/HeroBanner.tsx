"use client";
import React from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { getImageUrl } from '../services/api';
import { Play, Info } from 'lucide-react';

interface HeroBannerProps {
  movie: Movie | null;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {
  if (!movie) return <div className="h-[50vh] md:h-[80vh] bg-netflix-black animate-pulse" />;

  return (
    <div className="relative h-[60vh] md:h-[85vh] w-full text-white mb-4">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-netflix-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-[15%] left-4 md:left-8 max-w-2xl space-y-4">
        <h1 className="text-3xl md:text-6xl font-bold drop-shadow-lg animate-fade-in">
          {movie.title}
        </h1>
        
        <p className="text-sm md:text-lg text-gray-200 line-clamp-3 md:line-clamp-2 drop-shadow-md max-w-xl">
          {movie.overview}
        </p>

        <div className="flex items-center gap-3 pt-4">
          <button className="flex items-center gap-2 bg-white text-black px-6 py-2 md:py-3 rounded font-bold hover:bg-white/90 transition-colors">
            <Play className="w-5 h-5 fill-black" />
            Play
          </button>
          <Link 
            to={`/movie/${movie.id}`}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-2 md:py-3 rounded font-bold hover:bg-gray-500/50 transition-colors backdrop-blur-sm"
          >
            <Info className="w-5 h-5" />
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;