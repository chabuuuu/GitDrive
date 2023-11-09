import { LoginControllercallback } from "../controllers/Login_Controller";
const githubRouter = require('./github');

function route(app: any){
    app.use('/github', githubRouter);
}
module.exports = route;