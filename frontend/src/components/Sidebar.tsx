import { HomeIcon } from '@heroicons/react/24/outline'

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-white border-r border-gray-100 shadow-sm py-6 px-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="font-bold text-xl text-blue-700">Pokémon</span>
        <span className="font-bold text-xl text-gray-900">Cards</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 transition-colors">
          <HomeIcon className="h-5 w-5 text-blue-600" />
          Buscar Cards
        </a>
        {/* Adicione mais links aqui conforme necessário */}
      </nav>
      <div className="mt-auto pt-8 text-xs text-gray-400 px-2">© {new Date().getFullYear()} Pokémon Card Prices</div>
    </aside>
  )
} 