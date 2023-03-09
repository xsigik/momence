import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan('short'));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
