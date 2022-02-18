// const { createProxyMiddleware } = require('http-proxy-middleware');
// module.exports = function(app){
//     app.use(
//         '/api/create',
//         createProxyMiddleware({
//           target: 'https://localhost:3005',
//             changeOrigin: true,
//             secure: false
//         })
//         );
    
//          app.use(
//         '/api/fetch',
//         createProxyMiddleware({
//           target: 'https://localhost:3005',
//             changeOrigin: true,
//             secure: false
//         })
//       );
// };