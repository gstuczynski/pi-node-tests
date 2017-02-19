const five = require('johnny-five');
const io = require('socket.io').listen(3333);
const express = require('express');
const app = express();
const request_cli = require('request');
const nodemailer = require('nodemailer');


var led, servo, proximity, relay, motors={};

var board = new five.Board();

board.on('ready', ()=> {
  this.repl = false

  relay = new five.Relay(10);
  led = new five.Led(13);
  servo = new five.Servo(8);
motors={
  left: new five.Motor({pins:{pwm: 10, dir:9},invertPWM: true}),
  right: new five.Motor({ pins:{ pwm: 6, dir: 5}, invertPWM: true})
}
motors.left.stop()
motors.right.stop()
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tentostertotester@gmail.com',
        pass: 'toster123'
    }
});


app.get('/motion', (req, res) => {
//if get motion, send email and request to esp with time

//nodemdu send as param timer how long it is working, i get this param, convert from ms
let t = req.query.timer
let espTimeWork ="NodeMdu is working for "+ Math.round((t/(60*60))%24) + ":"+Math.round((t/(60))%60);


// setup email data with unicode symbols
let mailOptions = {
    from: '"Toster 👻" <tentostertotester@gmail.com>', // sender address
    to: 'tentostertotester@gmail.com', // list of receivers
    subject: 'Movement detected', // Subject line
    html: '<b>Movement detected</b><br />'+espTimeWork // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    console.log(req.query.timer);
});


    console.log(req.query.time);


})


app.listen(3000);


io.sockets.on('connection', (socket)=> {
  console.log('connection');
  socket.on('forward',(data)=> {
    motors.left.forward(255)
    motors.right.forward(255);
    console.log('forward')
  });
    socket.on('reverse',(data)=> {
    motors.left.reverse(255)
    motors.right.reverse(255);
    console.log('reverse')
  });
  socket.on('stop',(data)=> {
    motors.left.stop()
    motors.right.stop();
   // console.log('stop')
  })
  .on('left',()=>{
    motors.left.reverse(255);
    motors.right.forward(255);})
  .on('right',()=>{
    motors.right.reverse(255);
    motors.left.forward(255);})
  .on('bulbOn',()=>{
    request_cli('http://192.168.0.18/bulbOn',(error, response, body)=> {
      if (error) {
        console.log("Error: "+error)
      }
    })
  })
  .on('bulbOff',()=>{
    request_cli('http://192.168.0.18/bulbOff',(error, response, body)=> {
      if (error) {
        console.log("Error: "+error)
      }
    })
  })
});