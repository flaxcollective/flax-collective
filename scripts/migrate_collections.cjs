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

// Load .env.local first (targets local by default, or accepts --target=atlas)
const targetAtlas = process.argv.includes('--target=atlas');

if (targetAtlas) {
  loadEnv(path.join(process.cwd(), '.env'));
} else {
  loadEnv(path.join(process.cwd(), '.env.local'));
  loadEnv(path.join(process.cwd(), '.env'));
}

const uri = targetAtlas 
  ? (process.env.MONGODB_FALLBACK_URI || process.env.MONGODB_URI)
  : (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flax_collective_dev');

const MAPPINGS = [
  { oldName: 'exams', newName: 'e_certifications' },
  { oldName: 'exam_questions', newName: 'e_certification_questions' },
  { oldName: 'exam_sessions', newName: 'e_certification_sessions' },
  { oldName: 'customCourses', newName: 'custom_courses' },
];

async function migrate() {
  console.log(`\n============================================================`);
  console.log(` Running Collection Migration on: ${targetAtlas ? 'LIVE ATLAS' : 'LOCAL DATABASE'}`);
  console.log(` Target URI: ${uri}`);
  console.log(`============================================================\n`);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  const collections = (await db.listCollections().toArray()).map(c => c.name);
  console.log('Current collections in DB:', collections);

  for (const { oldName, newName } of MAPPINGS) {
    if (collections.includes(oldName)) {
      if (collections.includes(newName)) {
        console.log(`⚠️ Destination '${newName}' already exists. Merging missing documents from '${oldName}'...`);
        const oldDocs = await db.collection(oldName).find().toArray();
        for (const doc of oldDocs) {
          await db.collection(newName).updateOne(
            { _id: doc._id },
            { $set: doc },
            { upsert: true }
          );
        }
        await db.collection(oldName).drop();
        console.log(`✓ Merged and dropped legacy collection: '${oldName}' -> '${newName}'`);
      } else {
        await db.collection(oldName).rename(newName);
        console.log(`✓ Successfully renamed: '${oldName}' -> '${newName}'`);
      }
    } else {
      console.log(`- '${oldName}' does not exist (already migrated or not present).`);
    }
  }

  // Drop temp if present
  if (collections.includes('temp')) {
    await db.collection('temp').drop();
    console.log(`✓ Dropped unused 'temp' collection.`);
  }

  const updatedCollections = (await db.listCollections().toArray()).map(c => c.name);
  console.log('\nUpdated Collections List:');
  for (const c of updatedCollections) {
    const count = await db.collection(c).countDocuments();
    console.log(`  • ${c}: ${count} documents`);
  }

  console.log('\nMigration completed successfully!\n');
  await client.close();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
