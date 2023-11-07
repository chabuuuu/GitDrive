import express from 'express';
const route = require('./routes/index');
const app = express();
var methodOverride = require('method-override');
const port = 3000;
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//Override method
app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
