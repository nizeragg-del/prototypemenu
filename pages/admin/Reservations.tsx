import React, { useState } from 'react';
import { useAppContext } from '../../App';
import { Table } from '../../types';

export const AdminReservations: React.FC = () => {
    const { tables, addTable, removeTable, toggleTableStatus } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTable, setNewTable] = useState({ name: '', seats: 2 });

    const availableCount = tables.filter(t => t.status === 'available').length;
    const reservedCount = tables.filter(t => t.status === 'reserved').length;
    const occupiedCount = tables.filter(t => t.status === 'occupied').length;

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTable.name) {
            addTable({
                name: newTable.name,
                seats: newTable.seats,
                status: 'available'
            });
            setIsModalOpen(false);
            setNewTable({ name: '', seats: 2 });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reservas e Mesas</h1>
                    <p className="text-gray-500">Gerencie a disponibilidade do salão.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <span className="material-symbols-rounded">add</span>
                    Nova Mesa
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                        <span className="material-symbols-rounded">check_circle</span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase">Livres</p>
                        <p className="text-2xl font-black text-gray-900">{availableCount}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                         <span className="material-symbols-rounded">event_busy</span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase">Reservadas</p>
                        <p className="text-2xl font-black text-gray-900">{reservedCount}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                         <span className="material-symbols-rounded">groups</span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase">Ocupadas</p>
                        <p className="text-2xl font-black text-gray-900">{occupiedCount}</p>
                    </div>
                </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {tables.map(table => (
                    <div key={table.id} className={`p-4 rounded-xl border transition-all ${
                        table.status === 'available' 
                            ? 'bg-white border-green-200 shadow-sm hover:border-green-400' 
                            : table.status === 'reserved'
                                ? 'bg-red-50 border-red-200 shadow-sm'
                                : 'bg-gray-50 border-gray-200'
                    }`}>
                        <div className="flex justify-between items-start mb-2">
                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                 table.status === 'available' ? 'bg-green-100 text-green-700' : 
                                 table.status === 'reserved' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'
                             }`}>
                                 {table.seats}
                             </div>
                             <button onClick={() => removeTable(table.id)} className="text-gray-400 hover:text-red-500">
                                 <span className="material-symbols-rounded text-lg">delete</span>
                             </button>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate" title={table.name}>{table.name}</h3>
                        <p className={`text-xs font-bold uppercase mb-4 ${
                             table.status === 'available' ? 'text-green-600' : 
                             table.status === 'reserved' ? 'text-red-600' : 'text-gray-500'
                        }`}>
                            {table.status === 'available' ? 'Disponível' : table.status === 'reserved' ? 'Reservada' : 'Ocupada'}
                        </p>
                        
                        <button 
                            onClick={() => toggleTableStatus(table.id)}
                            className={`w-full py-2 rounded-lg text-xs font-bold transition-colors ${
                                table.status === 'available' 
                                    ? 'bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600'
                                    : 'bg-white border border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200'
                            }`}
                        >
                            {table.status === 'available' ? 'Marcar Reservada' : 'Liberar Mesa'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 p-6 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Nova Mesa</h2>
                            <button onClick={() => setIsModalOpen(false)}><span className="material-symbols-rounded text-gray-500">close</span></button>
                        </div>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Identificação da Mesa</label>
                                <input 
                                    required
                                    autoFocus
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                                    placeholder="Ex: Mesa 12 ou VIP"
                                    value={newTable.name}
                                    onChange={e => setNewTable({...newTable, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Capacidade (Lugares)</label>
                                <select 
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                                    value={newTable.seats}
                                    onChange={e => setNewTable({...newTable, seats: parseInt(e.target.value)})}
                                >
                                    {[2,4,6,8,10,12].map(n => <option key={n} value={n}>{n} Lugares</option>)}
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl shadow-lg transition-colors">
                                Adicionar Mesa
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};