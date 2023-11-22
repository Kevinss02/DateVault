import express, { type Express } from 'express';
import morgan from 'morgan';

const app: Express = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
// app.use(`/api/${version}/${routeName}`, userRouter);

app.all('*', (_, res) => {
  res.status(501).send();
});

export default app;
