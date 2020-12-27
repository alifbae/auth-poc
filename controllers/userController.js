const { User, UserRole, Role } = require("../models");
const userService = require("../services/userService");

const userList = async (req, res) => {
  const users = await userService.getUserList();
  res.status(200).json(users);
};

const userDetail = async (req, res) => {
  try {
    req_user_id = parseInt(req.params.id);
    const user = await userService.getUserById(req_user_id);
    res.status(200).json(user);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({message: err.message});
    } else (
      next(err)
    )
  }
};

const userCreate = async (req, res) => {
  try {
    if (!req.body.email) {
      throw ({status: 400, message: 'email is required'});
    } else if (!req.body.password) {
      throw ({status: 400, message: 'password is required'});
    }

    new_user = await userService.createUser(req.body.email, req.body.password);
    if (!new_user) {
      throw {status: 422, message: "could not create user"};
    } else {
      res.status(201).json({message: "user created successfully"});
    }
  } catch (err) {
    if (err.status == 400 || err.status == 422) {
      res.status(err.status).json({message: err.message})
    } else {
      next(err)
    };
  }
};

const userEdit = async (req, res) => {
  try {
    if (!req.body.email) {
      throw ({status: 400, message: 'email is required'});
    }
    user = await userService.updateUser(req.params.id, req.body.email);
    res.status(200).json(user);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({message: err.message});
    } else {
      next(err)
    }
  }
};

const userDelete = async (req, res) => {
  try {
    if (!req.params.id) {
      throw ({status: 400, message: 'userId is required'});
    }
    await userService.deleteUser((userId = req.params.id), (email = req.body.email));
    res.status(204).json({message: 'user deleted successfully'})
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({message: err.message})
    } else {
      next(err)
    }
  }
};

module.exports = {
  userList,
  userDetail,
  userCreate,
  userEdit,
  userDelete,
};
