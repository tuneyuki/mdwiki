import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { cache } from "react";

const url = process.env.MONGO_URL || '';
const dbName = process.env.MONGO_DBNAME || '';


// console.log(url)

// export interface mongoData {
//   _id: Object;
//   title: string;
//   content: string;
//   createAt: string;
// }


const getMongoData = cache ( async (colName: string, query: Object) => {
  const client = new MongoClient(url);
  try {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName);
    const collection = db.collection(colName);
    const document = await collection.findOne(query);

    return document;

  } catch (e) {
    console.error(e);
  }
  return {}
})

const saveMongoData = cache ( async (colName: string, title: string, content: string) => {
  const client = new MongoClient(url);
  try {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection(colName)
    const res = await collection.updateOne(
      {"title": title}, //filter
      {'$set': { "title": title, "content": content } }
    )
  } catch (e) {
    console.error(e)
  }
  return {}
})


export { getMongoData, saveMongoData };