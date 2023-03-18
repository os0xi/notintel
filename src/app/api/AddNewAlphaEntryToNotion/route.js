import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_SECRET;
const db = process.env.NOTION_DB_2;

const notion = new Client({ auth: notionSecret });

export async function POST(req, res) {
  const newAlpha = await req.json();
  const tags = newAlpha.selectedTags.map((tag) => ({ name: tag }));
  const chains = newAlpha.selectedChains.map((chain) => ({ name: chain }));
  const phase = newAlpha.selectedPhases.map((phase) => ({ name: phase }));

  console.log(tags);

  const response = await notion.pages.create({
    cover: {
      type: "external",
      external: {
        url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
      },
    },
    icon: {
      type: "emoji",
      emoji: "🥬",
    },
    parent: {
      type: "database_id",
      database_id: "2e64ffd638ef4914a3675ecf38d89510",
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: newAlpha.name,
            },
          },
        ],
      },

      Notes: {
        rich_text: [
          {
            text: {
              content: newAlpha.notes,
            },
          },
        ],
      },
      Twitter: {
        rich_text: [
          {
            text: {
              content: newAlpha.twitterAddress,
            },
          },
        ],
      },

      Chain: {
        multi_select: chains,
      },
      Followers: { number: Number(newAlpha.twitterFollowers) },
      Tags: {
        multi_select: tags,
      },
      Phase: {
        multi_select: phase,
      },
    },
    children: [],
  });

  //   const query = await notion.databases.retrieve({ database_id: db });
  //   const propsList = query;

  // .chain
  return NextResponse.json({ ...tags });
}
//   const query = await notion.databases.query({ database_id: db });
// .chain
// let newAlpha = await req.json();
//   const newPageFromAlpha = {
//     cover: {
//       type: "external",
//       external: {
//         url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
//       },
//     },
//     icon: {
//       type: "emoji",
//       emoji: "🥬",
//     },
//     parent: {
//       type: "database_id",
//       database_id: db,
//     },
//     properties: {
//       Notes: {
//         rich_text: [
//           {
//             text: {
//               content: newAlpha.notes,
//             },
//           },
//         ],
//       },
//     },
//   };
//   const response = await notion.pages.create(newPageFromAlpha);
//   console.log(response);
