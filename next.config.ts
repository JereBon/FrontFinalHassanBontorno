import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    return [
      // Reglas específicas para forzar la barra final y evitar el error 307
      {
        source: '/api/clients/',
        destination: `${backendUrl}/clients/`,
      },
      {
        source: '/api/clients',
        destination: `${backendUrl}/clients/`,
      },
      {
        source: '/api/products/',
        destination: `${backendUrl}/products/`,
      },
      {
        source: '/api/products',
        destination: `${backendUrl}/products/`,
      },
      {
        source: '/api/health_check/',
        destination: `${backendUrl}/health_check/`,
      },
      {
        source: '/api/health_check',
        destination: `${backendUrl}/health_check/`,
      },
      {
        source: '/api/orders/',
        destination: `${backendUrl}/orders/`,
      },
      {
        source: '/api/orders',
        destination: `${backendUrl}/orders/`,
      },
      {
        source: '/api/addresses/',
        destination: `${backendUrl}/addresses/`,
      },
      {
        source: '/api/addresses',
        destination: `${backendUrl}/addresses/`,
      },
      {
        source: '/api/categories/',
        destination: `${backendUrl}/categories/`,
      },
      {
        source: '/api/categories',
        destination: `${backendUrl}/categories/`,
      },
      {
        source: '/api/bills/',
        destination: `${backendUrl}/bills/`,
      },
      {
        source: '/api/bills',
        destination: `${backendUrl}/bills/`,
      },
      {
        source: '/api/reviews/',
        destination: `${backendUrl}/reviews/`,
      },
      {
        source: '/api/reviews',
        destination: `${backendUrl}/reviews/`,
      },
      {
        source: '/api/order_details/',
        destination: `${backendUrl}/order_details/`,
      },
      {
        source: '/api/order_details',
        destination: `${backendUrl}/order_details/`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${backendUrl}/auth/:path*`,
      },
      // Regla general para el resto de endpoints
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
