const dotenv = require('dotenv');
dotenv.config();
// const MongoClient = require('mongodb').MongoClient;

// let _db;

// // Check if db is already initialized.
// const initDb = (callback) => {
//   if (_db) {
//     console.log('DB is already initialized.');
//     return callback(null, _db);
//   }
//   // If not already init., connect and store db in _db
//   MongoClient.connect(process.env.MONGODB_URI)
//     .then((client) => {
//       _db = client;
//       callback(null, _db);
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };

// // Check if database not initialized correctly
// const getDb = () => {
//   if (!_db) {
//     throw Error('Database not initialized.');
//   }
//   return _db;
// };

// // Export functions
// module.exports = { initDb, getDb };

module.exports = {
  url: process.env.MONGODB_URI,
};
