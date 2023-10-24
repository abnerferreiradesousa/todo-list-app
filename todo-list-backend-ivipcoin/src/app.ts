import 'express-async-errors';
import express from 'express';
import taskRouter from './routes/task';
import userRouter from './routes/user';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use(errorHandler);

export default app;
