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
  // Espetinhos
  { id: 1, name: 'Carne', category: 'Espetinhos', description: '', price: 6.00, image_url: 'https://shoppingdostemperos.com.br/wp-content/uploads/2018/10/Espetinho-De-Carne-Como-Fazer.png' },
  { id: 2, name: 'Meio da Asa', category: 'Espetinhos', description: '', price: 10.00, image_url: 'https://i.pinimg.com/736x/fe/ec/3c/feec3c24268128ed5f79d6a4b8e17a2c.jpg' },
  { id: 3, name: 'Frango', category: 'Espetinhos', description: '', price: 10.00, image_url: 'https://www.vivaespetos.com.br/wp-content/uploads/2019/05/frango.jpg' },
  { id: 4, name: 'Coração de Galinha', category: 'Espetinhos', description: '', price: 3.00, image_url: 'https://nutrifrango.com.br/wp-content/uploads/2020/09/17.jpg' },
  { id: 5, name: 'Linguiça', category: 'Espetinhos', description: '', price: 8.00, image_url: 'https://receitason.com/wp-content/uploads/2023/04/espetinho-linguica-de-porco.jpg' },
  { id: 6, name: 'Miolo de Acém', category: 'Espetinhos', description: '', price: 9.00, image_url: 'https://i.ytimg.com/vi/dMYCUnNuNW8/maxresdefault.jpg' },
  { id: 7, name: 'Miolo de Paleta', category: 'Espetinhos', description: '', price: 10.00, image_url: 'https://i.ytimg.com/vi/dMYCUnNuNW8/maxresdefault.jpg' },
  { id: 8, name: 'Bife ao Vazio com Bacon', category: 'Espetinhos', description: '', price: 10.00, image_url: 'https://swiftbr.vteximg.com.br/arquivos/617761-espetinho-bovino-com-bacon_3.jpg' },
  { id: 9, name: 'Filé de Frango', category: 'Espetinhos', description: '', price: 8.00, image_url: 'https://i.panelinha.com.br/i1/bk-2731-espetinho.webp' },

  // Prato
  { id: 10, name: 'Prato Feito', category: 'Pratos', description: 'Arroz, salada e mandioca.', price: 20.00, image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/11/36/c4/75/espetos-com-acompanhamento.jpg' },

  // Lanches
  { id: 11, name: 'Hambúrguer', category: 'Lanches', description: 'Completo conforme cardápio.', price: 22.00, image_url: 'https://assets.unileversolutions.com/recipes-v2/230453.jpg' },
  { id: 12, name: 'Cachorro-Quente', category: 'Lanches', description: 'Completo conforme cardápio.', price: 12.00, image_url: 'https://www.sabornamesa.com.br/media/k2/items/cache/d91d2793afc1e2281971343ae9f4138f_L.jpg' },

  // Bebidas
  { id: 13, name: 'Soda', category: 'Bebidas', description: '', price: 6.00, image_url: '' },
  { id: 14, name: 'Cerveja', category: 'Bebidas', description: 'Havana/Skol.', price: 4.50, image_url: '' },
  { id: 15, name: 'Água com Gás', category: 'Bebidas', description: '', price: 4.50, image_url: '' },
  { id: 16, name: 'Água sem Gás', category: 'Bebidas', description: '', price: 3.00, image_url: '' },
  { id: 17, name: 'Coca-Cola 350ml', category: 'Bebidas', description: 'Lata.', price: 3.50, image_url: '' },
  { id: 18, name: 'Coca-Cola 310ml', category: 'Bebidas', description: 'Lata.', price: 5.50, image_url: '' },
  { id: 19, name: 'Coca-Cola 2L', category: 'Bebidas', description: '', price: 15.00, image_url: '' },
  { id: 20, name: 'Kitubaína 265ml', category: 'Bebidas', description: 'Lata.', price: 4.50, image_url: '' },
  { id: 21, name: 'Kitubaína 2L', category: 'Bebidas', description: 'Refil.', price: 10.00, image_url: '' },
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
