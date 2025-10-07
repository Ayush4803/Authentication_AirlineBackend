const express = require('express');
const router = express.Router();

const UserController= require('../../controllers/user-controller')
const { AuthRequestValidator, isAuthenticated } = require('../../middlewares');
router.post('/signup', AuthRequestValidator.validateUserAuth,UserController.create);
router.post('/signin',AuthRequestValidator.validateUserAuth,UserController.signIn);

router.get('/profile', isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Access granted to profile',
    user: req.user
  });
});
router.get('/isAdmin',AuthRequestValidator.validateIsAdminRequest,UserController.isAdmin)
module.exports = router;