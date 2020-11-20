module.exports = (server, passport)  => {

    server.get('/', (req, res) => {
        res.render('index', {
            message: req.flash('loginMessage')
        });
        
    });

    server.get('/registro', (req, res) => {
        res.render('registro', {
            message: req.flash('registroMessage')
        });
    });

    //server.post('/login', passport.authenticate('') {});
    

    server.post('/registro', passport.authenticate('local-signup', {
        successRedirect: '/inicio',
        failureRedirect: '/registro',
        failureFlash: true
    }));

    /*server.post('/registro', (req, res) => {
        passport.authenticate('local-signup', function(err, user){
            console.log('asies')
        })(req, res)
    });*/

    server.get('/inicio', (req, res) =>{
        res.render('inicio', {
            user:req.user
        });
    });
};

/*passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);*/
