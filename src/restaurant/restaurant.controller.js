import restaurantModel from './restaurant.model.js';

export async function createRestaurant(req, res) {
  try {
    const restaurant = req.body;
    restaurant.active = true;
    const document = await restaurantModel.create(restaurant);
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function readRestaurant(req, res) {
  try {
    const id = req.params._id;
    const document = await restaurantModel.findOne({ _id: id, active: true });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function searchRestaurant(req, res) {
  try {
    const { name, categories } = req.query;
    const filter = {
      ...(name && { name: { $regex: name, $options: 'i' } }),
      ...(categories && { categories: { $in: categories.split(',') } }),
      active: true,
    };
    const documents = await restaurantModel.find(filter);
    documents.length > 0 ? res.status(200).json(documents) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function updateRestaurant(req, res) {
  try {
    const id = req.params._id;
    const document = await restaurantModel.findByIdAndUpdate({ _id:id , active:true }, req.body, {
      runValidators: true,
      new: true,
    });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function deleteRestaurant(req, res) {
  try {
    const id = req.params._id;
    const document = await restaurantModel.findByIdAndUpdate(
      { _id: id , active: true },
      { active: false },
      { new: true }
    );
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}