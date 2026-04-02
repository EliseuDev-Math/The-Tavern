import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsappButton from './components/WhatsappButton'
import Cart from './components/Cart'

interface MenuItem {
  id: number
  name: string
  category: string
  description: string
  price: number
  image_url: string
}

interface CartItem extends MenuItem {
  quantity: number
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1,  name: 'Espetinho de Frango',    category: 'Espetinhos', description: 'Frango marinado na hora, grelhado na brasa com tempero especial da casa.',        price: 12.00, image_url: '' },
  { id: 2,  name: 'Espetinho Misto',        category: 'Espetinhos', description: 'Combinação de frango e carne bovina, suculentos e temperados com ervas frescas.', price: 14.00, image_url: '' },
  { id: 3,  name: 'Espetinho de Coração',   category: 'Espetinhos', description: 'Coração de frango no capricho, grelhado à perfeição com alho e limão.',           price: 10.00, image_url: '' },
  { id: 4,  name: 'Hot Dog Artesanal',      category: 'Lanches',    description: 'Salsicha grossa no pão brioche, molho especial, queijo cheddar e cebola crispy.', price: 18.00, image_url: '' },
  { id: 5,  name: 'Sanduíche da Casa',      category: 'Lanches',    description: 'Pão artesanal, frango desfiado, maionese defumada, tomate e alface crocante.',   price: 20.00, image_url: '' },
  { id: 6,  name: 'Crêpe Doce',            category: 'Crêpes',     description: 'Crêpe fininho com Nutella, morango fresco e chantilly. Irresistível.',            price: 16.00, image_url: '' },
  { id: 7,  name: 'Crêpe Salgado',         category: 'Crêpes',     description: 'Crêpe recheado com frango, catupiry e milho. Feito na hora.',                    price: 18.00, image_url: '' },
  { id: 8,  name: 'Combo Especial Sábado', category: 'Especial',   description: 'Espetinho misto + bebida + crêpe doce. Disponível apenas aos sábados.',          price: 38.00, image_url: '' },
  { id: 9,  name: 'Refrigerante',          category: 'Bebidas',    description: 'Lata 350ml. Coca-Cola, Sprite, Fanta Laranja ou Guaraná.',                       price:  6.00, image_url: '' },
  { id: 10, name: 'Suco Natural',          category: 'Bebidas',    description: 'Suco de laranja, limão ou maracujá. Feito na hora, sem açúcar adicionado.',      price: 10.00, image_url: '' },
]

function App() {
  const [menuItems] = useState<MenuItem[]>(MENU_ITEMS)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const loading = false

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.findIndex(cartItem => cartItem.id === item.id)
      if (existing !== -1) {
        return prev.map((cartItem, index) =>
          index === existing ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      } else {
        return [...prev, { ...item, quantity: 1 }]
      }
    })
    setIsCartOpen(true)
    setTimeout(() => setIsCartOpen(false), 800)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
    setIsCartOpen(false)
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleOrderViaWhatsApp = () => {
    if (cartItems.length === 0) return
    const orderText = cartItems.map(item =>
      `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')
    const message = `Olá! Gostaria de fazer o pedido:\n\n${orderText}\n\nTotal: R$ ${cartTotal.toFixed(2)}\n\nEndereço de entrega: `
    window.open(`https://wa.me/5565999999999?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <Menu items={menuItems} loading={loading} onAddToCart={addToCart} />
      <About />
      <Location />
      <Contact />
      <Footer />
      <WhatsappButton />
      <AnimatePresence>
        {isCartOpen && cartItems.length > 0 && (
          <Cart
            items={cartItems}
            total={cartTotal}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
            onOrder={handleOrderViaWhatsApp}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
