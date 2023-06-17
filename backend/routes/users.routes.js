const express = require('express');
const { registerUser, verifyEmail } = require('../controllers/user.controlle');
const UserRouter = express.Router();

UserRouter.post("/register",registerUser)
UserRouter.get("/verify-email/:token",verifyEmail)

module.exports = UserRouter;
