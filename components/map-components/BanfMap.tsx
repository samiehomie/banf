'use client'
import React, { useState, useEffect, useRef } from 'react'
import SearchInput from '../common/SearchInput'
import WeatherPannel from './WeatherPannel'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetchJson'
import { noMarkMapStyle } from '@/lib/tools'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps'

import ControlPannel from './ControlPannel'
import { MarkerLabel, MarkerLabelEnd } from './MarkerLabel'
import { dateFormatter } from '@/lib/tools'

const latOffset = 0.008
const lngOffset = 0.0075

const MapMark = ({
  end,
  condition,
  when,
  pageId,
  region,
  resolved,
  completed
}: {
  end: string
  condition: 'cold' | 'hot' | 'normal' | 'danger' | 'first' | 'last'
  when: string
  pageId: string
  region: string
  resolved: boolean
  completed?: string
}) => {
  const position = end.split(',').map((v) => Number(v))
  switch (condition) {
    case 'cold':
      return (
        <AdvancedMarker
          position={{ lat: position[0], lng: position[1] }}
          className="pointer-events-on"
        >
          <MarkerLabel
            timestamp={
              resolved ? `resolved (${dateFormatter(completed!)})` : when
            }
            sortClass="bg-blue_thermo"
            position={end}
            sortText="-1℃"
            pageId={pageId}
            resolved={resolved}
          />
        </AdvancedMarker>
      )
    case 'hot':
      return (
        <AdvancedMarker
          position={{ lat: position[0], lng: position[1] }}
          className="pointer-events-on"
        >
          <MarkerLabel
            timestamp={
              resolved ? `resolved (${dateFormatter(completed!)})` : when
            }
            sortClass="bg-red_thermo"
            position={end}
            sortText="51℃"
            pageId={pageId}
            resolved={resolved}
          />
        </AdvancedMarker>
      )
    case 'danger':
      return (
        <AdvancedMarker
          position={{ lat: position[0], lng: position[1] }}
          className="pointer-events-on"
        >
          <MarkerLabel
            timestamp={
              resolved ? `resolved (${dateFormatter(completed!)})` : when
            }
            sortClass="bg-red_circle"
            position={end}
            sortText="Damger"
            pageId={pageId}
            resolved={resolved}
          />
        </AdvancedMarker>
      )
    case 'first':
      return (
        <AdvancedMarker
          position={{ lat: position[0], lng: position[1] }}
          className="start-car"
        >
          <div className="bg-car" />
        </AdvancedMarker>
      )
    case 'last':
      return (
        <AdvancedMarker
          position={{ lat: position[0], lng: position[1] }}
          className="pointer-events-on"
        >
          <MarkerLabelEnd
            sortClass="bg-fill-pin"
            address={region}
            detailAddress="Rd. Santa Ana, Illinois 85486"
          />
        </AdvancedMarker>
      )
  }
}

function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer,
  paths: string[]
) {
  directionsService
    .route({
      origin: {
        query: paths[0]
      },
      destination: {
        query: paths[1]
      },
      travelMode: google.maps.TravelMode.DRIVING
    })
    .then((response) => {
      directionsRenderer.setOptions({
        directions: response,
        preserveViewport: true,
        markerOptions: {
          visible: false
        }
      })
      // directionsRenderer.setDirections(response)
    })
    .catch((e) => window.alert('Directions request failed due to ' + status))
}

const Path = ({
  condition,
  start,
  end
}: {
  condition: 'cold' | 'hot' | 'normal' | 'danger'
  start: string
  end: string
}) => {
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()
  const mapsLibrary = useMapsLibrary('routes')
  const map = useMap('map-main')

  useEffect(() => {
    if (!mapsLibrary) return

    const options =
      condition === 'cold'
        ? {
            strokeColor: '#005EAD',
            strokeOpacity: 0.4,
            strokeWeight: 15
          }
        : condition === 'hot'
        ? { strokeColor: '#FF0000', strokeOpacity: 0.4, strokeWeight: 15 }
        : { strokeColor: '#05E400', strokeOpacity: 1, strokeWeight: 3 }

    setDirectionsRenderer(
      new mapsLibrary.DirectionsRenderer({
        polylineOptions: options
      })
    )
    setDirectionsService(new mapsLibrary.DirectionsService())
  }, [mapsLibrary, condition])

  useEffect(() => {
    if (!directionsRenderer) return
    if (!map) return
    if (!directionsService) return
    directionsRenderer.setMap(map)
    calculateAndDisplayRoute(directionsService, directionsRenderer, [
      end,
      start
    ])
  }, [directionsRenderer, directionsService, map, start, end])
  return <></>
}

function BanfMap({
  mapKey,
  databaseId
}: {
  mapKey: string
  databaseId: string
}) {
  const [searchWord, setSearchWord] = useState('2972 Westheimer')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: response, error } = useSWR<notionMap[]>(
    'http://localhost:3000/api/map',
    fetcher(searchWord, databaseId)
  )
  if (error) return null
  if (!response) return null
  const [initialLat, initialLng] =
    response[0].properties.start.rich_text[0].plain_text.split(',').map(Number)
  return (
    <>
      <form
        className="absolute z-[9999] top-[39px] left-[59px]"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <SearchInput
          inputValue={searchWord}
          setInputValue={setSearchWord}
          extraStyle={{
            width: '372px',
            height: '70px',
            paddingRight: '30px'
          }}
          ref={inputRef}
        />
        <button
          onClick={() => {
            if (inputRef && inputRef.current) {
              setSearchWord(inputRef.current.value)
            }
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
          styles={noMarkMapStyle}
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
          {response.map((data, index) => (
            <MapMark
              key={data.id}
              end={data.properties.end.rich_text[0].plain_text}
              condition={
                index + 1 === response.length
                  ? 'last'
                  : data.properties.condition.select.name
              }
              when={data.properties.when.rich_text[0].plain_text}
              pageId={data.id}
              region={data.properties.region.title[0].plain_text}
              resolved={data.properties.resolved.checkbox}
              completed={data.properties.completed.date?.start!}
            />
          ))}
          <MapMark
            end={response[0].properties.start.rich_text[0].plain_text}
            condition="first"
            when={response[0].properties.when.rich_text[0].plain_text}
            pageId={response[0].id}
            region={response[0].properties.when.rich_text[0].plain_text}
            resolved={response[0].properties.resolved.checkbox}
          />
        </Map>
        {response.map((data) => {
          return (
            <Path
              key={data.id}
              condition={data.properties.condition.select.name}
              start={data.properties.start.rich_text[0].plain_text}
              end={data.properties.end.rich_text[0].plain_text}
            />
          )
        })}
        {response.map((data) => {
          return (
            <Path
              key={data.id}
              condition="normal"
              start={data.properties.start.rich_text[0].plain_text}
              end={data.properties.end.rich_text[0].plain_text}
            />
          )
        })}
        <ControlPannel response={response} />
      </APIProvider>
    </>
  )
}

export default BanfMap
