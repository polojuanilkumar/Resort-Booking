import { MongoClient } from "mongodb";

const options = {};
const dbName = process.env.MONGODB_DB || "resort_booking";

let clientPromise;

function getClientPromise() {
  if (!clientPromise) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      clientPromise = Promise.reject(
        new Error("Please define the MONGODB_URI environment variable inside .env.local")
      );
    } else {
      const client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  }

  return clientPromise;
}

export default getClientPromise;

export async function getMongoDb() {
  const mongoClient = await getClientPromise();
  return mongoClient.db(dbName);
}
