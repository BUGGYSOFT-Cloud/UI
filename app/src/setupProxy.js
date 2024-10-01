// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/userapi", // Proxy path for the first API, previously 'api1'
    createProxyMiddleware({
      target: "http://35.239.172.98:8080", // URL of the first API
      changeOrigin: true,
      pathRewrite: { "^/userapi": "" }, // Optionally remove the '/userapi' prefix when forwarding to the target
    })
  );

  app.use(
    "/verifyapi", // Proxy path for the second API, previously 'api2'
    createProxyMiddleware({
      target: "http://34.71.237.190:8080", // URL of the second API
      changeOrigin: true,
      pathRewrite: { "^/verifyapi": "" }, // Optionally remove the '/verifyapi' prefix when forwarding to the target
    })
  );
};
