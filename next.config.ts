import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*', // Asegúrate que coincida con el puerto de tu backend
      },
    ];
  },
};

export default nextConfig;
