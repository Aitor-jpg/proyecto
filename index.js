const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.get('/login', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false, // Ver el navegador real
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://accounts.google.com/');

    // Insertar correo
    await page.type('input[type="email"]', 'TU_CORREO@gmail.com', { delay: 100 });
    await page.click('#identifierNext');
    await page.waitForTimeout(3000);

    // Insertar contraseña
    await page.type('input[type="password"]', 'TU_CONTRASEÑA', { delay: 100 });
    await page.click('#passwordNext');
    await page.waitForNavigation();

    await browser.close();
    res.status(200).send('✅ Login completado con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('❌ Error en el login');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

