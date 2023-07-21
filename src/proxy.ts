import express from 'express';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

function convertHeadersToAxiosConfig(headers: any): AxiosRequestConfig['headers'] {
  const convertedHeaders: AxiosRequestConfig['headers'] = {};
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
      convertedHeaders[key] = headers[key] as string;
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

  const axiosConfig: AxiosRequestConfig = {
    method,
    url: targetUrl,
    data: body,
    headers: convertHeadersToAxiosConfig(headers),
    //httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };

  axios(axiosConfig)
    .then((response: AxiosResponse) => {
      console.log(response.data);
      res.status(response.status).json(response.data);
    })
    .catch((error: any) => {
      console.error(error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: 'Proxy Error' });
      }
    });
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
