/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { StudentRoutes } from './app/modules/student/student.route';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { promise } from 'zod';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// Routes
app.use('/api/v1', router);
// app.use('/api/v1', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  // Promise.reject();
});

//not found
app.use(notFound);

// Error-handling middleware
app.use(globalErrorHandlers);

export default app;
