const express = require('express')
const config = require('../config.json')
const db = require('../db')
const router = express.Router();

router.get('/login',async (req, res, next) => {
    try{
        console.log(req.body)
        let result = await db.login(req.body.email,req.body.password);
        res.redirect("index.html")
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
});

module.exports = router;