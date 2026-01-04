import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../App';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { adminLogin } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    if (email && password) {
        adminLogin();
        navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-4xl min-h-[600px]">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block relative">
            <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" 
                alt="Restaurant Interior" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] flex flex-col justify-center px-12 text-white">
                <h2 className="text-4xl font-black mb-4">Gerencie seu restaurante com excelência.</h2>
                <p className="text-lg font-medium text-white/90">Controle total sobre pedidos, cardápio e entregas em um só lugar.</p>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative">
            {/* Back to Home Link */}
            <div className="absolute top-6 left-8 md:left-12">
                <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm">
                    <span className="material-symbols-rounded text-lg">arrow_back</span>
                    Voltar para o Site
                </Link>
            </div>

            <div className="flex-1 flex flex-col justify-center mt-8">
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                        <span className="material-symbols-rounded">admin_panel_settings</span>
                        <span className="text-xs font-bold tracking-widest uppercase">Admin Portal</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h1>
                    <p className="text-gray-500 mt-2">Faça login para acessar o painel administrativo.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                        <div className="relative">
                            <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">mail</span>
                            <input 
                                type="email" 
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block transition-colors hover:bg-white focus:bg-white outline-none"
                                placeholder="admin@restaurante.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
                        <div className="relative">
                            <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">lock</span>
                            <input 
                                type="password" 
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block transition-colors hover:bg-white focus:bg-white outline-none"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" />
                            <span className="text-gray-600 font-medium">Lembrar-me</span>
                        </label>
                        <a href="#" className="text-primary hover:underline font-bold">Esqueceu a senha?</a>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
                    >
                        Entrar no Painel
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};