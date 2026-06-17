import { MongoClient, Db } from "mongodb";
import dns from "dns";

// Force Google DNS to bypass local SRV lookup blocks
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

let uri = process.env.MONGODB_URI as string;
if (uri && uri.includes("+srv")) {
  uri = "mongodb://flaxcollective:rUrN2Fd3AHCz2EZH@ac-m2vop7z-shard-00-00.ejwchow.mongodb.net:27017,ac-m2vop7z-shard-00-01.ejwchow.mongodb.net:27017,ac-m2vop7z-shard-00-02.ejwchow.mongodb.net:27017/flax_collective?ssl=true&replicaSet=atlas-wkm30g-shard-0&authSource=admin&retryWrites=true&w=majority";
}

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
  return client.db(); 
}
