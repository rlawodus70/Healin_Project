const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/user', {
            target: 'http://localhost:3001/',
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/mainModule', {
            target: 'http://localhost:3001/',
            changeOrigin: true
        })
    )
}