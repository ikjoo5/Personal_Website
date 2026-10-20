// 이 파일에서 사이트의 문구와 링크를 모두 수정할 수 있습니다.
// PDF는 assets/ 폴더에 올린 뒤 "assets/파일명.pdf"로 연결하세요.
// 외부 링크도 가능합니다. 빈 주소("")는 클릭되지 않는 회색 라벨로 표시됩니다.
window.SITE_DATA = {
  name: "Ikjoo Oh",
  affiliation: "University of Wisconsin–Madison",
  degree: "Computer Science & Data Science · Undergraduate",
  location: "Madison, Wisconsin",
  email: "ioh22@wisc.edu",
  github: "https://github.com/ikjoo5",
  cvUrl: "assets/CV_IkjooOh.pdf",
  sopUrl: "", // SOP를 올린 뒤 예: "assets/SOP_IkjooOh.pdf"
  bio: [
    "I’m an undergraduate at the University of Wisconsin–Madison, studying Computer Science and Data Science. My interests span clinical informatics, computer vision, and applied machine learning.",
    "Previously, I worked on clinical terminology mapping at The Catholic University of Korea’s Medical Informatics Lab. I’m currently an AI orchestration intern at CNAPS.AI."
  ],
  publications: [
    {
      id: "clinical-terminology",
      title: "Evaluation of RAG-Based Approach for SNOMED CT Concept Mapping of Multi-Institutional Local Clinical Terminology",
      authors: ["Chansik Kim", "Ikjoo Oh", "Jiho Kim", "Taehoon Ko"],
      venue: "", // 확인된 학회/저널/연도/게재 상태를 넣으세요. 예: "arXiv, 2026"
      links: { pdf: "", paper: "", code: "" }
    },
    {
      id: "chronic-diseases",
      title: "Predicting comorbid chronic diseases using multi-label learning; a comparative study with electronic health records",
      authors: ["Kanghyuck Lee", "Ikjoo Oh", "Eunsik Choi", "Sung-Hwan Kim", "Taehoon Ko"],
      venue: "",
      links: { pdf: "", paper: "", code: "" }
    }
  ],
  // 게시할 프로젝트를 정한 뒤 아래 주석의 예시를 복사해 넣으세요.
  // 항목은 원하는 만큼 추가할 수 있습니다. 각 항목의 id는 서로 다르게 지정하세요.
  projects: [
    // {
    //   id: "my-project",
    //   title: "Project title",
    //   description: "A short description of your project.",
    //   links: {
    //     code: "",     // GitHub 저장소 URL
    //     demo: "",     // 데모 영상 또는 실행 사이트 URL
    //     pipeline: "", // 파이프라인 PDF 또는 링크
    //     pdf: ""       // 프로젝트 보고서 PDF 경로 또는 URL
    //   }
    // }
  ]
};
