import React, { useState } from 'react';
import { useAppContext } from '../../App';

export const Reservation: React.FC = () => {
    const { tables } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        people: 2,
        tableId: '',
        notes: ''
    });
    const [success, setSuccess] = useState(false);

    // Filter available tables
    const availableTables = tables.filter(t => t.status === 'available');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
        // Here you would connect to an API or send an email
    };

    const inputClass = "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 transition-colors hover:bg-white focus:bg-white outline-none";

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Faça sua Reserva</h1>
                    <p className="text-gray-500">Garanta seu lugar e desfrute de uma experiência gastronômica inesquecível.</p>
                </div>

                {success ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in-up shadow-sm">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                            <span className="material-symbols-rounded text-4xl">check_circle</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reserva Solicitada!</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">Recebemos seu pedido de reserva. Nossa equipe entrará em contato via WhatsApp para confirmar a disponibilidade.</p>
                        <button 
                            onClick={() => { setSuccess(false); setFormData({...formData, tableId: ''}); }} 
                            className="text-white bg-primary hover:bg-primary-dark font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all"
                        >
                            Fazer nova reserva
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                                <div className="relative">
                                    <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">person</span>
                                    <input 
                                        required 
                                        type="text" 
                                        className={`${inputClass} pl-10`} 
                                        placeholder="Seu nome" 
                                        value={formData.name} 
                                        onChange={e => setFormData({...formData, name: e.target.value})} 
                                    />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Número de Pessoas</label>
                                <div className="relative">
                                    <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">group</span>
                                    <select 
                                        className={`${inputClass} pl-10`} 
                                        value={formData.people} 
                                        onChange={e => setFormData({...formData, people: parseInt(e.target.value)})}
                                    >
                                        {[1,2,3,4,5,6,7,8,10,12].map(n => <option key={n} value={n}>{n} Pessoas</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Data</label>
                                <input 
                                    required 
                                    type="date" 
                                    className={inputClass} 
                                    value={formData.date} 
                                    onChange={e => setFormData({...formData, date: e.target.value})} 
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Horário</label>
                                <input 
                                    required 
                                    type="time" 
                                    className={inputClass} 
                                    value={formData.time} 
                                    onChange={e => setFormData({...formData, time: e.target.value})} 
                                />
                            </div>
                        </div>

                        {/* Mesas Disponíveis Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
                                <span>Escolha sua Mesa (Disponíveis)</span>
                                <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-1 rounded">Tempo Real</span>
                            </label>
                            
                            {availableTables.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {availableTables.map(table => (
                                        <div 
                                            key={table.id}
                                            onClick={() => setFormData({...formData, tableId: table.id.toString()})}
                                            className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center justify-center transition-all ${
                                                formData.tableId === table.id.toString()
                                                    ? 'bg-primary text-white border-primary shadow-md scale-105'
                                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-primary hover:bg-white'
                                            }`}
                                        >
                                            <span className="material-symbols-rounded text-2xl mb-1">table_restaurant</span>
                                            <span className="font-bold text-sm">{table.name}</span>
                                            <span className="text-xs opacity-80">{table.seats} lug.</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-100 flex items-center gap-2">
                                    <span className="material-symbols-rounded">info</span>
                                    <p className="text-sm font-medium">Nenhuma mesa específica disponível no momento. Selecione "Qualquer mesa disponível" abaixo.</p>
                                </div>
                            )}

                            <div className="mt-3">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="tableSelection" 
                                        checked={formData.tableId === 'any'} 
                                        onChange={() => setFormData({...formData, tableId: 'any'})}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-600 font-medium group-hover:text-primary transition-colors">Prefiro qualquer mesa disponível</span>
                                </label>
                            </div>
                        </div>

                        <div className="mb-8">
                             <label className="block text-sm font-bold text-gray-700 mb-2">Observações Especiais</label>
                             <textarea 
                                className={`${inputClass} h-24 resize-none`} 
                                placeholder="Aniversário, alergias, cadeira de bebê..." 
                                value={formData.notes} 
                                onChange={e => setFormData({...formData, notes: e.target.value})}
                             ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>Confirmar Reserva</span>
                            <span className="material-symbols-rounded">arrow_forward</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}