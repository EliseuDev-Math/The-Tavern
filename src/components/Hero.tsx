import { motion } from 'framer-motion'

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('cardapio')
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="/images/hero.jpg" 
          alt="The Tavern Barbecue" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:4px_4px]" />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-400 text-sm font-medium mb-6">
            🔥 CUIABÁ - MT
          </div>
          
          <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-none mb-4">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400">TAVERN</span>
          </h1>
          
          <p className="text-2xl md:text-4xl font-light text-white/90 mb-4 tracking-tight">
            O melhor espetinho de Cuiabá
          </p>
          
          <p className="max-w-md mx-auto text-lg text-white/70 mb-10">
            Espetinhos artesanais, lanches gourmet e o sabor autêntico do churrasco desde 2018
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={scrollToMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group px-10 py-4 bg-white text-black font-bold text-lg rounded-full flex items-center justify-center gap-3 hover:bg-white/90 transition-all"
          >
            VER CARDÁPIO
            <span className="group-hover:rotate-45 transition-transform">↓</span>
          </motion.button>
          
          <motion.a
            href="https://wa.me/556593305305?text=Olá!%20Quero%20pedir%20um%20espetinho!"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-full flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
          >
            📲 PEÇA AGORA
          </motion.a>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest">
          SCROLL TO DISCOVER
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-lg">↓</motion.div>
        </div>
      </div>

      {/* Fire accents */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

export default Hero
