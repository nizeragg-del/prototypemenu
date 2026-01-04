import React from 'react';

export const Contact: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-gray-900 mb-10 text-center">Fale Conosco</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                         <span className="material-symbols-rounded">phone</span>
                     </div>
                     <h3 className="font-bold text-xl mb-2">Telefone</h3>
                     <p className="text-gray-600">(11) 99999-9999</p>
                     <p className="text-gray-600">(11) 3333-3333</p>
                 </div>
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                         <span className="material-symbols-rounded">location_on</span>
                     </div>
                     <h3 className="font-bold text-xl mb-2">Endereço</h3>
                     <p className="text-gray-600">Av. Paulista, 1000</p>
                     <p className="text-gray-600">São Paulo - SP</p>
                 </div>
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                         <span className="material-symbols-rounded">mail</span>
                     </div>
                     <h3 className="font-bold text-xl mb-2">E-mail</h3>
                     <p className="text-gray-600">contato@saborarte.com</p>
                     <p className="text-gray-600">reservas@saborarte.com</p>
                 </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-4 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Envie uma mensagem</h2>
                        <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); alert("Mensagem enviada com sucesso!")}}>
                            <input type="text" placeholder="Seu Nome" className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary" required />
                            <input type="email" placeholder="Seu E-mail" className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary" required />
                            <textarea placeholder="Sua Mensagem" className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary h-32" required></textarea>
                            <button className="bg-gray-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-800 transition-colors">Enviar Mensagem</button>
                        </form>
                    </div>
                    <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
                         {/* Placeholder for Map */}
                         <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Map Location" />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-colors">
                             <span className="bg-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                                 <span className="material-symbols-rounded text-primary">location_on</span>
                                 Ver no Mapa
                             </span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}