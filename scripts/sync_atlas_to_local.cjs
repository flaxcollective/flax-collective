const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

function loadEnv(file) {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        let val = trimmed.substring(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

// Read remote URI from .env (ignoring .env.local to get Atlas)
loadEnv(path.join(process.cwd(), '.env'));

const remoteUri = process.env.MONGODB_FALLBACK_URI || process.env.MONGODB_URI;
const localUri = 'mongodb://127.0.0.1:27017/flax_collective_dev';

async function syncAll() {
  console.log('Connecting to remote Atlas...');
  const remoteClient = new MongoClient(remoteUri);
  await remoteClient.connect();
  const remoteDb = remoteClient.db('flax_collective');

  console.log('Connecting to local MongoDB (mongodb://127.0.0.1:27017/flax_collective_dev)...');
  const localClient = new MongoClient(localUri);
  await localClient.connect();
  const localDb = localClient.db('flax_collective_dev');

  // Discover all collections on live server
  const collectionsList = await remoteDb.listCollections().toArray();
  const collectionNames = collectionsList
    .map(c => c.name)
    .filter(name => !name.startsWith('system.'));

  console.log(`\nFound ${collectionNames.length} collections on remote Atlas.`);
  console.log('Starting full 1:1 synchronization to local MongoDB...\n');

  const ALIASES = {
    exams: 'e_certifications',
    exam_questions: 'e_certification_questions',
    exam_sessions: 'e_certification_sessions',
    customCourses: 'custom_courses',
  };

  for (const colName of collectionNames) {
    if (colName === 'temp') continue; // Skip dead collection
    const targetColName = ALIASES[colName] || colName;
    const remoteDocs = await remoteDb.collection(colName).find().toArray();
    
    // Clear local target collection first so it is an exact mirror
    await localDb.collection(targetColName).deleteMany({});

    if (remoteDocs.length > 0) {
      await localDb.collection(targetColName).insertMany(remoteDocs);
      console.log(`✓ [${colName} -> ${targetColName}]: Cloned ${remoteDocs.length} documents.`);
    } else {
      console.log(`- [${colName} -> ${targetColName}]: 0 documents (empty on remote).`);
    }
  }


  console.log('\n============================================================');
  console.log(' Full 1:1 synchronization complete!');
  console.log(' All live server collections are now cloned into local DB:');
  console.log(' mongodb://127.0.0.1:27017/flax_collective_dev');
  console.log('============================================================\n');

  await remoteClient.close();
  await localClient.close();
}

syncAll().catch(err => {
  console.error('Sync error:', err);
  process.exit(1);
});
