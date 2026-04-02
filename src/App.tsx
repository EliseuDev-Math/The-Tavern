import { useState, useEffect } from 'react'
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
import supabase from './lib/supabase'

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

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Busca o cardápio direto do Supabase (sem passar pela /api/menu)
  const fetchMenu = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('id', { ascending: true })
      if (error) throw error
      setMenuItems(data ?? [])
    } catch (err) {
      console.error('Erro ao buscar cardápio:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

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
    // Open cart briefly to show feedback
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
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/5565999999999?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <Hero />
      
      <Menu 
        items={menuItems} 
        loading={loading} 
        onAddToCart={addToCart} 
      />
      
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
