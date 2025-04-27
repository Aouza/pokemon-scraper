import { useState } from 'react'
import axios from 'axios'
import { PokemonCard } from './components/PokemonCard'
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface CardData {
  code: string
  name: string
  minPrice: string
  mediumPrice: string
  maxPrice: string
}

function App() {
  const [cardCodes, setCardCodes] = useState('')
  const [cards, setCards] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Função para adicionar delay entre requisições
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Split by comma or newline, trim each code, and filter out empty strings
      const codes = cardCodes
        .split(/[,\n]/)
        .map(code => code.trim())
        .filter(code => code.length > 0)

      const results: CardData[] = []

      // Process each code individually with delay
      for (const code of codes) {
        try {
          const response = await axios.get(`http://localhost:3001/card`, {
            params: { code }
          })
          results.push(response.data)
          
          // Adiciona um delay de 2 segundos entre as requisições
          if (codes.indexOf(code) < codes.length - 1) {
            await delay(2000)
          }
        } catch (err) {
          console.error(`Error fetching data for card ${code}:`, err)
          results.push({
            code,
            name: 'Not found',
            minPrice: 'N/A',
            mediumPrice: 'N/A',
            maxPrice: 'N/A'
          })
        }
      }

      setCards(results)
    } catch (err) {
      setError('Erro ao buscar dados dos cards. Por favor, tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pokemon-blue/10 to-pokemon-red/10">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/pokeball.svg" alt="Pokeball" className="w-12 h-12 animate-bounce" />
            <h1 className="text-4xl font-bold text-pokemon-blue">Pokémon Card Price Checker</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insira os códigos dos cards para verificar os preços atuais no mercado. 
            Cada card será exibido com seus preços mínimo, médio e máximo.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="mb-6">
            <div className="relative">
              <textarea
                className="input h-32 resize-none pr-10"
                value={cardCodes}
                onChange={(e) => setCardCodes(e.target.value)}
                placeholder="Insira os códigos dos cards (separados por vírgula ou linha)"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Exemplo: 214/167, 215/167, 216/167
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="w-5 h-5" />
                Buscar Preços
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {cards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pokemon-blue mb-6">
              Resultados ({cards.length} {cards.length === 1 ? 'card' : 'cards'})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <PokemonCard key={card.code} {...card} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
