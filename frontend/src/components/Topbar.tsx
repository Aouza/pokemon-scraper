export function Topbar() {
  return (
    <header className="w-full h-16 flex items-center justify-between bg-white border-b border-gray-100 px-6 shadow-sm sticky top-0 z-30">
      <div className="font-bold text-lg text-gray-900 tracking-tight">Pokémon Card Prices</div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Buscar cards... (em breve)"
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled
        />
      </div>
      <div className="flex items-center gap-4">
        {/* Espaço para ações futuras, perfil, etc */}
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      </div>
    </header>
  )
} 