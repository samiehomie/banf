import React from 'react'
import fetchJson from '@/lib/fetchJson'
import PaginatedItems from '@/components/common/PaginatedItmes'

export default async function Page() {
  const response = await fetchJson<notionPageDetail[]>(
    'http://localhost:3000/api/query',
    {
      next: { tags: [`detail`] },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        databaseId: process.env.NOTION_DATABASE_ID2 as string
      })
    }
  )
  return (
    <PaginatedItems
      title="Road Temperature / Slippery Road History"
      items={response}
      itemsPerPage={9}
      extraStyle={{
        width: '50%',
        paddingLeft: '30px'
      }}
    />
  )
}

export const revalidate = 3600
