import Image from 'next/image'
import sampleMap from '@/public/assets/sample_map.png'

export default function Home() {
  return (
    <div>
      <Image src={sampleMap} alt="map" />
    </div>
  )
}
