const express = require('express');
const { getSecretForUser, insertSecret } = require('../controller/secretsController');

const router = express.Router();

router.get("/secrets/:id", getSecretForUser); 

router.post("/secrets", insertSecret);

module.exports = router;