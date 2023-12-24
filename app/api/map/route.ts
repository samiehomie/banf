import { NextResponse, NextRequest } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

export async function GET(req: NextRequest) {
  const pageId = req.nextUrl.searchParams.get('pageId') as string
  const response = await notion.pages.retrieve({
    page_id: pageId
  })
  return NextResponse.json(response)
}

export async function POST(req: NextRequest) {
  const { databaseId, region } = await req.json()
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'region',
          rich_text: {
            contains: region
          }
        }
      ]
    },
    sorts: [
      {
        property: 'order',
        direction: 'ascending'
      }
    ]
  })
  return NextResponse.json(response.results)
}

export async function PATCH(req: NextRequest) {
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
  return NextResponse.json(response)
}
