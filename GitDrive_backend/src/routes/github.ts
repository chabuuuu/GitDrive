import { GitController } from "../controllers/GitController";
import { authenticateJWT } from "../utils/jwtAuthentication";
const gitController = new GitController();
const express = require('express');
const router = express.Router();
const client_id = process.env.GIT_CLIENT_ID;
router.get('/callback', gitController.LoginCallback)
router.get('/login', authenticateJWT, gitController.Login)
router.get('/get-resources', authenticateJWT, gitController.GetAllContents)
router.get('/', (req: any, res: any) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}`);
})
module.exports = router;