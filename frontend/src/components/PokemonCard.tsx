import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface PokemonCardProps {
  code: string;
  name: string;
  minPrice: string;
  mediumPrice: string;
  maxPrice: string;
}

export function PokemonCard({ code, name, minPrice, mediumPrice, maxPrice }: PokemonCardProps) {
  return (
    <div className="card group hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-pokemon-blue/5 to-pokemon-red/5">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-pokemon-blue/10 flex items-center justify-center">
            <CurrencyDollarIcon className="w-5 h-5 text-pokemon-blue" />
          </div>
          <h3 className="text-xl font-bold text-pokemon-blue group-hover:text-pokemon-blue/80 transition-colors">{name}</h3>
        </div>
        <p className="text-sm text-gray-500 ml-13">Código: {code}</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <ArrowTrendingDownIcon className="w-5 h-5 text-pokemon-blue" />
            <span className="text-gray-600">Preço Mínimo</span>
          </div>
          <span className="font-bold text-pokemon-blue text-lg">{minPrice}</span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <CurrencyDollarIcon className="w-5 h-5 text-pokemon-yellow" />
            <span className="text-gray-600">Preço Médio</span>
          </div>
          <span className="font-bold text-pokemon-yellow text-lg">{mediumPrice}</span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <ArrowTrendingUpIcon className="w-5 h-5 text-pokemon-red" />
            <span className="text-gray-600">Preço Máximo</span>
          </div>
          <span className="font-bold text-pokemon-red text-lg">{maxPrice}</span>
        </div>
      </div>
    </div>
  );
} 