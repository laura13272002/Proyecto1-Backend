import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    categories: {
      type: [String],
      validate: {
        validator: function (array) {
          return array && array.length > 0;
        },
        message: 'there must be at least 1 category',
      },
    },
    inventory: { type: Array, required: false },
    active:{ type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const restaurantModel = model('restaurants', restaurantSchema);
export default restaurantModel;