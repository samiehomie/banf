import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

export async function PATCH(req: Request) {
  const today = new Date()
  today.setHours(today.getHours() + 9)
  const { pageId } = await req.json()

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
