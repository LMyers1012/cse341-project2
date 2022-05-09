const express = require('express');
const bodyParser = require('body-parser');
// const mongodb = require('./backend/db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./backend/routes'));

// Catch-all for logging errors in console
// process.on('uncaughtException', (err, origin) => {
//   console.log(
//     process.stderr.fd,
//     `Caught exception: ${err}\n` + `Exception origin: ${origin}`
//   );
// });

const db = require('./backend/models');
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
