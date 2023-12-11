import React from 'react'

const MenuButton = ({
  bgClass,
  label,
  active
}: {
  bgClass: string
  label: string
  active?: boolean
}) => {
  return (
    <button
      className={`w-full h-[45px] rounded-[8px] flex items-center
            font-normal px-[15px] my-[35px] ${!active && 'bg-[#005EAD]'}`}
    >
      <span className="block min-w-[35px] h-full relative">
        <span
          className={`block ${bgClass} absolute 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        />
      </span>

      <span
        className={`${
          active ? 'text-[#101828]' : 'text-white'
        } text-[20px] font-semibold block w-full tracking-[-0.01em] `}
      >
        {label}
      </span>
    </button>
  )
}

function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-[1920px] h-[1024px] mx-auto bg-[#f8fafb]">
      <aside className="box-content w-[283px] px-[20px]">
        <MenuButton label="Home" bgClass="bg-home_logo" />
        <MenuButton
          label="Abnormalities Detail"
          active={true}
          bgClass="bg-pin"
        />
        <MenuButton
          label="Routes History"
          active={true}
          bgClass="bg-fill_plus"
        />
        <hr className="block my-[45px] w-[70%] mx-auto border-[1.5px]" />
        <MenuButton label="Routes History" active={true} bgClass="bg-logout" />
      </aside>
      <article className="relative">{children}</article>
    </main>
  )
}

export default MainTemplate
