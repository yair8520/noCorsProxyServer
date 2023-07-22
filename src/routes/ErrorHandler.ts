import { json } from 'body-parser';
import express, { Request, Response, NextFunction, Router, ErrorRequestHandler } from 'express';

const router: Router = express.Router();

router.use(json());

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'status' in res && 'body' in res) {
        res.status(400).json({ error: 'Invalid JSON data' });
    } else {
        next(err);
    }
};

router.use(errorHandler);



export default router;
