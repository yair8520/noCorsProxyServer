import { Request, Response, NextFunction } from 'express';

export const isValidUrl = (urlString: string): boolean => {
    try {
        new URL(urlString);
        return true;
    } catch (error) {
        return false;
    }
}
export function validateUrlMiddleware(req: Request, res: Response, next: NextFunction) {
    const targetUrl = req.params.url;

    if (!targetUrl || targetUrl === 'favicon.ico') {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    if (!isValidUrl(targetUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }
    next();
}