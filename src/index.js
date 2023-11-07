import express from 'express';
import userRouter from './user/user.router.js';
import restaurantRouter from './restaurant/restaurant.router';
import productRouter from './product/product.router';
import orderRouter from './order/order.router';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/restaurant', restaurantRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

mongoose.connect('mongodb+srv://laurabenavides2019:pRMD3oD7SGiWkCKC@delivery.ossefai.mongodb.net/?retryWrites=true&w=majority').then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err))

try {
  app.listen(port);
  console.log('server running on http://localhost:' + port);
} catch (error) {
  console.log(error);
}