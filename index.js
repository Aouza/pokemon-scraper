const fs = require('fs').promises;
const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const BASE_URL = 'https://www.ligapokemon.com.br';
const DELAY_MS = 2000; // 2 seconds delay between requests

// Function to read card codes from file
async function readCardCodes() {
    try {
        const data = await fs.readFile('cards.txt', 'utf8');
        return data.split('\n').filter(code => code.trim());
    } catch (error) {
        console.error('Error reading cards.txt:', error.message);
        throw error;
    }
}

// Function to fetch card data
async function fetchCardData(page, cardCode) {
    try {
        const url = `${BASE_URL}/?view=cards%2Fsearch&tipo=1&card=${cardCode}`;
        console.log(`Fetching URL: ${url}`);
        
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Wait for the price container to be visible
        await page.waitForSelector('.container-show-price-mkp', { timeout: 5000 })
            .catch(() => console.log('Price container not found'));
        
        // Get the page content
        const content = await page.content();
        
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

        console.log('Found prices:', prices);

        if (!cardName || (!prices.minPrice && !prices.mediumPrice && !prices.maxPrice)) {
            throw new Error('Card data not found');
        }

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
    }
}

// Function to save data to CSV
async function saveToCSV(data) {
    const csvWriter = createCsvWriter({
        path: 'precos.csv',
        header: [
            { id: 'code', title: 'Código' },
            { id: 'name', title: 'Nome' },
            { id: 'minPrice', title: 'Preço Mínimo' },
            { id: 'mediumPrice', title: 'Preço Médio' },
            { id: 'maxPrice', title: 'Preço Máximo' }
        ]
    });

    try {
        await csvWriter.writeRecords(data);
        console.log('Data saved to precos.csv');
    } catch (error) {
        console.error('Error saving to CSV:', error.message);
        throw error;
    }
}

// Main function
async function main() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        const cardCodes = await readCardCodes();
        console.log(`Found ${cardCodes.length} cards to process`);

        const results = [];
        for (const code of cardCodes) {
            console.log(`Processing card: ${code}`);
            const cardData = await fetchCardData(page, code);
            results.push(cardData);
            
            // Add delay between requests
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }

        await saveToCSV(results);
        console.log('Scraping completed successfully!');
    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        await browser.close();
    }
}

// Run the script
main(); 