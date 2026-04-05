import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Olá! Meu nome é ${formData.name}.\n\n${formData.message}\n\nContato: ${formData.phone || formData.email}`
    window.open(`https://wa.me/556593305305"?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitStatus('success')
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contato" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-red-500 text-sm font-medium tracking-[3px] mb-3">FALE CONOSCO</div>
          <h2 className="text-6xl font-black tracking-tighter">Dê seu Feedback</h2>
          <p className="mt-4 text-xl text-white/70">Queremos ouvir você. Deixe uma mensagem!</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 bg-[#1a1a1a] p-10 rounded-3xl border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">Nome</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
                placeholder="Seu nome completo" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">Telefone / WhatsApp</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
                placeholder="(65) 99999999"" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
              placeholder="seu@email.com" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Mensagem</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
              className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500 resize-y"
              placeholder="Olá! Gostaria de reservar uma mesa para 6 pessoas no sábado..." />
          </div>

          <button type="submit"
            className="w-full py-5 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all">
            ENVIAR VIA WHATSAPP <Send className="w-5 h-5" />
          </button>

          {submitStatus === 'success' && (
            <div className="text-center py-3 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400">
              ✅ WhatsApp aberto! Envie a mensagem para finalizar.
            </div>
          )}
        </motion.form>

        <div className="text-center mt-8 text-sm text-white/50">
          Ou ligue direto: <a href="https://wa.me/556593305305" className="text-red-400 underline">(65) 93305305</a>
        </div>
      </div>
    </section>
  )
}

export default Contact
