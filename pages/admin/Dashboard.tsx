import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { useAppContext } from '../../App';
import { AppNotification } from '../../types';

const data = [
  { name: 'Seg', total: 4000 },
  { name: 'Ter', total: 3000 },
  { name: 'Qua', total: 5000 },
  { name: 'Qui', total: 2780 },
  { name: 'Sex', total: 6890 },
  { name: 'Sáb', total: 8390 },
  { name: 'Dom', total: 7490 },
];

const StatCard = ({ title, value, icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
     <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 bg-${color}-500`}></div>
     <div className="flex justify-between items-start z-10">
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
             <span className="material-symbols-rounded">{icon}</span>
        </div>
     </div>
     <div className="flex items-center gap-1 text-sm font-bold text-green-600 z-10">
        <span className="material-symbols-rounded text-base">trending_up</span>
        {trend}
     </div>
  </div>
);

const NotificationDropdown = ({ onClose }: { onClose: () => void }) => {
    const { notifications, markAllNotificationsAsRead } = useAppContext();

    return (
        <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in-up overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Notificações</h3>
                <button onClick={markAllNotificationsAsRead} className="text-xs font-bold text-primary hover:text-primary-dark">
                    Marcar tudo como lido
                </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <span className="material-symbols-rounded text-3xl mb-2 text-gray-300">notifications_off</span>
                        <p className="text-sm">Nenhuma notificação.</p>
                    </div>
                ) : (
                    notifications.map(notif => (
                        <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                    notif.type === 'order' ? 'bg-green-100 text-green-600' :
                                    notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    <span className="material-symbols-rounded text-lg">
                                        {notif.type === 'order' ? 'receipt_long' : notif.type === 'alert' ? 'warning' : 'info'}
                                    </span>
                                </div>
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className={`text-sm font-bold ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>{notif.title}</h4>
                                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">{notif.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-2 border-t border-gray-100 bg-gray-50/50 text-center">
                <button onClick={onClose} className="text-xs font-bold text-gray-500 hover:text-gray-700 w-full py-1">Fechar</button>
            </div>
        </div>
    );
};

export const AdminDashboard: React.FC = () => {
  const { unreadNotificationsCount } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="space-y-8" onClick={() => { if(showNotifications) setShowNotifications(false) }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
            <p className="text-gray-500">Resumo das atividades de hoje.</p>
        </div>
        <div className="flex items-center gap-3">
             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold border border-green-200">Loja Aberta</span>
             
             {/* Notification Bell */}
             <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-primary transition-colors relative shadow-sm hover:shadow-md"
                >
                    <span className="material-symbols-rounded">notifications</span>
                    {unreadNotificationsCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                            {unreadNotificationsCount}
                        </span>
                    )}
                </button>
                {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Faturamento Hoje" value="R$ 1.250,00" icon="payments" trend="12%" color="orange" />
        <StatCard title="Pedidos Hoje" value="42" icon="receipt_long" trend="5%" color="blue" />
        <StatCard title="Pendentes" value="5" icon="schedule" trend="Prioridade" color="yellow" />
        <StatCard title="Ticket Médio" value="R$ 29,76" icon="analytics" trend="2%" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Faturamento (7 dias)</h3>
                <span className="text-2xl font-bold text-gray-900">R$ 37.550</span>
            </div>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="total" stroke="#FF6B00" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Mais Vendidos</h3>
            <div className="space-y-4">
                {[
                    { name: 'Pizza Pepperoni', sales: 128, img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=100&h=100&fit=crop' },
                    { name: 'X-Burger Clássico', sales: 96, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop' },
                    { name: 'Coca-Cola 2L', sales: 85, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&h=100&fit=crop' },
                    { name: 'Batata Frita G', sales: 54, img: 'https://images.unsplash.com/photo-1630384060421-a4323ceca0ad?w=100&h=100&fit=crop' }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.sales} pedidos</p>
                        </div>
                        <span className={`text-sm font-bold ${idx === 0 ? 'text-primary' : 'text-gray-400'}`}>#{idx + 1}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};