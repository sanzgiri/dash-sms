#! /usr/bin/env node

var config = require('./config.json');
var dash_button = require('node-dash-button');
var dash = dash_button(config.button.id);

// Twilio Credentials
var accountSid = config.twilio.sid;
var authToken = config.twilio.token;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

dash.on("detected", function (){

  console.log("Dash button detected!");
  client.messages.create({
        to: config.message.to,
        from: config.message.from,
        body: config.message.body
  }, function(err, message) {
        console.log(message.sid);
  });

});

