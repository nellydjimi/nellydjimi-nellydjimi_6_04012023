const express = require('express');
const router = express.Router();

const controllersSauces = require('../controllers/sauces')

//renvoie tableau de toutes les sauces
router.get('/', controllersSauces.createSauces)

//renvoie la sauce avec l'id fourni
router.get('/:id', controllersSauces.getIdSauces)

//capture et enregistre l'image, analyse la sauce
router.post('/', controllersSauces.imgUrlSauces)

//maj de la sauce
router.put('/:id', controllersSauces.updateSauces)

//supprime la sauce avec l'id fourni
router.delete('/:id', controllersSauces.deleteSauces)

//defini le statut like avec l'userId
router.post('/:id/like', controllersSauces.likeSauces)


module.exports = router;