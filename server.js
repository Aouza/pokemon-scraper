const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Função para buscar dados do card
async function fetchCardData(cardCode) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    const url = `https://www.ligapokemon.com.br/?view=cards%2Fsearch&tipo=1&card=${cardCode}`;
    console.log(`Fetching URL: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait for the price container to be visible
    await page.waitForSelector('.container-show-price-mkp', { timeout: 5000 })
      .catch(() => console.log('Price container not found'));
    
    // Get card name from title
    const title = await page.title();
    const cardName = title.split('|')[0].trim();
    
    // Get prices
    const prices = await page.evaluate(() => {
      const minPrice = document.querySelector('.container-show-price-mkp .min .price')?.textContent?.trim();
      const mediumPrice = document.querySelector('.container-show-price-mkp .medium .price')?.textContent?.trim();
      const maxPrice = document.querySelector('.container-show-price-mkp .max .price')?.textContent?.trim();
      return { minPrice, mediumPrice, maxPrice };
    });

    return {
      code: cardCode,
      name: cardName,
      minPrice: prices.minPrice || 'N/A',
      mediumPrice: prices.mediumPrice || 'N/A',
      maxPrice: prices.maxPrice || 'N/A'
    };
  } catch (error) {
    console.error(`Error fetching data for card ${cardCode}:`, error.message);
    return {
      code: cardCode,
      name: 'Not found',
      minPrice: 'N/A',
      mediumPrice: 'N/A',
      maxPrice: 'N/A'
    };
  } finally {
    await browser.close();
  }
}

// Rota para buscar dados do card usando query parameter
app.get('/card', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Card code is required' });
    }
    const cardData = await fetchCardData(code);
    res.json(cardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 