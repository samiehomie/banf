import React from 'react'
import PaginatedItems from '@/components/common/PaginatedItmes'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID3

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
        title="Route History"
        items={response.results as notionPageHistory[]}
        itemsPerPage={8}
        extraStyle={{
          paddingLeft: '50px',
          paddingRight: '15px',
          paddingBottom: '60px'
        }}
      />
    )
  } catch (error) {
    console.error(error)
    return null
  }
}

export const revalidate = 3600
