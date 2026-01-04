import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, CartSidebar } from '../../App';
import { Product } from '../../types';

// Improved Mock Data with Professional Unsplash Images and Correct Categories
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

const CATEGORY_LINKS = [
    { id: 'destaques', label: 'Destaques', icon: 'star' },
    { id: 'combos', label: 'Combos', icon: 'lunch_dining' },
    { id: 'lanches', label: 'Lanches', icon: 'fastfood' },
    { id: 'pratos', label: 'Pratos', icon: 'restaurant' },
    { id: 'porcoes', label: 'Porções', icon: 'tapas' },
    { id: 'sobremesas', label: 'Sobremesas', icon: 'icecream' },
    { id: 'bebidas', label: 'Bebidas', icon: 'wine_bar' }
];

const ProductSection = ({ title, id, products, addToCart }: any) => {
    if (products.length === 0) return null;
    return (
        <section className="flex flex-col gap-5 scroll-mt-32" id={id}>
            <div className="flex items-center justify-between border-b border-[#f4f2f0] pb-2">
                <h2 className="text-[#181411] text-2xl font-bold leading-tight">{title}</h2>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${id === 'bebidas' ? 'xl:grid-cols-4' : 'xl:grid-cols-3'} gap-6`}>
                {products.map((product: Product) => (
                    <div key={product.id} className="group bg-white rounded-xl shadow-sm border border-[#f4f2f0] overflow-hidden hover:shadow-md transition-all flex flex-col">
                        <div className={`relative ${id === 'bebidas' ? 'h-40' : 'h-48'} overflow-hidden`}>
                             <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                             {product.isPopular && <div className="absolute top-3 left-3 bg-[#ec6d13] text-white text-xs font-bold px-2 py-1 rounded">Mais Pedido</div>}
                        </div>
                        <div className="p-4 flex flex-col gap-2 flex-1">
                             <h3 className="text-lg font-bold text-[#181411]">{product.name}</h3>
                             <p className="text-[#897261] text-sm line-clamp-2 mb-4">{product.description}</p>
                             <div className="mt-auto flex items-center justify-between">
                                 <span className="text-lg font-bold text-[#ec6d13]">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                                 <button onClick={() => addToCart(product, 1)} className="size-9 rounded-lg bg-[#f4f2f0] text-[#181411] flex items-center justify-center hover:bg-[#ec6d13] hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                 </button>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export const FullMenu: React.FC = () => {
  const { addToCart, cart, setIsCartOpen, promoBanner } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState('destaques');
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // --- Scroll Spy Setup ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -70% 0px', // Triggers when element is in the top 30% of the viewport (offset by header)
        threshold: 0
      }
    );

    CATEGORY_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const filterProducts = (category: string) => {
    return MENU_PRODUCTS.filter(p => {
        let match = false;
        
        // "Destaques" aggregates popular items regardless of their main category
        if (category === 'Destaques') {
             match = p.isPopular === true;
        } else {
             match = p.category === category;
        }
        
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return match && matchesSearch;
    });
  }

  const scrollToSection = (id: string) => {
      setActiveSection(id); // Optimistically set active
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  return (
    <div className="bg-[#f8f7f6] min-h-screen flex flex-col font-sans text-[#181411]">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-[#f4f2f0] shadow-sm">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="size-8 text-[#ec6d13] flex items-center justify-center bg-orange-50 rounded-lg">
                        <span className="material-symbols-rounded text-xl">restaurant_menu</span>
                    </div>
                    <h2 className="text-[#181411] text-xl font-bold leading-tight tracking-tight">Cardápio Digital</h2>
                </div>
                <div className="flex gap-3">
                     <button onClick={() => navigate('/admin/login')} className="hidden md:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#ec6d13] hover:bg-orange-600 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-md hover:shadow-lg">
                        <span className="truncate">Entrar</span>
                     </button>
                     <button onClick={() => setIsCartOpen(true)} className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f4f2f0] hover:bg-[#e4e2e0] text-[#181411] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-[48px] px-2.5 transition-colors">
                        <span className="material-symbols-outlined text-xl">shopping_cart</span>
                        <span className="hidden sm:inline">Carrinho</span>
                        {totalItems > 0 && <div className="absolute top-1 right-1 size-2.5 bg-[#ec6d13] rounded-full border-2 border-white"></div>}
                     </button>
                </div>
            </div>
        </header>

        {/* Layout */}
        <div className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-6 lg:px-8 py-6 gap-8 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 md:shrink-0 flex flex-col gap-6 md:sticky md:top-24 h-fit z-10">
                <div className="w-full">
                    <label className="flex flex-col w-full h-12 shadow-sm rounded-lg">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white border border-[#f4f2f0] focus-within:border-[#ec6d13]/50 transition-colors">
                            <div className="text-[#897261] flex items-center justify-center pl-4 pr-2">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </div>
                            <input 
                                className="flex w-full min-w-0 flex-1 bg-transparent text-[#181411] focus:outline-none placeholder:text-[#897261] px-2 text-sm font-normal leading-normal" 
                                placeholder="Buscar no cardápio..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                
                {/* Categories Desktop */}
                <div className="hidden md:flex flex-col gap-1 bg-white p-4 rounded-xl shadow-sm border border-[#f4f2f0]">
                    <h1 className="text-[#181411] text-base font-bold leading-normal mb-2 px-2">Categorias</h1>
                    
                    {CATEGORY_LINKS.map(cat => {
                        const isActive = activeSection === cat.id;
                        return (
                            <button 
                                key={cat.id} 
                                onClick={() => scrollToSection(cat.id)}
                                className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                                    isActive 
                                    ? 'bg-[#ec6d13]/10 text-[#ec6d13] font-bold' 
                                    : 'text-[#5e5046] hover:bg-[#f4f2f0] font-medium'
                                }`}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill' : ''}`}>
                                    {cat.icon}
                                </span>
                                <p className="text-sm leading-normal">{cat.label}</p>
                            </button>
                        );
                    })}
                </div>

                {/* Categories Mobile */}
                <div className="md:hidden flex overflow-x-auto pb-2 gap-2 hide-scrollbar -mx-4 px-4">
                     {CATEGORY_LINKS.map(cat => {
                        const isActive = activeSection === cat.id;
                        return (
                            <button 
                                key={cat.id} 
                                onClick={() => scrollToSection(cat.id)} 
                                className={`flex shrink-0 items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm whitespace-nowrap transition-colors ${
                                    isActive
                                    ? 'bg-[#ec6d13] text-white'
                                    : 'bg-white border border-[#f4f2f0] text-[#181411]'
                                }`}
                            >
                                <span className={`material-symbols-outlined text-[18px] ${isActive ? 'fill' : ''}`}>
                                    {cat.icon}
                                </span>
                                {cat.label}
                            </button>
                        );
                     })}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-10 min-w-0 pb-20">
                 {/* Hero Banner */}
                 {promoBanner.isVisible && (
                     <div className="@container animate-fade-in-up">
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-md min-h-[220px] md:min-h-[280px] bg-cover bg-center flex flex-col justify-end group" style={{backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%), url("${promoBanner.image}")`}}>
                            <div className="p-6 md:p-8 transform transition-transform group-hover:translate-y-[-4px]">
                                {promoBanner.badge && (
                                    <span className="inline-block px-3 py-1 rounded-full bg-[#ec6d13] text-white text-xs font-bold mb-3 uppercase tracking-wider">{promoBanner.badge}</span>
                                )}
                                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2">{promoBanner.title}</h2>
                                <p className="text-gray-200 text-sm md:text-base max-w-md">{promoBanner.subtitle}</p>
                            </div>
                        </div>
                     </div>
                 )}

                 {/* Sections */}
                 <ProductSection title="Destaques" id="destaques" products={filterProducts('Destaques')} addToCart={addToCart} />
                 <ProductSection title="Combos" id="combos" products={filterProducts('Combos')} addToCart={addToCart} />
                 <ProductSection title="Lanches" id="lanches" products={filterProducts('Lanches')} addToCart={addToCart} />
                 <ProductSection title="Pratos Executivos" id="pratos" products={filterProducts('Pratos')} addToCart={addToCart} />
                 <ProductSection title="Porções" id="porcoes" products={filterProducts('Porções')} addToCart={addToCart} />
                 <ProductSection title="Sobremesas" id="sobremesas" products={filterProducts('Sobremesas')} addToCart={addToCart} />
                 <ProductSection title="Bebidas" id="bebidas" products={filterProducts('Bebidas')} addToCart={addToCart} />

            </main>
        </div>
        <CartSidebar />
    </div>
  )
}