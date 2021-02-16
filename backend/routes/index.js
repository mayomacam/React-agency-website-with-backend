var express = require('express');
const messageSchema = require('./../models/messagedb')
var router = express.Router();

router.get('/message', async (req, res) => {
  //await messageSchema.findByIdAndDelete(req.params.id)
  res.send('Working this page fine.')
});

router.get('/:slug', async (req, res) => {
  const message = await messageSchema.findOne({ slug: req.params.slug })
  if (message == null) res.redirect('/')
  res.render('show', { message: message })
});

router.delete('/:id', async (req, res) => {
  await messageSchema.findByIdAndDelete(req.params.id);
  res.redirect('/')
});

module.exports = router;
