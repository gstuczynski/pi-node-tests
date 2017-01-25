
const PORT = 3005; //|| process.env.PORT;


var five = require('johnny-five');
var Raspi = require('raspi-io');
var express = require('express');
var app = express();
var led;

var board = new five.Board({
  io: new Raspi()
});
var led;
  board.on('ready', function() {
    led = new five.Led('P1-13');
 // led.blink();
  });

app.get('/off', function (req, res) {
  led.off();
  res.send('led off')
})
app.get('/on', function (req, res) {
led.on();
res.send('led on')
})
app.get('/blink', function (req, res) {
led.blink();
res.send('led blink')
})

app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT);
});

