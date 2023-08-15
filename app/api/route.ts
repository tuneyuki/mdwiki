import { NextRequest, NextResponse } from "next/server";
import { getMongoData, saveMongoData } from "../lib/mongodb";


export async function GET(req: NextRequest) {
  const param = await req.nextUrl.searchParams
  const dbName = param.get("dbName")
  const title = param.get("title")
  // console.log(dbName)
  // console.log(title)

  if(dbName && title){
    const data = await getMongoData(dbName, {"title": title})
    return NextResponse.json(data)
  } else if(dbName){
    const data = await getMongoData(dbName, {})
    console.log(data)
    return NextResponse.json(data)
  } else {
    return NextResponse.json({})
  }
}

export async function POST(req: NextRequest) {
  const param = await req.json()
  console.log(param.title)
  console.log(param.content)
  const data = await saveMongoData(param.colName, param.title, param.content )
  return NextResponse.json({})
}