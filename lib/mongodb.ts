import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

// In production, reuse the client across hot reloads (Next.js dev mode)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

export async function getDb(): Promise<Db> {
  await client.connect();
  return client.db(); // uses the database name from the URI
}
