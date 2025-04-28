import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

interface PokemonCardProps {
  code: string
  name: string
  minPrice: string
  mediumPrice: string
  maxPrice: string
}

export function PokemonCard({ code, name, minPrice, mediumPrice, maxPrice }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">Código: {code}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ArrowTrendingDownIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700 font-semibold">Preço Mínimo</span>
            </div>
            <div className="flex items-center space-x-1">
              <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">{minPrice}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">Preço Médio</span>
            </div>
            <div className="flex items-center space-x-1">
              <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">{mediumPrice}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ArrowTrendingUpIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">Preço Máximo</span>
            </div>
            <div className="flex items-center space-x-1">
              <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">{maxPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 