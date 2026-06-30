import fs from "fs";
import path from "path";

const MOCK_DB_PATH = path.join(process.cwd(), "local_db.json");

function readDb(): Record<string, any[]> {
  if (!fs.existsSync(MOCK_DB_PATH)) {
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify({}, null, 2));
  }
  try {
    const data = fs.readFileSync(MOCK_DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

function writeDb(data: Record<string, any[]>) {
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2));
}

class MockCursor {
  private items: any[];
  constructor(items: any[]) {
    this.items = items;
  }
  sort() {
    return this;
  }
  limit(num: number) {
    this.items = this.items.slice(0, num);
    return this;
  }
  skip(num: number) {
    this.items = this.items.slice(num);
    return this;
  }
  async toArray() {
    return this.items;
  }
}

class MockCollection {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  private getItems(): any[] {
    const db = readDb();
    return db[this.name] || [];
  }

  private saveItems(items: any[]) {
    const db = readDb();
    db[this.name] = items;
    writeDb(db);
  }

  private match(item: any, filter: any): boolean {
    if (!filter) return true;
    for (const key in filter) {
      if (filter[key] !== item[key]) {
        return false;
      }
    }
    return true;
  }

  async findOne(filter: any) {
    const items = this.getItems();
    return items.find(item => this.match(item, filter)) || null;
  }

  async insertOne(doc: any) {
    const items = this.getItems();
    const newDoc = { ...doc };
    if (!newDoc._id) {
      newDoc._id = Math.random().toString(36).substring(2, 9);
    }
    items.push(newDoc);
    this.saveItems(items);
    return { acknowledged: true, insertedId: newDoc._id };
  }

  async insertMany(docs: any[]) {
    const items = this.getItems();
    const newDocs = docs.map(doc => {
      const newDoc = { ...doc };
      if (!newDoc._id) {
        newDoc._id = Math.random().toString(36).substring(2, 9);
      }
      return newDoc;
    });
    items.push(...newDocs);
    this.saveItems(items);
    return { acknowledged: true, insertedCount: newDocs.length };
  }

  async updateOne(filter: any, update: any, options?: { upsert?: boolean }) {
    const items = this.getItems();
    const index = items.findIndex(item => this.match(item, filter));
    let matchedCount = 0;
    let modifiedCount = 0;

    if (index === -1) {
      if (options?.upsert) {
        let newDoc = { ...filter };
        if (update.$set) {
          newDoc = { ...newDoc, ...update.$set };
        }
        if (!newDoc._id) {
          newDoc._id = Math.random().toString(36).substring(2, 9);
        }
        items.push(newDoc);
        this.saveItems(items);
        return { acknowledged: true, matchedCount: 0, modifiedCount: 0, upsertedId: newDoc._id, upsertedCount: 1 };
      }
      return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
    }

    matchedCount = 1;
    const item = { ...items[index] };
    if (update.$set) {
      Object.assign(item, update.$set);
      modifiedCount = 1;
    }
    if (update.$inc) {
      for (const k in update.$inc) {
        item[k] = (item[k] || 0) + update.$inc[k];
      }
      modifiedCount = 1;
    }
    items[index] = item;
    this.saveItems(items);
    return { acknowledged: true, matchedCount, modifiedCount };
  }

  async findOneAndUpdate(filter: any, update: any, options?: { returnDocument?: string, upsert?: boolean }) {
    const items = this.getItems();
    const index = items.findIndex(item => this.match(item, filter));
    let doc: any;

    if (index === -1) {
      if (options?.upsert) {
        doc = { ...filter };
        if (update.$set) {
          Object.assign(doc, update.$set);
        }
        if (update.$inc) {
          for (const k in update.$inc) {
            doc[k] = (doc[k] || 0) + update.$inc[k];
          }
        }
        if (!doc._id) {
          doc._id = Math.random().toString(36).substring(2, 9);
        }
        items.push(doc);
        this.saveItems(items);
        return doc;
      }
      return null;
    }

    const original = { ...items[index] };
    doc = { ...items[index] };
    if (update.$set) {
      Object.assign(doc, update.$set);
    }
    if (update.$inc) {
      for (const k in update.$inc) {
        doc[k] = (doc[k] || 0) + update.$inc[k];
      }
    }
    items[index] = doc;
    this.saveItems(items);
    return options?.returnDocument === "after" ? doc : original;
  }

  async deleteOne(filter: any) {
    const items = this.getItems();
    const index = items.findIndex(item => this.match(item, filter));
    if (index !== -1) {
      items.splice(index, 1);
      this.saveItems(items);
      return { acknowledged: true, deletedCount: 1 };
    }
    return { acknowledged: true, deletedCount: 0 };
  }

  async deleteMany(filter: any) {
    const items = this.getItems();
    const remaining = items.filter(item => !this.match(item, filter));
    const deletedCount = items.length - remaining.length;
    this.saveItems(remaining);
    return { acknowledged: true, deletedCount };
  }

  find(filter: any) {
    const items = this.getItems();
    const matched = items.filter(item => this.match(item, filter));
    return new MockCursor(matched);
  }

  async countDocuments(filter: any) {
    const items = this.getItems();
    const matched = items.filter(item => this.match(item, filter));
    return matched.length;
  }

  async createIndex() {
    return "";
  }
}

export class MockDb {
  collection(name: string) {
    return new MockCollection(name);
  }
}
