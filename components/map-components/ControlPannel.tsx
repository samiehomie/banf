'use client'
import React from 'react'
import { getDistance, getRoundedNumBySecond } from '@/lib/tools'
const lengths = {
  total: 0,
  verySlippery: 0,
  slippery: 0,
  moderate: 0,
  friction: 0
}
function ControlPanel({ response }: { response: notionMap[] }) {
  response.map((data) => {
    const sort = data.properties.condition.select.name
    const [lat1, lon1] = data.properties.start.rich_text[0].plain_text
      .split(',')
      .map(Number)
    const [lat2, lon2] = data.properties.end.rich_text[0].plain_text
      .split(',')
      .map(Number)
    const length = getDistance(lat1, lon1, lat2, lon2)
    lengths.total += length
    switch (sort) {
      case 'danger':
        lengths.friction += length
        break
      case 'normal':
        lengths.moderate += length
        break
      case 'hot':
        lengths.slippery += length
        break
      case 'cold':
        lengths.verySlippery += length
        break
    }
  })
  return (
    <section
      className="absolute left-[60px] bottom-[55px] bg-white rounded-[12px] 
    py-[36px] px-[15px] w-[373px]"
    >
      <div className="flex justify-center items-center pb-[34px]">
        <span className="block bg-fill-pin" />
        <div className="pl-[20px]">
          <h3 className="text-[18px] font-[700] text-[#232323] tracking-[0.18px]">
            {response[0].properties.region.title[0].plain_text}
          </h3>
          <div className="text-[12px] text-[#B0B0B0] tracking-[-0.17px] semi-word-space">
            Rd. Santa Ana, Illinois 85486
          </div>
        </div>
      </div>
      <div
        className="border-t border-b pl-[30px] grid grid-cols-1 gap-y-5
      tracking-[0.14px] text-[#B0B0B0] text-[14px] font-[600] py-[25px]"
      >
        <div>Total Road Length : {getRoundedNumBySecond(lengths.total)} KM</div>
        <div className="indent-6">
          Very Slippery Road Length :{' '}
          {getRoundedNumBySecond(lengths.verySlippery)} KM
        </div>
        <div className="indent-6">
          Slippery Road Length : {getRoundedNumBySecond(lengths.slippery)} KM
        </div>
        <div className="indent-6">
          Moderate Road Length : {getRoundedNumBySecond(lengths.moderate)} KM
        </div>
        <div className="indent-6">
          High Friction Road Length : {getRoundedNumBySecond(lengths.friction)}{' '}
          KM
        </div>
      </div>
      <div className="thin-word-space">
        <div className="flex justify-start my-[35px]">
          <div className="inline-flex items-center">
            <span className="inline-block bg-red_circle mr-[5px]" />
            <span className="text-[12px] italic tracking-[0.14px] text-[#B0B0B0] font-[600]">
              x Pothole Depth Deep
            </span>
          </div>
          <div className="inline-flex items-center ml-[14px]">
            <span className="inline-block bg-red_thermo" />
            <span className="text-[12px] italic tracking-[0.14px] text-[#B0B0B0] font-[600]">
              Asphalt Overheating
            </span>
          </div>
        </div>
        <div className="flex justify-start my-[20px]">
          <div className="inline-flex items-center">
            <span className="inline-block bg-yellow_circle mr-[5px]" />
            <span className="text-[12px] italic tracking-[0.14px] text-[#B0B0B0] font-[600]">
              x Pothole Depth Warning
            </span>
          </div>
          <div className="inline-flex items-center ml-[-3px]">
            <span className="inline-block bg-blue_thermo" />
            <span className="text-[12px] italic tracking-[0.14px] text-[#B0B0B0] font-[600]">
              Asphalt Freezing
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(ControlPanel)
