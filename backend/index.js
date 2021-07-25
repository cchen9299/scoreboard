import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
//import mongoose from 'mongoose';
import BoardgamesDAO from './dao/boardgamesDAO.js';
import GameRecordsDAO from './dao/gameRecordsDAO.js';
import PlayersDAO from './dao/playersDAO.js';

dotenv.config();
const port = process.env.PORT || 5001;
const MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.SCOREBOARD_DB_URI, {
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await BoardgamesDAO.injectDB(client);
    await GameRecordsDAO.injectDB(client);
    await PlayersDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

// mongoose
//   .connect(process.env.SCOREBOARD_DB_URI)
//   .catch((error) => {
//     console.error(error.stack);
//     process.exit(1);
//   })
//   .then(async (client) => {
//     console.log(client);
//     await BoardgamesDAO.injectDB(client);
//     app.listen(port, () => {
//       console.log(`listening on port ${port}`);
//     });
//   });
