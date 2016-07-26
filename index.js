#! /usr/bin/env node

const config = require('./config.json');
const dash_button = require('node-dash-button');
// TODO: accept and register an array of button MACs 
const dash = dash_button(config.button.id);
const util = require('util');
const _ = require('lodash');
const when = require('when');

// Twilio Credentials
const accountSid = config.twilio.sid;
const authToken = config.twilio.token;

//require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
console.log('twilio client created.');

/***
 *
 * @param to : any number Twilio can deliver to
 * @param from : A number you bought from Twilio and can use for outbound communication
 * @param message : text message to send
 * @returns {*} : a promise which resolves in to single twilio response, an array of twilio responses or a twilio error
 */
const sendSms = function (to, from, message) {
  "use strict";
  if (_.isArray(to)) {
    let promiseArray = [];
    for (let i = 0; i < to.length; i++) {
      promiseArray.push(sendSms(to[i], from, message));
    }
    return when.settle(promiseArray).then((descriptors) => {
      let successful = [];
      for (let i = 0; i < descriptors.length; i++) {
        if (descriptors[i].state === 'fulfilled') {
          successful.push(descriptors[i].value);
        } else {
          console.log(`twilio API error: ${descriptors[i].reason}`);
        }
      }
      console.log(`Sent ${successful.length} out of ${promiseArray.length} successfully.`);
      return successful;
    }).catch((err) => {
      console.log(`Error with when.settle in sendSms(): ${util.inspect(err, false, null)}`);
      return new Error(`Error with when.settle in sendSms(): ${util.inspect(err, false, null)}`);
    });
  } else {
    return new Promise((resolve, reject) => {
      client.messages.create({
        to: to,
        from: from,
        body: message
      }, (err, message) => {
        if (err) {
          console.log(`twilio api error: ${util.inspect(err, false, null)}`);
          reject(err);
        } else {
          console.log(`twilio response: ${util.inspect(message, false, null)}`);
          resolve(message);
        }
      });
    }); 
  }
};

console.log('waiting for dash button to be pressed...');
dash.on('detected', () => {
  console.log('Dash button detected!');
  // for now we can ignore the promise as it handles any logging and we've no need to care about when it resolves or rejects
  sendSms(config.message.to, config.message.from, config.message.body)
    .then((response) => {
      //
    })
    .catch((err) => {
      //
    });
});

