import express  from 'express';
import dotenv from 'dotenv';
import router from './routers/router';

const PORTA: number = parseInt(process.env["PORT"] || '3000', 10);

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);


app.listen(PORTA, () => {
  console.log(`Server is running on port ${PORTA}`);
});

