import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {}
  return {
    plugins,
    // ⚠️ Troque 'The-Tavern' pelo nome exato do repositório no GitHub
    // Se o domínio for seuusuario.github.io (sem subpasta), use: base: '/'
    base: '/The-Tavern/',
  };
})
