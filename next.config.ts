import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Reglas específicas para forzar la barra final y evitar el error 307
      {
        source: '/api/clients/',
        destination: 'http://backend:8000/clients/',
      },
      {
        source: '/api/clients',
        destination: 'http://backend:8000/clients/',
      },
      {
        source: '/api/products/',
        destination: 'http://backend:8000/products/',
      },
      {
        source: '/api/products',
        destination: 'http://backend:8000/products/',
      },
      {
        source: '/api/health_check/',
        destination: 'http://backend:8000/health_check/',
      },
      {
        source: '/api/health_check',
        destination: 'http://backend:8000/health_check/',
      },
      // Regla general para el resto de endpoints (ej: /api/auth/login)
      {
        source: '/api/:path*',
        destination: 'http://backend:8000/:path*', // Usamos el nombre del servicio de Docker
      },
    ];
  },
};

export default nextConfig;
