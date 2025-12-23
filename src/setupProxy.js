const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/quotes', '/search'],
    createProxyMiddleware({
      target: 'https://api.quotable.io',
      changeOrigin: true,
      secure: true,
      pathRewrite: (path) => path, // keep same path
      onProxyReq: (proxyReq, req, res) => {
        // optionally modify headers
      },
    })
  );
};