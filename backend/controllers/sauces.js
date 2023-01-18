const modelsSauces = require('../models/sauces');


exports.createSauces('/', (req, res, next) => {
    const saucesObject = JSON.parse(req.body.thing);
    delete saucesObject._id;
    const sauces = new modelsSauces({
        ...saucesObject,
        imageUrl : ;
        likes : ;
        dislikes : ;
        usersLiked : ;
        usersDisliked : ;
    })
    sauces.save()
    .then(() => { res.status(201).json({message: 'Votre sauce est enregistré !'})})
   .catch(error => { res.status(400).json( { error })})
  });
  
  exports.getIdSauces('/:id', (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });
  
  exports.imgUrlSauces('/', (req, res, next) => {
    
  });
  
  exports.updateSauces('/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
   
    );
  });
  
  exports.deleteSauces('/:id', (req, res, next) => {
    Thing.find().then(
     
    );
  });

  exports.likeSauces('/:id/like', (req, res, next) => {
    Thing.find().then(
     
    );
  });