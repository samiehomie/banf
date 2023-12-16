'use client'
import React from 'react'

function ControlPanel() {
  return (
    <section
      className="absolute left-[60px] bottom-[55px] bg-white rounded-[12px] 
    py-[36px] px-[15px] w-[373px]"
    >
      <div className="flex justify-center items-center pb-[34px]">
        <span className="block bg-fill-pin" />
        <div className="pl-[20px]">
          <h3 className="text-[16px] font-[700] text-[#232323] tracking-[0.18px]">
            2972 Westheimer
          </h3>
          <div className="text-[12px] text-[#B0B0B0] tracking-[-0.17px]">
            Rd. Santa Ana, Illinois 85486
          </div>
        </div>
      </div>
      <div
        className="border-t border-b pl-[30px] grid grid-cols-1 gap-y-5
      tracking-[0.14px] text-[#B0B0B0] text-[14px] font-[600] py-[25px]"
      >
        <div>Total Road Length : xxx KM</div>
        <div className="indent-6">Very Slippery Road Length : xxx KM</div>
        <div className="indent-6">Slippery Road Length : xxx KM</div>
        <div className="indent-6">Moderate Road Length : xxx KM</div>
        <div className="indent-6">High Friction Road Length : xxx KM</div>
      </div>
      <div className="thin-word-space">
        <div className="flex justify-start my-[35px]">
          <div className="inline-flex items-center">
            <span className="inline-block bg-red_circle mr-[5px]" />
            <span className="text-[12px] italic tracking-[0.14px] text-[#B0B0B0] font-[600]">
              x Pothole Depth Deep
            </span>
          </div>
          <div className="inline-flex items-center ml-[11px]">
            <span className="inline-block bg-red_thermo" />
            <span className="text-[12px] italic tracking-[0.14px] text-[#B0B0B0] font-[600]">
              Asphalt Overheating
            </span>
          </div>
        </div>
        <div className="flex justify-start my-[20px]">
          <div className="inline-flex items-center">
            <span className="inline-block bg-red_circle mr-[5px]" />
            <span className="text-[12px] italic tracking-[0.14px] text-[#B0B0B0] font-[600]">
              x Pothole Depth Warning
            </span>
          </div>
          <div className="inline-flex items-center ml-[-5px]">
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
