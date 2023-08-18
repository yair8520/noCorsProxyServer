import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/homeRoutes'
import apiRoutes from './routes/apiRoutes'
import deployRoute from './routes/deployRoute'
import { json, } from 'body-parser';
import { AxiosResponse } from 'axios';
import { corsOptions } from './helpers/cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(json())

app.use((error: any, req: any, res: any, next: any) => {
  if (error.type === 'entity.parse.failed') {
    const formattedError: Partial<AxiosResponse> = {
      statusText: 'Bad Request',
      headers: {},
      data: {
        message: 'Invalid JSON data'
      }
    };
    return res.status(400).json(formattedError);
  }
  next();
})


app.use('/', homeRoutes);
app.use('/api', apiRoutes);
app.use('/webhook', deployRoute); 


app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
