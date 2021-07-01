const express = require('express');
const apiRouter = require('./routes');
const router = require('./routes/public.js');

const app =  express();

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRouter);
app.use('/', router);

let Port = 3001
app.listen(Port, () =>{
    console.log(`server is running at  http://localhost:${Port}`)
})
