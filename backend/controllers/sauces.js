const Sauces = require('../models/sauces');
const fs = require('fs');

//renvoie tableau de toutes les sauces
exports.getSauces = ( (req, res, next) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));  
  });

//renvoie la sauce avec l'id fourni
  exports.getOneSauce =  (req, res, next) => {
    Sauces.findOne({_id: req.params.id})
    .then(sauce => {
            res.status(200).json(sauce)})
    .catch(error => 
        {
        res.status(400).json({error})});  
    console.log('sauces'); 
  };
  
//capture et enregistre l'image, analyse la sauce
  exports.createSauces = ( (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    const sauces = new Sauces({
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes:0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauces.save()
    .then(() => res.status(201).json({message: "Sauce ajoutée"}))
    .catch(error => {
        console.log(error)
        res.status(400).json({error})
    });
  });
  
  //maj de la sauce
  exports.updateSauces = ( (req, res, next) => {
    const saucesObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauces.updateOne({_id: req.params.id}, {...saucesObject, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce modifiée'}))
    .catch(error => res.status(400).json({error}));  
    console.log('Sauce'); 
  });
  
//supprime la sauce avec l'id fourni
  exports.deleteSauces = ( (req, res, next) => {
    Sauces.findOne({ _id: req.params.id})
    .then(sauces => {
        if (sauces.userId != req.auth.userId) {
            res.status(401).json({message: 'Erreur'});
        } else {
            const filename = sauces.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Votre sauce a été supprimé !'})})
                    .catch(error => {
                        console.log(error)
                         res.status(401).json({ error })});
            });
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error });
    });
  });

//defini le statut like avec l'userId
  exports.likeSauces = ( (req, res, next) => {
    Sauces.updateOne(
        {_id: req.params.id}, 
        {$push: {usersLiked: req.body.userId},
        $inc: {likes: +1}}
    )
    .then(() => { res.status(200).json({message: 'Votre sauce a été supprimé !'})})
    .catch(error => res.status(400).json({ error }));
  });