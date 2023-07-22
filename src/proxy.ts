import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/homeRoutes'
import apiRoutes from './routes/apiRoutes'
const app = express();
const port = process.env.PORT || 3000;

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


app.use('/', homeRoutes);
app.use('/api', apiRoutes);


app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
