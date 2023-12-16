import React from 'react'
import BanfMap from './BanfMap'

const mapKey = process.env.GOOGLE_MAPS_API_KEY

function page() {
  return (
    <>
      <BanfMap mapKey={mapKey!} />
    </>
  )
}

export default page
