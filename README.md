**Table of Contents**

- [About BANF](#about-banf)
- [Project Overview](#project-overview)
  - [Home](#home)
  - [Abnormalities Detail](#abnormalities-detail)
  - [Routes History](#routes-history)
- [Important files and folders](#important-files-and-folders)

## About BANF

BANF는 제공받은 피그마 소스에서 유추할 수 있는 상호작용과 데이터 시각화를 [Next.js](https://nextjs.org/)와 [Notion API](https://developers.notion.com/)를 핵심 기술로 구현한 웹 앱입니다.

적용된 주요 기술 스택은 아래와 같습니다.

- Next.js 14
- Notion API
- TailwindCSS
- Google Map API
- SWR

**[데모 확인하기](https://banf.vercel.app/)**

## Project Overview

### Home

서버에서 수신 받은 위치정보와 각 위치에 대한 분류 정보를 시각화하여 지도에 적용합니다. <br>
지도에 그려진 마커는 확인과 삭제 상호작용이 가능합니다. 삭제 버튼을 누르면 마커와 해당 경로 오버레이가 지도에서 삭제 되며,<br> 확인 버튼을 누르면 확인 시점이 마커에 기록되며 완료된 이슈로 처리돼 상호작용 버튼이 마커에서 사라집니다. <br>
상호작용이 필요없는 부분은 React 18의 서버 컴포넌트로 만들어 서버에서 실행돼 클라이언트로 보내지는 HTML에 직접 렌더되도록 했습니다.

![Home](/public/map.gif)

### Abnormalities Detail

Next.js 14의 병렬 라우트([Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes))를 사용해 동일한 레이아웃에서 각기 다른 데이터에 의존하는 페이지를 동시 렌더링 했습니다.
Home과 동일한 확인, 삭제 상호작용을 지원하며 상호작용 후 Next.js의 Caching API를 호출해 페이지를 갱신합니다.

![Abnormalities Detail](/public/table2.gif)

### Routes History

[react-paginate](https://www.npmjs.com/package/react-paginate) 라이브러리를 사용해 페이지네이션을 구현했습니다.
검색창 입력시 많은 리렌더가 발생하므로 lodash의 debounce를 사용해 이를 효율적으로 처리했습니다.

![Routes History](/public/table2.gif)

## Important files and folders

| File(s)                    | Description                     |
| -------------------------- | ------------------------------- |
| `/app/(tableview)/detail`  | Abnormalities Detail 화면       |
| `/app/(tableview)/history` | Routes History 화면             |
| `/app/api/`                | 서버리스 함수                   |
| `/app/page.tsx`            | Home 화면                       |
| `/app/layout.tsx`          | 앱 전체 공통 레이아웃           |
| `/app/components`          | UI 컴포넌트                     |
| `/app/lib/actions.ts`      | ISR 트리거를 위한 Server Action |
