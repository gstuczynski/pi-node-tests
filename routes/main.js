
var express = require('express');
var router = express.Router();


router.get('/i', function(request, response) {
    response.send("ELO");
});

router.get('/off', function(request, response) {
    response.send("off");
});


console.log("ss");

module.exports = router;
