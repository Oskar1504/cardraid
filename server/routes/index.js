const express = require('express')
const axios = require('axios');
const htmlToJson = require('html-to-json');

const router = express.Router();

router.get('/',async (req, res, next) => {
    try{
        let results = await db.all();
        res.json(results)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
});

router.get('/id/:id',async (req, res, next) => {
    try{
        let results = await db.one(req.params.id);
        res.json(results)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
});


router.get('/gi/char/:id',async (req, res, next) => {
    try{
        //requests side from website
        let url = `https://genshin.honeyhunterworld.com/db/char/${req.params.id}`
        axios({
            method:'get',
            url
        })
            .then(function (response) {

                let htmlstring = response.data,
                    output = {},

                    start = htmlstring.search('Stat Progression</span><div class=skilldmgwrapper>'),
                    ende = htmlstring.indexOf("</td></tr></table></div>",start),
                    stat_table = htmlstring.substring(start, ende );

                //forms an nice array
                htmlToJson.parse(stat_table , function () {
                    return this.map('td', function ($item) {
                        return $item.text();
                    });
                }).done(function (items) {
                    let o = {}
                    //deletes all not needed cells
                    items.forEach(function(item, index, array){
                        array[index] = item.replace("%","")
                        if(item.includes("x") || item === "Ascension" || item === ''){
                            array.splice(index, 1);
                        }
                    })

                    //chunks array into matrix array
                    let chunkSize = items.findIndex(value => /\d/.test(value));
                    o.tableMatrix = chunk(items,chunkSize)
                    output.statProgression = o
                    checkSend(res,output)

                }, function (err) {
                    console.log(err)
                });

                //get Atack talents
                start = htmlstring.search('Attack Talents</span><table'),
                    ende = htmlstring.indexOf("</td></tr></table></div>",start),
                    stat_table = htmlstring.substring(start, ende );

                //forms an nice array
                htmlToJson.parse(stat_table , function () {
                    return this.map('td', function ($table) {
                        return $table.text();
                    });
                }).done(function (table) {
                    //splits attack information from data table and forms an array
                    let o = {}
                    table.forEach(function(item, index,array){
                        if(item === 'Lv1'){
                            o.attacks = (array.splice(0,index-1))
                        }
                    })
                    o.tableMatrix = (chunk(table,16))
                    output.attackTalents = o
                    checkSend(res,output)
                }, function (err) {
                    console.log(err)
                });

            })
            .catch(function (error) {
                console.log(error);
                res.sendStatus(500)
            });

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
});



module.exports = router;


function chunk(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
    return R;
}

function checkSend(res,output){
    if(output.attackTalents && output.statProgression){
        res.json(output)
    }
}