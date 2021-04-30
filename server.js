const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const messages = require('./data');

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

//all messages
app.get('/', function (req, res) {
  res.send(messages);
});

//create messages
app.post('/newMessage', function (req, res) {
  const {id, from, text} = req.body;
  // const id = messagesData.messages[messagesData.messages.length - 1].id + 1;
  const requestTime = new Date().toISOString();
  const newMessage = {id, from, text, requestTime};
  if (
    !newMessage.from ||
    newMessage.from === '' ||
    !newMessage.text ||
    newMessage.text === ''
  ) {
    throw new Error('Empty field: from or text or both');
  }
  // const memo = req.body;
  messages.push(newMessage);
  res.send('message created');
});

//get by id
app.get('/message/:id', function (req, res) {
  const singleMessage = messages.filter(
    (message) => message.id == req.params.id
  );
  res.send(singleMessage);
});

//delete
app.delete('/message/:id', function (req, res) {
  const index = messages.findIndex((message) => message.id == req.params.id);
  if (index === 1) {
    messages.splice(index);
    res.send(messages);
  } else {
    res.send("It doesn't exist!!!");
  }
});

app.listen(8080, () => {
  console.log('Server is working');
});
