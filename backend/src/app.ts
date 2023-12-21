import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import morgan from 'morgan';
// import multer from 'multer';
import path from 'path';

import memoriesRouter from './v1/routes/memories.routes.js';
import userRouter from './v1/routes/user.routes.js';

const app: Express = express();

// middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);

app.use('/public', express.static(path.join(dirname, 'storage', 'imgs')));

app.use(userRouter);
app.use(memoriesRouter);

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
}); */

// routes
// app.use(`/api/${version}/${routeName}`, userRouter);

app.all('*', (_, res) => {
  console.log('No pillada');
  res.status(501).send();
});

export default app;
