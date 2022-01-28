const express = require('express');

const peopleController = require('../controllers/people');

const router = express.Router();

router.post('/', peopleController.postPeople);

router.get('/', peopleController.getAllPeople);


router.put('/', peopleController.putPeople);

router.delete('/:id', peopleController.deletePeople);

module.exports = router;
