"use client";
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HashRouter>
        {children}
      </HashRouter>
    </AuthProvider>
  );
}

