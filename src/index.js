const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const db = require('./models/index');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import main routes
const routes = require('./routes');
app.use('/api', routes); // all routes prefixed with /api

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Server running at PORT: ${PORT}`);

  // try {
  //   // Sync database if enabled in .env
  //   if (process.env.DB_SYNC) {
  //     await db.sequelize.sync({ alter: true });
  //     console.log('✅ Database synced successfully');
  //   }

  //   // Ensure roles exist
  //   const roleNames = ['ADMIN', 'CUSTOMER', 'AIRLINE_BUSINESS'];
  //   for (const name of roleNames) {
  //     const [role, created] = await db.Roles.findOrCreate({
  //       where: { name },
  //       defaults: { name }
  //     });
  //     if (created) console.log(`✅ Role '${name}' created`);
  //   }

  //   // Make user with ID 4 an Admin
  //   const user = await db.User.findByPk(4);
  //   const adminRole = await db.Roles.findOne({ where: { name: 'ADMIN' } });

  //   if (user && adminRole) {
  //     const roles = await user.getRoles();
  //     const hasAdmin = roles.some(role => role.name === 'ADMIN');

  //     if (!hasAdmin) {
  //       await user.addRole(adminRole);
  //       console.log('✅ User 4 is now an Admin');
  //     } else {
  //       console.log('ℹ️ User 4 already has ADMIN role');
  //     }
  //   } else {
  //     console.log('⚠️ Either User 4 or ADMIN role not found');
  //   }

  // } catch (error) {
  //   console.error('❌ Error during server startup:', error);
  // }
});
