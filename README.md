# Pokemon Card Price Scraper

Um script Node.js para coletar preços de cards Pokemon do site Liga Pokemon.

## Funcionalidades

- Coleta preços (mínimo, médio e máximo) de cards Pokemon
- Salva os dados em um arquivo CSV
- Suporta múltiplos códigos de cards

## Requisitos

- Node.js
- NPM

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Aouza/pokemon-scraper.git
```

2. Instale as dependências:
```bash
npm install
```

## Uso

1. Adicione os códigos dos cards no arquivo `cards.txt` (um código por linha)
2. Execute o script:
```bash
npm start
```

3. Os resultados serão salvos no arquivo `precos.csv`

## Estrutura do Projeto

- `index.js` - Script principal
- `cards.txt` - Arquivo com os códigos dos cards
- `precos.csv` - Arquivo de saída com os preços coletados

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. 