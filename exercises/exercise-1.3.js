const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  const data = await db.collection("users").find().toArray();
  console.log(data);

  if (data.length < 1) res.status(404);
  else res.status(200).send(data);

  client.close();
  console.log("disconnected!");
};

getUsers("test")
  .then(function (result) {
    console.log("test");
  })
  .catch(function (failure) {
    console.log(failure);
  });

module.exports = { getUsers };
