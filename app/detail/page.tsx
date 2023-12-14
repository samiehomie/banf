import React from 'react'
import DetailTable from '@/components/table-components/DetailTable'
import fetchJson from '@/lib/fetchJson'

export default async function Page() {
  const response = await fetchJson<notionPage[]>(
    'http://localhost:3000/api/query',
    {
      next: { tags: [`detail`] },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //   sort: 'vehicle'
      // })
    }
  )

  return <DetailTable response={response} />
}
