import productModel from './product.model.js';

export async function createProduct(req, res) {
  try {
    const product = req.body;
    product.active = true;
    const document = await productModel.create(product);
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function readProduct(req, res) {
  try {
    const id = req.params._id;
    const document = await productModel.findOne({ _id: id, active: true });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function searchProduct(req, res) {
  try {
    const { restaurant_id, categories } = req.query;

    const filter = {
      ...(restaurant_id && { restaurant_id: restaurant_id }),
      ...(categories && { category: { $in: categories.split(',') }}),
      active: true,
    };

    const documents = await productModel.find(filter);

    documents.length > 0 ? res.status(200).json(documents) : res.sendStatus(404);

  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function updateProduct(req, res) {
  try {
    const id = req.params._id;
    const document = await productModel.findByIdAndUpdate({ _id: id, active: true }, req.body, {
      runValidators: true,
      new: true,
    });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function deleteProduct(req, res) {
  try {
    const id = req.params._id;
    const document = await productModel.findOneAndUpdate({ _id: id, active:true}, { active: false }, {
			runValidators: true,
			new: true,
		});
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
