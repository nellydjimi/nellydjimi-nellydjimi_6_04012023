const express = require('express');

const app = express();

app.use(express.json()); //intersepte tout les objet json

//CORS middleware 
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); //d'accéder à notre API depuis n'importe quelle origine
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //d'envoyer des requêtes avec les méthodes mentionnées 
   next();
 });

app.post("/api/auth/signup");
app.post("/api/auth/login");


module.exports = app;