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
  InfoWindow
} from '@vis.gl/react-google-maps'
import ControlPannel from './ControlPannel'
import MarkerLabel from './MarkerLabel'

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
          center={{ lat: 29.742175, lng: -95.42219 }}
          mapId={'7e7c3ef84026886b'}
          clickableIcons={false}
        >
          <AdvancedMarker
            position={{ lat: 29.747848, lng: -95.426557 }}
            className="pointer-events-on"
          >
            <MarkerLabel
              timestamp="August 1, 2023 EST 16:31:35"
              sortClass="bg-yellow_circle"
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
              sortClass="bg-yellow_circle"
              position="29.742181, -95.426534"
              sortText="Danger"
              pageId=""
            />
          </AdvancedMarker>
          <AdvancedMarker
            position={{ lat: 29.738387, lng: -95.424789 }}
            className="pointer-events-on"
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
