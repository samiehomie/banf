import React from 'react'

function WeatherPannel() {
  return (
    <div
      className="w-[722px] h-[155px] rounded-[8px] bg-white px-[24px] py-[15px]
    absolute z-10 top-[42px] right-[51.71px] flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="block font-[600] leading-[28px] text-[20px] tracking-[-0.2px] mr-[8px]">
            This Area
          </h3>
          <span className="block bg-sun" />
        </div>
        <div className="text-[14px] leading-[16px] text-[#667085]">
          August 1, 2023 EST 16:31:35
        </div>
      </div>
      <div className="flex justify-between h-[70px] items-center">
        <div className="flex items-center">
          <span className="block bg-bigsun mr-[8px]" />
          <div className="text-[28px] leading-[38px] tracking-[-0.56px] font-[600]">
            25
          </div>
        </div>
        <div
          className="text-[14px] leading-[20px] tracking-[-0.1px] thin-word-space 
                    self-start pt-[10px]"
        >
          ℃ | ℉
        </div>
        <div
          className="flex text-[10px] w-[519px]  leading-[13px] text-[#667085] 
        items-center justify-between "
        >
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div className="leading-none">12AM</div>
            <span className="inline-block bg-sun" />
            <div className="leading-none">33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>1AM</div>
            <span className="inline-block bg-cloudy" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>2AM</div>
            <span className="inline-block bg-sun" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>3AM</div>
            <span className="inline-block bg-sun" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>4AM</div>
            <span className="inline-block bg-suncloudy" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>5AM</div>
            <span className="inline-block bg-cloudy" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>6AM</div>
            <span className="inline-block bg-cloudy" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>7AM</div>
            <span className="inline-block bg-sun" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>8AM</div>
            <span className="inline-block bg-rain" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>9AM</div>
            <span className="inline-block bg-sun" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>10AM</div>
            <span className="inline-block bg-rain" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>11AM</div>
            <span className="inline-block bg-rain" />
            <div>33°</div>
          </div>
          <div className="w-[27px] h-[70px] py-[8px] text-center flex flex-col items-center justify-between">
            <div>12PM</div>
            <span className="inline-block bg-rain" />
            <div>33°</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPannel
