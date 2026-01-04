import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { CartItem, Product, Table, ClientUser, PromoBanner, AppNotification } from './types';
import { Home } from './pages/client/Home';
import { ProductDetails } from './pages/client/ProductDetails';
import { FullMenu } from './pages/client/FullMenu';
import { Reservation } from './pages/client/Reservation';
import { About } from './pages/client/About';
import { Contact } from './pages/client/Contact';
import { ClientLogin } from './pages/client/Login';
// Removed AdminLogin import
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminOrders } from './pages/admin/Orders';
import { AdminMenu } from './pages/admin/Menu';
import { AdminSettings } from './pages/admin/Settings';
import { AdminReservations } from './pages/admin/Reservations';

// --- Types ---
export interface AppSettings {
  restaurantName: string;
  restaurantAddress: string;
  deliveryFeePerKm: number; // Changed from fixed fee to per Km
  minOrder: number;
  estimatedTime: string;
  isOpen: boolean;
}

// --- Context ---
interface AppContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity: number, notes?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  
  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: () => void;
  adminLogout: () => void;
  
  // Client Auth
  clientUser: ClientUser | null;
  clientLogin: (user: ClientUser) => void;
  clientLogout: () => void;

  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  
  // Table Management
  tables: Table[];
  addTable: (table: Omit<Table, 'id'>) => void;
  removeTable: (id: number) => void;
  toggleTableStatus: (id: number) => void;

  // Promo Banner
  promoBanner: PromoBanner;
  updatePromoBanner: (banner: Partial<PromoBanner>) => void;

  // Notifications
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'read' | 'time'>) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);

// --- Cart Sidebar Component ---
export const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, settings, clientUser, setIsCartOpen: setGlobalCartOpen } = useAppContext();
  const [address, setAddress] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<{distance: number, cost: number} | null>(null);
  
  // Guest Modal State
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Reset delivery info when cart opens/closes
  useEffect(() => {
    if(!isCartOpen) {
       // Optional: clear address or keep it
    }
  }, [isCartOpen]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (deliveryInfo?.cost || 0);
  const whatsappNumber = "5511999999999"; 

  const handleCalculateDelivery = () => {
      if (!address) return;
      
      setIsCalculating(true);
      // Simulate API call to Google Maps / Distance Matrix
      setTimeout(() => {
          // Mock logic: generate a random distance between 1.5km and 8.0km
          const mockDistance = Math.floor(Math.random() * (80 - 15 + 1) + 15) / 10;
          const cost = mockDistance * settings.deliveryFeePerKm;
          
          setDeliveryInfo({
              distance: mockDistance,
              cost: parseFloat(cost.toFixed(2))
          });
          setIsCalculating(false);
      }, 1500);
  };

  const processWhatsAppCheckout = (customerName: string, customerPhone?: string) => {
    let message = `Olá! Gostaria de fazer um pedido no *${settings.restaurantName}*:\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    if(customerPhone) message += `*WhatsApp:* ${customerPhone}\n`;
    message += `--------------------------------\n`;

    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        if(item.notes) message += `   (Obs: ${item.notes})\n`;
    });
    
    message += `\n*Subtotal: R$ ${subtotal.toFixed(2)}*`;
    
    if (deliveryInfo) {
        message += `\n\n*Dados de Entrega:*`;
        message += `\nEndereço: ${address}`;
        message += `\nDistância: ${deliveryInfo.distance}km`;
        message += `\nTaxa de Entrega: R$ ${deliveryInfo.cost.toFixed(2)}`;
    }
    
    message += `\n\n*Total Final: R$ ${total.toFixed(2)}*`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCheckoutClick = () => {
      if (!deliveryInfo && address) {
        alert("Por favor, calcule a entrega antes de finalizar.");
        return;
      }
      if (!address) {
          alert("Por favor, informe o endereço de entrega.");
          return;
      }

      if (clientUser) {
          processWhatsAppCheckout(clientUser.name, clientUser.whatsapp);
      } else {
          // Open guest modal
          setIsGuestModalOpen(true);
      }
  };

  const handleGuestConfirm = (e: React.FormEvent) => {
      e.preventDefault();
      if(guestName.trim()) {
          setIsGuestModalOpen(false);
          processWhatsAppCheckout(guestName);
          setGuestName('');
      }
  };

  const handleLoginRedirect = () => {
      setIsCartOpen(false);
      navigate('/login', { state: { from: location } });
  };

  return (
    <>
    <div className={`fixed inset-0 z-[60] flex justify-end transition-visibility duration-300 ${isCartOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
             <span className="material-symbols-rounded text-primary">shopping_cart</span>
             Seu Pedido
           </h2>
           <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
             <span className="material-symbols-rounded">close</span>
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
           {cart.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
               <span className="material-symbols-rounded text-6xl text-gray-200 mb-4">remove_shopping_cart</span>
               <p className="text-lg font-medium">Seu carrinho está vazio</p>
               <p className="text-sm">Adicione itens deliciosos do nosso cardápio!</p>
             </div>
           ) : (
             <>
                <div className="space-y-4">
                    {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                            <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.notes ? `Obs: ${item.notes}` : item.description.slice(0,30)+'...'}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="font-bold text-primary">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-primary">-</button>
                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-primary">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Address & Delivery Calculation */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="material-symbols-rounded text-primary">local_shipping</span>
                        Entrega
                    </h3>
                    <div className="flex gap-2 mb-3">
                        <input 
                            type="text" 
                            placeholder="Digite seu endereço e número..." 
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-primary outline-none"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                                setDeliveryInfo(null); // Reset calc on change
                            }}
                        />
                        <button 
                            onClick={handleCalculateDelivery}
                            disabled={!address || isCalculating}
                            className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-1"
                        >
                            {isCalculating ? (
                                <span className="material-symbols-rounded animate-spin text-lg">progress_activity</span>
                            ) : (
                                <span className="material-symbols-rounded text-lg">search</span>
                            )}
                        </button>
                    </div>

                    {deliveryInfo && (
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-sm flex justify-between items-center text-green-800 animate-fade-in-up">
                            <div className="flex flex-col">
                                <span className="font-bold">Rota Calculada ({deliveryInfo.distance}km)</span>
                                <span className="text-xs">De: {settings.restaurantAddress}</span>
                            </div>
                            <span className="font-bold text-lg">R$ {deliveryInfo.cost.toFixed(2)}</span>
                        </div>
                    )}
                     {!deliveryInfo && address.length > 5 && !isCalculating && (
                         <p className="text-xs text-orange-500 mt-1">* Clique na lupa para calcular o frete</p>
                    )}
                </div>
             </>
           )}
        </div>

        {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {deliveryInfo && (
                         <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Taxa de Entrega</span>
                            <span>R$ {deliveryInfo.cost.toFixed(2).replace('.', ',')}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-gray-900 font-bold">Total</span>
                        <span className="text-2xl font-black text-gray-900">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                
                {/* Checkout Buttons */}
                {clientUser ? (
                    <button 
                        onClick={handleCheckoutClick}
                        disabled={address && !deliveryInfo}
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                        <span className="text-xl">📱</span>
                        Finalizar no WhatsApp
                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={handleLoginRedirect}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <span className="material-symbols-rounded">login</span>
                            Fazer Login
                        </button>
                        <button 
                            onClick={handleCheckoutClick}
                            disabled={address && !deliveryInfo}
                            className="bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 text-sm"
                        >
                            Finalizar sem Login
                        </button>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>

    {/* Guest Info Modal */}
    {isGuestModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsGuestModalOpen(false)}></div>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 p-6 animate-fade-in-up">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Seus Dados</h2>
                    <button onClick={() => setIsGuestModalOpen(false)}><span className="material-symbols-rounded text-gray-500">close</span></button>
                </div>
                <form onSubmit={handleGuestConfirm}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Qual é o seu nome?</label>
                        <input 
                            required
                            autoFocus
                            type="text"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary outline-none"
                            placeholder="Digite seu nome..."
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                        <span>Confirmar e Enviar</span>
                        <span className="material-symbols-rounded">send</span>
                    </button>
                </form>
            </div>
        </div>
    )}
    </>
  );
};

// --- Layouts ---
const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, setIsCartOpen, clientUser, clientLogout, isAdminAuthenticated } = useAppContext();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();

  // Re-open cart if coming back from login with intent
  useEffect(() => {
     if (location.state?.openCart) {
         setIsCartOpen(true);
         // Clear state to avoid reopening on refresh
         window.history.replaceState({}, document.title);
     }
  }, [location, setIsCartOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                <span className="material-symbols-rounded text-primary text-2xl group-hover:text-white transition-colors">restaurant_menu</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Sabor & Arte</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                <Link to="/cardapio" className={`text-sm font-medium transition-colors ${location.pathname === '/cardapio' ? 'text-primary font-bold' : 'text-gray-600 hover:text-gray-900'}`}>Cardápio</Link>
                <Link to="/sobre" className={`text-sm font-medium transition-colors ${location.pathname === '/sobre' ? 'text-primary font-bold' : 'text-gray-600 hover:text-gray-900'}`}>Sobre</Link>
                <Link to="/contato" className={`text-sm font-medium transition-colors ${location.pathname === '/contato' ? 'text-primary font-bold' : 'text-gray-600 hover:text-gray-900'}`}>Contato</Link>
                <Link to="/reservas" className={`text-sm font-medium transition-colors ${location.pathname === '/reservas' ? 'text-primary font-bold' : 'text-gray-600 hover:text-gray-900'}`}>Reservas</Link>
                
                <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                    {/* Admin Link if Authenticated */}
                    {isAdminAuthenticated && (
                        <Link 
                            to="/admin/dashboard" 
                            className="flex items-center gap-1 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors mr-2"
                        >
                            <span className="material-symbols-rounded text-primary">admin_panel_settings</span>
                            Painel Admin
                        </Link>
                    )}

                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors group"
                    >
                        <span className="material-symbols-rounded group-hover:text-primary transition-colors">shopping_cart</span>
                        {totalItems > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full border-2 border-white">
                            {totalItems}
                        </span>
                        )}
                    </button>
                    
                    {clientUser ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-700">Olá, {clientUser.name.split(' ')[0]}</span>
                            <button 
                                onClick={clientLogout}
                                className="text-xs font-bold text-red-500 hover:text-red-700"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Nav Button */}
            <div className="flex md:hidden items-center gap-4">
               <button 
                 onClick={() => setIsCartOpen(true)}
                 className="relative p-2 text-gray-600"
                >
                    <span className="material-symbols-rounded">shopping_cart</span>
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                            {totalItems}
                        </span>
                    )}
               </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <CartSidebar />
      <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="material-symbols-rounded text-primary">restaurant</span>
            <span className="text-xl font-bold">Sabor & Arte</span>
          </div>
          <div className="flex justify-center gap-6 mb-8 text-sm text-gray-400">
             <Link to="/cardapio" className="hover:text-white">Cardápio</Link>
             <Link to="/sobre" className="hover:text-white">Sobre Nós</Link>
             <Link to="/contato" className="hover:text-white">Contato</Link>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Sabor & Arte. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminLogout } = useAppContext();
  const location = useLocation();

  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: 'orders', label: 'Pedidos', path: '/admin/orders' },
    { icon: 'restaurant_menu', label: 'Cardápio', path: '/admin/menu' },
    { icon: 'table_restaurant', label: 'Reservas', path: '/admin/reservations' },
    { icon: 'settings', label: 'Configurações', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-rounded text-white text-sm">admin_panel_settings</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`material-symbols-rounded ${location.pathname === item.path ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-100 px-4">
               <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                   <span className="material-symbols-rounded">storefront</span>
                   Ver Loja
               </Link>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={adminLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="material-symbols-rounded">logout</span>
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 md:hidden">
           <div className="font-bold text-gray-800">Sabor & Arte Admin</div>
           <button onClick={adminLogout} className="text-red-600">
             <span className="material-symbols-rounded">logout</span>
           </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminAuthenticated } = useAppContext();
  // Redirect to the main login if not authenticated as admin
  if (!isAdminAuthenticated) return <Navigate to="/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
};

// --- App Component ---
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [clientUser, setClientUser] = useState<ClientUser | null>(null);
  
  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>([
      { id: '1', title: 'Novo Pedido', message: 'Pedido #1025 recebido de Ana Clara.', time: 'Há 5 min', read: false, type: 'order' },
      { id: '2', title: 'Estoque Baixo', message: 'Coca-Cola lata está com poucas unidades.', time: 'Há 1 hora', read: true, type: 'alert' }
  ]);

  const addNotification = (notification: Omit<AppNotification, 'id' | 'read' | 'time'>) => {
      const newNotif: AppNotification = {
          ...notification,
          id: Date.now().toString(),
          read: false,
          time: 'Agora'
      };
      setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Simulate incoming notification
  useEffect(() => {
      const timer = setTimeout(() => {
          if (isAdminAuthenticated) {
             addNotification({
                 title: 'Novo Pedido Chegou!',
                 message: 'Pedido #1026 - R$ 125,90 (3 itens)',
                 type: 'order'
             });
          }
      }, 5000);
      return () => clearTimeout(timer);
  }, [isAdminAuthenticated]);
  
  // Table Management State
  const [tables, setTables] = useState<Table[]>([
      { id: 1, name: 'Mesa 01', seats: 2, status: 'available' },
      { id: 2, name: 'Mesa 02', seats: 4, status: 'reserved' },
      { id: 3, name: 'Mesa 03', seats: 4, status: 'available' },
      { id: 4, name: 'Mesa 04', seats: 6, status: 'available' },
      { id: 5, name: 'Mesa 05', seats: 2, status: 'available' },
      { id: 6, name: 'VIP 01', seats: 8, status: 'occupied' },
  ]);

  // Promo Banner State
  const [promoBanner, setPromoBanner] = useState<PromoBanner>({
      title: 'Combo Monster Grill',
      subtitle: 'Experimente o nosso maior hambúrguer com cheddar duplo e bacon crocante.',
      badge: 'Promoção da Semana',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1200&auto=format&fit=crop',
      isVisible: true
  });

  const updatePromoBanner = (banner: Partial<PromoBanner>) => {
      setPromoBanner(prev => ({ ...prev, ...banner }));
  };

  // Initialize default settings
  const [settings, setSettings] = useState<AppSettings>({
      restaurantName: 'Sabor & Arte',
      restaurantAddress: 'Av. Paulista, 1000 - São Paulo/SP',
      deliveryFeePerKm: 2.50, // Default fee per Km
      minOrder: 20.00,
      estimatedTime: '30-45',
      isOpen: true
  });

  const updateSettings = (newSettings: Partial<AppSettings>) => {
      setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addToCart = (product: Product, quantity: number, notes?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        setIsCartOpen(true);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, notes }
            : item
        );
      }
      setIsCartOpen(true);
      return [...prev, { ...product, quantity, notes }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
      setCart(prev => prev.map(item => {
          if (item.id === id) {
              const newQty = Math.max(0, item.quantity + delta);
              return { ...item, quantity: newQty };
          }
          return item;
      }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const adminLogin = () => setIsAdminAuthenticated(true);
  const adminLogout = () => setIsAdminAuthenticated(false);

  const clientLogin = (user: ClientUser) => setClientUser(user);
  const clientLogout = () => {
    setClientUser(null);
    setIsAdminAuthenticated(false); // Also logout from admin if client logs out
  }

  // Table Functions
  const addTable = (table: Omit<Table, 'id'>) => {
      setTables(prev => [...prev, { ...table, id: Date.now() }]);
  };

  const removeTable = (id: number) => {
      setTables(prev => prev.filter(t => t.id !== id));
  };

  const toggleTableStatus = (id: number) => {
      setTables(prev => prev.map(t => {
          if (t.id === id) {
              return { ...t, status: t.status === 'available' ? 'reserved' : 'available' };
          }
          return t;
      }));
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        clientUser,
        clientLogin,
        clientLogout,
        settings,
        updateSettings,
        tables,
        addTable,
        removeTable,
        toggleTableStatus,
        promoBanner,
        updatePromoBanner,
        notifications,
        addNotification,
        markAllNotificationsAsRead,
        unreadNotificationsCount
      }}
    >
      <HashRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/product/:id" element={<ClientLayout><ProductDetails /></ClientLayout>} />
          <Route path="/cardapio" element={<FullMenu />} />
          <Route path="/sobre" element={<ClientLayout><About /></ClientLayout>} />
          <Route path="/contato" element={<ClientLayout><Contact /></ClientLayout>} />
          <Route path="/reservas" element={<ClientLayout><Reservation /></ClientLayout>} />
          <Route path="/login" element={<ClientLogin />} />

          {/* Admin Routes (Protected) - No specific Admin login page anymore */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/menu" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
          <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservations /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
}