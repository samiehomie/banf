'use client'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps'
import fetchJson from '@/lib/fetchJson'

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

export default function Path({
  pageId,
  show
}: {
  pageId: string
  show?: boolean
}) {
  const { data: response } = useSWR<notionMap>(
    `${process.env.NEXT_PUBLIC_FRONT_URL}/api/map?pageId=${pageId}`,
    fetchJson
  )
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()
  const mapsLibrary = useMapsLibrary('routes')
  const map = useMap('map-main')

  useEffect(() => {
    if (!response) return
    if (!mapsLibrary) return
    const isRendered = show || response.properties.show.checkbox
    if (!isRendered) return

    const condition = show
      ? 'normal'
      : response.properties.condition.select.name
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
  }, [mapsLibrary, show, response])

  useEffect(() => {
    if (!response) return
    if (!directionsRenderer) return
    if (!map) return
    if (!directionsService) return
    directionsRenderer.setMap(map)
    calculateAndDisplayRoute(directionsService, directionsRenderer, [
      response.properties.start.rich_text[0].plain_text,
      response.properties.end.rich_text[0].plain_text
    ])
  }, [directionsRenderer, directionsService, map, response])
  return <></>
}
