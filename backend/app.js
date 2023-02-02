const express = require('express');
const mongoose = require('mongoose');
const app = express();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();


//connexion MongoDB
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));
//JrcWxHI3pK6Qe7fF

app.use(helmet());
//CORS middleware 
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); //d'accéder à notre API depuis n'importe quelle origine
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
   res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //d'envoyer des requêtes avec les méthodes mentionnées 
   next();
 });

//lire le contenu JSON renvoyé par les requêtes POST
app.use(express.json()); 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;


