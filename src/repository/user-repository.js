const { User } = require('../models/index');

class UserRepository {
  
  // 🧩 Create a new user record
  async createuser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (createuser)");
      throw error;
    }
  }

  // 🧩 Delete a user by ID
  async deleteuser(userId) {
    try {
      await User.destroy({
        where: { id: userId }
      });
      return true;
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (deleteuser)");
      throw error;
    }
  }

  // 🧩 Fetch a single user by primary key (ID)
  async getUser(userId) {
    try {
      // ⚠️ FIX: Method name should be findByPk, not findbyPk (case-sensitive)
      const user = await User.findByPk(userId, {
        attributes: ['email']  // Only return email field for privacy
      });
      return user;
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (getUser)");
      throw error;
    }
  }

  // 🧩 Fetch user by email — useful for authentication
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: { email: userEmail }
      });
      return user;
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (getByEmail)");
      throw error;
    }
  }
}

module.exports = UserRepository;
