import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  category: string
  description: string
  price: number
  image_url: string
}

interface MenuProps {
  items: MenuItem[]
  loading: boolean
  onAddToCart: (item: MenuItem) => void
}

const Menu = ({ items, loading, onAddToCart }: MenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  const categories = ['Todos', 'Espetinhos', 'Lanches', 'Crêpes', 'Especial', 'Bebidas']

  const filteredItems = activeCategory === 'Todos' 
    ? items 
    : items.filter(item => item.category === activeCategory)

  const getImageForCategory = (category: string) => {
    if (category === 'Espetinhos') return '/images/skewers.jpg'
    if (category === 'Lanches') return '/images/hotdog.jpg'
    if (category === 'Crêpes') return '/images/crepe.jpg'
    if (category === 'Especial') return '/images/skewers.jpg'
    return '/images/sandwich.jpg'
  }

  if (loading) {
    return (
      <section id="cardapio" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-6 w-24 mx-auto bg-white/20 rounded mb-4" />
            <div className="h-12 w-80 mx-auto bg-white/20 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-3xl overflow-hidden animate-pulse">
                <div className="h-56 bg-white/10" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="cardapio" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            🍢 NOSSO CARDÁPIO
          </div>
          <h2 className="text-6xl font-black tracking-tighter mb-4">SABORES QUE<br />ENCANTAM</h2>
          <p className="text-xl text-white/70 max-w-md mx-auto">
            Espetinhos suculentos e lanches preparados com ingredientes frescos e tempero especial
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="menu-card group bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image_url || getImageForCategory(item.category)} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
                
                <div className="absolute top-4 right-4 px-4 py-1 bg-black/80 rounded-full text-sm font-bold text-yellow-400">
                  R$ {item.price.toFixed(2)}
                </div>
                
                {item.category === 'Especial' && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> SÁBADO
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <span className="text-xs uppercase tracking-[2px] text-red-500 font-medium">{item.category}</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1">{item.name}</h3>
                </div>
                
                <p className="text-white/70 text-[15px] leading-relaxed flex-1 mb-6">
                  {item.description}
                </p>

                <button
                  onClick={() => onAddToCart(item)}
                  className="mt-auto w-full py-3.5 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Plus className="w-5 h-5" /> ADICIONAR AO CARRINHO
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-white/50">
            Nenhum item encontrado nesta categoria.
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Pedidos podem ser feitos via WhatsApp ou no local
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu
