const { User, Roles } = require('../models/index');

class UserRepository {

  // 🧩 Create a new user
  async createuser(data) {
    try {
      return await User.create(data);
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (createuser)");
      throw error;
    }
  }

  // 🧩 Delete a user by ID
  async deleteuser(userId) {
    try {
      await User.destroy({ where: { id: userId } });
      return true;
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (deleteuser)");
      throw error;
    }
  }

  // 🧩 Fetch a single user by ID
  async getUser(userId) {
    try {
      return await User.findByPk(userId, { attributes: ['id', 'email'] });
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (getUser)");
      throw error;
    }
  }

  // 🧩 Fetch a user by email
  async getByEmail(userEmail) {
    try {
      return await User.findOne({ where: { email: userEmail } });
    } catch (error) {
      console.log("❌ Something went wrong in User Repository (getByEmail)");
      throw error;
    }
  }

  // 🧩 Check if a user is an Admin
  async isAdmin(userId) {
    try {
      // ✅ Include Roles properly for many-to-many
      const user = await User.findByPk(userId, { include: { model: Roles } });

      if (!user) throw new Error("User not found");

      const roles = user.Roles || [];
      const isAdmin = roles.some(role => role.name === 'ADMIN');

      return isAdmin;

    } catch (error) {
      console.log("❌ Something went wrong in User Repository (isAdmin):", error.message);
      throw error;
    }
  }
}

module.exports = UserRepository;
