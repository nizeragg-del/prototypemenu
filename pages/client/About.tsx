import React from 'react';

export const About: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="relative rounded-3xl overflow-hidden h-[400px] mb-12 flex items-center justify-center">
                 <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Restaurant interior" />
                 <div className="absolute inset-0 bg-black/50"></div>
                 <div className="relative z-10 text-center text-white px-4">
                     <h1 className="text-5xl font-black mb-4">Nossa História</h1>
                     <p className="text-xl max-w-2xl mx-auto">Mais do que um restaurante, um lugar para criar memórias.</p>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Tradição e Modernidade</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Fundado em 2010, o Sabor & Arte nasceu do sonho de unir a culinária tradicional brasileira com técnicas modernas da gastronomia internacional.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Nossos chefs selecionam os ingredientes diariamente, priorizando produtores locais e orgânicos, garantindo que cada prato que chega à sua mesa seja uma explosão de frescor e sabor.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="bg-orange-50 p-4 rounded-xl">
                            <h3 className="text-3xl font-black text-primary mb-1">15+</h3>
                            <p className="text-sm font-medium text-gray-600">Anos de História</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                            <h3 className="text-3xl font-black text-primary mb-1">50k+</h3>
                            <p className="text-sm font-medium text-gray-600">Clientes Felizes</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600&auto=format&fit=crop" className="rounded-2xl shadow-lg mt-8" alt="Chef cooking" />
                     <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop" className="rounded-2xl shadow-lg" alt="Drinks" />
                </div>
            </div>
        </div>
    );
}