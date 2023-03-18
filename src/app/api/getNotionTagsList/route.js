import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_SECRET;
const db = process.env.NOTION_DB_ID;

const notion = new Client({ auth: notionSecret });

export async function GET(req, res) {
  const query = await notion.databases.retrieve({ database_id: db });
  const tagsList = query.properties.tags.multi_select;
  // .chain
  return NextResponse.json({ ...tagsList });
}
