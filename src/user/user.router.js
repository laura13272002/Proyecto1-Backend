import { Router } from 'express';
import {
  createUser,
  deleteUser,
  // readUser,
  readUserByID,
  readUserByMail,
  updateUser,
} from './user.controller.js';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:_id', readUserByID);
userRouter.get('/:mail/:password', readUserByMail);
userRouter.patch('/:_id', updateUser);
userRouter.delete('/:_id', deleteUser);

export default userRouter;
