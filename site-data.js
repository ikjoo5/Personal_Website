// Personal content is based on the supplied CV. Add your real code/demo/report URLs below.
// Keep missing URLs empty: the interface displays an honest "not linked yet" state.
window.SITE_DATA = {
  name: "Ikjoo Oh",
  initials: "IO",
  email: "ioh22@wisc.edu",
  github: "https://github.com/ikjoo5",
  cvUrl: "assets/CV_IkjooOh.pdf",
  bio: "I’m an undergraduate at the University of Wisconsin–Madison, studying computer science and data science. My work spans clinical informatics, computer vision, and applied machine learning.",
  education: "University of Wisconsin–Madison · B.S. in Computer Science & Data Science",
  projects: [
    {
      id: "clinical-mapping", category: "Research", template: false,
      title: "Making clinical language connect",
      subtitle: "RAG-based clinical terminology mapping",
      description: "Mapping local clinical terminology to standard vocabularies with retrieval-augmented generation and LLM candidate selection.",
      tags: ["RAG", "Clinical NLP", "LLMs"], visual: "research",
      context: "Medical Informatics Lab · The Catholic University of Korea · Jan 2025 – May 2026",
      overview: "Different hospitals can describe the same clinical concept with different local terms. At the Medical Informatics Lab, I developed a retrieval-augmented generation framework to map multi-institutional clinical terminology to SNOMED CT, RxNorm, and LOINC.",
      contribution: "I developed the mapping framework, added an LLM-based candidate selection stage, and manually curated and refined the provided dataset. The work was supervised by Taehoon Ko.",
      outcome: "Mapping accuracy improved from a 60% baseline to 93% after candidate selection and dataset refinement, as reported in my CV. The related SNOMED CT manuscript is listed below under Research & writing.",
      metric: "60% → 93%", metricLabel: "Mapping accuracy · CV-reported",
      pipeline: [ {title: "Local terms", text: "Start with terminology from multiple institutions."}, {title: "Retrieve", text: "Retrieve candidate concepts from standard vocabularies."}, {title: "Select", text: "Use an LLM to select among candidate mappings."}, {title: "Evaluate", text: "Refine the dataset and evaluate mapping accuracy."} ],
      links: { code: "", demo: "", report: "" }
    },
    {
      id: "minimap-analytics", category: "Engineering", template: false,
      title: "From minimap to match insight",
      subtitle: "League of Legends detection & analytics",
      description: "An end-to-end YOLO pipeline that turns minimap footage into object detections and automated post-game analysis.",
      tags: ["YOLO", "Computer vision", "Analytics"], visual: "engineering",
      context: "Independent project · End-to-end development",
      overview: "I independently developed a League of Legends game analytics platform that identifies wards and other in-game events from minimap footage. The project connects computer vision with a usable post-game analysis workflow.",
      contribution: "I built the YOLO-based detection pipeline and addressed limited, noisy real-world training data through three rounds of dataset refinement and synthetic data generation. I integrated detection with gameplay analytics, UI/UX, and database components.",
      outcome: "Detection accuracy improved from approximately 30–40% to 90% after dataset refinement and synthetic data generation, as reported in my CV. The integrated platform supports automated post-game analysis.",
      metric: "~30–40% → 90%", metricLabel: "Detection accuracy · CV-reported",
      pipeline: [ {title: "Footage", text: "Use League of Legends minimap footage as input."}, {title: "Refine data", text: "Iteratively refine data and generate synthetic samples."}, {title: "Detect", text: "Identify wards and events with a YOLO-based pipeline."}, {title: "Analyze", text: "Connect detections to analytics, UI, and database components."} ],
      links: { code: "", demo: "", report: "" }
    },
    {
      id: "medical-imaging", category: "Research", template: false,
      title: "A clearer view of medical images",
      subtitle: "Ovarian cancer image analysis",
      description: "Exploring CNN-based medical image analysis, with denoising to improve performance across challenging imaging data.",
      tags: ["CNNs", "U-Net", "Denoising"], visual: "imaging",
      context: "Selected project · Medical imaging",
      overview: "This project explored ovarian cancer image analysis using convolutional neural networks. I investigated the challenges of learning from heterogeneous medical imaging modalities, including ultrasound, CT, and MRI.",
      contribution: "I used U-Net as a baseline and applied a denoising autoencoder to reduce image noise. The work examined how input quality and differences between imaging modalities affect learning.",
      outcome: "The denoising approach improved accuracy by approximately 15%, as reported in my CV. The CV does not specify whether this is a relative or percentage-point increase; a detailed evaluation can be added alongside the project report.",
      metric: "~15%", metricLabel: "Accuracy improvement · CV-reported",
      pipeline: [ {title: "Images", text: "Explore heterogeneous medical imaging data."}, {title: "Baseline", text: "Use U-Net as the baseline approach."}, {title: "Denoise", text: "Apply a denoising autoencoder to reduce noise."}, {title: "Compare", text: "Evaluate changes in accuracy and modality challenges."} ],
      links: { code: "", demo: "", report: "" }
    },
    {
      id: "retention-policy", category: "Data science", template: false,
      title: "Learning when to take action",
      subtitle: "Reinforcement learning for customer retention",
      description: "A policy-based retention prototype that makes sequential decisions visible through an interactive Streamlit application.",
      tags: ["Reinforcement learning", "Streamlit"], visual: "data",
      context: "Selected project · Simulated banking data",
      overview: "I developed a policy-based reinforcement learning prototype to explore customer-retention decisions using a simulated banking dataset. The focus was on the reward structure and learned policy rather than conventional classification accuracy.",
      contribution: "I designed and evaluated the reward structure and learned policy, then built an interactive Streamlit application to visualize customer states, policy decisions, and retention outcomes.",
      outcome: "The prototype connects policy learning with an interactive explanation of customer-retention decisions. It uses simulated data; it is an exploratory project rather than evidence of deployment or real-world banking outcomes.",
      metric: "State → action", metricLabel: "An interactive view of policy decisions",
      pipeline: [ {title: "Simulate", text: "Represent customer states with simulated banking data."}, {title: "Reward", text: "Define and evaluate the retention reward structure."}, {title: "Learn", text: "Train and examine a policy-based RL prototype."}, {title: "Explore", text: "Visualize states, decisions, and outcomes in Streamlit."} ],
      links: { code: "", demo: "", report: "" }
    }
  ]
};
