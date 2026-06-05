import express  from 'express';
import dotenv from 'dotenv';
import router from './routers/router';
import conectar from './configs/api/conne';

const PORTA: number = parseInt(process.env["PORT"] || '3000', 10);

dotenv.config();
conectar();
const app = express();
app.use(express.json());
app.use(router);



app.listen(PORTA, () => {
  console.log(`Server is running on port ${PORTA}`);
});

