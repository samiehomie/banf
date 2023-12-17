import BanfMap from '@/components/map-components/BanfMap'

const apiKey = process.env.GOOGLE_MAPS_API_KEY

export default function Home() {
  return <BanfMap mapKey={apiKey!} />
}
