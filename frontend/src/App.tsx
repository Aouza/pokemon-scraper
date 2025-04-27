import { useState } from 'react'
import axios from 'axios'
import { PokemonCard } from './components/PokemonCard'

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const codes = cardCodes.split('\n').filter(code => code.trim())
      const results: CardData[] = []

      for (const code of codes) {
        const response = await axios.get(`http://localhost:3001/card`, {
          params: { code }
        })
        results.push(response.data)
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
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pokemon-blue mb-2">Pokémon Card Price Checker</h1>
          <p className="text-gray-600">Insira os códigos dos cards para verificar os preços</p>
        </header>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="mb-4">
            <textarea
              className="input h-32 resize-none"
              value={cardCodes}
              onChange={(e) => setCardCodes(e.target.value)}
              placeholder="Insira os códigos dos cards (um por linha)"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar Preços'}
          </button>
        </form>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <PokemonCard key={card.code} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
