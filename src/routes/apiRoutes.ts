import { convertHeadersToAxiosConfig, makeAxiosCall } from '../helpers/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request, Response, Router } from 'express';
import { validateUrlMiddleware } from '../helpers/url';
const router = Router();

router.all('/:url(*)', validateUrlMiddleware, (req: Request, res: Response) => {
    const { method, body, headers } = req;

    const targetUrl = req.url.slice(1);
    const axiosConfig: AxiosRequestConfig = {
        method,
        url: targetUrl,
        data: body,
        timeout: 12000,
        headers: convertHeadersToAxiosConfig(headers),
    };

    makeAxiosCall(axiosConfig)
        .then((response: AxiosResponse) => {
            res.status(response.status).json(response.data);
        })
        .catch((error: AxiosError) => {
            return res.send(error);
        });
});

export default router;