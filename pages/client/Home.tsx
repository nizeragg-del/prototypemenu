import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useAppContext } from '../../App';

// Unified Categories matching FullMenu
const CATEGORIES = ['Todos', 'Destaques', 'Combos', 'Lanches', 'Pratos', 'Porções', 'Sobremesas', 'Bebidas'];

// Full Data matching FullMenu.tsx
const MENU_PRODUCTS: Product[] = [
    {
        id: 101,
        name: "Super Burger Artesanal",
        description: "Pão brioche, 180g de blend especial, queijo cheddar inglês, bacon crocante, alface, tomate e maionese da casa.",
        price: 36.90,
        category: "Lanches",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        isPopular: true
    },
    {
        id: 102,
        name: "Costela BBQ Premium",
        description: "Costela suína marinada por 24h, assada lentamente e finalizada com molho barbecue artesanal. Acompanha fritas.",
        price: 64.90,
        category: "Pratos",
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa2e7?q=80&w=800&auto=format&fit=crop",
        isPopular: true
    },
    {
        id: 103,
        name: "Parmegiana de Filet",
        description: "Filet Mignon empanado na farinha panko, molho de tomate rústico e gratinado com mix de queijos.",
        price: 48.90,
        category: "Pratos",
        image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 104,
        name: "Ancho com Risoto",
        description: "Bife de Ancho grelhado na brasa, servido com risoto de funghi secchi e queijo parmesão.",
        price: 58.90,
        category: "Pratos",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 105,
        name: "Salmão Grelhado",
        description: "Posta de salmão grelhada com crosta de ervas, acompanhada de legumes salteados na manteiga.",
        price: 52.90,
        category: "Pratos",
        image: "https://images.unsplash.com/photo-1485921325833-c519f76c4974?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 106,
        name: "Suco Natural",
        description: "Laranja, Limão ou Melancia (500ml)",
        price: 12.00,
        category: "Bebidas",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 107,
        name: "Refrigerante Lata",
        description: "Coca-Cola, Guaraná, Sprite (350ml)",
        price: 6.50,
        category: "Bebidas",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 108,
        name: "Drink da Casa",
        description: "Gin, tônica, hibisco e especiarias.",
        price: 24.90,
        category: "Bebidas",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
    },
     {
        id: 109,
        name: "Combo Família",
        description: "2 Burgers, 1 Pizza Grande e 1 Refrigerante 2L.",
        price: 99.90,
        category: "Combos",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 110,
        name: "Porção de Pastéis",
        description: "10 unidades (Carne e Queijo).",
        price: 28.00,
        category: "Porções",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop"
    },
     {
        id: 111,
        name: "Petit Gateau",
        description: "Bolo de chocolate com recheio cremoso e sorvete de baunilha.",
        price: 18.90,
        category: "Sobremesas",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 112,
        name: "Double Cheddar Bacon",
        description: "Dois hambúrgueres de 150g, dobro de cheddar e farofa de bacon.",
        price: 42.90,
        category: "Lanches",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop",
        isPopular: true
    }
];

export const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const navigate = useNavigate();
  const { addToCart } = useAppContext();

  // Filter logic updated to handle "Todos" and "Destaques" correctly
  const filteredProducts = activeCategory === 'Todos'
    ? MENU_PRODUCTS
    : activeCategory === 'Destaques'
      ? MENU_PRODUCTS.filter(p => p.isPopular)
      : MENU_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pb-20 bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Text */}
          <div className="space-y-8 animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-bold tracking-wide uppercase border border-orange-100">
                <span className="material-symbols-rounded text-lg">verified</span>
                Aberto Agora
             </div>
             
             <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1]">
                O melhor da <br/>
                gastronomia na sua <span className="text-primary">casa.</span>
             </h1>
             
             <p className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed font-light">
                Ingredientes frescos, receitas tradicionais e entrega rápida para garantir sua satisfação em cada mordida.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={() => navigate('/cardapio')}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg"
                >
                  <span className="material-symbols-rounded">menu_book</span>
                  Ver Cardápio Completo
                </button>
                
                <button className="bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 text-lg hover:bg-gray-50">
                   <span className="material-symbols-rounded">call</span>
                   Fazer Reserva
                </button>
             </div>
             
             <div className="flex items-center gap-8 pt-6 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-primary">schedule</span>
                    30-45 min entrega
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-yellow-500 fill-1">star</span>
                    4.9 (2k+ avaliações)
                </div>
             </div>
          </div>

          {/* Right Column - Image Card */}
          <div className="relative mt-12 md:mt-0">
             <div className="bg-[#1f4e45] rounded-[30px] md:rounded-[40px] p-8 md:p-12 relative overflow-visible min-h-[400px] md:min-h-[500px] flex items-center justify-center shadow-2xl">
                {/* Dish Image */}
                <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" 
                    alt="Prato do Dia"
                    className="w-full h-auto object-cover rounded-full shadow-2xl transition-transform duration-700 hover:scale-105 z-10" 
                    style={{ maxWidth: '400px', filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.25))' }}
                />

                {/* Offer Badge/Card */}
                <div className="absolute -bottom-6 md:-bottom-8 lg:bottom-8 left-6 right-6 md:left-8 md:right-8 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-2xl shadow-xl z-20 flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-rounded text-xl md:text-2xl">local_fire_department</span>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm md:text-base">Oferta do Dia</p>
                            <p className="text-[10px] md:text-xs text-gray-500 font-medium">Combo Família com 20% OFF</p>
                        </div>
                    </div>
                    <span className="text-lg md:text-xl font-black text-primary">R$ 89,90</span>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'rocket_launch', title: 'Entrega Flash', desc: 'Seu pedido chega quentinho e no prazo combinado.' },
            { icon: 'eco', title: 'Ingredientes Frescos', desc: 'Produtores locais para garantir o máximo de sabor.' },
            { icon: 'verified_user', title: 'Segurança Total', desc: 'Protocolos rigorosos de higiene e embalagens lacradas.' },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-rounded text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
              <h2 className="text-3xl font-bold text-gray-900">Nosso Cardápio</h2>
              <p className="text-gray-500 mt-1">Explore nossas delícias e peça agora.</p>
          </div>
          <Link to="/cardapio" className="hidden md:flex items-center text-primary font-bold hover:underline gap-1">
              Ver tudo <span className="material-symbols-rounded">arrow_forward</span>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-6 hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
                {filteredProducts.map((product) => (
                    <div 
                        key={product.id}
                        className="snap-center shrink-0 w-[280px] md:w-[320px] group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                    <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                        <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.isPopular && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md uppercase tracking-wider">
                            Mais Pedido
                        </div>
                        )}
                        {product.rating && (
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                            <span className="material-symbols-rounded text-yellow-500 text-sm fill-1">star</span>
                            {product.rating}
                        </div>
                        )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                            <span className="text-xs text-gray-400 font-medium">{product.category}</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-black text-gray-900">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product, 1);
                            }}
                            className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm"
                        >
                            <span className="material-symbols-rounded">add</span>
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                
                {/* "See More" Card at the end of carousel */}
                <div className="snap-center shrink-0 w-[150px] md:w-[200px] flex items-center justify-center">
                    <Link to="/cardapio" className="group flex flex-col items-center gap-3 text-gray-500 hover:text-primary transition-colors p-4">
                        <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                            <span className="material-symbols-rounded text-3xl">arrow_forward</span>
                        </div>
                        <span className="font-bold text-sm">Ver Cardápio Completo</span>
                    </Link>
                </div>
            </div>
            
            {/* Fade effect on right for mobile indication */}
            <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
        </div>

      </section>
    </div>
  );
};