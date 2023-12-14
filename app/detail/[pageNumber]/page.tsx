import React from 'react'
import DetailTable from '@/components/table-components/DetailTable'
import fetchJson from '@/lib/fetchJson'

// TODO: Parallel Routes 로 전환
// TODO: 테이블 형태 고정 문제

export default async function Page({
  params: { pageNumber }
}: {
  params: { pageNumber: string }
}) {
  const response = await fetchJson<notionPage[]>(
    'http://localhost:3000/api/query',
    {
      next: { tags: [`detail`] },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify({
      //   sort: 'vehicle'
      // })
    }
  )

  return <DetailTable response={response} pageNumber={Number(pageNumber)}/>
}

export const revalidate = 3600
