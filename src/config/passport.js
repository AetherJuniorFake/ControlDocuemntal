const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/user');

module.exports = function (passport){
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done){
        User.findById(id, function (err, user){
            done(err, user);
        });
    });

    //Registrase 
    passport.use('local-signup', new LocalStrategy({
        usernameField:'nombre',
        apellidosField: 'apellidos',
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        
    },
    function(req, nombre, apellidos, email, password, done){
        User.findOne({'local.email': email}, function (err, user) {
            if (err){ return done(err);}
            if (user){
                return done(null, false, req.flash('registroMessage', 'El email ya existe'));
            }else {
                var newUser = new User();
                newUser.local.nombre = nombre;
                newUser.local.apellidos = apellidos;
                newUser.local.email = email;
                newUser.local.password = newUser.generarHash(password);
                newUser.save(function(err){
                    if (err) {throw err;}
                    return done(null, newUser);
                });
            }
        });
    }));

    //Login
    passport.use('local-login', new LocalStrategy({
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        
    },
    function(req, nombre, apellidos, email, password, done){
        User.findOne({'local.email': email}, function (err, user) {
            if (err){ return done(err);}
            if (!user){
                return done(null, false, req.flash('loginMessage', 'El usuario no ha sido encontrado'));
            }
            if(!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Contraseña Equivocada'));
            }
            return done(null, user);
        });
    }));
}