import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-slate-800">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Final 2025</h1>
      <p className="text-xl mb-8 text-gray-600">Sistema de gestión integral</p>
      
      <div className="flex gap-4">
        <Link href="/login" className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors shadow-md">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}