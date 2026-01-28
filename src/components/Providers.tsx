'use client';

import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </CartProvider>
        </AuthProvider>
    );
}
