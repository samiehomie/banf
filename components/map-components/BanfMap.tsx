'use client'
import React, { useState } from 'react'
import SearchInput from '../common/SearchInput'
import WeatherPannel from './WeatherPannel'
import { noMarkMapStyle } from '@/lib/tools'
import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
  useMarkerRef,
  Marker,
  InfoWindow,
  limitTiltRange
} from '@vis.gl/react-google-maps'
import { GoogleMapsOverlay } from '@deck.gl/google-maps'

import ControlPannel from './ControlPannel'
import { MarkerLabel, MarkerLabelEnd } from './MarkerLabel'

const latOffset = 0.008
const lngOffset = 0.0025
const initialPosition = { lat: 29.738387, lng: -95.424789 }

function BanfMap({ mapKey }: { mapKey: string }) {
  const [markerRef, marker] = useMarkerRef()
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
          styles={noMarkMapStyle}
          disableDefaultUI={true}
          zoom={16}
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
            className=""
          >
            <div className="bg-car" />
          </AdvancedMarker>
        </Map>
        <ControlPannel />
      </APIProvider>
    </>
  )
}

export default BanfMap
// 29.742147, -95.426514
