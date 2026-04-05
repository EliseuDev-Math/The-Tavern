import { motion } from 'framer-motion'

const WhatsappButton = () => {
  const message = encodeURIComponent("Olá The Tavern! Quero fazer um pedido.")
  
  return (
    <a
      href={`https://wa.me/556593305305?text=${message}`}
      target="_blank"
      className="whatsapp-float fixed bottom-8 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 transition-all hover:scale-110"
      aria-label="Abrir WhatsApp"
    >
      <motion.div
        animate={{ rotate: [0, 12, -12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="text-4xl"
      >
        💬
      </motion.div>
    </a>
  )
}

export default WhatsappButton
