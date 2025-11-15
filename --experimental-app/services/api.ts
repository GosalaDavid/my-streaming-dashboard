import { Movie, MovieDetail, MovieResponse } from '../types';

const API_KEY: string = '9d5b686a767f229bf24631bd80bdc33b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (
  path: string | null, 
  size: 'w500' | 'original' = 'w500',
  orientation: 'portrait' | 'landscape' = 'portrait'
) => {
  if (path?.startsWith('http')) return path;

  if (!path) {
    if (orientation === 'landscape') {
      return `https://picsum.photos/${size === 'original' ? '1920/1080' : '533/300'}`;
    }
    return `https://picsum.photos/${size === 'original' ? '1067/1600' : '500/750'}`;
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Cyberpunk: The Beginning",
    overview: "In a dystopian future, a mercenary outlaw known as V pursues a one-of-a-kind implant that is the key to immortality. Navigating the neon-lit streets of Night City, choices made will shape the destiny of the world.",
    backdrop_path: "https://images.unsplash.com/photo-1535242208474-9a2793260ca8?auto=format&fit=crop&w=1200&q=80", 
    poster_path: null,
    release_date: "2024-05-12",
    vote_average: 8.5,
    genre_ids: [878, 28]
  },
  {
    id: 2,
    title: "The Last Horizon",
    overview: "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. They face the unknown depths of the universe and the limits of human endurance.",
    backdrop_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    poster_path: null,
    release_date: "2023-11-08",
    vote_average: 9.2,
    genre_ids: [12, 18]
  },
  {
    id: 3,
    title: "Shadows of the Past",
    overview: "A retired detective is pulled back into the game when a cold case from 20 years ago resurfaces with new evidence pointing to a conspiracy at the highest levels of government.",
    backdrop_path: "https://images.unsplash.com/photo-1463058837219-529eb803d4e8?auto=format&fit=crop&w=1200&q=80",
    poster_path: null,
    release_date: "2022-03-15",
    vote_average: 7.8,
    genre_ids: [80, 53]
  },
  {
    id: 4,
    title: "Echoes of Silence",
    overview: "In a world where sound is deadly, a family must live in silence to hide from creatures that hunt by sound. They communicate through sign language and strive to survive.",
    backdrop_path: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=1200&q=80",
    poster_path: null,
    release_date: "2024-01-20",
    vote_average: 8.1,
    genre_ids: [27, 53]
  },
  {
    id: 5,
    title: "Velocity",
    overview: "A high-octane action thriller about a driver who must transport a package across the country while being hunted by multiple agencies. Speed is his only weapon.",
    backdrop_path: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    poster_path: null,
    release_date: "2023-08-30",
    vote_average: 7.5,
    genre_ids: [28, 53]
  }
];

const MOCK_DETAIL: MovieDetail = {
  ...MOCK_MOVIES[0],
  genres: [{ id: 878, name: "Science Fiction" }, { id: 28, name: "Action" }],
  runtime: 142,
  tagline: "The future is now.",
  status: "Released"
};

const fetchFromApi = async <T>(endpoint: string): Promise<T> => {
  const searchParams = new URLSearchParams(endpoint.split('?')[1]);
  const query = searchParams.get('query');

  if (!API_KEY || API_KEY === 'your_key_here') {
     return new Promise((resolve) => {
       setTimeout(() => {
         if (endpoint.includes('movie/')) {
            if(endpoint.includes('search')) {
               const filtered = query 
                ? MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
                : MOCK_MOVIES;
               resolve({ results: filtered, page: 1, total_pages: 1 } as T);
            } else if(endpoint.includes('popular') || endpoint.includes('top_rated') || endpoint.includes('upcoming') || endpoint.includes('now_playing')) {
               resolve({ results: MOCK_MOVIES, page: 1, total_pages: 1 } as T);
            } else {
               resolve(MOCK_DETAIL as T);
            }
         }
       }, 500);
     });
  }

  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const res = await fetch(`${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { results: MOCK_MOVIES, page: 1, total_pages: 1 } as unknown as T;
  }
};

export const fetchPopularMovies = () => fetchFromApi<MovieResponse>('/movie/popular');
export const fetchTopRatedMovies = () => fetchFromApi<MovieResponse>('/movie/top_rated');
export const fetchUpcomingMovies = () => fetchFromApi<MovieResponse>('/movie/upcoming');
export const fetchNowPlayingMovies = () => fetchFromApi<MovieResponse>('/movie/now_playing');
export const fetchMovieDetail = (id: string) => fetchFromApi<MovieDetail>(`/movie/${id}`);
export const searchMovies = (query: string) => fetchFromApi<MovieResponse>(`/search/movie?query=${encodeURIComponent(query)}`);