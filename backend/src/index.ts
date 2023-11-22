import app from './app.js';
import { IP, PORT } from './config.js';
import { connectDB } from './database/db.js';

void connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://${IP}:${PORT}`);
});
