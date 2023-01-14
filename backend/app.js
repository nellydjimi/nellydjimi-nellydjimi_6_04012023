const express = require('express');
const mongoose = require('mongoose');
const app = express();
const things = require('./models/thing');

//connexion MongoDB
mongoose.connect('mongodb+srv://nelly:WYjJoB0hxsbdJTwv@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



//CORS middleware 
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); //d'accéder à notre API depuis n'importe quelle origine
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //d'envoyer des requêtes avec les méthodes mentionnées 
   next();
 });

app.use(express.json()); //intersepte tout les objet json

app.post("/api/auth/signup", (req, res) =>{
   console.log("connexion :", req.body);
   res.send({message: "Connexion de l'utilisateur"});
});
app.post("/api/auth/login");


module.exports = app;


