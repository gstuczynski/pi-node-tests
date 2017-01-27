
const PORT = 3005; //|| process.env.PORT;


var five = require('johnny-five');
var express = require('express');
var app = express();
var led, servo, proximity;

var board = new five.Board();



board.on('ready', function() {

  led = new five.Led(13);
  servo = new five.Servo(10);
  proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 'A0'
  });

  this.repl.inject({
    servo: servo,
    led: led
  });

proximity.on('data', function() {
    console.log('Proximity: ');
    console.log('  cm  : ', this.cm);
    console.log('  in  : ', this.in);
    console.log('-----------------');
  });

  proximity.on('change', function() {
    console.log('The obstruction has moved.');
  });



  });





app.get('/servmove', function (req, res) {
  servo.to( 90 )
  //servo.step(10)
  res.send('servo step')
})
app.get('/servmove2', function (req, res) {
  step(10)
  res.send('servo step')
})





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

