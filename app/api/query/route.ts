import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID
const pageId = 'ac8f8e1df8344a0eb03527c983bd9bab'

export async function POST(req: Request) {
  // const { sort } = await req.json()
  const response = await notion.databases.query({
    database_id: databaseId!,
    sorts: [
      {
        property: 'vehicle',
        direction: 'ascending'
      }
    ]
  })

  return Response.json(response.results)
}

export async function PATCH() {
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      show: {
        checkbox: false
      }
    }
  })
  return Response.json(response)
}
