const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_KEY = process.env.JWT_KEY; // Secret key for signing JWT tokens
const UserRepository = require('../repository/user-repository');

class UserService {
  constructor() {
    // Initialize user repository instance for database operations
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
      // 1️⃣ Fetch the user from the database using their email
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      // 2️⃣ Compare incoming plain-text password with the stored encrypted password
      const passwordMatch = await bcrypt.compare(plainPassword, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      // 3️⃣ Generate a JWT token for the authenticated user
      const token = this.createToken({
        id: user.id,
        email: user.email,
      });

      // 4️⃣ Return a success message along with token and basic user info
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
      const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  // 🧩 Verify a given JWT token
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response; // returns decoded payload if valid
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  // 🧩 Compare plain password with hashed password (synchronous method)
  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
