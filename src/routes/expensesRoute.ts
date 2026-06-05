import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { day } from '../controller/expenses/day';
import { monthlySummary } from '../controller/expenses/monthlySummary';
import { transactions } from '../controller/expenses/transactions';

const expensesRouter = Router();

expensesRouter.get('/monthly-summary', authMiddleware, monthlySummary);
expensesRouter.get('/transactions', authMiddleware, transactions);
expensesRouter.get('/day', authMiddleware, day);

export default expensesRouter;
