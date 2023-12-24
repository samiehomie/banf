import React from 'react'
import PaginatedItems from '@/components/common/PaginatedItmes'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

export default async function Page() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId as string,
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
    return (
      <PaginatedItems
        title="Pothole History"
        items={response.results as notionPageDetail[]}
        itemsPerPage={9}
        extraStyle={{
          width: '50%',
          paddingRight: '30px'
        }}
      />
    )
  } catch (error) {
    console.error(error)
    return null
  }
}

export const revalidate = 3600
