import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    user_id: { type: String, required: true,},
    restaurant_id: { type: String, required: true },
    state: {
      type: String,
      required: true,
      default : created,
      enum: [
        'created',
        'sent',
        'accepted',
        'received',
        'heading your way',
        'fullfiled',
      ],
    },
    active:{ type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const orderModel = model('orders', orderSchema);
export default orderModel;