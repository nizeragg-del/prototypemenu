import React, { useState } from 'react';

// Interfaces state management within the component for "Interactive" demo
interface OrderType {
    id: string;
    status: 'new' | 'preparing' | 'delivery' | 'completed';
    time: string;
    items: string[];
    customer: string;
    total: string;
    isNew?: boolean;
}

const MOCK_ORDERS: OrderType[] = [
    { id: "1024", status: "new", time: "5 min", items: ['2x X-Bacon Artesanal', '1x Batata Frita G'], customer: "João Silva", total: "R$ 86,00", isNew: true },
    { id: "1025", status: "new", time: "1 min", items: ['1x Lasanha Bolonhesa', '1x Suco Laranja'], customer: "Ana Clara", total: "R$ 48,00" },
    { id: "1023", status: "preparing", time: "15 min", items: ['1x Pizza Calabresa', '1x Guaraná 2L'], customer: "Maria Oliveira", total: "R$ 57,00" },
    { id: "1022", status: "delivery", time: "32 min", items: ['3x Combo Kids'], customer: "Carlos M.", total: "R$ 90,00" },
];

interface OrderCardProps {
    order: OrderType;
    onStatusChange: (id: string, newStatus: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
    let statusColor = '';
    let statusText = '';
    let actionButton = null;

    switch(order.status) {
        case 'new': 
            statusColor = 'bg-primary/10 text-primary'; 
            statusText = 'Novo'; 
            actionButton = <button onClick={() => onStatusChange(order.id, 'preparing')} className="h-9 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-sm flex-1">Aceitar</button>;
            break;
        case 'preparing': 
            statusColor = 'bg-orange-100 text-orange-700'; 
            statusText = 'Em Preparo'; 
            actionButton = <button onClick={() => onStatusChange(order.id, 'delivery')} className="h-9 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold shadow-sm flex-1">Despachar</button>;
            break;
        case 'delivery': 
            statusColor = 'bg-blue-100 text-blue-700'; 
            statusText = 'A Caminho'; 
            actionButton = <button onClick={() => onStatusChange(order.id, 'completed')} className="h-9 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold shadow-sm flex-1">Concluir</button>;
            break;
        case 'completed':
            statusColor = 'bg-green-100 text-green-700';
            statusText = 'Concluído';
            break;
        default: statusColor = 'bg-gray-100 text-gray-600'; statusText = order.status;
    }

    if (order.status === 'completed') return null; // Hide completed in this view for simplicity

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 border-l-4 ${order.status === 'new' ? 'border-l-primary' : order.status === 'preparing' ? 'border-l-orange-300' : 'border-l-blue-400'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${statusColor}`}>{statusText}</span>
                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <span className="material-symbols-rounded text-[14px]">schedule</span> {order.time}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">#{order.id}</h3>
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <span className="material-symbols-rounded text-lg">person</span>
                </div>
            </div>

            <div className="py-3 border-y border-gray-50 flex flex-col gap-1">
                {order.items.map((item, idx) => (
                    <div key={idx} className="text-sm flex justify-between">
                        <span className="text-gray-800 font-medium">{item}</span>
                    </div>
                ))}
                {order.isNew && (
                    <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded flex gap-1">
                        <span className="material-symbols-rounded text-[14px]">info</span>
                        Sem cebola, por favor.
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-500">Cliente</p>
                    <p className="text-sm font-bold text-gray-900">{order.customer}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-lg font-bold text-gray-900">{order.total}</p>
                </div>
            </div>

            <div className="flex gap-2 mt-1">
                <button className="h-9 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 flex-1">Detalhes</button>
                {actionButton}
            </div>
        </div>
    );
};

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState('Todos');

  const handleStatusChange = (id: string, newStatus: string) => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus as OrderType['status'] } : o));
  };

  const filteredOrders = activeTab === 'Todos' 
    ? orders 
    : activeTab === 'Novos' 
        ? orders.filter(o => o.status === 'new')
        : activeTab === 'Em Preparo'
            ? orders.filter(o => o.status === 'preparing')
            : orders.filter(o => o.status === 'delivery');

  return (
    <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Pedidos</h1>
                <p className="text-gray-500">Fluxo em tempo real.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
                 {['Todos', 'Novos', 'Em Preparo', 'Entrega'].map(tab => (
                     <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'}`}
                     >
                         {tab}
                     </button>
                 ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.filter(o => o.status !== 'completed').map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))}
            {filteredOrders.filter(o => o.status !== 'completed').length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                    <span className="material-symbols-rounded text-4xl mb-2">check_circle</span>
                    <p>Nenhum pedido nesta etapa.</p>
                </div>
            )}
        </div>
    </div>
  );
};