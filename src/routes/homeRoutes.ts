import { Router, Request, Response } from 'express';
import { description } from '../helpers/constants';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(description);
});

export default router;