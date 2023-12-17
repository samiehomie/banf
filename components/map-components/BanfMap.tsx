'use client'
import React, { useState, useEffect } from 'react'
import SearchInput from '../common/SearchInput'
import WeatherPannel from './WeatherPannel'
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

const latOffset = 0.008
const lngOffset = 0.0075
const initialPosition = { lat: 29.738387, lng: -95.424789 }

const PathCold = () => {
  const [mapService, setMapService] = useState<google.maps.Polyline>()
  const mapsLibrary = useMapsLibrary('maps')
  const map = useMap('map-main')

  useEffect(() => {
    if (!mapsLibrary) return
    setMapService(
      new mapsLibrary.Polyline({
        path: [
          { lat: 29.738387, lng: -95.424789 },
          { lat: 29.742181, lng: -95.426534 }
        ],
        geodesic: true,
        strokeColor: '#0094FF',
        strokeOpacity: 0.4,
        strokeWeight: 25
      })
    )
    // do something with the map instance
  }, [mapsLibrary])

  useEffect(() => {
    if (!mapService) return
    if (!map) return
    mapService.setMap(map)
    // ...use placesService...
  }, [mapService, map])
  return <></>
}

const PathNormal = () => {
  const [mapService, setMapService] = useState<google.maps.Polyline>()
  const mapsLibrary = useMapsLibrary('maps')
  const map = useMap('map-main')

  useEffect(() => {
    if (!mapsLibrary) return
    setMapService(
      new mapsLibrary.Polyline({
        path: [
          { lat: 29.738387, lng: -95.424789 },
          { lat: 29.742181, lng: -95.426534 },
          { lat: 29.747848, lng: -95.426557 },
          { lat: 29.751872, lng: -95.433187 },
          { lat: 29.749944, lng: -95.437125 }
        ],
        geodesic: true,
        strokeColor: '#05E400',
        strokeOpacity: 1,
        strokeWeight: 5
      })
    )
    // do something with the map instance
  }, [mapsLibrary])

  useEffect(() => {
    if (!mapService) return
    if (!map) return
    mapService.setMap(map)
    // ...use placesService...
  }, [mapService, map])
  return <></>
}

function BanfMap({ mapKey }: { mapKey: string }) {
  const [searchWord, setSearchWord] = useState('')

  return (
    <>
      <SearchInput
        inputValue={searchWord}
        setInputValue={setSearchWord}
        extraStyle={{
          position: 'absolute',
          zIndex: '9999',
          width: '372px',
          height: '70px',
          top: '39px',
          left: '59px'
        }}
      />
      <WeatherPannel />

      <APIProvider apiKey={mapKey}>
        <Map
          id="map-main"
          styles={noMarkMapStyle}
          disableDefaultUI={true}
          zoom={15.8}
          controlSize={0}
          center={{
            lat: initialPosition.lat + latOffset,
            lng: initialPosition.lng - lngOffset
          }}
          mapId={'7e7c3ef84026886b'}
          clickableIcons={false}
        >
          <AdvancedMarker
            position={{ lat: 29.749944, lng: -95.437125 }}
            className="pointer-events-on"
          >
            <MarkerLabelEnd
              sortClass="bg-fill-pin"
              address="2972 Westheimer"
              detailAddress="Rd. Santa Ana, Illinois 85486"
            />
          </AdvancedMarker>
          <AdvancedMarker
            position={{ lat: 29.751872, lng: -95.433187 }}
            className="pointer-events-on"
          >
            <MarkerLabel
              timestamp="August 1, 2023 EST 16:31:35"
              sortClass="bg-red_thermo"
              position="29.742181, -95.426534"
              sortText="51℃"
              pageId=""
            />
          </AdvancedMarker>
          <AdvancedMarker
            position={{ lat: 29.747848, lng: -95.426557 }}
            className="pointer-events-on"
          >
            <MarkerLabel
              timestamp="August 1, 2023 EST 16:31:35"
              sortClass="bg-red_circle"
              position="29.747848, -95.426557"
              sortText="Danger"
              pageId=""
            />
          </AdvancedMarker>
          <AdvancedMarker
            position={{ lat: 29.742181, lng: -95.426534 }}
            className="pointer-events-on"
          >
            <MarkerLabel
              timestamp="August 1, 2023 EST 16:31:35"
              sortClass="bg-blue_thermo"
              position="29.742181, -95.426534"
              sortText="-1℃"
              pageId=""
            />
          </AdvancedMarker>
          <AdvancedMarker
            position={{ lat: 29.738387, lng: -95.424789 }}
            className="start-car"
          >
            <div className="bg-car" />
          </AdvancedMarker>
        </Map>
        <PathNormal />
        <PathCold />
        <ControlPannel />
      </APIProvider>
    </>
  )
}

export default BanfMap
