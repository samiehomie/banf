'use client'
import React from 'react'
import fetchJson from '@/lib/fetchJson'
import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { MarkerLabel, MarkerLabelEnd } from './MarkerLabel'
import { dateFormatter } from '@/lib/tools'
import useSWR from 'swr'

const MapMark = ({ pageId }: { pageId: string }) => {
  const { data: response } = useSWR<notionMap>(
    `${process.env.NEXT_PUBLIC_FRONT_URL}/api/map?pageId=${pageId}`,
    fetchJson
  )

  if (!response) return null
  const { properties } = response
  if (!properties.show.checkbox) return null

  const position = properties.end.rich_text[0].plain_text
    .split(',')
    .map((v) => Number(v))
  const positionStart = properties.start.rich_text[0].plain_text
    .split(',')
    .map((v) => Number(v))

  switch (properties.condition.select.name) {
    case 'start':
      return (
        <AdvancedMarker
          position={{ lat: positionStart[0], lng: positionStart[1] }}
          className="start-car"
        >
          <div className="bg-car" />
        </AdvancedMarker>
      )
    case 'end':
      return (
        <AdvancedMarker
          position={{ lat: position[0], lng: position[1] }}
          className="pointer-events-on"
        >
          <MarkerLabelEnd
            sortClass="bg-fill-pin"
            address={properties.region.title[0].plain_text}
            detailAddress="Rd. Santa Ana, Illinois 85486"
          />
        </AdvancedMarker>
      )
    case 'cold':
      return (
        <AdvancedMarker
          position={{ lat: position[0], lng: position[1] }}
          className="pointer-events-on"
        >
          <MarkerLabel
            timestamp={
              properties.resolved.checkbox
                ? `resolved (${dateFormatter(
                    properties.completed.date?.start
                  )})`
                : properties.when.rich_text[0].plain_text
            }
            sortClass="bg-blue_thermo"
            position={properties.end.rich_text[0].plain_text}
            sortText="-1℃"
            pageId={pageId}
            resolved={properties.resolved.checkbox}
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
              properties.resolved.checkbox
                ? `resolved (${dateFormatter(
                    properties.completed.date?.start
                  )})`
                : properties.when.rich_text[0].plain_text
            }
            sortClass="bg-red_thermo"
            position={properties.end.rich_text[0].plain_text}
            sortText="51℃"
            pageId={pageId}
            resolved={properties.resolved.checkbox}
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
              properties.resolved.checkbox
                ? `resolved (${dateFormatter(
                    properties.completed.date?.start
                  )})`
                : properties.when.rich_text[0].plain_text
            }
            sortClass="bg-red_circle"
            position={properties.end.rich_text[0].plain_text}
            sortText="Damger"
            pageId={pageId}
            resolved={properties.resolved.checkbox}
          />
        </AdvancedMarker>
      )
  }
}

export default MapMark
