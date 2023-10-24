import express from 'express';
import taskRouter from './routes/task';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);
app.use(errorHandler);

export default app;
