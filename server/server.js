const express = require('express');
const dataBaseRouter = require('./routes/database.js');
const router = require('./routes/public.js');

const app =  express();

app.use(express.static('public'));
app.use(express.json());
app.use('/db', dataBaseRouter);
app.use('/', router);


let Port = 3002
app.listen(Port, () =>{
    console.log(`server is running at  http://localhost:${Port}`)
})
