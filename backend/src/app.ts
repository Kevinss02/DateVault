import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { type Express } from 'express';
import morgan from 'morgan';

import { FRONTEND_URI } from './config.js';
import memoriesRouter from './v1/routes/memories.routes.js';
import userRouter from './v1/routes/user.routes.js';

const app: Express = express();
config();

// middlewares
app.use(
  cors({
    origin: FRONTEND_URI,
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(userRouter);
app.use(memoriesRouter);

// routes
// app.use(`/api/${version}/${routeName}`, userRouter);

app.all('*', (_, res) => {
  console.log('No pillada');
  res.status(501).send();
});

export default app;
