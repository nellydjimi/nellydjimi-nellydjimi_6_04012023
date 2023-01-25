const modelsSauces = require('../models/sauces');
const fs = require('fs');

//renvoie tableau de toutes les sauces
exports.createSauces = ( (req, res, next) => {
    modelsSauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));  
    console.log('Sauce récupérée')
  });

//renvoie la sauce avec l'id fourni
  exports.getIdSauces = ( (req, res, next) => {
    modelsSauces.findOne({_id: req.params.id})
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));  
    console.log('Votre sauce a été récupérée'); 
  });
  
//capture et enregistre l'image, analyse la sauce
  exports.imgUrlSauces = ( (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;
    const sauces = new modelsSauces({
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes:0,
        usersLiked: [' '],
        usersDisliked: [' ']
    });
    sauces.save()
    .then(() => res.status(201).json({message: "Sauce ajoutée"}))
    .catch(error => res.status(400).json({error}));
  });
  
  //maj de la sauce
  exports.updateSauces = ( (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    ModelsSauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce modifiée'}))
    .catch(error => res.status(400).json({error}));  
    console.log('Sauce modifiée'); 
  });
  
//supprime la sauce avec l'id fourni
  exports.deleteSauces = ( (req, res, next) => {
    modelsSauces.findOne({ _id: req.params.id})
    .then(sauces => {
        if (modelsSauces.userId != req.auth.userId) {
            res.status(401).json({message: 'Erreur'});
        } else {
            const filename = sauces.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                modelsSauces.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Votre sauce a été supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
  });

//defini le statut like avec l'userId
  exports.likeSauces = ( (req, res, next) => {
    modelsSauces.updateOne(
        {_id: req.params.id}, 
        {$push: {usersLiked: req.body.userId},
        $inc: {likes: +1}}
    )
    .then(() => { res.status(200).json({message: 'Votre sauce a été supprimé !'})})
    .catch(error => res.status(400).json({ error }));
  });