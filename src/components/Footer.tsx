export default function Footer() {
    return (
        <footer className="mt-20" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center text-white font-bold text-xs">
                                R.
                            </div>
                            <h3 className="text-lg font-bold tracking-tight auto-text">Recirculate</h3>
                        </div>
                        <p className="text-sm text-gray-500">Moda minimalista. Calidad atemporal.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {['Instagram', 'Twitter', 'Pinterest', 'Contacto'].map((item) => (
                            <a key={item} href="#" className="text-sm text-gray-500 hover:text-[#d4f238] hover:underline transition-all">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400" style={{ borderTop: '1px solid var(--border)' }}>
                    <p>&copy; {new Date().getFullYear()} Recirculate. Todos los derechos reservados.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-600">Privacidad</a>
                        <a href="#" className="hover:text-gray-600">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
