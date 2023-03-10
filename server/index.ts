import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import { getRates } from './middlewares/getRates';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan('short'));

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/rates', getRates);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
