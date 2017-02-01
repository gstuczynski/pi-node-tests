
const PORT = 3005; //|| process.env.PORT;

//
var five = require('johnny-five');
var express = require('express');
var app = express();
var led, servo, proximity, relay;

var board = new five.Board();



board.on('ready', function() {

  relay = new five.Relay(10);
  led = new five.Led(13);
  //servo = new five.Servo(10);
  proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 'A0'
  });

  this.repl.inject({
    servo: servo,
    led: led,
    relay: relay
  });



  proximity.on('change', function() {
    console.log('The obstruction has moved.');
  });

//

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


app.get('/bulb-toogle', function (req, res) {
  relay.toggle();
  res.send('bulb-toogle')
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
//
app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT);
});

