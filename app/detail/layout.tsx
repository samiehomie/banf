export default function DetailsLayout({
  left,
  right
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <div
      className="flex mt-[25px] w-[1550px] h-[954px] bg-white rounded-[12px] 
  shadow-custom border border-[#ECEEF6] px-[30px] relative"
    >
      {left}
      <div
        className="h-[862px] w-[5px] bg-[#C4C4C4] absolute z-50 
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      {right}
    </div>
  )
}
