var express = require('express');
const messageSchema = require('./../models/messagedb');
var router = express.Router();

router.get('/', async (req, res) => {
  const messages = await messageSchema.find().sort({ createdAt: 'desc' })
  res.json({
      status: 'API Its Working',
      message: 'Welcome to messageApi',
      messages: messages
  });
});

router.post('/', async (req, res, next) => {
  req.messages = new messageSchema()
  next()
}, saveMessage('new'))

function saveMessage(path) {
  return async (req, res) => {
    console.log(req)
    console.log("=================")
    let messages = req.messages
    messages.name = req.body.values.name
    messages.email = req.body.values.email
    messages.phone = req.body.values.phone
    messages.message = req.body.values.message
    try {
      messages = await messages.save()
      res.json({
        status: 'Success',
        message: 'We have recevied your message, we will contact later.'
    });
    } catch (e) {
      res.json({
        status: 'Error',
        message: 'Something went wrong, try again.',
        error: e,
        messages: messages
    });
    }
  }
}

module.exports = router;
