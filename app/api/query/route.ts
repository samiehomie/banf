import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

export async function POST(req: Request) {
  // const { sort } = await req.json()
  const response = await notion.databases.query({
    database_id: databaseId!,
    // page_size: 9,
    // start_cursor: '1',
    filter: {
      property: 'show',
      checkbox: {
        equals: true
      }
    },
    sorts: [
      {
        property: 'vehicle',
        direction: 'ascending'
      }
    ]
  })
  console.log('res', response)
  return Response.json(response.results)
}

export async function PATCH(req: Request) {
  const today = new Date()
  today.setHours(today.getHours() + 9)
  const { pageId } = await req.json()

  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      completed: {
        date: {
          start: today.toISOString().split('T')[0]
        }
      },
      resolved: {
        checkbox: true
      }
    }
  })
  return Response.json(response)
}
