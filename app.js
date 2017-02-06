
const PORT = 3005; //|| process.env.PORT;

//
var five = require('johnny-five');
var io = require('socket.io').listen(3333);
var led, servo, proximity, relay, motor,m;

var board = new five.Board();



board.on('ready', function() {

  relay = new five.Relay(10);
  led = new five.Led(13);
  servo = new five.Servo(8);
  m = new five.Motor({pins:{pwm: 10, dir:9},invertPWM: true});



motor = new five.Motor({
  pins:{
    pwm: 6,
    dir: 5
  },
  invertPWM: true
});




  proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 'A0'
  });

  this.repl.inject({
    servo: servo,
    led: led,
    relay: relay,
    motor: motor,
    m:m
  });

//m.forward(255)
//motor.reverse(255);

  proximity.on('change', function() {
    console.log('The obstruction has moved.');
  });

  });


io.sockets.on('connection', function (socket) {
  console.log('connection');
  socket.on('forward',(data)=> {
    m.forward(255)
    motor.forward(255);
  });
    socket.on('stop',(data)=> {
    m.stop();
    motor.stop();
  });
});