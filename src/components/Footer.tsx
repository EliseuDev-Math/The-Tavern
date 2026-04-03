const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-y-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍖</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight">THE TAVERN</h3>
          </div>
          <p className="text-white/70 max-w-sm">
            O point do churrasco em Cuiabá. Espetinhos, lanches e muito sabor desde 2026.
          </p>
          
          <div className="flex gap-4 mt-8">
            
            <a href="https://wa.me/556593305305" target="_blank" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">💬</a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="font-semibold mb-4 text-sm tracking-widest text-white/50">NAVEGAÇÃO</div>
          <div className="space-y-3 text-white/70">
            <a href="#cardapio" className="block hover:text-white">Cardápio</a>
            <a href="#sobre" className="block hover:text-white">Sobre Nós</a>
            <a href="#localizacao" className="block hover:text-white">Localização</a>
            <a href="#contato" className="block hover:text-white">Contato</a>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="font-semibold mb-4 text-sm tracking-widest text-white/50">INFORMAÇÕES</div>
          <div className="space-y-3 text-white/70 text-sm">
            <div>Rua 20, Qdr. 01, Lote 18</div>
            <div>Setor C, Santa Terezinha</div>
            <div>Cuiabá - MT</div>
            <div className="pt-3 text-xs">Horário: 16:30 às 23:00</div>
          </div>
          
          <div className="mt-8 text-xs text-white/50">
            © {new Date().getFullYear()} THE TAVERN. Todos os direitos reservados.
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-center text-[10px] text-white/40 tracking-widest">
        DESENVOLVIDO COM ❤️ PARA OS AMANTES DO CHURRASCO
      </div>
    </footer>
  )
}

export default Footer
