import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import supabase from '../lib/supabase'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        })

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (err) {
      console.error('Erro ao enviar contato:', err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contato" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-red-500 text-sm font-medium tracking-[3px] mb-3">FALE CONOSCO</div>
          <h2 className="text-6xl font-black tracking-tighter">RESERVE SUA MESA</h2>
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
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">Telefone / WhatsApp</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
                placeholder="(65) 99999-9999"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Mensagem</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500 resize-y"
              placeholder="Olá! Gostaria de reservar uma mesa para 6 pessoas no sábado..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 disabled:opacity-70 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all"
          >
            {isSubmitting ? (
              <>ENVIANDO...</>
            ) : (
              <>ENVIAR MENSAGEM <Send className="w-5 h-5" /></>
            )}
          </button>

          {submitStatus === 'success' && (
            <div className="text-center py-3 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400">
              ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="text-center py-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400">
              ❌ Ocorreu um erro. Tente novamente ou chame no WhatsApp.
            </div>
          )}
        </motion.form>

        <div className="text-center mt-8 text-sm text-white/50">
          Ou ligue direto: <a href="https://wa.me/5565999999999" className="text-red-400 underline">(65) 99999-9999</a>
        </div>
      </div>
    </section>
  )
}

export default Contact
