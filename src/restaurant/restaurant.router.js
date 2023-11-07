import { Router } from 'express';
import {
  createRestaurant,
  readRestaurant,
  readRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from './restaurant.controller.js';

const restaurantRouter = Router();

restaurantRouter.post('/', createRestaurant);
restaurantRouter.get('/:_id', readRestaurant);
restaurantRouter.get('/search', readRestaurants);
restaurantRouter.patch('/:_id', updateRestaurant);
restaurantRouter.delete('/:_id', deleteRestaurant);

export default restaurantRouter;
