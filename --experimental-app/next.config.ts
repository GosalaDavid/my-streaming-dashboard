import type { NextConfig } from "next";

// Define all allowed remote image hosts up-front to satisfy TypeScript's
// stricter typing (avoids calling `.push` on an optional property).
const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'image.tmdb.org',
    pathname: '/t/p/**',
  },
  {
    protocol: 'https',
    hostname: 'picsum.photos',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/**',
  },
];

const nextConfig: NextConfig = {
  // Produce a fully static export (`out` folder) compatible with drag-and-drop
  // deployments. This replaces the older `next export` CLI command.
  output: 'export',
  images: {
    // Cast to `any` because Next's exported RemotePattern type in the
    // public types is a union that can include `URL` and TS can be picky
    // about structural matches here. This is a safe runtime-only config
    // change — Next will accept the shape at runtime.
    remotePatterns: remotePatterns as any,
    // When producing a static export, disable Next's Image Optimization API
    // which is server-only. Setting `unoptimized: true` ensures `next/image`
    // will emit plain <img> tags suitable for static exports.
    unoptimized: true,
  },
};

export default nextConfig;


