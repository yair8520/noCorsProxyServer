import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/homeRoutes'
import apiRoutes from './routes/apiRoutes'
import { json, } from 'body-parser';
import { AxiosResponse } from 'axios';

const app = express();
const port = 80;
const allowedOrigins = ['https://yair8520.github.io', 'http://localhost:3000'];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
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


app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
