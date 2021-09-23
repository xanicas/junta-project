const express = require('express');
const router = express.Router();
const path = require('path');
const basicAuth = require('express-basic-auth');

const EleitorController = require('./controllers/EleitorController');

const auth = basicAuth({
  users: {
      admin: '123',
      user: '456',
  },
});

// This route handler is for demo purposes,
// you can replace it with your own route and add other routes as desired
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

router.get('/authenticate', auth, (req, res) => {
  const options = {
      httpOnly: true,
      signed: true,
  };

  if (req.auth.user === 'admin') {
      res.cookie('name', 'admin', options).send({ screen: 'admin' });
  } else if (req.auth.user === 'user') {
      res.cookie('name', 'user', options).send({ screen: 'user' });
  }
});

router.get('/read-cookie', (req, res) => {
  console.log(req.signedCookies);
  if (req.signedCookies.name === 'admin') {
      res.send({ screen: 'admin' });
  } else if (req.signedCookies.name === 'user') {
      res.send({ screen: 'user' });
  } else {
      res.send({ screen: 'auth' });
  }
});

router.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
});

router.get('/get-data', (req, res) => {
  if (req.signedCookies.name === 'admin') {
      res.send('This is admin panel');
  } else if (req.signedCookies.name === 'user') {
      res.send('This is user data');
  } else {
      res.end();
  }
});

router.get('/eleitores', EleitorController.GetEleitores);
router.put('/eleitores/:id', EleitorController.UpdateEleitor);
router.post('/eleitores', EleitorController.CreateEleitor);

router.get('/eleitores/psd', EleitorController.GetEleitoresPSD);
router.get('/eleitores/ps', EleitorController.GetEleitoresPS);

module.exports = router;