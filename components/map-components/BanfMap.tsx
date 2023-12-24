'use client'
import React, { useState } from 'react'
import WeatherPannel from './WeatherPannel'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetchJson'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps'
import MapMark from './MapMark'
import ControlPannel from './ControlPannel'
import Path from './Path'

const latOffset = -0.001
const lngOffset = 0.0081

function BanfMap({
  mapKey,
  databaseId
}: {
  mapKey: string
  databaseId: string
}) {
  const [inputValue, setInputValue] = useState('2972 Westheimer')
  const { data: response, mutate: mapMutate } = useSWR<notionMap[]>(
    `${process.env.NEXT_PUBLIC_FRONT_URL}/api/map`,
    fetcher(inputValue, databaseId)
  )
  let initialLat,
    initialLng = 0
  if (!response) return null
  if (response.length === 0) {
    initialLat = 29.751872
    initialLng = -95.433187
  } else {
    initialLat = response[2].properties.end.rich_text[0].plain_text
      .split(',')
      .map(Number)[0]
    initialLng = response[2].properties.end.rich_text[0].plain_text
      .split(',')
      .map(Number)[1]
  }

  return (
    <>
      <form
        className="absolute z-[9999] top-[39px] left-[59px]"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <input
          id="search"
          type="text"
          placeholder="Search Location"
          className="h-[70px] w-[372px] rounded-[8px] border-[#D0D5DD] bg-white 
          py-[8px] px-[39px] text-[20px] bg-transparent focus:outline-none"
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <button
          onClick={async () => {
            mapMutate(
              await fetcher(
                inputValue,
                databaseId
              )(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/map`),
              false
            )
          }}
          className="z-[9999] bg-[#35a0f8fd] text-white h-[67.5px] border-1 border-[#D0D5DD]
          rounded-[0px_8px_8px_0px] text-[10px] px-[5px] absolute top-[1px] right-[1px]"
        >
          search
        </button>
      </form>
      <WeatherPannel />
      <APIProvider apiKey={mapKey}>
        <Map
          id="map-main"
          disableDefaultUI={true}
          zoom={15.8}
          controlSize={0}
          center={{
            lat: initialLat + latOffset,
            lng: initialLng - lngOffset
          }}
          mapId={'7e7c3ef84026886b'}
          clickableIcons={false}
        >
          {response.map((data) => (
            <MapMark key={data.id} pageId={data.id} />
          ))}
        </Map>
        {response.map((data) => {
          return <Path key={data.id} pageId={data.id} />
        })}
        {response.map((data) => {
          return <Path show={true} key={data.id} pageId={data.id} />
        })}
        {response.length > 0 ? (
          <ControlPannel response={response} />
        ) : (
          <section
            className="absolute left-[60px] bottom-[55px] bg-white rounded-[12px] 
    py-[36px] px-[15px] w-[373px] h-[558.67px]"
          >
            <span className="text-[20px] font-[700]">There are no records</span>
          </section>
        )}
      </APIProvider>
    </>
  )
}

export default BanfMap
