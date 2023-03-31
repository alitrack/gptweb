const { createProxyMiddleware } = require("http-proxy-middleware");
// Set up a proxy to forward requests to the OpenAI API endpoint

// To use the OpenAI API, you will need an API key that can be set as an environment variable (OPENAI_API_KEY) 
//or integrated into the front-end client.  
module.exports = async function  openAIProxy(req, res, next) {
  let target = '';
  let openApiKey = process.env.OPENAI_API_KEY || '';
  const options = {
      target:  "https://api.openai.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "" // strip "/api" from the URL
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    };
    if(openApiKey !== ''){
      options.headers= { 
        Authorization: `Bearer ${openApiKey}` 
      };
    }
    return createProxyMiddleware(options)(req, res, next);
  }
