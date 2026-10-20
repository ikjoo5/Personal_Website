# Ikjoo Oh — Academic Homepage

크림색·짙은 녹색을 유지한 간결한 학술 홈페이지입니다. 짧은 소개 → Email / CV / SOP / GitHub → Publications → Projects 순서로 구성했습니다. 제공된 CV의 논문 2편을 유지하고, 프로젝트는 직접 고른 항목을 추가할 수 있도록 비워 두었습니다.

## 내용과 링크 교체

**`site-data.js` 한 파일에서 모든 개인 정보, 소개, 논문, 프로젝트를 수정합니다.** GitHub에서 파일을 열고 연필 아이콘으로 편집한 뒤 `main`에 커밋하면 GitHub Pages가 다시 배포합니다.

- 소개: `bio`의 문단을 수정합니다.
- CV·SOP: `assets/`에 PDF를 업로드하고 `cvUrl`, `sopUrl`에 경로를 넣습니다.
- 논문: `publications`의 제목, 저자, `venue`, `links`를 수정합니다. 본인 이름은 자동으로 강조합니다. `venue`가 비어 있으면 표시하지 않습니다.
- 프로젝트: `projects`는 빈 목록입니다. 파일 안의 주석 예시를 복사해서 제목, 한 줄 설명, `links`를 채우세요. 항목을 추가하거나 삭제하면 목록도 자동으로 바뀝니다.

```js
sopUrl: "assets/SOP_IkjooOh.pdf"

// 논문 링크
links: { pdf: "assets/paper.pdf", paper: "https://arxiv.org/abs/실제ID", code: "" }

// 프로젝트 링크: 외부 URL 또는 로컬 파일 경로
links: {
  code: "https://github.com/OWNER/REPOSITORY",
  demo: "https://www.youtube.com/watch?v=VIDEO_ID",
  pipeline: "assets/project-pipeline.pdf",
  pdf: "assets/project-report.pdf"
}
```

빈 주소는 회색 라벨로만 표시되고 클릭되지 않습니다. SOP와 논문·프로젝트 링크는 아직 제공되지 않아 비워 두었습니다. 논문의 확인되지 않은 게재 상태는 표시하지 않았습니다. 원래 CV는 `assets/CV_IkjooOh.pdf`에 있습니다.

## 실행·검증

웹사이트는 런타임 패키지나 빌드가 필요 없는 정적 HTML/CSS/JavaScript입니다.

```sh
cd /workspace/Personal_Website
python3 -m http.server 8000 --bind 0.0.0.0
# 또는 npm run dev
```

```sh
npm run check
npm test
# 브라우저 테스트를 실행하려면:
npm ci --cache /tmp/portfolio-npm-cache --no-audit --no-fund
# 시스템 Chromium이 없으면: npx playwright install chromium
# 위 개발 서버를 실행한 상태에서:
npm run test:browser
```

테스트는 HTTP·PDF·내부 앵커, 실제 링크 교체, 항목 추가, 잘못된 URL 방지, 모바일 레이아웃 및 자동 접근성 검사를 수행합니다. `BASE_URL`, `CHROMIUM_PATH`로 테스트 서버와 브라우저 경로를 지정할 수 있습니다.

## 배포

GitHub Pages: **Settings → Pages → Deploy from a branch → main / (root)**. 상대 경로를 사용하므로 `/Personal_Website/` 아래에서도 동작합니다.

## 디자인 참고

[Kwon Ko](https://hyungkwonko.info/)의 소개·문서·논문 자료 링크 구성, [Seungone Kim](https://seungonekim.github.io/)의 논문 목록과 항목별 자료 링크를 공개 소스에서 확인했습니다. [Jon Barron](https://jonbarron.info/)의 인라인 문서 링크와 [Academic Pages](https://academicpages.github.io/)의 콘텐츠/레이아웃 분리 방식도 참고했습니다. 코드나 에셋을 복사하지 않고 직접 구현했습니다.
