"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
app.use(cors());
app.use(express_1.default.json());
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
        //httpsAgent: new https.Agent({ rejectUnauthorized: false }),
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
