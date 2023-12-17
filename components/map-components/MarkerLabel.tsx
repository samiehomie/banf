import React from 'react'
import fetchJson from '@/lib/fetchJson'
import { revalidateTagAction } from '@/lib/actions'

function MarkerLabel({
  timestamp,
  position,
  sortClass,
  sortText,
  pageId
}: {
  timestamp: string
  position: string
  sortClass: string
  sortText: string
  pageId: string
}) {
  return (
    <div
      className="flex justify-evenly items-center box-content w-[261px] h-[62px] rounded-[12px] 
    border border-[#ECEEF6] absolute z-[9999] left-[900px] top-[300px]
    bg-white shadow-[0px_20px_60px_0px_rgba(0,0,0,0.05)]"
    >
      <div>
        <span className={`block ${sortClass}`} />
      </div>
      <div className="text-[#667085] text-[12px] leading-[16px]">
        <div className="mb-[5px]">{timestamp}</div>
        <div>
          <span className="text-[14px] font-[700]">{sortText} </span>
          <span>({position})</span>
        </div>
      </div>
      <div>
        <button
          className="block bg-check mb-[8px]"
          onClick={async () => {
            await fetchJson('http://localhost:3000/api/query', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                pageId: pageId
              })
            })
            await revalidateTagAction('detail')
          }}
        />
        <button
          className="block bg-remove"
          onClick={async () => {
            await fetchJson('http://localhost:3000/api/remove', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                pageId: pageId
              })
            })
            await revalidateTagAction('detail')
          }}
        />
      </div>
    </div>
  )
}

export default MarkerLabel
