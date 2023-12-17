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
      <MarkerLabel
        timestamp="August 1, 2023 EST 16:31:35"
        sortClass="bg-yellow_circle"
        position="29.742175, -95.42219"
        sortText="Danger"
        pageId=''
      />
      <APIProvider apiKey={mapKey}>
        <Map
          styles={noMarkMapStyle}
          disableDefaultUI={true}
          zoom={15}
          controlSize={0}
          center={{ lat: 29.742175, lng: -95.42219 }}
        >
          <Marker
            ref={markerRef}
            position={{ lat: 29.742175, lng: -95.42219 }}
          />
          <InfoWindow anchor={marker}>
            <h2>Hello everyone!</h2>
            <p>This is an Info Window</p>
          </InfoWindow>
        </Map>
        <ControlPannel />
      </APIProvider>
    </>
  )
}

export default BanfMap
