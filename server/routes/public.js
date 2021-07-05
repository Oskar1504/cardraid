const express = require('express')
const router = express.Router();

router.get('/',async (req, res, next) => {
    try{
        console.log("Lol")
        res.send("login.html")
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
});

module.exports = router;