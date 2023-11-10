import { UserController } from "../controllers/UserController";
const userController  = new UserController();
const express = require('express');
const router = express.Router();
const client_id = process.env.GIT_CLIENT_ID;
router.get('/register', userController.Register)

module.exports = router;