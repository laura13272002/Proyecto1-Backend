import { Router } from 'express';

import {
  createOrder,
  deleteOrder,
  readOrder,
  searchOrder,
  updateOrder,
  getOrderSent,
} from './order.controller.js';

const orderRouter = Router();

orderRouter.post('/', createOrder);
orderRouter.get('/:_id', readOrder);
orderRouter.get('/', searchOrder);
orderRouter.get('/sent', getOrderSent);
orderRouter.patch('/:_id', updateOrder);
orderRouter.delete('/:_id', deleteOrder);

export default orderRouter;
