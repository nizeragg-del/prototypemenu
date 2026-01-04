import React, { useState, useEffect, useRef } from 'react';

// Interfaces
interface MenuItemType {
    id: number;
    name: string;
    price: string;
    description: string;
    category: string;
    image: string;
    available: boolean;
    isDealOfTheDay?: boolean;
    discountPercentage?: number;
}

interface MenuItemProps {
    item: MenuItemType;
    onDelete: (id: number) => void;
    onEdit: (item: MenuItemType) => void;
}

const INITIAL_MENU: MenuItemType[] = [
    { id: 1, name: "X-Bacon Artesanal", price: "32,90", description: "Pão brioche selado na manteiga, hambúrguer de costela 180g, queijo cheddar inglês, fatias de bacon crocante.", category: "Lanches", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop", available: true },
    { id: 2, name: "Double Cheddar", price: "38,90", description: "Dois hambúrgueres smash de 100g cada, muito cheddar cremoso e cebola caramelizada.", category: "Lanches", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", available: true, isDealOfTheDay: true, discountPercentage: 15 },
    { id: 3, name: "Refrigerante Artesanal", price: "12,00", description: "Refrigerante de laranja feito na casa, sem conservantes.", category: "Bebidas", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop", available: false },
    { id: 4, name: "Batata Rústica", price: "18,00", description: "Batatas cortadas rusticamente, temperadas com alecrim e alho.", category: "Acompanhamentos", image: "https://images.unsplash.com/photo-1630384060421-a4323ceca0ad?w=400&h=300&fit=crop", available: true }
];

const CATEGORIES = ['Lanches', 'Pratos', 'Bebidas', 'Acompanhamentos', 'Sobremesas', 'Combos', 'Porções'];

const MenuItem: React.FC<MenuItemProps> = ({ item, onDelete, onEdit }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow relative">
        <div className="h-48 overflow-hidden relative">
            <img src={item.image || 'https://via.placeholder.com/400x300?text=Sem+Imagem'} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                {item.category}
            </div>
            
            {/* Status Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
                {!item.available && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">Indisponível</span>
                )}
                {item.isDealOfTheDay && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-rounded text-[14px]">local_fire_department</span>
                        Oferta -{item.discountPercentage}%
                    </span>
                )}
            </div>

            {!item.available && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
            )}
        </div>
        <div className="p-4 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                <div className="text-right">
                    {item.isDealOfTheDay && item.discountPercentage ? (
                        <>
                            <span className="text-xs text-gray-400 line-through block">R$ {item.price}</span>
                            <span className="font-bold text-orange-600 whitespace-nowrap ml-2">
                                R$ {(parseFloat(item.price.replace(',','.')) * (1 - item.discountPercentage/100)).toFixed(2).replace('.',',')}
                            </span>
                        </>
                    ) : (
                        <span className="font-bold text-primary whitespace-nowrap ml-2">R$ {item.price}</span>
                    )}
                </div>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{item.description}</p>
            
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-400'}`}></div>
                    <span className="text-xs font-medium text-gray-500">{item.available ? 'Ativo' : 'Inativo'}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onEdit(item)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-orange-50 rounded-lg transition-colors" title="Editar">
                        <span className="material-symbols-rounded text-[20px]">edit</span>
                    </button>
                    <button onClick={() => onDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                        <span className="material-symbols-rounded text-[20px]">delete</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// Modal Component for Add/Edit
const ProductModal = ({ isOpen, onClose, onSave, editingItem }: any) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<Partial<MenuItemType>>({
        name: '',
        price: '',
        description: '',
        category: 'Lanches',
        image: '',
        available: true,
        isDealOfTheDay: false,
        discountPercentage: 0
    });

    useEffect(() => {
        if (editingItem) {
            setFormData(editingItem);
        } else {
            setFormData({
                name: '',
                price: '',
                description: '',
                category: 'Lanches',
                image: '',
                available: true,
                isDealOfTheDay: false,
                discountPercentage: 0
            });
        }
    }, [editingItem, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a temporary URL for the selected file
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, image: imageUrl }));
        }
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputClass = "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 transition-colors hover:bg-white focus:bg-white";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] animate-fade-in-up">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
                    <h2 className="text-xl font-black text-gray-900">
                        {editingItem ? 'Editar Prato' : 'Novo Prato'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
                    {/* Image Preview & Upload */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Imagem do Prato</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-orange-50 transition-all cursor-pointer flex items-center justify-center overflow-hidden relative group"
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            
                            {formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-bold flex items-center gap-2">
                                            <span className="material-symbols-rounded">edit</span>
                                            Alterar Imagem
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-gray-400 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-rounded text-4xl block mb-2">add_photo_alternate</span>
                                    <span className="text-sm font-medium">Clique para fazer upload</span>
                                    <p className="text-xs mt-1 text-gray-400">JPG, PNG ou WebP</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Prato</label>
                            <input 
                                required
                                type="text" 
                                className={inputClass}
                                placeholder="Ex: X-Bacon"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Preço (R$)</label>
                            <input 
                                required
                                type="text" 
                                className={inputClass}
                                placeholder="0,00"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
                        <select 
                            className={inputClass}
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Descrição</label>
                        <textarea 
                            required
                            className={`${inputClass} h-24 resize-none`}
                            placeholder="Ingredientes e detalhes..."
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    {/* Deal of the Day Section */}
                    <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={formData.isDealOfTheDay}
                                    onChange={e => setFormData({...formData, isDealOfTheDay: e.target.checked})}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                <span className="ml-3 text-sm font-bold text-gray-800 flex items-center gap-2">
                                    <div className="bg-orange-100 p-1 rounded-full text-orange-600">
                                        <span className="material-symbols-rounded text-sm block">local_fire_department</span>
                                    </div>
                                    Definir como Oferta do Dia
                                </span>
                            </label>
                        </div>
                        
                        {formData.isDealOfTheDay && (
                            <div className="animate-fade-in-up">
                                <label className="block text-xs font-bold text-orange-800 mb-2 uppercase tracking-wide">Porcentagem de Desconto</label>
                                <div className="relative">
                                    <input 
                                        type="number"
                                        min="1"
                                        max="99" 
                                        className="w-full bg-white border border-orange-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3 pl-4 pr-10"
                                        placeholder="Ex: 20"
                                        value={formData.discountPercentage || ''}
                                        onChange={e => setFormData({...formData, discountPercentage: parseInt(e.target.value)})}
                                    />
                                    <span className="absolute right-4 top-3 text-orange-500 font-bold">%</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 py-2">
                        <label className="relative inline-flex items-center cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={formData.available}
                                onChange={e => setFormData({...formData, available: e.target.checked})}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            <span className="ml-3 text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">Produto Disponível no Cardápio</span>
                        </label>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-3.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-colors">
                            Salvar Produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const AdminMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(INITIAL_MENU);
  const [filter, setFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);

  const handleDelete = (id: number) => {
      if(window.confirm("Tem certeza que deseja remover este item?")) {
          setMenuItems(prev => prev.filter(i => i.id !== id));
      }
  }

  const handleEdit = (item: MenuItemType) => {
      setEditingItem(item);
      setIsModalOpen(true);
  }

  const handleAddNew = () => {
      setEditingItem(null);
      setIsModalOpen(true);
  }

  const handleSave = (itemData: MenuItemType) => {
      if (editingItem) {
          // Update existing
          setMenuItems(prev => prev.map(item => item.id === itemData.id ? itemData : item));
      } else {
          // Create new
          const newItem = {
              ...itemData,
              id: Date.now(), // Generate simple unique ID
          };
          setMenuItems(prev => [newItem, ...prev]);
      }
      setIsModalOpen(false);
  }

  const filteredItems = filter === 'Todos' ? menuItems : menuItems.filter(i => i.category === filter);

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Cardápio</h1>
                <p className="text-gray-500">Gerencie seus produtos e categorias.</p>
            </div>
            <button 
                onClick={handleAddNew}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
            >
                <span className="material-symbols-rounded">add</span>
                Novo Prato
            </button>
       </div>

       <div className="flex gap-2 overflow-x-auto pb-2">
            <button 
                onClick={() => setFilter('Todos')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'Todos' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
            >
                Todos
            </button>
            {CATEGORIES.map((cat) => (
                <button 
                    key={cat} 
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
                >
                    {cat}
                </button>
            ))}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map(item => (
                <MenuItem key={item.id} item={item} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
            {filteredItems.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                    <p>Nenhum produto encontrado nesta categoria.</p>
                </div>
            )}
       </div>

       <ProductModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSave={handleSave}
            editingItem={editingItem}
       />
    </div>
  );
};