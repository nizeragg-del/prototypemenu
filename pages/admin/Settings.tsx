import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../App';

export const AdminSettings: React.FC = () => {
    const { settings, updateSettings, promoBanner, updatePromoBanner } = useAppContext();
    const bannerFileInputRef = useRef<HTMLInputElement>(null);
    
    // Local state to handle form inputs before saving
    const [localSettings, setLocalSettings] = useState({
        name: '',
        description: 'Gastronomia moderna e artesanal.',
        phone: '(11) 99999-9999',
        address: '',
        color: '#FF6B00',
        feePerKm: '',
        minOrder: '',
        time: '',
        isOpen: true,
        openTime: '18:00',
        closeTime: '23:00'
    });

    const [localBanner, setLocalBanner] = useState({
        title: '',
        subtitle: '',
        badge: '',
        image: '',
        isVisible: true
    });

    // Load global settings into local state on mount
    useEffect(() => {
        setLocalSettings(prev => ({
            ...prev,
            name: settings.restaurantName,
            address: settings.restaurantAddress,
            feePerKm: settings.deliveryFeePerKm.toString(),
            minOrder: settings.minOrder.toString(),
            time: settings.estimatedTime,
            isOpen: settings.isOpen
        }));

        setLocalBanner(promoBanner);
    }, [settings, promoBanner]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Update global context settings
        updateSettings({
            restaurantName: localSettings.name,
            restaurantAddress: localSettings.address,
            deliveryFeePerKm: parseFloat(localSettings.feePerKm) || 0,
            minOrder: parseFloat(localSettings.minOrder) || 0,
            estimatedTime: localSettings.time,
            isOpen: localSettings.isOpen
        });

        // Update global context banner
        updatePromoBanner(localBanner);

        alert("Configurações salvas com sucesso!");
    };

    const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLocalBanner(prev => ({ ...prev, image: imageUrl }));
        }
    };

    const inputClass = "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 transition-colors hover:bg-white focus:bg-white";

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-gray-500">Gerencie as informações do seu estabelecimento.</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <span className="material-symbols-rounded">save</span>
                    Salvar Alterações
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Info */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                             <span className="material-symbols-rounded">store</span>
                        </div>
                        Informações do Restaurante
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Estabelecimento</label>
                            <input 
                                type="text" 
                                className={inputClass}
                                value={localSettings.name}
                                onChange={e => setLocalSettings({...localSettings, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Descrição Curta</label>
                            <textarea 
                                className={`${inputClass} h-24 resize-none`}
                                value={localSettings.description}
                                onChange={e => setLocalSettings({...localSettings, description: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Telefone/WhatsApp</label>
                                <input 
                                    type="text" 
                                    className={inputClass}
                                    value={localSettings.phone}
                                    onChange={e => setLocalSettings({...localSettings, phone: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Cor Principal (Hex)</label>
                                <div className="flex gap-2">
                                    <div className="relative w-12 shrink-0">
                                        <input 
                                            type="color" 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            value={localSettings.color}
                                            onChange={e => setLocalSettings({...localSettings, color: e.target.value})}
                                        />
                                        <div className="w-full h-[46px] rounded-xl border border-gray-300 shadow-sm" style={{backgroundColor: localSettings.color}}></div>
                                    </div>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={localSettings.color}
                                        onChange={e => setLocalSettings({...localSettings, color: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Endereço Completo (Origem)</label>
                            <input 
                                type="text" 
                                className={inputClass}
                                value={localSettings.address}
                                onChange={e => setLocalSettings({...localSettings, address: e.target.value})}
                                placeholder="Endereço da loja para cálculo de rota"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                     {/* Promo Banner Settings */}
                     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                <span className="material-symbols-rounded">campaign</span>
                            </div>
                            Banner Promocional (Destaque)
                        </h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Imagem de Fundo</label>
                                <div 
                                    onClick={() => bannerFileInputRef.current?.click()}
                                    className="w-full h-40 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-orange-50 transition-all cursor-pointer flex items-center justify-center overflow-hidden relative group"
                                >
                                    <input 
                                        type="file" 
                                        ref={bannerFileInputRef}
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleBannerImageChange}
                                    />
                                    {localBanner.image ? (
                                        <>
                                            <img src={localBanner.image} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-bold flex items-center gap-2">
                                                    <span className="material-symbols-rounded">edit</span>
                                                    Alterar Imagem
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <span className="material-symbols-rounded text-3xl mb-1">add_photo_alternate</span>
                                            <span className="text-xs font-bold block">Clique para upload</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Título do Banner</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={localBanner.title}
                                        onChange={e => setLocalBanner({...localBanner, title: e.target.value})}
                                        placeholder="Ex: Combo Monster Grill"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtítulo / Descrição</label>
                                    <textarea 
                                        className={`${inputClass} h-20 resize-none`}
                                        value={localBanner.subtitle}
                                        onChange={e => setLocalBanner({...localBanner, subtitle: e.target.value})}
                                        placeholder="Ex: Cheddar duplo e bacon..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Etiqueta (Badge)</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={localBanner.badge}
                                        onChange={e => setLocalBanner({...localBanner, badge: e.target.value})}
                                        placeholder="Ex: Promoção da Semana"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <label className="relative inline-flex items-center cursor-pointer w-full p-3 bg-gray-50 rounded-xl border border-gray-300">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer"
                                            checked={localBanner.isVisible}
                                            onChange={e => setLocalBanner({...localBanner, isVisible: e.target.checked})}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[14px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                                        <span className="ml-3 text-sm font-bold text-gray-700">Exibir Banner</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Settings */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <span className="material-symbols-rounded">local_shipping</span>
                            </div>
                            Entrega e Valores
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Taxa por Km</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className={`${inputClass} pl-10`}
                                        value={localSettings.feePerKm}
                                        onChange={e => setLocalSettings({...localSettings, feePerKm: e.target.value})}
                                    />
                                    <span className="absolute left-3 top-3.5 text-gray-500 font-bold text-sm">R$</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1.5 font-medium ml-1">Multiplicado pela distância.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Pedido Mínimo</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className={`${inputClass} pl-10`}
                                        value={localSettings.minOrder}
                                        onChange={e => setLocalSettings({...localSettings, minOrder: e.target.value})}
                                    />
                                    <span className="absolute left-3 top-3.5 text-gray-500 font-bold text-sm">R$</span>
                                </div>
                            </div>
                             <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tempo Estimado (min)</label>
                                <input 
                                    type="text" 
                                    className={inputClass}
                                    placeholder="Ex: 30-45"
                                    value={localSettings.time}
                                    onChange={e => setLocalSettings({...localSettings, time: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                <span className="material-symbols-rounded">schedule</span>
                            </div>
                            Horário de Funcionamento
                        </h2>
                        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <label className="relative inline-flex items-center cursor-pointer w-full justify-between group">
                                <span className="text-sm font-bold text-gray-700">Loja Aberta Agora</span>
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer"
                                        checked={localSettings.isOpen}
                                        onChange={e => setLocalSettings({...localSettings, isOpen: e.target.checked})}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </div>
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Abertura</label>
                                <input 
                                    type="time" 
                                    className={inputClass}
                                    value={localSettings.openTime}
                                    onChange={e => setLocalSettings({...localSettings, openTime: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Fechamento</label>
                                <input 
                                    type="time" 
                                    className={inputClass}
                                    value={localSettings.closeTime}
                                    onChange={e => setLocalSettings({...localSettings, closeTime: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};