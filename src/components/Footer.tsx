export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold uppercase tracking-tighter">Recirculate</h3>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Moda minimalista. Calidad atemporal.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-black transition-colors text-sm">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-black transition-colors text-sm">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-black transition-colors text-sm">Contacto</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Recirculate. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
