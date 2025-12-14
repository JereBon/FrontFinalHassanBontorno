import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-slate-300 transition-colors">
          Final 2025
        </Link>
        <div className="flex gap-4">
          <Link href="/login" className="hover:text-slate-300 transition-colors">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="hover:text-slate-300 transition-colors">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}