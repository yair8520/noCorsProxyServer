import { convertHeadersToAxiosConfig, makeAxiosCall } from '../helpers/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request, Response, NextFunction, Router } from 'express';
const router = Router();

router.all('/:url(*)', (req: Request, res: Response, next: NextFunction) => {
    const { method, body, headers } = req;
    console.log("aoll", body)


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
            res.status(response.status).json(response.data);
        })
        .catch((error: AxiosError) => {
            return res.send(error);
        });
});

export default router;