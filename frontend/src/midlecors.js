const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/apilogin',
    createProxyMiddleware({
      target: 'http://hcm.transretail.co.id/services/paos.php', // Change this to the URL of your API server
      changeOrigin: true,
    })
  );
};