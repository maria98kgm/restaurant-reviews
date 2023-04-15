import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantDAO from "./dao/restaurantsDAO.js";
import ReviewDAO from "./dao/reviewsDAO.js";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT;

MongoClient.connect(process.env.MONGO_URI, {
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.log(err.stack);
    process.exit();
  })
  .then(async (client) => {
    await RestaurantDAO.injectDB(client);
    await ReviewDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
