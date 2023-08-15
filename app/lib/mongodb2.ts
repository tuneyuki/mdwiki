import { MongoClient } from "mongodb";
import { cache } from "react";

const url = process.env.MONGO_URL || '';
const dbName = process.env.MONGO_DBNAME || '';

const client = new MongoClient(url);


const getOne = async (title:string) => {
  try {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName);
    const collection = db.collection('mongodum');
    const document = await collection.findOne({title : title});

    return document;

  } catch (e) {
    console.error(e);
  }
  return {}
}

const getAll = async (colName:string) => {
  try {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName);
    const collection = db.collection(colName);
    const cursor = await collection.find({});
    
    const docs = await cursor.toArray()
    const list: object[] = []
    docs.map((item) => {
      list.push(item)
    })

    return list

  } catch (e) {
    console.error(e);
  }
  return []
}

const saveOne = async (params:string) => {
  
}

export { getOne, getAll, saveOne };