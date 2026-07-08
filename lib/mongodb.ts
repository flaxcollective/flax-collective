import { MongoClient, Db } from "mongodb";
import dns from "dns";
import { MockDb } from "./mongodb_mock";

// Force Google DNS to bypass local SRV lookup blocks
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

let uri = process.env.MONGODB_URI as string;
if (uri && uri.includes("+srv")) {
  const fallback = process.env.MONGODB_FALLBACK_URI;
  if (fallback) {
    uri = fallback;
  } else {
    console.warn("⚠️ MONGODB_URI contains +srv and MONGODB_FALLBACK_URI is not set in environment.");
  }
}

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

// In production, reuse the client across hot reloads (Next.js dev mode)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _mongoMockActive: boolean | undefined;
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000 // limit wait to 5s in dev to fail-fast and fallback
    });
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

export async function getDb(): Promise<Db> {
  // Check if fallback to mock DB is active
  if (process.env.NODE_ENV === "development" && global._mongoMockActive) {
    return new MockDb() as any as Db;
  }

  try {
    await client.connect();
    return client.db(); 
  } catch (error) {
    console.warn("⚠️ Failed to connect to MongoDB Atlas. Falling back to local JSON database mock for development.");
    if (process.env.NODE_ENV === "development") {
      global._mongoMockActive = true;
    }
    return new MockDb() as any as Db;
  }
}

export async function getNextSequence(sequenceName: string): Promise<number> {
  const db = await getDb();
  const counterCollection = db.collection("counters");
  const result = await counterCollection.findOneAndUpdate(
    { _id: sequenceName as any },
    { $inc: { sequence_value: 1 } },
    { returnDocument: "after", upsert: true }
  );
  
  if (!result) {
    throw new Error("Could not increment/upsert counter");
  }
  
  return result.sequence_value;
}


