const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const busboy = require('busboy');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const session = require("express-session");
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');

// Inicio de Sesion
const passport = require('passport');
//Initialization
const app = express();

require('./lib/passport');
//Configuraciones - Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares -> Funciones que se ejecutan cada vez que un usuario hace una peticion al servidor
app.use(session({
    secret : 'sesiondemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

//Global Variables
app.use((req, res, next) => {
    app.locals.errorLogin = req.flash('errorLogin');
    app.locals.user = req.user;
    next();
});


//Routes Rutas
app.use(require('./routes/userRoutes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/adminRoutes'));
app.use('/perfil', require('./routes/profile'));
app.use('/links',require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404
app.use(function(req, res) {
    res.status(400);
    res.render('templates/error404');
});


// Starting server - Iniciar el Servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


