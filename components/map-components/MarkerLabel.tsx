import React from 'react'
import fetchJson from '@/lib/fetchJson'
import { revalidateTagAction } from '@/lib/actions'

export function MarkerLabelEnd({
  sortClass,
  address,
  detailAddress
}: {
  sortClass: string
  address: string
  detailAddress: string
}) {
  return (
    <div
      className="flex justify-evenly items-center box-content w-[261px] h-[62px] rounded-[12px] 
    border border-[#ECEEF6] z-[999] 
    bg-white shadow-[0px_20px_60px_0px_rgba(0,0,0,0.05)]"
    >
      <div>
        <span className={`block ${sortClass}`} />
      </div>
      <div className="text-[#232323] text-[16px] leading-[16px] font-[700] tracking-[0.16px]">
        <div className="mb-[5px]">{address}</div>
        <div>
          <span className="text-[12px] font-[400] text-[#B0B0B0] tracking-[0.12px] semi-word-space">
            {detailAddress}{' '}
          </span>
        </div>
      </div>
    </div>
  )
}

export function MarkerLabel({
  timestamp,
  position,
  sortClass,
  sortText,
  pageId,
  resolved
}: {
  timestamp: string
  position: string
  sortClass: string
  sortText: string
  pageId: string
  resolved: boolean
}) {
  return (
    <div
      className="flex justify-evenly items-center box-content w-[261px] h-[62px] rounded-[12px] 
    border border-[#ECEEF6] z-[999999] 
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
        {!resolved && (
          <>
            <button
              className="block bg-check mb-[8px]"
              onClick={async () => {
                await fetchJson(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/map`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    pageId: pageId
                  })
                })
                await revalidateTagAction('map')
              }}
            />
            <button
              className="block bg-remove"
              onClick={async () => {
                await fetchJson(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/remove`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    pageId: pageId
                  })
                })
                await revalidateTagAction('map')
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
