import React from 'react'
import MenuButton from '../common/MenuButton'

function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-[1920px] h-[1024px] mx-auto bg-[#f8fafb]">
      <aside className="w-[323px] px-[20px]">
        <MenuButton path="/" label="Home" bgClass="bg-home" />
        <MenuButton
          path="/detail"
          label="Abnormalities Detail"
          bgClass="bg-pin"
        />
        <MenuButton path="/history" label="Routes History" bgClass="bg-plus" />
        <hr className="block my-[45px] w-[70%] mx-auto border-[1.5px]" />
        <button
          className={`w-full h-[45px] rounded-[8px] flex items-center text-center
            font-normal px-[15px] my-[35px]`}
        >
          <span className="block min-w-[35px] h-full relative">
            <span
              className={`block bg-logout absolute
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            />
          </span>

          <span
            className={`${'text-[#101828]'} text-[20px] font-semibold block w-full tracking-[-0.01em] `}
          >
            Logout
          </span>
        </button>
      </aside>
      <article className="relative w-[1597px] h-full">{children}</article>
    </main>
  )
}

export default MainTemplate
