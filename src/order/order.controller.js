import orderModel from './order.model.js';

export async function createOrder(req, res) {
  try {
    const order = req.body;
    order.active = true;
    const document = await orderModel.create(order);
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function readOrder(req, res) {
  try {
    const id = req.params.id;
    const document = await orderModel.findOne({ _id: id, active: true });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function searchOrder(req, res) {
  try {
    const { user_id, restaurant_id, starDate, endDate} =req.query;
    const filter = {
      ...(user_id && {user_id: user_id}),
      ...(restaurant_id && {restaurant_id: restaurant_id}),
      ...(starDate && endDate && {
        createdAt: {
          $gte: new Date(starDate),
          $lt: new Date(endDate),
        },
      }),
      active: true,
    }
    const documents = await orderModel.find(filter);
    documents.length > 0 ? res.status(200).json(documents): res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function getOrderSent(res) {
  try {
    const document = await orderModel.find({
      active: true,
      status: 'sent'
    });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}


export async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const document = await orderModel.findOneAndUpdate(
      { _id: id, active: true, status: 'created' },
      req.body,
      { runValidators: true,
      new: true }
    );
    document ? res.status(200) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    const document = await orderModel.findByIdAndUpdate( { _id: id, active: true }, {active: false,}, {new: true},);
    document ? res.status(200) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
