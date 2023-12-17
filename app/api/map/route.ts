import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

export async function POST(req: Request) {
  const { databaseId, region } = await req.json()
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'show',
          checkbox: {
            equals: true
          }
        },
        {
          property: 'region',
          rich_text: {
            contains: region
          }
        }
      ],
    },
    sorts: [
      {
        property: 'order',
        direction: 'ascending'
      }
    ]
  })
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
