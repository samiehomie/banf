import React from 'react'
import BanfMap from '@/components/map-components/BanfMap'

const apiKey = process.env.GOOGLE_MAPS_API_KEY
const databaseId = process.env.NOTION_DATABASE_ID4
export default async function Home() {
  return <BanfMap mapKey={apiKey!} databaseId={databaseId!} />
}
