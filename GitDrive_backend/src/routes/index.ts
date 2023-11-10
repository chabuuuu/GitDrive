const githubRouter = require('./github');
const userRouter = require('./user');
function route(app: any){
    app.use('/github', githubRouter);
    app.use('/user', userRouter);
}
module.exports = route;