const WebSocket = require('websocket').w3cwebsocket;
const Stomp = require('stompjs');

// Replace with your WebSocket URL
const wsURL = 'ws://localhost:8080/portfolio';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a WebSocket connection
const ws = new WebSocket(wsURL);

// Set up a STOMP client using the WebSocket connection
const client = Stomp.over(ws);
const username='vala'
const sending="kala"
client.connect({}, () => {
  console.log('STOMP client connected');

  rl.setPrompt('Please enter something: ');
  rl.prompt();

  rl.on('line', (message) => {
    // Clear the console
    console.clear();

    // Send the message
    sendMessage(message);

    rl.prompt();
  });

  client.subscribe('/user/vala/private', function (message) {
    console.log('Received message:', message);
});
});
function sendMessage(message) {
  client.send('/app/private-message/' + sending, {}, message);
}

// Error and close event handlers
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
  if (event.wasClean) {
    console.log('WebSocket connection closed cleanly');
  } else {
    console.error('WebSocket connection closed unexpectedly:', event.reason);
  }
};
