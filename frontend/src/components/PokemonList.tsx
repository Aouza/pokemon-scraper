import { useState } from 'react'

interface Pokemon {
  code: string
  name: string
  minPrice: string
  mediumPrice: string
  maxPrice: string
}

interface PokemonWithComparison extends Pokemon {
  prevMinPrice?: string | null
  diff?: number | null
  percent?: number | null
}

function parsePrice(price: string) {
  // Ex: 'R$ 10,00' => 10.00
  return parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.').trim())
}

function formatDiff(diff: number | null) {
  if (diff === null) return '-'
  return (diff > 0 ? '+' : '') + diff.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatPercent(percent: number | null) {
  if (percent === null) return '-'
  return (percent > 0 ? '+' : '') + percent.toFixed(2) + '%'
}

export function PokemonList() {
  const [showModal, setShowModal] = useState(false)
  const [cardCodes, setCardCodes] = useState('')
  const [pokemons, setPokemons] = useState<PokemonWithComparison[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  // Carrega o último histórico do localStorage
  function getLastHistory() {
    const history = localStorage.getItem('searchHistory')
    if (!history) return null
    try {
      const arr = JSON.parse(history)
      return Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : null
    } catch {
      return null
    }
  }

  // Salva o histórico no localStorage
  function saveHistory(cards: Pokemon[]) {
    const history = localStorage.getItem('searchHistory')
    let arr = []
    try {
      arr = history ? JSON.parse(history) : []
    } catch {
      arr = []
    }
    arr.push({ date: new Date().toISOString(), cards })
    localStorage.setItem('searchHistory', JSON.stringify(arr))
  }

  const handleOpenModal = () => {
    setShowModal(true)
    setError('')
    setCardCodes('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setError('')
  }

  const handleNewSearch = () => {
    setPokemons([])
    setSearched(false)
    setShowModal(true)
    setCardCodes('')
    setError('')
  }

  const handleSearch = async () => {
    if (!cardCodes.trim()) {
      setError('Insira pelo menos um código')
      return
    }
    setLoading(true)
    setError('')
    try {
      const codes = cardCodes.split('\n').filter(code => code.trim())
      const results: Pokemon[] = []
      for (const code of codes) {
        const response = await fetch(`http://localhost:3001/card?code=${encodeURIComponent(code)}`)
        if (!response.ok) throw new Error(`Erro ao buscar card ${code}`)
        const data = await response.json()
        results.push(data)
      }
      // Comparação com histórico anterior
      const lastHistory = getLastHistory()
      const compared: PokemonWithComparison[] = results.map(card => {
        const prev = lastHistory?.cards?.find((c: Pokemon) => c.code === card.code)
        if (!prev) return { ...card, prevMinPrice: null, diff: null, percent: null }
        const prevPrice = parsePrice(prev.minPrice)
        const currPrice = parsePrice(card.minPrice)
        const diff = currPrice - prevPrice
        const percent = prevPrice ? (diff / prevPrice) * 100 : null
        return { ...card, prevMinPrice: prev.minPrice, diff, percent }
      })
      setPokemons(compared)
      setSearched(true)
      setShowModal(false)
      saveHistory(results)
    } catch (error) {
      setError('Erro ao buscar cards. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Página inicial clean e moderna */}
      {!searched && !showModal && (
        <div className="flex flex-col items-center justify-center w-full h-[70vh] max-w-lg mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Bem-vindo ao Pokémon Card Prices</h1>
          <p className="text-gray-500 mb-10 text-center text-lg max-w-md">
            Busque preços de múltiplos cards de Pokémon de uma só vez, de forma rápida e prática.
          </p>
          <button
            className="px-14 py-6 rounded-2xl bg-blue-600 text-white text-3xl font-bold shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            onClick={handleOpenModal}
            style={{ letterSpacing: '.01em' }}
          >
            Buscar
          </button>
        </div>
      )}

      {/* Modal clean e harmonioso */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg font-bold focus:outline-none bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleCloseModal}
              aria-label="Fechar"
              tabIndex={0}
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 text-center">Buscar Cards</h2>
            <textarea
              className="w-full h-28 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-900 bg-gray-50 text-base"
              placeholder="Cole os códigos dos cards, um por linha"
              value={cardCodes}
              onChange={e => setCardCodes(e.target.value)}
              autoFocus
            />
            {error && <p className="text-sm text-red-600 mt-1 text-center">{error}</p>}
            <button
              className="mt-2 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 text-base flex items-center justify-center gap-2 shadow"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Buscando...
                </span>
              ) : 'Buscar'}
            </button>
          </div>
        </div>
      )}

      {/* Resultados em tabela moderna com barra de ações e comparação de preços */}
      {searched && !loading && pokemons.length > 0 && (
        <div className="w-full max-w-screen-xl bg-white rounded-2xl shadow p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Resultados</h2>
            <button
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-medium shadow"
              onClick={handleNewSearch}
            >
              Nova Busca
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold rounded-tl-xl">Nome</th>
                  <th className="py-3 px-4 font-semibold">Código</th>
                  <th className="py-3 px-4 font-semibold">Preço Mínimo</th>
                  <th className="py-3 px-4 font-semibold">Anterior</th>
                  <th className="py-3 px-4 font-semibold">Variação</th>
                  <th className="py-3 px-4 font-semibold">% Variação</th>
                  <th className="py-3 px-4 font-semibold">Preço Médio</th>
                  <th className="py-3 px-4 font-semibold">Preço Máximo</th>
                </tr>
              </thead>
              <tbody>
                {pokemons.map(pokemon => (
                  <tr key={pokemon.code} className="hover:bg-gray-50 transition rounded-xl">
                    <td className="py-3 px-4 font-medium text-gray-900 max-w-xs truncate">{pokemon.name}</td>
                    <td className="py-3 px-4 text-xs text-gray-400">{pokemon.code}</td>
                    <td className="py-3 px-4 font-bold text-green-600">{pokemon.minPrice}</td>
                    <td className="py-3 px-4 text-gray-500">{pokemon.prevMinPrice ?? '-'}</td>
                    <td className={
                      `py-3 px-4 font-semibold ${pokemon.diff === null ? 'text-gray-400' : pokemon.diff > 0 ? 'text-green-600' : pokemon.diff < 0 ? 'text-red-600' : 'text-gray-500'}`
                    }>
                      {pokemon.diff === null ? '-' : (
                        <span className="flex items-center gap-1">
                          {pokemon.diff > 0 && <span>▲</span>}
                          {pokemon.diff < 0 && <span>▼</span>}
                          {formatDiff(pokemon.diff)}
                        </span>
                      )}
                    </td>
                    <td className={
                      `py-3 px-4 font-semibold ${pokemon.percent === null ? 'text-gray-400' : pokemon.percent > 0 ? 'text-green-600' : pokemon.percent < 0 ? 'text-red-600' : 'text-gray-500'}`
                    }>
                      {pokemon.percent === null ? '-' : (
                        <span>
                          {formatPercent(pokemon.percent)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{pokemon.mediumPrice}</td>
                    <td className="py-3 px-4 text-gray-900">{pokemon.maxPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Loading global (após busca) */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <span className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></span>
        </div>
      )}
    </div>
  )
} 