const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');

// This route handler is for demo purposes,
// you can replace it with your own route and add other routes as desired
router.get("/", (request, response) => {
  response.json({"message": "app works!"});
});

router.get('/users', UserController.GetEleitores);
router.get('/users/psd', UserController.GetEleitorByPartido);

module.exports = router;
