import { Clock, MapPin, Phone } from 'lucide-react'

const Location = () => {

  return (
    <section id="localizacao" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">📍 ONDE NOS ENCONTRAR</div>
          <h2 className="text-6xl font-black tracking-tighter">VENHA NOS VISITAR</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info Card */}
          <div className="bg-[#1a1a1a] rounded-3xl p-10 flex flex-col">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-8">THE TAVERN</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Endereço</div>
                    <p className="text-white/70">Rua 20, Qdr. 01, Lote 18<br />Setor C, Bairro Santa Terezinha<br />Cuiabá - MT</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Horário de Funcionamento</div>
                    <div className="text-white/70">Segunda a Domingo</div>
                    <div className="text-2xl font-bold text-white mt-1">16:30 — 23:00</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Contato</div>
                    <a href="https://wa.me/556593305305" className="text-lg font-medium text-green-400 hover:underline">(65) 99999-9999</a>
                    <div className="text-white/50 text-sm mt-1">Peça pelo WhatsApp</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 text-sm text-white/60">
              Estacionamento gratuito • Ambiente climatizado • Aceitamos cartões e PIX
            </div>
          </div>

          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 h-[520px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/place/15%C2%B039'40.3%22S+56%C2%B001'41.5%22W/@-15.6612053,-56.0307749,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-15.6612053!4d-56.0282?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm px-5 py-4 rounded-2xl border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <div>
                  <div className="font-semibold text-sm">THE TAVERN</div>
                  <div className="text-xs text-white/60">Santa Terezinha, Cuiabá</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location
