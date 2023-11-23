import express, { type Express } from 'express';
import morgan from 'morgan';

import userRoutes from './v1/routes/user.routes.js';

const app: Express = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(userRoutes);

// routes
// app.use(`/api/${version}/${routeName}`, userRouter);

app.all('*', (_, res) => {
  res.status(501).send();
});

export default app;
