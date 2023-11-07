import userModel from "./user.model.js";

export async function createUser(req, res) {
  try {
    const user = req.body;
    user.active = true;
    const document = await userModel.create(user);
    res.status(201).json(document)
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function readUserByID(req, res) {
  try {
    const id = req.params._id;
    const document = await userModel.findById({ _id: id , active:true });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function readUserByMail(req, res) {
  try {
    const {mail, password} = req.params;
    const document = await userModel.findOne({
			mail,
			password,
			active: true,
		});

    document ? res.status(200).json(document) : res.sendStatus(404);

  } catch (error) {
    res.status(400).json(error.message)
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params._id;
    const document = await userModel.findByIdAndUpdate( { _id: id, active: true }, req.body, {
      runValidators: true,
      new: true,
    });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params._id;
    const document = await userModel.findByIdAndUpdate({ _id: id, active: true }, { active: false }, {
      runValidators: true,
			new: true,
    });
    document ? res.status(200).json(document) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
