require('dotenv').config();
const path = require('node:path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT;

app.use('/server/test', (req, res) => {
  res.send('Test route reached');
});

app.use(
  '/server',
  createProxyMiddleware({
    target: 'https://api.sakcripto.com/v1',
    changeOrigin: true,
    pathRewrite: { '^/server': '' },

    logLevel: 'debug',
  }),
);

app.use(express.static(__dirname));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
