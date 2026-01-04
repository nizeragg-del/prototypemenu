import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';

const MOCK_PRODUCTS = [
    {
      id: 1,
      name: 'Super Burger Caseiro',
      description: 'Pão brioche, hambúrguer artesanal de 180g, queijo prato, alface, tomate e maionese especial.',
      price: 32.90,
      category: 'Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
      rating: 4.8,
      isPopular: true,
    },
    // ... Needs to match Home.tsx MOCK_PRODUCTS ideally, usually fetched from API
  ];

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Simulating fetch
  const product = MOCK_PRODUCTS.find(p => p.id === Number(id)) || MOCK_PRODUCTS[0]; // Fallback for demo

  const handleAddToCart = () => {
    addToCart(product, quantity, notes);
    navigate('/'); // Go back to home/menu or open cart
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
        <span className="material-symbols-rounded mr-1">arrow_back</span> Voltar
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Side */}
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100 h-[400px] md:h-[500px] relative group">
           <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           {product.isPopular && (
             <div className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full font-bold shadow-lg">
                Mais Pedido
             </div>
           )}
        </div>

        {/* Details Side */}
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{product.name}</h1>
            </div>
            <div className="flex items-center gap-2 mb-6">
                 <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                 {product.rating && (
                     <span className="flex items-center text-sm font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded ml-2">
                        <span className="material-symbols-rounded text-sm mr-1 fill-1">star</span>
                        {product.rating}
                     </span>
                 )}
            </div>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.description}
                <br/>
                Feito na hora com ingredientes selecionados para garantir o melhor sabor.
            </p>

            <div className="space-y-6 flex-grow">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Observações</label>
                    <textarea 
                        className="w-full rounded-xl border-gray-300 focus:border-primary focus:ring-primary h-24 p-3 text-sm bg-gray-50 resize-none"
                        placeholder="Ex: Tirar a cebola, ponto da carne bem passado..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-white">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-rounded">remove</span>
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-rounded">add</span>
                    </button>
                </div>

                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <span>Adicionar</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                        R$ {(product.price * quantity).toFixed(2).replace('.',',')}
                    </span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
