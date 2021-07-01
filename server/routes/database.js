const express = require('express')
const config = require('../config.json')
const router = express.Router();

router.get('/login',async (req, res, next) => {
    try{
        mongo_client.connect(err => {
            mongo_client.db(config.MONGO_DB).collection("discord").findOne(filter,projection,function(err, res) {
                if (err) throw err;
                if(res != null ){
                    let looting = loot("mine",res.data.inventory)
                    let newData = { $set: { "data.inventory": looting.inventory}};
                    mongo_client.db(config.MONGO_DB).collection("discord").updateOne(filter, newData, function (err, res) {
                        if (err) throw err;
                        msg.reply(looting.message);
                        console.log("from:", msg.author.username, " | ", command, " | Success")
                        mongo_client.close();
                    });
                }else {
                    msg.reply(Format.error(` No account found. Use > ${config.PREFIX}start < to create one` ));
                    mongo_client.close();
                }
            });
        });
        res.redirect("index.html")
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
});

module.exports = router;