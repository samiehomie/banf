'use client'
import React from 'react'
import { noMarkMapStyle } from '@/lib/tools'
import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
  Marker
} from '@vis.gl/react-google-maps'

function BanfMap({ mapKey }: { mapKey: string }) {
  return (
    <APIProvider apiKey={mapKey}>
      <Map
        styles={noMarkMapStyle}
        disableDefaultUI={true}
        zoom={14}
        controlSize={0}
        center={{ lat: 40.633813, lng: -89.398421 }}
      >
        <Marker position={{ lat: 40.633813, lng: -89.398421 }} />
      </Map>
    </APIProvider>
  )
}

export default BanfMap
