import React from 'react'
import BanfMap from '../../components/BanfMap'

const mapKey = process.env.GOOGLE_MAPS_API_KEY

function page() {
  return (
    <>
      <BanfMap mapKey={mapKey!} />
    </>
  )
}

export default page
