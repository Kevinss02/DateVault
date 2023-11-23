import { config } from 'dotenv';

config();

export const MONGODB_URI =
  process.env.MONGODB_URI ??
  'mongodb+srv://datevault:datevault@cluster0.byhmt4g.mongodb.net/datevault?retryWrites=true&w=majority';

export const PORT = process.env.PORT ?? 4000;
export const IP = process.env.IP ?? 'localhost';

export const TOKEN_SECRET = 'secret123';
