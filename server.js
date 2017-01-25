
const PORT = 3000 //|| process.env.PORT;

var five = require("johnny-five");
var Raspi = require("raspi-io");
var express = require('express');
var app = express(); 
//var nodeadmin = require('nodeadmin'); 
//app.use(nodeadmin(app));

var mainRouter = require('./routes/main');
app.use('/', mainRouter);
/*
app.get('/', function (req, res) {
  console.log("yeah")
})
*/

var board = new five.Board({
  io: new Raspi()
});   

board.on("ready", function() {
  var led = new five.Led("P1-13");
  led.blink();
}); 
    
app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT);
});

