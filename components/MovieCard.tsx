"use client";
import React from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { getImageUrl } from '../services/api';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
  orientation?: 'portrait' | 'landscape';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLarge = false, orientation = 'portrait' }) => {
  const isLandscape = orientation === 'landscape';
  
  let widthClass = 'w-28 md:w-36';
  if (isLandscape) {
    widthClass = isLarge ? 'w-64 md:w-80' : 'w-48 md:w-60';
  } else {
    widthClass = isLarge ? 'w-36 md:w-48' : 'w-28 md:w-36';
  }

  const imagePath = isLandscape ? movie.backdrop_path : movie.poster_path;
  const aspectRatio = isLandscape ? 'aspect-video' : 'aspect-[2/3]';
  const rating = (movie.vote_average / 2).toFixed(1);

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className={`flex-none relative transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer ${widthClass}`}
    >
      <div className={`relative rounded-md overflow-hidden shadow-lg bg-netflix-gray ${aspectRatio}`}>
         <Image
          src={getImageUrl(imagePath, 'w500', orientation)}
          alt={movie.title}
          fill
          className="w-full h-full object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
      </div>
      
      <div className="mt-2 px-1">
          <p className="text-xs md:text-sm text-white font-medium truncate">{movie.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-[10px] md:text-xs text-gray-400">{rating} / 5</span>
          </div>
      </div>
    </Link>
  );
};

export default MovieCard;