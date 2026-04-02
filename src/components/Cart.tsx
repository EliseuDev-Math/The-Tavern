import { motion } from 'framer-motion'
import { X, Plus, Minus, Trash2 } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartProps {
  items: CartItem[]
  total: number
  onClose: () => void
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  onClear: () => void
  onOrder: () => void
}

const Cart = ({ items, total, onClose, onUpdateQuantity, onRemove, onClear, onOrder }: CartProps) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="cart-slide w-full max-w-lg bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">🛍️</div>
            <div>
              <h3 className="font-bold text-xl">Seu Pedido</h3>
              <p className="text-xs text-white/50">{items.length} itens</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="max-h-[380px] overflow-auto px-6 py-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-none">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{item.name}</h4>
                <p className="text-sm text-white/60">R$ {item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              
              <div className="flex items-center gap-1 bg-white/5 rounded-full">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-8 text-center font-bold">{item.quantity}</div>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="w-20 text-right font-semibold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </div>

              <button 
                onClick={() => onRemove(item.id)} 
                className="text-red-400 hover:text-red-500 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/50 border-t border-white/10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-white/70">Total</span>
            <span className="text-3xl font-bold tracking-tight">R$ {total.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClear}
              className="flex-1 py-4 border border-white/20 hover:bg-white/5 text-white/70 font-medium rounded-2xl transition-all"
            >
              LIMPAR
            </button>
            <button
              onClick={onOrder}
              className="flex-[2] py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              📱 PEDIR VIA WHATSAPP
            </button>
          </div>
          
          <p className="text-center text-xs text-white/50 mt-4">
            Entrega disponível na região de Santa Terezinha
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Cart
