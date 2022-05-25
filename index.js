// modules
const express = require('express');
const app = express();
//middleware imports
const middleware = require('./middlewares/index.mw');
// route imports
const index = require('./routes');

app.disable('x-powered-by')
app.use(middleware.global);

app.use('/', index);
// error handle
app.use(middleware.one.errorHandle)

app.listen(8080, '0.0.0.0', () => {
    console.log("Server Started")
})