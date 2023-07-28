import express, { Router, Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
const router: Router = express.Router();


router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const senderIP = req.ip;
    console.log(`Received webhook request from IP: ${senderIP}`);
 
    exec('sh /home/ec2-user/noCorsProxyServer/deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing update script : ${error.message}`);
            res.status(500).send(error.message);
            return;
        }
        console.log(`Update script output: ${stdout}`);
        res.status(200).send('Webhook received successfully');
    });
});

export default router;
