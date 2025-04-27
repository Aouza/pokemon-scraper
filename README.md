# Pokémon Card Price Checker

Uma aplicação web para verificar preços de cards Pokémon na Liga Pokémon.

## Funcionalidades

- Busca de preços de cards Pokémon por código
- Exibição de preços mínimo, médio e máximo
- Interface responsiva e moderna
- Design inspirado nas cores oficiais do Pokémon

## Tecnologias Utilizadas

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Web Scraping: Puppeteer

## Como Executar

1. Clone o repositório
2. Instale as dependências do backend:
```bash
npm install
```

3. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

4. Inicie o servidor backend:
```bash
node server.js
```

5. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm run dev
```

6. Acesse a aplicação em `http://localhost:5173`

## Estrutura do Projeto

```
pokemon/
├── frontend/           # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   └── package.json
├── server.js          # Servidor Express
└── package.json
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. 