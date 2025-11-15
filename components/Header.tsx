"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black/90 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-red-800 text-2xl md:text-3xl font-bold tracking-tighter hover:opacity-90 transition-opacity">
            STREAMFLIX
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/" className="hover:text-white transition-colors">TV Shows</Link>
            <Link to="/" className="hover:text-white transition-colors">Movies</Link>
            <Link to="/" className="hover:text-white transition-colors">New & Popular</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-white">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <button 
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`hover:text-gray-300 transition-colors z-10 ${searchOpen ? 'mr-2' : ''}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Titles, people, genres"
              className={`bg-black/80 border border-gray-500 text-white text-sm rounded px-2 py-1 outline-none transition-all duration-300 ${
                searchOpen ? 'w-48 md:w-64 opacity-100 pl-2' : 'w-0 opacity-0 border-none'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => !searchQuery && setSearchOpen(false)}
            />
          </form>

          {isAuthenticated ? (
            <>
              <button className="hover:text-gray-300 transition-colors hidden sm:block">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 cursor-pointer group relative">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-sm font-bold overflow-hidden">
                   <User className="w-5 h-5" />
                </div>
                <button 
                  onClick={logout}
                  className="hidden group-hover:flex absolute top-full right-0 mt-2 bg-black/90 border border-gray-700 p-2 rounded shadow-xl items-center gap-2 text-sm hover:text-red-500 whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-netflix-red text-white px-4 py-1 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;