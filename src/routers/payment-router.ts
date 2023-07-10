import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const paymentRouter = Router();

paymentRouter.all('/*', authenticateToken);
paymentRouter.get('/');
paymentRouter.get('/process');

export { paymentRouter };
