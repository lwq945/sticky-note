var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) { 
    console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID:'a6f097822821c7ab5554',
  clientSecret:'22c562d01b447f17186ece3aa66129c4d2e0f5e4',
  callbackURL:"http://127.0.0.1:3000/auth/github/callback"

    // clientID: 'fe1509f5a47291a7d23f',
    // clientSecret: '820d26b296279d7b50b4ce7bda26dff0bc21f759',
    // callbackURL: "http://note.lwq945.site/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));

/*GET auth */
router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
})
  
router.get('/github',
    passport.authenticate('github'));
  
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      req.session.user = {
        id: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
      };
      res.redirect('/');
});

module.exports = router;