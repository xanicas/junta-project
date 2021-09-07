const express = require('express');
const router = express.Router();

const auth = require('./middleware/auth');

const EleitorController = require('./controllers/EleitorController');
const UserController = require('./controllers/UserController');

// This route handler is for demo purposes,
// you can replace it with your own route and add other routes as desired
router.get("/", (request, response) => {
  response.json({"message": "app works!"});
});

router.post('/user/login', UserController.Login)

router.get('/eleitores', auth, EleitorController.GetEleitores);
router.get('/eleitores/psd', auth, EleitorController.GetEleitoresPSD);
router.get('/eleitores/ps', auth, EleitorController.GetEleitoresPS);


module.exports = router;