# Ikjoo Oh — Academic Portfolio

UW–Madison CS & DS 학부생의 대학원 지원용 영문 포트폴리오입니다. 크림색·포레스트 그린의 반응형 화면에 자기소개, 프로젝트, 논문·프리프린트 목록, 학력·경력, CV PDF, 이메일을 담았습니다. 제공된 CV를 기준으로 작성했습니다.

## 실행

Python 3만 있으면 실행할 수 있습니다. 웹사이트에는 런타임 패키지, API 키, 외부 폰트, 빌드 과정이 필요하지 않습니다.

```sh
cd /workspace/Personal_Website
python3 -m http.server 8000 --bind 0.0.0.0
```

Node.js가 있으면 같은 서버를 `npm run dev`로 실행할 수 있습니다. 서버는 포트 8000을 사용합니다. 개발용 Python 서버는 인터넷 운영 서버로 사용하지 마세요.

## 내용 수정

- `site-data.js`: 이름, 이메일, GitHub, CV 경로, 소개, 프로젝트 제목·설명·본인 기여·결과·파이프라인·링크
- `index.html`: 메인 화면 문구, 논문 목록, 학력·경력
- `styles.css`: 색상, 타이포그래피, 반응형 레이아웃
- `assets/CV_IkjooOh.pdf`: 제공된 실제 CV. 새 PDF로 교체하면 기존 링크를 유지할 수 있습니다.

프로젝트별 `links`의 빈 문자열에 실제 주소를 넣으면 상세 창에 링크가 생깁니다.

```js
links: {
  code: "https://github.com/OWNER/REPOSITORY",
  demo: "https://www.youtube.com/watch?v=VIDEO_ID",
  report: "assets/project-report.pdf"
}
```

아직 받지 않은 프로젝트 저장소·데모·보고서 주소는 연결되지 않은 상태로 표시합니다. 파이프라인 그림은 CV의 설명을 바탕으로 만든 개념도입니다. 성능 수치는 CV에 기재된 수치이며, 논문 게재 상태나 추가 실험 결과를 추정하지 않았습니다. 의료영상 프로젝트의 약 15% 향상은 상대 개선인지 퍼센트포인트인지 CV에 구분되어 있지 않습니다.

## 검증

```sh
npm run check   # JavaScript 구문 검사 (Node.js)
npm test        # HTTP 응답, 내부 앵커, 정적 파일 및 실제 PDF 검증 (Python)
```

브라우저 검증 도구는 개발 의존성으로만 설치합니다.

```sh
npm ci --cache /tmp/portfolio-npm-cache --no-audit --no-fund
# 시스템 Chromium이 없다면: npx playwright install chromium
npm run dev
# 다른 터미널에서:
npm run test:browser
```

브라우저 테스트는 필터, 프로젝트 4개의 상세 창, 4단계 파이프라인, 데모 링크 설정, Escape 닫기·포커스 복귀, 모바일 메뉴, 320–1440px 레이아웃, CV, 이메일 및 axe 접근성 검사를 수행합니다. 자동 접근성 검사가 모든 접근성 문제를 보장하지는 않습니다. `CHROMIUM_PATH`로 브라우저 경로, `BASE_URL`로 테스트할 서버 주소를 지정할 수 있습니다. 스크린샷은 시스템 임시 디렉터리에 저장합니다.

## 배포

GitHub Pages 등 정적 호스팅에서 사용할 수 있습니다. GitHub에 변경사항을 커밋·푸시한 후 저장소의 **Settings → Pages → Deploy from a branch → main / (root)** 를 선택하면 됩니다. 별도 빌드는 필요 없습니다. 경로는 저장소 하위 경로에서도 작동하도록 상대 경로를 사용했습니다.

공개 배포는 아직 수행하지 않았습니다. 배포 시 사이트에 포함된 이메일과 CV도 공개됩니다.
