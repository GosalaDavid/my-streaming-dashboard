import React, { useRef } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLarge?: boolean;
  orientation?: 'portrait' | 'landscape';
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, isLarge = false, orientation = 'portrait' }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-8 space-y-2 px-4 md:px-8 group">
      <h2 className="text-lg md:text-2xl font-semibold text-white hover:text-gray-200 cursor-pointer transition-colors">
        {title}
      </h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 bg-black/50 w-10 md:w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 rounded-l-md"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <div 
          ref={rowRef}
          className="flex gap-3 overflow-x-scroll no-scrollbar scroll-smooth py-4 pl-1 pr-1"
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isLarge={isLarge} 
              orientation={orientation}
            />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 bg-black/50 w-10 md:w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 rounded-r-md"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
