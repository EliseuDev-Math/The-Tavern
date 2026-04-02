import { useState } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#cardapio', label: 'Cardápio' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#localizacao', label: 'Localização' },
    { href: '#contato', label: 'Contato' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🍖</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">THE TAVERN</h1>
            <p className="text-[10px] text-orange-500 -mt-1 tracking-[3px]">EST. 2018</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all group"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
              >
                {cartCount}
              </motion.div>
            )}
          </button>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/5565999999999?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido."
            target="_blank"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-full transition-all"
          >
            <span>📱</span> PEÇA AGORA
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <nav className="flex flex-col px-6 py-8 gap-6 text-lg">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left text-white/80 hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/5565999999999?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido."
              target="_blank"
              className="flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 rounded-full font-semibold mt-4"
            >
              📱 PEÇA AGORA VIA WHATSAPP
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
