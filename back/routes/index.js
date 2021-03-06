const { Router } = require('express');
const router = Router();
const connection = require('./conf');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/* GET index page. */

// get /films
router.get('/films', (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from ghibli_film', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// post /films 
router.post('/films', (req, res) => {
  const formData = req.body;
  console.log('formData:', formData);
  connection.query('INSERT INTO ghibli_film SET ?', formData, (err) => {
    if (err) {
      console.log('err:', err);
      res.status(500).send('Erreur lors de rejouter un film');
    } else {
      res.status(200).send('ok');
    }
  });
});

// search bar
router.get('/results', (req, res) => {
  console.log('req.query3', req.query);
  const keyword = `%${req.query.keyword}%`;
  connection.query('SELECT * FROM ghibli_film WHERE name LIKE ?', keyword, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
      console.log('Back-results of search', results);
    }
  });
});

// signup below with bcrypt password & Installation de *passport*
router.post('/auth/signup', (req, res) => {
  // ci-dessous je crypte myPassword qui devient un 'hash'/Store hash in database
  let hash = bcrypt.hashSync(req.body.password, 10);
  let newUser = {
    email: req.body.email,
    // envoie dans BD => hash au lieu de req.body.password
    password: hash,
    name: req.body.name,
    lastname: req.body.lastname,
    passwordconfirm: req.body.passwordconfirm,
  }
  connection.query('INSERT INTO users SET ?', newUser, (err) => {
    if (err) {
      res.status(500).send('Erreur lors de creat an account');
    } else {
      res.status(200).send('Ok for creating an account');
    }
  })
})

// route signin JWT (Json Web Token) 
router.post('/signin', function (req, res) {
  const authenticate = passport.authenticate('local', (err, user, info) => {
    console.log("user:", user)
    // const token = jwt.sign(JSON.stringify(user), 'your_jwt_secret');
    if (err) {
      return res.sendStatus(500);
    } if (!user) {
      console.log('message400', info.message);
      return res.status(400).json({ messsage: info.message });
    }
    const token = jwt.sign(JSON.stringify(user), 'your_jwt_secret');
    return res.json({ user, token });
  })
  // cette fonction va appele la stratégie 'local'configurée dans app.js
  authenticate(req, res)
});

//Attention: différentier la route du back "/profile" et le path du front"/myprofile" 
router.get("/profile", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.send(req.user);
})

module.exports = router;
