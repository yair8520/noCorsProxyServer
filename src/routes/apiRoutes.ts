import { Router, } from 'express';
import { convertHeadersToAxiosConfig, makeAxiosCall } from '../helpers/axios';
import { AxiosRequestConfig } from 'axios';
const router = Router();

router.all('/:url(*)', (req, res) => {
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
    };

    makeAxiosCall(axiosConfig)
        .then((response) => {
            res.status(response.status).json(response.data);
        })
        .catch((error) => {
            if (error.status && error.data) {
                res.status(error.status).json(error.data);
            } else {
                res.status(500).json({ error: 'Proxy Error' });
            }
        });


});
export default router;