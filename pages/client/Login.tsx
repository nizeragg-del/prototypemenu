import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppContext } from '../../App';

export const ClientLogin: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    whatsapp: ''
  });
  
  const { clientLogin, adminLogin } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for hardcoded Admin Credentials
    if (formData.email === 'admin@gmail.com' && formData.password === '@991864089a') {
        const adminUser = {
            name: "Administrador",
            email: formData.email,
            whatsapp: formData.whatsapp || "11999999999"
        };
        
        // Log in as both Admin AND Client
        adminLogin(); 
        clientLogin(adminUser);
        
        // Redirect directly to Admin Dashboard
        navigate('/admin/dashboard');
        return;
    }

    // Regular Client Auth Logic
    const user = {
        name: formData.name || "Cliente Teste",
        email: formData.email,
        whatsapp: formData.whatsapp || "11999999999"
    };

    clientLogin(user);

    // Redirect logic: Go back to where they came from (usually Cart logic)
    // or Home if accessed directly
    const from = location.state?.from?.pathname || '/';
    // If coming from cart logic (state has 'from'), we might want to re-open the cart on arrival
    navigate(from, { state: { openCart: true } });
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block transition-colors hover:bg-white focus:bg-white outline-none";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
       <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-orange-400"></div>

          <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl text-primary mb-4">
                <span className="material-symbols-rounded text-2xl">restaurant_menu</span>
              </Link>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                  {isRegistering ? 'Criar Conta' : 'Bem-vindo!'}
              </h1>
              <p className="text-gray-500">
                  {isRegistering ? 'Preencha seus dados para começar.' : 'Faça login para continuar seu pedido.'}
              </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
                    <div className="relative">
                        <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">person</span>
                        <input 
                            required
                            type="text"
                            placeholder="Seu nome"
                            className={inputClass}
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                  </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
                <div className="relative">
                    <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">mail</span>
                    <input 
                        required
                        type="email"
                        placeholder="seu@email.com"
                        className={inputClass}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
              </div>

              {isRegistering && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp</label>
                    <div className="relative">
                        <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">chat</span>
                        <input 
                            required
                            type="tel"
                            placeholder="(11) 99999-9999"
                            className={inputClass}
                            value={formData.whatsapp}
                            onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                        />
                    </div>
                  </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
                <div className="relative">
                    <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">lock</span>
                    <input 
                        required
                        type="password"
                        placeholder="••••••••"
                        className={inputClass}
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
              </div>

              {!isRegistering && (
                  <div className="flex justify-end">
                      <a href="#" className="text-sm font-bold text-primary hover:underline">Esqueceu a senha?</a>
                  </div>
              )}

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                  {isRegistering ? 'Cadastrar' : 'Entrar'}
                  <span className="material-symbols-rounded">{isRegistering ? 'person_add' : 'login'}</span>
              </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                  {isRegistering ? 'Já tem uma conta?' : 'Ainda não tem conta?'}
                  <button 
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="ml-2 font-bold text-primary hover:underline"
                  >
                      {isRegistering ? 'Fazer Login' : 'Cadastre-se'}
                  </button>
              </p>
          </div>
          
           <div className="mt-4 text-center">
              <button onClick={() => navigate(-1)} className="text-sm text-gray-400 hover:text-gray-600 font-medium">
                  Voltar para a loja
              </button>
          </div>
       </div>
    </div>
  );
};