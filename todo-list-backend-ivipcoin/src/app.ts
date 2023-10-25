import 'express-async-errors';
import express from 'express';
import taskRouter from './routes/task';
import userRouter from './routes/user';
import errorHandler from './middlewares/errorHandler';

import cors from 'cors';
const app = express();
 
app.use(cors());

app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use(errorHandler);

export default app;
