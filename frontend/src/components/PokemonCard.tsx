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
    <div className="card bg-gradient-to-br from-pokemon-blue/5 to-pokemon-red/5">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-pokemon-blue">{name}</h3>
        <p className="text-sm text-gray-500">Código: {code}</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
          <span className="text-gray-600">Preço Mínimo</span>
          <span className="font-bold text-pokemon-blue">{minPrice}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
          <span className="text-gray-600">Preço Médio</span>
          <span className="font-bold text-pokemon-yellow">{mediumPrice}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
          <span className="text-gray-600">Preço Máximo</span>
          <span className="font-bold text-pokemon-red">{maxPrice}</span>
        </div>
      </div>
    </div>
  );
} 