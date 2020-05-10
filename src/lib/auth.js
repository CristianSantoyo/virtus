module.exports = {
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }else{
            return res.redirect("/");
        }        
    },
    isNotLoggedIn(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }else{
            if (req.session.passport.user.tipo == 'usuario'){
                returnres.redirect("/home");
            }else{
                return res.redirect("/homeAdmin");
            }
            
        }
    },
    isAdmin(req, res, next) {        
        //console.log(req.session.passport.user);
        if (req.session.passport.user.tipo == 'administrador'){
            return next();
        }else{
            return res.redirect("/error");
        }        
    },
    isUser(req, res, next) {        
        //console.log(req.session.passport.user);
        if (req.session.passport.user.tipo == 'usuario'){
            return next();
        }else{
            return res.redirect("/error");
        }        
    }
};