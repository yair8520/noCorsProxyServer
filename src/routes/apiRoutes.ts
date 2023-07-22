import { Router, } from 'express';
import { convertHeadersToAxiosConfig, makeAxiosCall } from '../helpers/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
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
        .then((response: AxiosResponse) => {
            res.status(response.status).json(response);
        })
        .catch((error: AxiosError) => {
            return res.send(error)
            // if (error.response && error.response.status) {
            //     res.status(error.response.status).json(error);
            // } else {
            //     res.status(500).json({ error: 'Could not send request, Verify your request' });
            // }
        });


});
export default router;