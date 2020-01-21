const functions = require('firebase-functions');

exports.hello = functions.https.onRequest((request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({ hello: 'world ', now: new Date() }));
});
