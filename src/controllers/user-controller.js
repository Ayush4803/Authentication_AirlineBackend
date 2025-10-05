const UserService = require('../services/user-service');
const userService = new UserService();

// 🧩 Controller to create a new user
const create = async (req, res) => {
  try {
    const user = await userService.createuser(req.body);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,  // returning created user details
      error: {}
    });
  } catch (error) {
    console.error("Error in create controller:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create user",
      error: error.message
    });
  }
};

// 🧩 Controller to handle user sign-in
const signIn = async (req, res) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body;

    // Authenticate user using the service
    const response = await userService.signIn(email, password);

    // Send token and user info back to client
    return res.status(200).json({
      success: true,
      message: response.message,
      token: response.token,
      user: response.user,
      error: {}
    });
  } catch (error) {
    console.error("Error in signIn controller:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
      error: error.message
    });
  }
};

module.exports = {
  create,
  signIn
};
