const passport = require('passport');
const express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('./config')

router.get('/', function (req, res) {
  res.render('pages/first.ejs'); // load the index.ejs file
});

router.get('/indexLnd', function (req, res) {
  res.render('pages/indexLnd.ejs'); // load the index.ejs file
});
router.get('/indexFB', function (req, res) {
  res.render('pages/indexFB.ejs'); // load the index.ejs file
});
router.get('/indexTwt', function (req, res) {
  res.render('pages/indexTwt.ejs'); // load the index.ejs file
});

router.get('/profile', isLoggedIn, async function (req, res) {

    res.render('pages/profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });

});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'],
}));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;