const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// set path for static files
app.use(express.static('./assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// set up layouts
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// using express-session
app.use(session({
    name: "placementcell",
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*100
    },
    store: MongoStore.create({
        // mongodb+srv://fazilshafi:<password>@cluster0.crvznlx.mongodb.net/?retryWrites=true&w=majority
//         mongoUrl: "mongodb://0.0.0.0/PlacementCell_development",
        mongoUrl: 'mongodb+srv://fazilshafi:12345678Abc@cluster0.crvznlx.mongodb.net/PlacementCell_development?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    },function(err){
        if(err){console.log(err);}
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){console.log("Error in listening to the Server", err);}
    console.log(`Server is up and running on port ${port}`);
});
