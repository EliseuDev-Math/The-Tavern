import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-red-500/40 text-red-400 text-sm font-medium mb-4">DESDE 2018</div>
            <h2 className="text-6xl font-black tracking-tighter leading-none">A TRADIÇÃO<br />DO CHURRASCO</h2>
          </div>

          <div className="space-y-6 text-lg text-white/80 max-w-lg">
            <p>
              Fundado em 2026, The Tavern nasceu da paixão por um bom churrasco e pela 
              vontade de levar o melhor espetinho de Cuiabá para a sua mesa.
            </p>
            <p>
              Cada espetinho é preparado com carnes selecionadas, temperos especiais 
              e muito carinho. Nosso espaço acolhedor e descontraído é o lugar perfeito 
              para reunir amigos e família.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { icon: '🔥', label: 'Grelha em Carvão' },
              { icon: '🥩', label: 'Carnes Premium' },
              { icon: '🍺', label: 'Bebidas Geladas' },
              { icon: '👨‍🍳', label: 'Chefs Experientes' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-sm tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-3xl overflow-hidden relative border border-white/10">
            <img 
              src="/images/skewers.jpg" 
              alt="Churrasco The Tavern" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
          </div>
          
          <div className="absolute -bottom-8 -left-8 bg-black border border-white/20 rounded-2xl p-8 max-w-[280px]">
            <div className="text-5xl font-black text-red-500">500+</div>
            <div className="text-lg font-semibold mt-1">Espetinhos vendidos por noite</div>
            <div className="text-sm text-white/60 mt-3">Todos os dias lotados. Chegue cedo!</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
