const express = require('express');
const router = express.Router();
const controller = require('../controllers/player-controller');
const validate = require('../middlewares/validateRequest');
const { playerSchema } = require('../validations/player-validation');

// GET
router.get('/', controller.getPlayers);

router.get('/:id/description', controller.getPlayerDescription);

// POST
router.post('/', validate(playerSchema), controller.createPlayer);

// PATCH
router.patch('/:id', validate(playerSchema), controller.updatePlayer);

// DELETE
router.delete('/:id', controller.deletePlayer);

module.exports = router;
