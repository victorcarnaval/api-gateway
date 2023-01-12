const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { ORDERS_API_URL, PRODUCTS_API_URL } = require('./URLs');

const app = express();
const PORT_NUMBER  = 3007;

const optionsOrders = {
    target: ORDERS_API_URL,
    changeOrigin: true,
    logger: console,
};

const optionsProducts = {
    target: PRODUCTS_API_URL,
    changeOrigin: true,
    logger: console,
};

const ordersProxy = createProxyMiddleware(optionsOrders);
const productsProxy = createProxyMiddleware(optionsProducts);

app.get('/', (req, res) => res.send('Hello Gateway API'));
app.get('/orders', ordersProxy);
app.get('/products', productsProxy);

app.listen(PORT_NUMBER, () => console.log(`Example app listening on port ${PORT_NUMBER}!`));