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
  // Espetinhos simples
  { id: 1, name: 'Carne', category: 'Espetinhos', description: 'Espetinho simples de carne.', price: 6.00, image_url: 'https://lh3.googleusercontent.com/pw/AP1GczO364Oj2T_hJremwOXdNmhFpNRGZS_4vl_FIvimtNyd95hn1k0VTTJNhEHiAKwFvRGzAVfdWq4Fu4jXK8Qq3g81kqcSrybt1SRvm3asYXyicUUCzhg2NgnL5G95o2-La3sVWLk2h6Gs9MLEuzxT_D9nwA=w538-h913-s-no-gm?authuser=0' },
  { id: 2, name: 'Meio a Meio (Carne + Asa)', category: 'Espetinhos', description: 'Espetinho misto de carne e asa.', price: 10.00, image_url: '' },
  { id: 3, name: 'Coração de Galinha', category: 'Espetinhos', description: 'Espetinho de coração.', price: 5.00, image_url: '' },
  { id: 4, name: 'Linguiça', category: 'Espetinhos', description: 'Espetinho de linguiça.', price: 8.00, image_url: '' },
  { id: 5, name: 'Miolo de Acém', category: 'Espetinhos', description: 'Espetinho de miolo de acém.', price: 9.00, image_url: '' },
  { id: 6, name: 'Cupim com Abacaxi', category: 'Espetinhos', description: 'Espetinho de cupim com abacaxi.', price: 6.00, image_url: '' },
  { id: 7, name: 'Bife ao Vazio com Bacon', category: 'Espetinhos', description: 'Espetinho de bife ao vazio com bacon.', price: 10.00, image_url: '' },
  { id: 8, name: 'Filé de Frango', category: 'Espetinhos', description: 'Espetinho de frango.', price: 8.00, image_url: '' },

  // Prato feito
  { id: 9, name: 'Prato Feito Completo', category: 'Pratos', description: 'Arroz, salada e mandioca.', price: 20.00, image_url: '' },

  // Hambúrguer
  { id: 10, name: 'Hambúrguer', category: 'Lanches', description: 'Pão, hambúrguer, queijo, alface, tomate, maionese, ketchup, ovo (opcional), bacon e presunto.', price: 22.00, image_url: '' },

  // Cachorro-quente
  { id: 11, name: 'Cachorro-Quente', category: 'Lanches', description: 'Salsicha, molho de tomate, milho verde, batata palha, queijo ralado, maionese, ketchup, mostarda e ovo.', price: 12.00, image_url: '' },

  // Bebidas
  { id: 12, name: 'Refrigerante Lata', category: 'Bebidas', description: 'Lata 350ml.', price: 6.00, image_url: '' },
  { id: 13, name: 'Cerveja (Havana Skol)', category: 'Bebidas', description: 'Garrafa.', price: 4.50, image_url: '' },
  { id: 14, name: 'Água com Gás', category: 'Bebidas', description: 'Garrafa.', price: 4.50, image_url: '' },
  { id: 15, name: 'Água sem Gás', category: 'Bebidas', description: 'Garrafa.', price: 3.00, image_url: '' },
  { id: 16, name: 'Coca-Cola 350ml', category: 'Bebidas', description: 'Lata.', price: 3.50, image_url: '' },
  { id: 17, name: 'Coca-Cola 310ml', category: 'Bebidas', description: 'Garrafa.', price: 5.50, image_url: '' },
  { id: 18, name: 'Coca-Cola 2L', category: 'Bebidas', description: 'Garrafa.', price: 15.00, image_url: '' },
  { id: 19, name: 'Kituaba Lata 265ml', category: 'Bebidas', description: 'Lata.', price: 4.50, image_url: '' },
  { id: 20, name: 'Kituaba Refil 2L', category: 'Bebidas', description: 'Garrafa.', price: 10.00, image_url: '' },
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
