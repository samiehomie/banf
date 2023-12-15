export default function DetailsLayout({
  left,
  right
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <>
      {left}
      <div
        className="h-[862px] w-[5px] bg-[#C4C4C4] absolute z-50 
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      {right}
    </>
  )
}
