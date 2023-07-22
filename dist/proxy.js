"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const allowedOrigins = ['https://yair8520.github.io', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
function convertHeadersToAxiosConfig(headers) {
    const convertedHeaders = {};
    const commonHeaders = [
        "Accept",
        "Content-Type",
        "Authorization",
        "User-Agent",
        "Cookie",
        "Cache-Control",
        "Origin",
        "Referer",
        "Content-Length",
        "Host",
    ];
    for (const key of Object.keys(headers)) {
        if (commonHeaders.includes(key.toLowerCase())) {
            convertedHeaders[key] = headers[key];
        }
    }
    return convertedHeaders;
}
app.get('/', (req, res) => {
    const description = `
<h2>Welcome to the NoCORS Proxy Server!</h2>
<p>This server acts as a proxy between your front-end application and external APIs that may have CORS (Cross-Origin Resource Sharing) restrictions. CORS restrictions can prevent your front-end application from making requests directly to APIs hosted on different domains. This server bypasses those restrictions, allowing you to access external APIs from your client-side code.</p>
<h3>How to send a request through the NoCORS Proxy Server:</h3>
<ol>
  <li><strong>Set up your client application:</strong></li>
  <p>Ensure you have a front-end application (e.g., React, Angular, Vue.js) running on either 'https://yair8520.github.io' (if deployed) or 'http://localhost:3000' (if testing locally). This client application will make requests to external APIs through the NoCORS Proxy Server.</p>
  <li><strong>Import the HTTP client library:</strong></li>
  <p>If you're using Axios, import it in your client-side code like this:</p>
  <pre><code>import axios from 'axios';</code></pre>
  <li><strong>Make a request to the NoCORS Proxy Server:</strong></li>
  <p>To make a request, simply call the HTTP client's method (e.g., axios.get, axios.post) with the desired URL as follows:</p>
  <pre><code>axios.get('https://nocorsproxyserver-91f188606107.herokuapp.com/https://jsonplaceholder.typicode.com/todos/')
  .then(response => {
    // Handle the response data here
    console.log(response.data);
  })</code></pre>
</ol>
<p>The NoCORS Proxy Server ensures that the appropriate CORS headers are added to the response, allowing your client-side application to access the requested API data without CORS-related issues.</p>
<p><strong>Author:</strong> Yair Gabay </p>
`;
    res.send(description);
});
app.all('*', (req, res) => {
    const { method, body, headers } = req;
    const targetUrl = req.url.slice(1);
    if (targetUrl === 'favicon.ico') {
        res.sendStatus(204);
        return;
    }
    const axiosConfig = {
        method,
        url: targetUrl,
        data: body,
        headers: convertHeadersToAxiosConfig(headers),
    };
    (0, axios_1.default)(axiosConfig)
        .then((response) => {
        console.log(response.data);
        res.status(response.status).json(response.data);
    })
        .catch((error) => {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        }
        else {
            res.status(500).json({ error: 'Proxy Error' });
        }
    });
});
app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
