"use client";
import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { Movie } from '../types';
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, fetchNowPlayingMovies } from '../services/api';

const Home: React.FC = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [popRes, topRes, upRes, nowRes] = await Promise.all([
        fetchPopularMovies(),
        fetchTopRatedMovies(),
        fetchUpcomingMovies(),
        fetchNowPlayingMovies()
      ]);

      setPopular(popRes.results);
      setTopRated(topRes.results);
      setUpcoming(upRes.results);
      setNowPlaying(nowRes.results);

      if (popRes.results.length > 0) {
        const random = popRes.results[Math.floor(Math.random() * popRes.results.length)];
        setHeroMovie(random);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-netflix-black pb-20">
      <HeroBanner movie={heroMovie} />
      <div className="relative z-10 space-y-4 md:space-y-8 mt-6 md:mt-12">
        <MovieRow title="Trending Now" movies={popular} orientation="landscape" />
        <MovieRow title="Top Rated" movies={topRated} orientation="landscape" />
        <MovieRow title="New Releases" movies={nowPlaying} orientation="landscape" />
        <MovieRow title="Upcoming" movies={upcoming} orientation="landscape" />
      </div>
    </main>
  );
};

export default Home;