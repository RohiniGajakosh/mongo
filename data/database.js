import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

let database;

// Only attempt to connect to a real database if all required
// environment variables are provided. This prevents the application
// from crashing in environments where no MongoDB credentials are
// configured (e.g. automated tests).
if (
  connectionProtocol &&
  clusterAddress &&
  dbUser &&
  dbPassword &&
  dbName
) {
  const uri = `${connectionProtocol}://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  console.log('Trying to connect to db');

  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server');
    database = client.db(dbName);
  } catch (error) {
    console.log('Connection failed.');
    await client.close();
    console.log('Connection closed.');
  }
}

// Fall back to an undefined database so that the rest of the
// application can provide in-memory substitutes when no connection is
// established.
export default database;
