const express = require('express');
const bodyParser = require('body-parser');
const db = require('./backend/models');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT || 8080;
const app = express();

// Logging while in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Passport Config
require('./backend/db/passport')(passport);

app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions (must be above passport middleware)
app.use(
  session({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use('/', require('./backend/routes'));

// Catch-all for logging errors in console
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connected and server running on port ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database.', err);
    process.exit();
  });
