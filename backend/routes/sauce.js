const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');
const controllersSauces = require('../controllers/sauces');


//renvoie tableau de toutes les sauces
router.get('/',auth , controllersSauces.getSauces)

//renvoie la sauce avec l'id fourni
router.get('/:id', auth, controllersSauces.getOneSauce)

//capture et enregistre l'image, analyse la sauce
router.post('/', auth, multer, controllersSauces.createSauces)

//maj de la sauce
router.put('/:id', auth, multer, controllersSauces.updateSauces)

//supprime la sauce avec l'id fourni
router.delete('/:id', auth, controllersSauces.deleteSauces)

//defini le statut like avec l'userId
router.post('/:id/like', auth, controllersSauces.likeSauces)


module.exports = router;