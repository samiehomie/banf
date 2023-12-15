import React from 'react'
import { BasicTable } from '@/components/table-components/DetailTable'
import fetchJson from '@/lib/fetchJson'
import PaginatedItems from '@/components/common/PaginatedItmes'

export default async function Page() {
  const response = await fetchJson<notionPage[]>(
    'http://localhost:3000/api/query',
    {
      next: { tags: [`detail`] },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        databaseId: process.env.NOTION_DATABASE_ID as string
      })
    }
  )
  return <PaginatedItems title='Pothole History' items={response} itemsPerPage={9} />
  // return <BasicTable title="Pothole History" response={response} />
}

export const revalidate = 3600
