import express, { Router, Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
const router: Router = express.Router();


router.post('/webhook', (req: Request, res: Response, next: NextFunction) => {
  exec('sh ../../deploy.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing update script: ${error.message}`);
      res.status(500).send('Update failed');
      return;
    }
    console.log(`Update script output: ${stdout}`);
    res.status(200).send('Webhook received successfully');
  });
});

export default router;