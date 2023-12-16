'use client'
import React, { useState } from 'react'
import SearchInput from './common/SearchInput'
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
