import { getOne, getAll } from "@/app/lib/mongodb2";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  
  const data = await getAll('mongodum')

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const param = await req.json()
  // console.log(param.title)

  const data = await getOne(param.title)

  return NextResponse.json(data)
}