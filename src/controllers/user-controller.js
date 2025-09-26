const UserService = require('../services/user-service');
const userService = new UserService();

const create = async (req, res) => {
  try {
    const user = await userService.createuser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,   // returning created user
      error: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create user",
      error: error.message
    });
  }
};

module.exports = {
  create
};
