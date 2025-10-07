const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_KEY = process.env.JWT_KEY; // Secret key for signing JWT tokens
const UserRepository = require('../repository/user-repository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // 🧩 Create a new user
  async createuser(data) {
    try {
      const user = await this.userRepository.createuser(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in User Services (createuser)");
      throw error;
    }
  }

  // 🧩 Delete an existing user by ID
  async deleteuser(userId) {
    try {
      await this.userRepository.deleteuser(userId);
      return true;
    } catch (error) {
      console.log("Something went wrong in User Services (deleteuser)");
      throw error;
    }
  }

  // 🧩 User Sign-In Logic
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      const passwordMatch = await bcrypt.compare(plainPassword, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = this.createToken({
        id: user.id,
        email: user.email,
      });

      return {
        message: "Sign-in successful",
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      };
    } catch (error) {
      console.log("Something went wrong in Sign IN process", error);
      throw error;
    }
  }

  // 🧩 Create a JWT token with 1-hour expiration
  createToken(user) {
    try {
      return jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  // 🧩 Verify a given JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_KEY);
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  // 🧩 Compare plain password with hashed password
  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }

  // 🧩 Check if a user is an admin
  async isAdmin(userId) {
    try {
      return await this.userRepository.isAdmin(userId); // ✅ now userId is passed as argument
    } catch (error) {
      console.log("Error in isAdmin service:", error);
      throw error;
    }
  }
}

module.exports = UserService;
