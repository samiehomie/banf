import React from 'react'
import BanfMap from '@/components/map-components/BanfMap'
import fetchJson from '@/lib/fetchJson'

const apiKey = process.env.GOOGLE_MAPS_API_KEY

export default async function Home() {
  const response = await fetchJson<notionMap[]>(
    'http://localhost:3000/api/map',
    {
      next: { tags: [`map`] },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        databaseId: process.env.NOTION_DATABASE_ID4 as string,
        region: '2972 Westheimer'
      })
    }
  )

  return <BanfMap mapKey={apiKey!} response={response} />
}
