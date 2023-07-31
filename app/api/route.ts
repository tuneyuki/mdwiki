import { NextRequest, NextResponse } from "next/server";
import getMongoData from "../lib/mongodb";


export async function GET() {

  const data = {
    title : "Dashboard",
    content : `# Title 1\n* hpge\n* fuga\n\n## Title 2\n* hoge\n* fuga\n\n### Title 3\n* hage\n* hoge\n#### Title4\n* hoge\n##### Title5\n* hoge\n###### Title6\nhogefuga`
      }

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const param = await req.json()
  const data = await getMongoData(param.db, param.query)
  return NextResponse.json(data)
}