/* =========================================================
   Serkan Sönmez – Portfolio
   All texts live in I18N (EN + DE). Projects live in PROJECTS.
   To add a project: add an entry to PROJECTS and its texts to
   I18N.en.p / I18N.de.p under the same id.
   ========================================================= */

const IMG = "assets/img/";

/* CV per page language. Bump ?v= when you replace a file so browsers fetch the new one.
   All "Download CV" buttons stay hidden while this is empty. */
const CV = {
  en: "assets/Serkan-Soenmez-CV-EN.pdf?v=1",
  de: "assets/Serkan-Soenmez-CV-DE.pdf?v=2"
};

const PROJECTS = [
  {
    id: "historia",
    themes: ["shared"],
    featured: true,
    img: IMG + "historia.jpg",
    video: "JfwlEoEAzEo", // Gameplay Trailer
    gallery: [
      { video: IMG + "historia/ingame.mp4", poster: IMG + "historia/ingame.jpg" },
      IMG + "historia/village.webp", IMG + "historia/well.webp", IMG + "historia/street.webp",
      IMG + "historia/well-close.webp", IMG + "historia/bakery-front.webp", IMG + "historia/bakery-inside.webp"
    ],
    tags: ["Unity", "C#", "Meta XR SDK", "Hand Tracking", "Shared Spatial Anchors", "Meta Avatars"],
    links: [
      { key: "devpost", url: "https://devpost.com/software/hisotria-virtualis" },
      { key: "award", url: "https://eudres.eu/news/the-winners-of-the-12th-edition-of-the-interactive-digital-media-student-contest-2026" },
      { key: "vernissage", url: "https://projektevernissage.ustp.at/B/projekteinsicht/?id=1922" },
      { key: "makingof", url: "https://www.youtube.com/watch?v=9Qa9gazr1qg" },
      { key: "linkedin", url: "https://www.linkedin.com/posts/serkan-soenmez57_to-start-the-year-on-a-positive-note-my-ugcPost-7416919765048291328-0S2U/" },
      { key: "instagram", url: "https://www.instagram.com/historia_virtualis/" },
      { key: "tiktok", url: "https://www.tiktok.com/@historia_virtualis" }
    ]
  },
  {
    id: "sounds",
    themes: ["sight", "abilities"],
    img: IMG + "sounds.png",
    tags: ["Unity", "C#", "VR", "Spatial Audio"],
    links: []
  },
  {
    id: "grim",
    jam: true, // game jams & hackathons filter
    themes: ["sight"],
    img: IMG + "grim.png",
    video: "7VHN2e4oFDc",
    tags: ["Unity", "Meta Quest 3", "Olfactory Display", "Game Jam"],
    links: [
      { key: "ggj", url: "https://globalgamejam.org/games/2026/grim-hollow-7" },
      { key: "linkedin", url: "https://www.linkedin.com/feed/update/urn:li:activity:7425648539403309057/" }
    ]
  },
  {
    id: "paper",
    jam: true,
    themes: ["shared"],
    img: IMG + "paper.png",
    video: "7b2H0eAUaGw",
    tags: ["Unity", "Python", "YOLO", "Roboflow", "Blender", "Mixed Reality"],
    links: [{ key: "devpost", url: "https://devpost.com/software/paper-therapy" }]
  },
  {
    id: "hue",
    img: IMG + "hue.png",
    video: "aEI-z94dT4A", // trailer from the itch.io page
    tags: ["Unity", "C#", "Game Design"],
    links: [{ key: "itch", url: "https://inki-gamer.itch.io/hue-of-hope" }]
  },
  {
    id: "ocean",
    img: IMG + "ocean.jpg",
    video: "yR7QZmcF6Uk",
    // own models first (goblins, huts, straw, bottle, nuclear barrel), then the rest of the cast
    gallery: [
      { video: IMG + "ocean/goblin-walk.mp4", poster: IMG + "ocean/goblin-walk.jpg", loop: true },
      IMG + "ocean/goblin.webp", IMG + "ocean/house.webp", IMG + "ocean/straws.webp",
      IMG + "ocean/water_bottle.webp", IMG + "ocean/nuclear_waste.webp",
      IMG + "ocean/ogres.webp", IMG + "ocean/shark.webp", IMG + "ocean/bucket.webp"
    ],
    tags: ["Unity", "C#", "Meta Quest", "Blender", "A* Pathfinding", "NavMesh", "Wwise", "Animation"],
    links: []
  },
  {
    id: "aroom",
    solo: true, // solo projects say "What I built" instead of "What we built"
    themes: ["shared"], // AR: digital layer in the real room
    img: IMG + "aroom.jpg",
    video: "cy6opOVHqwc",
    tags: ["Unity", "AR Foundation", "Android", "C#", "Mobile AR"],
    links: []
  },
  {
    id: "cthulhu",
    themes: ["sight"], // sound is the main character
    img: IMG + "cthulhu.jpg",
    video: "muGQH67wJ0A",
    tags: ["Unity", "VR", "Hand Tracking", "Wwise", "Ambisonics", "Level Design", "3D Modelling", "Animation"],
    links: []
  },
  {
    id: "deepspace",
    jam: true,
    img: IMG + "deepspace.jpg",
    video: "i_oERAmOcPI",
    tags: ["Unity", "C#", "XR", "Level Design", "Animation", "Game Jam"],
    links: []
  },
  {
    id: "thesis",
    solo: true,
    themes: ["abilities"],
    img: "assets/thesis/forest.jpg",
    gallery: ["assets/thesis/fire.jpg", "assets/thesis/tracks.jpg"],
    tags: ["Unity", "Meta Quest", "Wwise", "User Study", "Pre/Post Tests"],
    links: []
  },

  /* Early work (early: true) – shown in "Where I started" as a timeline, not in the main grid.
     Images: "img" can be left out until there is one – the card then shows a placeholder. */
  {
    id: "nott",
    solo: true,
    early: true,
    img: IMG + "nott/level1.png",
    gallery: [IMG + "nott/boss.webp", IMG + "nott/level2.png", IMG + "nott/win.webp", IMG + "nott/architecture.png"],
    tags: ["JavaScript", "HTML Canvas", "Photoshop", "Pixel Art"],
    links: []
  },
  {
    id: "nftrade",
    solo: true,
    early: true,
    img: IMG + "nftrade/best-deals.webp",
    video: "xd62Et5KgWA",
    gallery: [IMG + "nftrade/inventory.webp", IMG + "nftrade/mobile-figma.webp", IMG + "nftrade/mobile-built.webp"],
    tags: ["Figma", "Node.js", "Express", "EJS", "MySQL", "Azure"],
    links: []
  },
  {
    id: "memeit",
    early: true,
    img: IMG + "memeit/cover.webp", // app logo on the app's dark background
    // gallery items can be images or { video, poster } (short silent screen recordings)
    gallery: [
      IMG + "memeit/mockups.webp",
      { video: IMG + "memeit/userflow.mp4", poster: IMG + "memeit/userflow-poster.jpg" },
      IMG + "memeit/heuristic.png",
      IMG + "memeit/sus.png"
    ],
    tags: ["Figma", "Android Studio", "Heuristic Evaluation", "User Testing", "SUS"],
    links: []
  }
];

const STACK = [
  { id: "figma", logo: "figma" },
  { id: "unity", logo: "unity" },
  { id: "csharp", logo: "csharp" },
  { id: "metaxr", logo: "meta" },
  { id: "blender", logo: "blender" },
  { id: "research", glyph: "UX" }
];

/* Skills from the CV. Items: [label, logoKey?] – labels starting with "@" are translated via I18N.skill */
/* Character sheet: self-assessed skill points (1–5), [label, logoKey | null, points] */
const STATS = [
  { id: "build", items: [["Unity", "unity", 4], ["C#", "csharp", 4], ["Meta XR SDK & Quest", "meta", 3], ["JS · HTML · CSS", "javascript", 3]] },
  { id: "design", items: [["Figma", "figma", 5], ["Photoshop", "photoshop", 4], ["Blender", "blender", 3], ["Illustrator", "illustrator", 3]] },
  { id: "team", items: [["Miro", "miro", 5], ["Git", "git", 4], ["Jira", "jira", 3], ["Wwise", null, 2]] }
];
/* Unrated skills as chips. Items: [label, logoKey?] – labels starting with "@" are translated via I18N.skill */
const SKILLS = [
  { id: "perks", items: [["@research"], ["@a11y"], ["@ds"], ["@proto"], ["@webui"], ["VR / MR"], ["Hand Tracking"], ["Shared Spatial Anchors"], ["Netcode for GameObjects"], ["@3d"]] },
  { id: "inventory", items: [["Framer", "framer"], ["Java", "java"], ["Slack", "slack"], ["MS Teams"], ["MS Office"]] },
  { id: "lang", items: [["@tr"], ["@de"], ["@en"], ["@fr"]] }
];

const I18N = {
  en: {
    skip: "Skip to content",
    "nav.about": "About", "nav.explore": "Research", "nav.projects": "Projects",
    "nav.experience": "Experience", "nav.contact": "Contact",
    roles: ["UX/UI Designer", "Unity & C# Developer", "UX Researcher", "Accessibility Advocate", "Workshop Coach"],
    "hero.hello": "Hi, I'm",
    "hero.title": "Interaction Designer &amp; XR Developer",
    "hero.also": "also",
    "hero.status": "Available now · open to XR, UX/UI and Unity/C# roles",
    cv: "Download CV", "nav.cv": "CV ↓",
    "hero.lead": "I design and build interactive experiences for screens, spaces and all the senses. Creative Technologist from St. Pölten, graduating as Dipl.‑Ing. in Interactive Technologies in February 2027.",
    "hero.cta1": "See my work", "hero.cta2": "Let's talk",
    "hero.scroll": "scroll down and get to know me",
    "about.title": "About me",
    "about.p1": "I'm a Creative Technologist from St. Pölten, Austria, currently finishing my master's degree in Interactive Technologies (AR/VR). My lectures are done: I hand in my master's thesis in January 2027 and graduate as Dipl.-Ing. in February 2027.",
    "about.p2": "I spent two years as a UX/UI designer at EBCONT working on 15 projects, from public administration to enterprise software, and I've been building with Unity for six years.",
    "about.p3": "What drives me: understanding why people do what they do, and designing experiences that work for everyone.",
    "about.f1": "years of Unity", "about.f2": "client projects", "about.f3": "1st place awards",
    "about.video": "Making-of: Historia Virtualis",
    "explore.title": "What I explore",
    "explore.intro": "The questions that connect my projects.",
    "explore.a.t": "Beyond sight",
    "explore.a.p": "How can we experience space through sound, smell and touch? Multisensory XR that doesn't rely on the eyes alone.",
    "explore.b.t": "Designing for diverse abilities",
    "explore.b.p": "Accessibility isn't a checklist, it's a mindset: from accessibility audits in enterprise software to XR for different bodies and senses.",
    "explore.b.r": "EBCONT · Sounds of Shadow · BSc thesis",
    "explore.c.t": "Shared & physical realities",
    "explore.c.p": "Co-located multiplayer and mixed reality that connects digital content with real objects and real people in the same room.",
    "projects.title": "Projects",
    "projects.intro": "Pick a topic to filter, or open a project for the full story.",
    "projects.more": "Show all projects (+{n})",
    "early.title": "My journey", "early.intro": "From my first browser game to award-winning VR, semester by semester.",
    "early.now": "Today", "early.intern.t": "UX/UI internship · EBCONT", "early.intern.p": "Design systems and prototypes in real product teams (see Experience).",
    themes: { all: "All", sight: "Beyond sight", abilities: "Diverse abilities", shared: "Shared realities", jams: "Jams & hackathons" },
    "jams.t": "Game jams & hackathons", "jams.p": "A weekend, a team, one idea: where I try the wild stuff fast.",
    "tl.s5": "5th semester · 2023",
    "tl.bachelor": "Bachelor · Creative Computing · 2021–2024", "tl.master": "Master · Interactive Technologies (AR/VR) · since 2024",
    "thesis.title": "Bachelor's thesis",
    "thesis.kicker": "BSc Creative Computing · USTP · 2024",
    "thesis.name": "Learning nature survival skills in a playful VR world",
    "thesis.q.t": "Question", "thesis.b.t": "Built", "thesis.s.t": "Study", "thesis.f.t": "Found",
    "thesis.q": "How can gamified VR teach basic survival skills while keeping learners engaged and safe?",
    "thesis.b": "A Unity VR forest for Meta Quest with stations for shelter building, fire making, water purification, animal tracks and edible vs. poisonous plants. Spatial audio with Wwise.",
    "thesis.s": "Participants aged 9 to 70, split into a VR group and a printed-guide group. Pre/post tests, surveys, interviews and observation.",
    "thesis.f": "Both groups learned. VR was described as “very fun” and “interactive” and worked well for spatial, situational knowledge like tracks and animal encounters, while the guide did better on fine visual details like telling berries apart. Lesson: in VR, the details that matter need to be designed to stand out.",
    "thesis.cta": "Read the thesis (PDF)",
    "exp.title": "Experience & education",
    "exp.coach.t": "Game Development Workshop Coach · USTP Young Campus",
    "exp.coach.p": "Teaching Unity and C# to young people through hands-on workshops.",
    "exp.post": "LinkedIn post",
    "exp.ebcont.t": "UX/UI Designer · EBCONT",
    "exp.ebcont.p": "15 projects across public administration, publishing, industrial tech and enterprise software. Design systems, high-fidelity prototypes in Figma, UX research, user testing and accessibility analyses. Design lead on selected projects in teams of 4–10 developers.",
    "exp.intern.t": "UX/UI Designer Internship · EBCONT",
    "exp.intern.p": "Prototyping, interaction flows and design system work in interdisciplinary product teams.",
    "exp.msc.t": "Master Interactive Technologies, AR & VR (Dipl.-Ing.) · USTP",
    "exp.msc.p": "AR/VR, prototyping, empirical research methods, AI, computer vision.",
    "exp.bsc.t": "BSc Creative Computing · USTP",
    "exp.bsc.p": "Programming, UX/UI, web & mobile, game development and XR.",
    "stack.title": "Stack & skills",
    "stack.intro": "Hover over or tap a card to flip it.",
    "stack.hint": "Hover or tap",
    "nav.menu": "Menu",
    skillGroups: { perks: "Perks", inventory: "Also in the inventory", lang: "Languages" },
    sheet: {
      title: "Character sheet", cls: "Class: Creative Technologist", note: "Self-assessed. No stat boosts were used.",
      groups: { build: "Build", design: "Design", team: "Team & Sound" },
      levels: ["Novice", "Apprentice", "Adept", "Expert", "Master"], of: "of", scale: "Level scale:", max: "(5 = max)"
    },
    skill: {
      webui: "Web & UI Design", ds: "Design Systems", proto: "Prototyping & Wireframing (low → high fidelity)",
      research: "UX Research & User Testing", a11y: "Accessibility", "3d": "3D Modelling & 3D Printing",
      tr: "Turkish <small>native</small>", de: "German <small>native</small>", en: "English <small>C1</small>", fr: "French <small>B2</small>"
    },
    stack: {
      figma: ["Figma", "My daily driver for design systems, prototypes and handoff. I once pushed its variables feature so far that Figma support confirmed I'd found a bug."],
      unity: ["Unity", "Six years, from my first games in high school to co-located VR multiplayer with hand tracking and spatial anchors."],
      csharp: ["C#", "My main language: gameplay systems, interaction logic and networked multiplayer with Netcode for GameObjects."],
      metaxr: ["Meta XR SDK", "Hand tracking, passthrough, Shared Spatial Anchors and Meta Avatars on Quest 3."],
      blender: ["Blender", "3D modelling, UV mapping and simple animations, plus prep for 3D printing."],
      research: ["UX Research", "User testing, feature evaluation and accessibility audits, turned into concrete design decisions."]
    },
    "contact.title": "Let's build something<br><em>people remember.</em>",
    "contact.book": "Book a 30-min call",
    "contact.copy": "Copy", "contact.copied": "Email address copied",
    toTop: "Back to top", "case.back": "All projects",
    lb: { close: "Close", prev: "Previous image", next: "Next image", zin: "Zoom in", zout: "Zoom out", hint: "Scroll, pinch or double-click to zoom · drag to move" },
    "captcha.check": "I'm not a robot", "captcha.kicker": "Security check", "captcha.note": "psst… are you human? 👀",
    "captcha.title": "Put every shape into its slot", "captcha.hint": "Drag them into the slots (or tap a shape, then a slot) and hit Verify.",
    "captcha.memeBottom": "Now hire a human",
    "captcha.hire": "Okay, let's talk →", "captcha.close": "Close", "captcha.done": "Verified. Preparing your reward…",
    "captcha.fail": ["Verification failed. Our AI suspects you might be a toaster. 🍞", "A triangle in a circle? Bold. Also wrong.", "Beep boop. That's exactly what a robot would do.", "Error 418: I'm a teapot. And you're not quite human yet.", "Even the goblins from #SaveTheOcean would get this one."],
    "captcha.tip": "(Tip: every shape has exactly one matching outline.)", "captcha.verify": "Verify",
    "captcha.picked": "Picked up! Now choose its slot.", "captcha.slot": "Slot for the {s}", "captcha.won": "Verification complete ✓",
    shapeNames: { sphere: "sphere", cube: "cube", ring: "ring", tri: "triangle", pill: "pill" },
    "footer.fun": "No game engine was harmed in the making of this site.",
    ach: {
      unlocked: "Achievement unlocked", count: "{n}/{total} achievements found", hint: "Can you find them all?",
      title: "Achievements", locked: "???", reset: "Reset progress", close: "Close", open: "Show achievements",
      done: "All found. You're officially thorough. 🎉",
      hints: {
        first: "Curiosity pays off: open something.", video: "Some things are better in motion.",
        all: "Leave no project unopened.", lang: "Sprechen Sie Deutsch?", bottom: "How deep does this page go?",
        secret: "↑ ↑ ↓ ↓ … you know the rest.", human: "Prove you're not a robot."
      },
      first: ["Curious mind", "Opened your first project"],
      video: ["Popcorn time", "Watched a video"],
      all: ["Completionist", "Opened every project"],
      lang: ["Polyglot", "Switched the language"],
      bottom: ["Deep diver", "Scrolled all the way down"],
      secret: ["Cowabunga! 🐢", "Found the secret code"],
      human: ["Certified human", "Passed the reSHAPTCHA"]
    },
    "footer.top": "Back to top ↑",
    ui: {
      duration: "Duration", role: "My role", team: "Team",
      challenge: "Challenge", approach: "What we built", approachSolo: "What I built", scan: "Scan to watch it on your phone or in VR", result: "Result", learned: "What I learned",
      open: "View project", close: "Close", next: "Next project", watch: "Watch video", video: "Video", tools: "Tools & tech", when: "When",
      devpost: "Devpost", ggj: "Global Game Jam page", itch: "Play on itch.io",
      award: "Contest winners", vernissage: "USTP Projektvernissage", instagram: "Instagram", tiktok: "TikTok", linkedin: "LinkedIn post", makingof: "Making-of video"
    },
    p: {
      historia: {
        title: "Historia Virtualis",
        kicker: "Co-located multiplayer VR",
        semester: "Master · 3rd semester · since 2025",
        growth: "2× 1st place: co-located VR, designed and tested with real players.",
        highlight: "1st place at two competitions · shown at the European Researchers' Night",
        badge: "🏆 1st place ×2",
        summary: "Three players, one room, Roman St. Pölten: the governor is expecting guests from Rome, and together you have to bake the festive bread for them in a 1st-century bakery.",
        duration: "6 months, still in development",
        role: "Development, 3D modelling and testing: a bit of everything",
        challenge: "Make three people in the same physical room feel like they share one virtual world, and design puzzles that genuinely require collaboration.",
        approach: "Every player gets one tool (an axe, a peel or flint and steel), so nobody can solve the room alone. Hand tracking replaces controllers, Shared Spatial Anchors align everyone's world, and Meta Avatars give each player a body.",
        result: ["1st place: 12th Interactive Digital Media Student Contest 2026", "1st place: USTP Projektvernissage 2025", "Shown at the European Researchers' Night", "Coming up: Lange Nacht der Forschung"],
        learned: "Tracking struggles with reflective surfaces, so we learned to design the physical test space as carefully as the virtual one."
      },
      sounds: {
        title: "Sounds of Shadow",
        kicker: "Master project · VR",
        semester: "Master · 2nd semester · 2025",
        growth: "Designing for a missing sense: finding your way by sound alone.",
        highlight: "Playable VR prototype built around an accessibility question",
        summary: "Navigate total darkness using echolocation. A sonar pulse reveals the room. Find three hidden keys without ever seeing clearly.",
        duration: "Semester project",
        role: "Core VR mechanics, level design and puzzles",
        challenge: "How do you experience space without sight? The game lets players navigate a pitch-dark environment the way people with visual impairments rely on sound.",
        approach: "A controller-triggered sonar casts 3–5 rays that bounce off objects and briefly reveal the surroundings, paired with immersive spatial audio.",
        result: "A playable VR prototype developed with Jakob Mayr as part of a university course.",
        learned: "Designing for one missing sense forces you to rethink every other one."
      },
      grim: {
        title: "Grim Hollow",
        kicker: "Global Game Jam 2026 · VR + scent",
        highlight: "Real scents synced to gameplay on Quest 3",
        summary: "Collect mushrooms in a dangerous forest and actually smell it. Built for Meta Quest 3 with an olfactory device that releases real scents.",
        duration: "Game jam",
        role: "UI, development and 3D modelling",
        challenge: "Add a whole new sense to VR within the time limit of a game jam.",
        approach: "The game triggers scents from an olfactory device in sync with what happens in the forest, turning smell into part of the gameplay.",
        result: "Submitted to the Global Game Jam 2026.",
        learned: "Smell is powerful, and very easy to overdo. Timing matters as much as the scent itself."
      },
      paper: {
        title: "Paper Therapy",
        kicker: "SensAI Hackathon Barcelona 2025 · MR + ML",
        highlight: "Real-time fold recognition: a working prototype in 48 hours",
        summary: "A mixed reality origami coach: a YOLO model recognises your current fold in real time, and a 3D animation shows the next step right on your paper.",
        duration: "48 hours",
        role: "UI, plus the Roboflow pipeline: annotating the dataset and training the model",
        challenge: "Translating instructions from a screen onto the paper in front of you is frustrating. Could MR guide you step by step instead?",
        approach: "We built a dataset of folding steps for an origami heart, trained a YOLO model with Roboflow and connected its predictions to a Quest 3 app that shows animated 3D models of the next fold.",
        result: "A working prototype after 48 hours, with plans to support more origami designs.",
        learned: "Telling nearly identical fold stages apart is the real challenge: data quality beats model size."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelor project",
        semester: "6th semester · 2024",
        growth: "Design and playtesting for a complete game, published on itch.io.",
        highlight: "Published and playable on itch.io",
        summary: "A turn-based deckbuilder inspired by Hollow Knight and Slay the Spire: build your deck, defeat bosses and free the characters who carry the story.",
        duration: "5 months",
        role: "Design, testing and some development",
        challenge: "Create a card game with enough variety to stay fresh across every battle.",
        approach: "Damage, defence and magic cards, shuffled decks for every fight, rewards after victories and chapter bosses that unlock story NPCs.",
        result: "A playable game published on itch.io.",
        learned: "Balancing is design work: every number is a decision about how the player should feel."
      },
      ocean: {
        title: "#SaveTheOcean",
        kicker: "VR game · Creative Code Lab 4",
        semester: "4th semester · 2023",
        growth: "My first VR game in a team: 3D modelling, animation and world design.",
        highlight: "Goblins litter, A* carries the trash to the sea, and a mutated shark wants revenge",
        summary: "Goblins and ogres keep dumping straws, bottles and nuclear waste into the rivers. Fish it out in VR before it reaches the ocean. Let too much through and Sigurd the Tainted, a shark mutated by the waste, comes for you. Luckily you have watermelon swords.",
        duration: "2 weeks",
        role: "3D modelling (goblins, huts, straw, bottle, nuclear waste barrel), goblin animation, Unity setup, world design, UI and UI logic",
        challenge: "Make ocean pollution something you feel, not something you read about: small careless acts pile up until they turn into a threat you can't ignore.",
        approach: "Five scenes, from a tutorial room to the beach, a death cell and a victory party. Goblins (fast, little trash) and ogres (slow, lots of trash) walk from their huts to the rivers via NavMesh; the trash then finds its way to the ocean with A* pathfinding. You collect it by hand into a bucket until the boss fight starts, armed with watermelon swords from the Unity Asset Store. Sound and an in-game announcer with Wwise.",
        result: "A playable Meta Quest game built in two weeks by our team of three (LSW-Studios), with a full boss fight, animations and an easter egg.",
        learned: ""
      },
      deepspace: {
        title: "Deep Space Cleaner Corp",
        kicker: "XR Game Jam 2025 · XR",
        highlight: "Keep the space highway clear for the big transport ships",
        summary: "Space junk is blocking the space highway. As a cleaner, you clear the debris so the huge transport ships can pass without trouble.",
        duration: "Game jam",
        role: "Level design, coding and animations (team of two)",
        challenge: "Build a complete, playable XR game in the few days of a game jam, with only two people.",
        approach: "Debris drifts across the highway and has to be cleared before the next transport ship comes through. I built the levels, programmed the gameplay and created the animations; my teammate covered the rest.",
        result: "A playable XR game made in two for the XR Game Jam 2025.",
        learned: ""
      },
      aroom: {
        title: "ARoom",
        kicker: "Master project · Mobile AR",
        semester: "Master · 3rd semester · 2025",
        growth: "Mobile AR: scanning real rooms and decorating them virtually.",
        highlight: "See how a picture looks on your wall before you hang it",
        summary: "An AR app that scans your room so you can place plants, decoration and picture frames (with your own uploaded images) and see how they would look in your space.",
        duration: "Semester project",
        role: "Solo project: concept, design and development",
        challenge: "Will this picture work on that wall? Deciding how decoration fits a real room is hard to imagine from a shop page.",
        approach: "The app scans the whole room and detects walls and surfaces. You place plants, decoration or picture frames, upload your own images into the frames, then scale, rotate and recolour the frames until they fit your room.",
        result: "[What came out of it]",
        learned: "[One takeaway]"
      },
      cthulhu: {
        title: "Call of Cthulhu",
        kicker: "360° Audio & Video · VR",
        semester: "Master · 1st semester · 2024",
        growth: "Sound first: an underwater organ you play with your bare hands.",
        highlight: "Play a church organ at the bottom of the sea, while Cthulhu listens",
        summary: "An underwater VR level: you play a piano with your bare hands, and every key is mapped to a recorded church organ. Sea creatures gather to listen, and in the background Cthulhu manipulates you into playing the notes that set him free.",
        duration: "Semester project",
        role: "Mostly level design, plus some coding, 3D modelling and animation (team of four)",
        challenge: "For the 360° Audio & Video course: build an experience where sound is the main character, not just the background.",
        approach: "A piano in front of you, played with hand tracking; each key triggers an original church organ sound. The whole soundscape is ambisonic and built in Wwise, so the organ, the sea creatures and Cthulhu come from where they are around you. I designed the underwater level and helped with scripting, models and animations.",
        result: "A playable VR level and a 360° video of it. The full credits are at the end of the video.",
        learned: ""
      },
      thesis: {
        title: "Survival skills in VR",
        kicker: "Bachelor's thesis · USTP · 2024",
        semester: "6th semester · 2024",
        growth: "My first real user study: VR against a printed guide, with learners aged 9 to 70.",
        highlight: "User study with participants aged 9 to 70",
        summary: "Can a playful VR forest teach basic survival skills, and teach them as well as a printed guide? A Unity VR game for Meta Quest, tested against a paper guide.",
        duration: "Bachelor's thesis",
        role: "Concept, Unity development, study design and evaluation",
        challenge: "How can gamified VR teach basic survival skills while keeping learners engaged and safe across very different ages?",
        approach: "A Unity VR forest for Meta Quest with stations for shelter building, fire making, water purification, animal tracks and edible vs. poisonous plants, with spatial audio in Wwise. Participants aged 9 to 70 were split into a VR group and a printed-guide group: pre/post tests, surveys, interviews and observation.",
        result: "Both groups learned. VR was described as “very fun” and “interactive” and worked well for spatial, situational knowledge like tracks and animal encounters, while the guide did better on fine visual details like telling berries apart.",
        learned: "In VR, the details that matter need to be designed to stand out."
      },
      nott: {
        title: "No Time To Stay",
        kicker: "Browser game · CCL 1",
        semester: "1st semester · 2021",
        growth: "Code first, design by gut feeling, but a complete game with my own art.",
        summary: "Sithis, an assassin who fell into a trap, has to survive 60 seconds per level, dodging fireballs until two dragons wait in the boss level.",
        duration: "Project week",
        role: "Solo: game design, coding from scratch in JavaScript, all pixel art and backgrounds",
        challenge: "My first game without an engine: movement, collision, gravity and levels, all from scratch in one project week.",
        approach: "An object-oriented JavaScript setup rendered on canvas, with a GameObject base class that the player, hearts and boss inherit from. Two top-down levels, then a side-scrolling boss level with gravity. Every sprite and background hand-drawn in Photoshop.",
        result: "A complete, playable browser game with a story, three levels and an end screen, nearly finished after four days.",
        learned: "Plan the art as carefully as the code: drawing took me longer than programming."
      },
      nftrade: {
        title: "NFTrade",
        kicker: "Full-stack web app · CCL 2",
        semester: "2nd semester · 2022",
        growth: "My first designs in Figma, and my first time designing for mobile.",
        summary: "A trading platform: sign up, list trade offers, browse other people's inventories and chat. Inspired by trading sites for game skins.",
        duration: "10 days",
        role: "Solo: concept, Figma design for desktop and mobile, frontend and backend",
        challenge: "Build a complete web platform with accounts, database relations, offers and a chat in about ten days.",
        approach: "Designed desktop and mobile views in Figma first, got tutor feedback, then built it with Express, EJS and MySQL: register and login with hashed passwords and tokens, inventories, trade offers, profile editing and a chat, hosted on Azure.",
        result: "Everything I planned except the actual item swap: accounts, offers, chat, profiles and a responsive layout.",
        learned: "Something not working tonight doesn't mean it won't work tomorrow. And pacing beats all-nighters."
      },
      memeit: {
        title: "Meme-It",
        kicker: "Android app · UX research · CCL 3",
        semester: "3rd semester · 2023",
        growth: "A real UX process: heuristic evaluation, hypotheses and user tests.",
        highlight: "SUS scores mostly above 90 in our user test",
        summary: "A party game for one phone: each player gets a random meme image and writes the funniest caption, the group rates it, and the best one is crowned meme-master.",
        duration: "2 weeks",
        role: "App development (~70%) and design (~30%), user tests together with my teammate Wolfgang",
        challenge: "Design a party game anyone can pick up instantly, and prove it with real users, not just our own opinion.",
        approach: "Mockups and a user flow in Figma, then a heuristic evaluation that led to fixes like an exit button and confirmation steps. We wrote hypotheses, a test plan with five tasks, informed consent and a SUS questionnaire, and built the Android app.",
        result: "Five participants aged 19–50; SUS scores mostly above 90, the lowest 87.5. Their feedback led to clearer texts, a turn indicator and an app icon.",
        learned: "Five testers aren't statistics, but they find the problems you're blind to."
      }
    }
  },

  de: {
    skip: "Zum Inhalt springen",
    "nav.about": "Über mich", "nav.explore": "Forschung", "nav.projects": "Projekte",
    "nav.experience": "Werdegang", "nav.contact": "Kontakt",
    roles: ["UX/UI Designer", "Unity- & C#-Entwickler", "UX-Researcher", "Accessibility-Verfechter", "Workshop-Coach"],
    "hero.hello": "Hi, ich bin",
    "hero.title": "Interaction Designer &amp; XR-Entwickler",
    "hero.also": "auch",
    "hero.status": "Ab sofort verfügbar · offen für XR-, UX/UI- und Unity/C#-Stellen",
    cv: "Lebenslauf herunterladen", "nav.cv": "CV ↓",
    "hero.lead": "Ich gestalte und entwickle interaktive Erlebnisse für Bildschirme, Räume und alle Sinne. Ich bin Creative Technologist aus St. Pölten und schließe im Februar 2027 meinen Master in Interactive Technologies als Dipl.‑Ing. ab.",
    "hero.cta1": "Meine Arbeiten", "hero.cta2": "Lass uns reden",
    "hero.scroll": "scroll runter und lern mich kennen",
    "about.title": "Über mich",
    "about.p1": "Ich bin Creative Technologist aus St. Pölten und schließe gerade meinen Master in Interactive Technologies (AR/VR) ab. Die Lehrveranstaltungen sind erledigt: Im Jänner 2027 gebe ich meine Masterarbeit ab, im Februar 2027 schließe ich als Dipl.-Ing. ab.",
    "about.p2": "Zwei Jahre lang habe ich als UX/UI-Designer bei EBCONT an 15 Projekten gearbeitet, von öffentlicher Verwaltung bis Enterprise Software, und entwickle seit sechs Jahren mit Unity.",
    "about.p3": "Was mich antreibt: verstehen, warum Menschen tun, was sie tun, und Erlebnisse gestalten, die für alle funktionieren.",
    "about.f1": "Jahre Unity", "about.f2": "Kundenprojekte", "about.f3": "1. Plätze",
    "about.video": "Making-of: Historia Virtualis",
    "explore.title": "Was mich beschäftigt",
    "explore.intro": "Die Fragen, die meine Projekte verbinden.",
    "explore.a.t": "Mehr als Sehen",
    "explore.a.p": "Wie lässt sich Raum über Klang, Geruch und Berührung erleben? Multisensorische XR, die sich nicht nur auf die Augen verlässt.",
    "explore.b.t": "Gestalten für diverse Fähigkeiten",
    "explore.b.p": "Barrierefreiheit ist keine Checkliste, sondern eine Haltung: von Accessibility-Analysen in Enterprise Software bis zu XR für unterschiedliche Körper und Sinne.",
    "explore.b.r": "EBCONT · Sounds of Shadow · Bachelorarbeit",
    "explore.c.t": "Geteilte & physische Realitäten",
    "explore.c.p": "Co-located Multiplayer und Mixed Reality, die digitale Inhalte mit echten Objekten und echten Menschen im selben Raum verbinden.",
    "projects.title": "Projekte",
    "projects.intro": "Wähl ein Thema zum Filtern oder öffne ein Projekt für die ganze Geschichte.",
    "projects.more": "Alle Projekte zeigen (+{n})",
    "early.title": "Mein Weg", "early.intro": "Vom ersten Browserspiel bis zur preisgekrönten VR, Semester für Semester.",
    "early.now": "Heute", "early.intern.t": "UX/UI-Praktikum · EBCONT", "early.intern.p": "Design-Systeme und Prototypen in echten Produktteams (siehe Werdegang).",
    themes: { all: "Alle", sight: "Mehr als Sehen", abilities: "Diverse Fähigkeiten", shared: "Geteilte Realitäten", jams: "Jams & Hackathons" },
    "jams.t": "Game Jams & Hackathons", "jams.p": "Ein Wochenende, ein Team, eine Idee: Hier probiere ich die verrückten Sachen schnell aus.",
    "tl.s5": "5. Semester · 2023",
    "tl.bachelor": "Bachelor · Creative Computing · 2021–2024", "tl.master": "Master · Interactive Technologies (AR/VR) · seit 2024",
    "thesis.title": "Bachelorarbeit",
    "thesis.kicker": "BSc Creative Computing · USTP · 2024",
    "thesis.name": "Überlebenstechniken in der Natur spielerisch in VR lernen",
    "thesis.q.t": "Frage", "thesis.b.t": "Gebaut", "thesis.s.t": "Studie", "thesis.f.t": "Ergebnis",
    "thesis.q": "Wie kann gamifizierte VR grundlegende Survival-Skills vermitteln und Lernende dabei motiviert und sicher halten?",
    "thesis.b": "Ein VR-Wald in Unity für Meta Quest mit Stationen zu Unterschlupfbau, Feuermachen, Wasseraufbereitung, Tierspuren sowie essbaren und giftigen Pflanzen. Spatial Audio mit Wwise.",
    "thesis.s": "Teilnehmende zwischen 9 und 70 Jahren, aufgeteilt in eine VR-Gruppe und eine Gruppe mit gedrucktem Leitfaden. Pre-/Post-Tests, Fragebögen, Interviews und Beobachtung.",
    "thesis.f": "Beide Gruppen haben gelernt. VR wurde als „sehr lustig“ und „interaktiv“ beschrieben und funktionierte gut für räumliches, situatives Wissen wie Tierspuren und Begegnungen mit Wildtieren, der Leitfaden war besser bei feinen visuellen Details wie dem Unterscheiden von Beeren. Erkenntnis: In VR müssen die entscheidenden Details bewusst hervorgehoben werden.",
    "thesis.cta": "Arbeit lesen (PDF)",
    "exp.title": "Werdegang & Ausbildung",
    "exp.coach.t": "Game Development Workshop Coach · USTP Young Campus",
    "exp.coach.p": "Praxisnahe Unity- und C#-Workshops für Jugendliche.",
    "exp.post": "LinkedIn-Beitrag",
    "exp.ebcont.t": "UX/UI Designer · EBCONT",
    "exp.ebcont.p": "15 Projekte in öffentlicher Verwaltung, Verlagswesen, Industrie und Enterprise Software. Design-Systeme, High-Fidelity-Prototypen in Figma, UX Research, User Testing und Accessibility-Analysen. Designverantwortung für ausgewählte Projekte in Teams mit 4–10 Entwickler:innen.",
    "exp.intern.t": "UX/UI Designer Praktikum · EBCONT",
    "exp.intern.p": "Prototyping, Interaktionsabläufe und Design-Systeme in interdisziplinären Produktteams.",
    "exp.msc.t": "Master Interactive Technologies, AR & VR (Dipl.-Ing.) · USTP",
    "exp.msc.p": "AR/VR, Prototyping, empirische Forschungsmethoden, KI, Computer Vision.",
    "exp.bsc.t": "BSc Creative Computing · USTP",
    "exp.bsc.p": "Programmierung, UX/UI, Web & Mobile, Game Development und XR.",
    "stack.title": "Stack & Skills",
    "stack.intro": "Fahr mit der Maus über eine Karte oder tipp darauf, um sie umzudrehen.",
    "stack.hint": "Hovern oder tippen",
    "nav.menu": "Menü",
    skillGroups: { perks: "Perks", inventory: "Außerdem im Inventar", lang: "Sprachen" },
    sheet: {
      title: "Charakterbogen", cls: "Klasse: Creative Technologist", note: "Selbst eingeschätzt. Es wurden keine Stat-Boosts verwendet.",
      groups: { build: "Bauen", design: "Design", team: "Team & Sound" },
      levels: ["Anfänger", "Lehrling", "Geübt", "Experte", "Meister"], of: "von", scale: "Level-Skala:", max: "(5 = Maximum)"
    },
    skill: {
      webui: "Web & UI Design", ds: "Design-Systeme", proto: "Prototyping & Wireframing (Low → High Fidelity)",
      research: "UX Research & User Testing", a11y: "Barrierefreiheit", "3d": "3D-Modellierung & 3D-Druck",
      tr: "Türkisch <small>Muttersprache</small>", de: "Deutsch <small>Muttersprache</small>", en: "Englisch <small>C1</small>", fr: "Französisch <small>B2</small>"
    },
    stack: {
      figma: ["Figma", "Mein tägliches Werkzeug für Design-Systeme, Prototypen und Übergaben. Mit dem Variables-Feature habe ich Figma einmal so ausgereizt, dass der Support einen Bug bestätigt hat."],
      unity: ["Unity", "Sechs Jahre, von meinen ersten Spielen in der Schule bis zu Co-located-VR-Multiplayer mit Hand Tracking und Spatial Anchors."],
      csharp: ["C#", "Meine Hauptsprache: Gameplay-Systeme, Interaktionslogik und Netzwerk-Multiplayer mit Netcode for GameObjects."],
      metaxr: ["Meta XR SDK", "Hand Tracking, Passthrough, Shared Spatial Anchors und Meta Avatars auf der Quest 3."],
      blender: ["Blender", "3D-Modellierung, UV-Mapping und einfache Animationen, plus Vorbereitung für den 3D-Druck."],
      research: ["UX Research", "User Testing, Feature-Evaluierung und Accessibility-Analysen, übersetzt in konkrete Designentscheidungen."]
    },
    "contact.title": "Lass uns etwas bauen,<br><em>das in Erinnerung bleibt.</em>",
    "contact.book": "30-Min-Call buchen",
    "contact.copy": "Kopieren", "contact.copied": "E-Mail-Adresse kopiert",
    toTop: "Nach oben", "case.back": "Alle Projekte",
    lb: { close: "Schließen", prev: "Vorheriges Bild", next: "Nächstes Bild", zin: "Hineinzoomen", zout: "Herauszoomen", hint: "Scrollen, mit zwei Fingern oder Doppelklick zoomen · ziehen zum Verschieben" },
    "captcha.check": "Ich bin kein Roboter", "captcha.kicker": "Sicherheitsprüfung", "captcha.note": "psst… bist du ein Mensch? 👀",
    "captcha.title": "Bring jede Form an ihren Platz", "captcha.hint": "Zieh sie in die Plätze (oder Form antippen, dann Platz) und drück auf Prüfen.",
    "captcha.memeBottom": "Jetzt stell einen Menschen ein",
    "captcha.hire": "Okay, lass uns reden →", "captcha.close": "Schließen", "captcha.done": "Verifiziert. Belohnung wird geladen…",
    "captcha.fail": ["Verifizierung fehlgeschlagen. Unsere KI vermutet, du bist ein Toaster. 🍞", "Ein Dreieck im Kreis? Mutig. Aber falsch.", "Beep boop. Genau das würde ein Roboter tun.", "Fehler 418: Ich bin eine Teekanne. Und du bist noch nicht ganz Mensch.", "Sogar die Goblins aus #SaveTheOcean würden das schaffen."],
    "captcha.tip": "(Tipp: Jede Form hat genau einen passenden Umriss.)", "captcha.verify": "Prüfen",
    "captcha.picked": "Aufgehoben! Jetzt den Platz wählen.", "captcha.slot": "Platz für: {s}", "captcha.won": "Verifizierung abgeschlossen ✓",
    shapeNames: { sphere: "Kugel", cube: "Würfel", ring: "Ring", tri: "Dreieck", pill: "Pille" },
    "footer.fun": "Bei der Erstellung dieser Seite wurde keine Game Engine verletzt.",
    ach: {
      unlocked: "Erfolg freigeschaltet", count: "{n}/{total} Erfolge gefunden", hint: "Findest du alle?",
      title: "Erfolge", locked: "???", reset: "Fortschritt zurücksetzen", close: "Schließen", open: "Erfolge anzeigen",
      done: "Alle gefunden. Du bist offiziell gründlich. 🎉",
      hints: {
        first: "Neugier zahlt sich aus: öffne etwas.", video: "Manches wirkt in Bewegung besser.",
        all: "Lass kein Projekt ungeöffnet.", lang: "Do you speak English?", bottom: "Wie tief geht diese Seite?",
        secret: "↑ ↑ ↓ ↓ … den Rest kennst du.", human: "Beweise, dass du kein Roboter bist."
      },
      first: ["Neugierig", "Erstes Projekt geöffnet"],
      video: ["Popcorn-Zeit", "Ein Video angesehen"],
      all: ["Komplettist", "Alle Projekte geöffnet"],
      lang: ["Polyglott", "Sprache gewechselt"],
      bottom: ["Tiefseetaucher", "Ganz nach unten gescrollt"],
      secret: ["Cowabunga! 🐢", "Den geheimen Code gefunden"],
      human: ["Zertifizierter Mensch", "Das reSHAPTCHA bestanden"]
    },
    "footer.top": "Nach oben ↑",
    ui: {
      duration: "Dauer", role: "Meine Rolle", team: "Team",
      challenge: "Herausforderung", approach: "Was wir gebaut haben", approachSolo: "Was ich gebaut habe", scan: "Scannen und am Handy oder in VR ansehen", result: "Ergebnis", learned: "Was ich gelernt habe",
      open: "Projekt ansehen", close: "Schließen", next: "Nächstes Projekt", watch: "Video ansehen", video: "Video", tools: "Tools & Technik", when: "Wann",
      devpost: "Devpost", ggj: "Global-Game-Jam-Seite", itch: "Auf itch.io spielen",
      award: "Gewinner:innen des Wettbewerbs", vernissage: "USTP Projektvernissage", instagram: "Instagram", tiktok: "TikTok", linkedin: "LinkedIn-Beitrag", makingof: "Making-of-Video"
    },
    p: {
      historia: {
        title: "Historia Virtualis",
        kicker: "Co-located Multiplayer-VR",
        semester: "Master · 3. Semester · seit 2025",
        growth: "2× 1. Platz: Co-located VR, gestaltet und getestet mit echten Spieler:innen.",
        highlight: "1. Platz bei zwei Wettbewerben · gezeigt bei der European Researchers' Night",
        badge: "🏆 2× 1. Platz",
        summary: "Drei Spieler:innen, ein Raum, das römische St. Pölten: Der Statthalter bekommt Besuch aus Rom, und ihr müsst gemeinsam in einer Bäckerei aus dem 1. Jahrhundert das Festtagsbrot für seine Gäste backen.",
        duration: "6 Monate, wird weiterentwickelt",
        role: "Entwicklung, 3D-Modellierung und Testing: ein bisschen von allem",
        challenge: "Drei Menschen im selben physischen Raum sollen das Gefühl haben, eine gemeinsame virtuelle Welt zu teilen, mit Rätseln, die echte Zusammenarbeit erfordern.",
        approach: "Jede Person bekommt ein Werkzeug (Axt, Brotschieber oder Feuerstein), niemand kann den Raum allein lösen. Hand Tracking ersetzt Controller, Shared Spatial Anchors richten die Welten aneinander aus, Meta Avatars geben allen einen Körper.",
        result: ["1. Platz: 12th Interactive Digital Media Student Contest 2026", "1. Platz: Projektvernissage der USTP 2025", "Präsentiert bei der European Researchers' Night", "Demnächst: Lange Nacht der Forschung"],
        learned: "Tracking hat Probleme mit spiegelnden Oberflächen, deshalb haben wir gelernt, den physischen Testraum genauso sorgfältig zu gestalten wie den virtuellen."
      },
      sounds: {
        title: "Sounds of Shadow",
        kicker: "Masterprojekt · VR",
        semester: "Master · 2. Semester · 2025",
        growth: "Gestalten für einen fehlenden Sinn: Orientierung nur über Klang.",
        highlight: "Spielbarer VR-Prototyp rund um eine Accessibility-Frage",
        summary: "Orientiere dich in völliger Dunkelheit per Echoortung. Ein Sonar-Impuls macht den Raum sichtbar. Finde drei versteckte Schlüssel.",
        duration: "Semesterprojekt",
        role: "Zentrale VR-Mechaniken, Level Design und Rätsel",
        challenge: "Wie erlebt man Raum ohne Sehen? Das Spiel lässt Spieler:innen eine stockdunkle Umgebung so erkunden, wie Menschen mit Sehbehinderung sich auf Klang verlassen.",
        approach: "Ein Sonar am Controller schießt 3–5 Strahlen, die von Objekten reflektiert werden und die Umgebung kurz sichtbar machen, kombiniert mit immersivem Spatial Audio.",
        result: "Ein spielbarer VR-Prototyp, entstanden mit Jakob Mayr im Rahmen einer Lehrveranstaltung.",
        learned: "Wer für einen fehlenden Sinn gestaltet, muss alle anderen neu denken."
      },
      grim: {
        title: "Grim Hollow",
        kicker: "Global Game Jam 2026 · VR + Geruch",
        highlight: "Echte Gerüche, synchron zum Gameplay auf der Quest 3",
        summary: "Sammle Pilze in einem gefährlichen Wald und rieche ihn wirklich. Für Meta Quest 3 mit einem Duftgerät, das echte Gerüche abgibt.",
        duration: "Game Jam",
        role: "UI, Entwicklung und 3D-Modellierung",
        challenge: "In der kurzen Zeit eines Game Jams einen ganz neuen Sinn in VR einbinden.",
        approach: "Das Spiel löst passend zum Geschehen im Wald Gerüche über ein Duftgerät aus. Geruch wird Teil des Gameplays.",
        result: "Eingereicht beim Global Game Jam 2026.",
        learned: "Geruch ist mächtig und schnell zu viel. Timing ist genauso wichtig wie der Duft selbst."
      },
      paper: {
        title: "Paper Therapy",
        kicker: "SensAI Hackathon Barcelona 2025 · MR + ML",
        highlight: "Faltschritt-Erkennung in Echtzeit: funktionierender Prototyp in 48 Stunden",
        summary: "Ein Mixed-Reality-Origami-Coach: Ein YOLO-Modell erkennt deinen aktuellen Faltschritt in Echtzeit, eine 3D-Animation zeigt den nächsten direkt auf deinem Papier.",
        duration: "48 Stunden",
        role: "UI sowie die Roboflow-Pipeline: Annotation des Datensatzes und Training des Modells",
        challenge: "Anleitungen vom Bildschirm aufs Papier zu übertragen ist mühsam. Kann MR stattdessen Schritt für Schritt führen?",
        approach: "Wir haben einen Datensatz mit Faltschritten für ein Origami-Herz erstellt, ein YOLO-Modell mit Roboflow trainiert und die Vorhersagen mit einer Quest-3-App verbunden, die den nächsten Schritt animiert zeigt.",
        result: "Ein funktionierender Prototyp nach 48 Stunden, mit Plänen für weitere Origami-Modelle.",
        learned: "Fast identische Faltschritte zu unterscheiden ist die eigentliche Herausforderung: Datenqualität schlägt Modellgröße."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelorprojekt",
        semester: "6. Semester · 2024",
        growth: "Design und Playtesting für ein komplettes Spiel, veröffentlicht auf itch.io.",
        highlight: "Veröffentlicht und spielbar auf itch.io",
        summary: "Ein rundenbasierter Deckbuilder, inspiriert von Hollow Knight und Slay the Spire: Deck aufbauen, Bosse besiegen und die Figuren befreien, die die Geschichte erzählen.",
        duration: "5 Monate",
        role: "Design, Testing und etwas Entwicklung",
        challenge: "Ein Kartenspiel mit genug Abwechslung, damit jeder Kampf frisch bleibt.",
        approach: "Schadens-, Verteidigungs- und Magiekarten, neu gemischte Decks in jedem Kampf, Belohnungen nach Siegen und Kapitel-Bosse, die Story-NPCs freischalten.",
        result: "Ein spielbares Spiel, veröffentlicht auf itch.io.",
        learned: "Balancing ist Designarbeit: Jede Zahl entscheidet, wie sich Spielende fühlen."
      },
      ocean: {
        title: "#SaveTheOcean",
        kicker: "VR-Spiel · Creative Code Lab 4",
        semester: "4. Semester · 2023",
        growth: "Mein erstes VR-Spiel im Team: 3D-Modellierung, Animation und World Design.",
        highlight: "Goblins verschmutzen, A* trägt den Müll ins Meer, und ein mutierter Hai will Rache",
        summary: "Goblins und Oger werfen ständig Strohhalme, Flaschen und Atommüll in die Flüsse. Fisch ihn in VR heraus, bevor er das Meer erreicht. Kommt zu viel durch, holt dich Sigurd der Verseuchte, ein vom Müll mutierter Hai. Zum Glück gibt es Wassermelonen-Schwerter.",
        duration: "2 Wochen",
        role: "3D-Modellierung (Goblins, Hütten, Strohhalm, Flasche, Atommüllfass), Goblin-Animation, Unity-Setup, World Design, UI und UI-Logik",
        challenge: "Meeresverschmutzung spürbar machen statt nur darüber zu lesen: Kleine achtlose Handlungen summieren sich zu einer Bedrohung, die man nicht mehr ignorieren kann.",
        approach: "Fünf Szenen, vom Tutorial-Raum über den Strand bis zur Todeszelle und der Siegesfeier. Goblins (schnell, wenig Müll) und Oger (langsam, viel Müll) laufen per NavMesh von ihren Hütten zu den Flüssen; der Müll findet dann per A*-Pathfinding seinen Weg ins Meer. Man sammelt ihn per Hand in einen Eimer, bis der Bosskampf beginnt, bewaffnet mit Wassermelonen-Schwertern aus dem Unity Asset Store. Sound und ein Ansager im Spiel mit Wwise.",
        result: "Ein spielbares Meta-Quest-Spiel, in zwei Wochen von unserem Dreierteam (LSW-Studios) gebaut, mit komplettem Bosskampf, Animationen und einem Easter Egg.",
        learned: ""
      },
      deepspace: {
        title: "Deep Space Cleaner Corp",
        kicker: "XR Game Jam 2025 · XR",
        highlight: "Halte den Space-Highway frei für die großen Transportschiffe",
        summary: "Weltraumschrott blockiert den Space-Highway. Als Reinigungskraft räumst du die Trümmer weg, damit die riesigen Transportschiffe ohne Probleme durchkommen.",
        duration: "Game Jam",
        role: "Level Design, Programmierung und Animationen (Zweierteam)",
        challenge: "Ein komplettes, spielbares XR-Spiel in den wenigen Tagen eines Game Jams bauen, nur zu zweit.",
        approach: "Trümmer treiben über den Highway und müssen weg, bevor das nächste Transportschiff kommt. Ich habe die Levels gebaut, das Gameplay programmiert und die Animationen erstellt; mein Teamkollege hat den Rest übernommen.",
        result: "Ein spielbares XR-Spiel, zu zweit für den XR Game Jam 2025 entwickelt.",
        learned: ""
      },
      aroom: {
        title: "ARoom",
        kicker: "Masterprojekt · Mobile AR",
        semester: "Master · 3. Semester · 2025",
        growth: "Mobile AR: echte Räume scannen und virtuell einrichten.",
        highlight: "Sieh, wie ein Bild an deiner Wand wirkt, bevor du es aufhängst",
        summary: "Eine AR-App, die deinen Raum scannt, damit du Pflanzen, Deko und Bilderrahmen (mit eigenen hochgeladenen Bildern) platzieren und sehen kannst, wie sie bei dir wirken.",
        duration: "Semesterprojekt",
        role: "Allein umgesetzt: Konzept, Design und Entwicklung",
        challenge: "Passt dieses Bild an diese Wand? Wie Deko in einem echten Raum wirkt, kann man sich im Onlineshop kaum vorstellen.",
        approach: "Die App scannt den ganzen Raum und erkennt Wände und Flächen. Man platziert Pflanzen, Deko oder Bilderrahmen, lädt eigene Bilder in die Rahmen, skaliert und dreht sie und ändert die Rahmenfarbe, bis alles zum Raum passt.",
        result: "[Was daraus wurde]",
        learned: "[Eine Erkenntnis]"
      },
      cthulhu: {
        title: "Call of Cthulhu",
        kicker: "360° Audio & Video · VR",
        semester: "Master · 1. Semester · 2024",
        growth: "Klang zuerst: eine Unterwasser-Orgel, die man mit bloßen Händen spielt.",
        highlight: "Spiel eine Kirchenorgel am Meeresgrund, während Cthulhu zuhört",
        summary: "Ein Unterwasser-Level in VR: Du spielst ein Klavier mit bloßen Händen, jede Taste ist mit einer aufgenommenen Kirchenorgel belegt. Meerestiere versammeln sich und hören zu, und im Hintergrund manipuliert dich Cthulhu, damit du die Töne spielst, die ihn befreien.",
        duration: "Semesterprojekt",
        role: "Hauptsächlich Level Design, dazu etwas Programmierung, 3D-Modellierung und Animation (Viererteam)",
        challenge: "Für die Lehrveranstaltung 360° Audio & Video: ein Erlebnis bauen, in dem Klang die Hauptrolle spielt und nicht nur Hintergrund ist.",
        approach: "Vor dir steht ein Klavier, gespielt mit Hand Tracking; jede Taste löst einen originalen Kirchenorgel-Klang aus. Die gesamte Klangwelt ist Ambisonics und in Wwise gebaut, sodass Orgel, Meerestiere und Cthulhu von dort kommen, wo sie um dich herum sind. Ich habe das Unterwasser-Level gestaltet und bei Scripts, Modellen und Animationen mitgeholfen.",
        result: "Ein spielbares VR-Level und ein 360°-Video davon. Die vollständigen Credits stehen am Ende des Videos.",
        learned: ""
      },
      thesis: {
        title: "Überleben lernen in VR",
        kicker: "Bachelorarbeit · USTP · 2024",
        semester: "6. Semester · 2024",
        growth: "Meine erste echte Nutzerstudie: VR gegen einen gedruckten Leitfaden, mit Lernenden von 9 bis 70.",
        highlight: "Nutzerstudie mit Teilnehmenden von 9 bis 70",
        summary: "Kann ein spielerischer VR-Wald grundlegende Survival-Skills vermitteln, und zwar so gut wie ein gedruckter Leitfaden? Ein Unity-VR-Spiel für die Meta Quest im Vergleich mit einem Papier-Guide.",
        duration: "Bachelorarbeit",
        role: "Konzept, Unity-Entwicklung, Studiendesign und Auswertung",
        challenge: "Wie kann gamifizierte VR grundlegende Survival-Skills vermitteln und Lernende dabei motiviert und sicher halten, über sehr unterschiedliche Altersgruppen hinweg?",
        approach: "Ein VR-Wald in Unity für die Meta Quest mit Stationen zu Unterschlupfbau, Feuermachen, Wasseraufbereitung, Tierspuren sowie essbaren und giftigen Pflanzen, mit Spatial Audio in Wwise. Teilnehmende zwischen 9 und 70 Jahren, aufgeteilt in eine VR-Gruppe und eine Gruppe mit gedrucktem Leitfaden: Pre-/Post-Tests, Fragebögen, Interviews und Beobachtung.",
        result: "Beide Gruppen haben gelernt. VR wurde als „sehr lustig“ und „interaktiv“ beschrieben und funktionierte gut für räumliches, situatives Wissen wie Tierspuren und Begegnungen mit Wildtieren, der Leitfaden war besser bei feinen visuellen Details wie dem Unterscheiden von Beeren.",
        learned: "In VR müssen die entscheidenden Details bewusst hervorgehoben werden."
      },
      nott: {
        title: "No Time To Stay",
        kicker: "Browserspiel · CCL 1",
        semester: "1. Semester · 2021",
        growth: "Code zuerst, Design aus dem Bauch, aber ein komplettes Spiel mit eigener Grafik.",
        summary: "Sithis, ein Assassine, der in eine Falle geraten ist, muss pro Level 60 Sekunden überleben und Feuerbällen ausweichen, bis im Boss-Level zwei Drachen warten.",
        duration: "Projektwoche",
        role: "Allein: Game Design, Programmierung von Grund auf in JavaScript, sämtliche Pixel Art und Hintergründe",
        challenge: "Mein erstes Spiel ohne Engine: Bewegung, Kollision, Schwerkraft und Levels, alles selbst gebaut, in einer Projektwoche.",
        approach: "Ein objektorientiertes JavaScript-Setup, auf dem Canvas gerendert, mit einer GameObject-Basisklasse, von der Spieler, Herzen und Boss erben. Zwei Top-Down-Levels, dann ein Side-Scroller-Bosslevel mit Schwerkraft. Jedes Sprite und jeder Hintergrund in Photoshop von Hand gezeichnet.",
        result: "Ein komplettes, spielbares Browserspiel mit Story, drei Levels und Endscreen, nach vier Tagen fast fertig.",
        learned: "Die Grafik genauso sorgfältig planen wie den Code: Zeichnen hat länger gedauert als Programmieren."
      },
      nftrade: {
        title: "NFTrade",
        kicker: "Full-Stack-Web-App · CCL 2",
        semester: "2. Semester · 2022",
        growth: "Meine ersten Designs in Figma und das erste Mal Design für Mobile.",
        summary: "Eine Tauschplattform: registrieren, Tauschangebote erstellen, Inventare anderer ansehen und chatten. Inspiriert von Tauschseiten für Game-Skins.",
        duration: "10 Tage",
        role: "Allein: Konzept, Figma-Design für Desktop und Mobile, Frontend und Backend",
        challenge: "Eine komplette Webplattform mit Accounts, Datenbank-Relationen, Angeboten und einem Chat in etwa zehn Tagen.",
        approach: "Zuerst Desktop- und Mobile-Ansichten in Figma, Feedback vom Tutor, dann umgesetzt mit Express, EJS und MySQL: Registrierung und Login mit gehashten Passwörtern und Tokens, Inventare, Tauschangebote, Profilbearbeitung und ein Chat, gehostet auf Azure.",
        result: "Alles Geplante außer dem eigentlichen Tausch: Accounts, Angebote, Chat, Profile und ein responsives Layout.",
        learned: "Was heute Nacht nicht funktioniert, kann morgen funktionieren. Und ein gutes Tempo schlägt jede Nachtschicht."
      },
      memeit: {
        title: "Meme-It",
        kicker: "Android-App · UX Research · CCL 3",
        semester: "3. Semester · 2023",
        growth: "Ein echter UX-Prozess: heuristische Evaluierung, Hypothesen und User Tests.",
        highlight: "SUS-Werte im User Test meist über 90",
        summary: "Ein Partyspiel für ein Handy: Jede Person bekommt ein zufälliges Meme-Bild und schreibt die lustigste Caption, die Gruppe bewertet, und die beste Person wird zum Meme-Master gekrönt.",
        duration: "2 Wochen",
        role: "App-Entwicklung (~70 %) und Design (~30 %), User Tests gemeinsam mit meinem Teamkollegen Wolfgang",
        challenge: "Ein Partyspiel gestalten, das jede Person sofort versteht, und das mit echten Nutzer:innen beweisen, nicht nur mit unserer Meinung.",
        approach: "Mockups und User Flow in Figma, dann eine heuristische Evaluierung, die zu Verbesserungen wie einem Exit-Button und Bestätigungsschritten führte. Wir haben Hypothesen, einen Testplan mit fünf Aufgaben, eine Einverständniserklärung und einen SUS-Fragebogen erstellt und die Android-App gebaut.",
        result: "Fünf Teilnehmende zwischen 19 und 50; SUS-Werte meist über 90, der niedrigste 87,5. Ihr Feedback führte zu klareren Texten, einer Anzeige, wer dran ist, und einem App-Icon.",
        learned: "Fünf Testpersonen sind keine Statistik, aber sie finden die Probleme, für die man selbst blind ist."
      }
    }
  }
};

/* ============ Language ============ */
let lang = "en";
try {
  lang = localStorage.getItem("lang") || (navigator.language || "en").slice(0, 2);
} catch (e) { lang = (navigator.language || "en").slice(0, 2); }
if (!I18N[lang]) lang = "en";

const t = (key) => I18N[lang][key] ?? I18N.en[key] ?? key;

/* Texts in [brackets] are unfinished placeholders and are never shown.
   A project whose summary is still a placeholder is left out entirely. */
const filled = (v) => Array.isArray(v) ? v.length > 0 : Boolean(v) && !String(v).trim().startsWith("[");

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = I18N[lang][el.dataset.i18n] ?? I18N.en[el.dataset.i18n];
    if (text != null) el.innerHTML = text; // keep the HTML text rather than showing a raw key
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nLabel));
  });
  document.getElementById("heroStatus").hidden = !filled(t("hero.status"));
  const cv = CV[lang] || CV.en;
  document.querySelectorAll(".js-cv").forEach((a) => { a.href = cv || "#"; a.hidden = !cv; });
  document.querySelectorAll(".js-cv-item").forEach((li) => { li.hidden = !cv; });
  document.getElementById("langToggle").setAttribute(
    "aria-label", lang === "en" ? "Auf Deutsch umschalten" : "Switch to English"
  );
  renderThemes();
  renderProjects();
  renderStack();
  renderSkills();
  restartRoles();
  renderTrophies();
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "en" ? "de" : "en";
  unlock("lang");
  try { localStorage.setItem("lang", lang); } catch (e) {}
  applyLang();
});

/* ============ Mobile menu ============ */
const nav = document.querySelector(".nav");
const menuBtn = document.getElementById("menuToggle");
function setMenu(open) {
  nav.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
document.getElementById("navLinks").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => { if (!nav.contains(e.target)) setMenu(false); });

/* ============ Rotating roles ============ */
let roleTimer;
function restartRoles() {
  clearInterval(roleTimer);
  const el = document.getElementById("role");
  const roles = t("roles");
  let i = 0;
  el.textContent = roles[0];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  roleTimer = setInterval(() => {
    el.classList.add("is-out");
    setTimeout(() => {
      i = (i + 1) % roles.length;
      el.textContent = roles[i];
      el.classList.remove("is-out");
    }, 250);
  }, 2200);
}

/* ============ Projects ============ */
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

const visibleProjects = () => PROJECTS.filter((pr) => filled(I18N[lang].p[pr.id].summary));

// Project image, or a placeholder with the initials while there's no image yet
function pic(pr, lazy = true) {
  if (pr.img) return `<img src="${pr.img}" alt=""${lazy ? ' loading="lazy"' : ""}${pr.imgPos ? ` style="object-position:${pr.imgPos}"` : ""}>`;
  const title = I18N[lang].p[pr.id].title;
  const initials = title.split(/\s+/).map((w) => w[0]).join("").slice(0, 3);
  return `<span class="ph" aria-hidden="true">${esc(initials)}</span>`;
}

/* Theme filter – the three research questions, shown right above the projects */
// Drawn icons (stroke = currentColor) – font symbols looked different in every font
const svg = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  all: svg('<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'),
  sight: svg('<path d="M3 10v4M7.5 6.5v11M12 3.5v17M16.5 7.5v9M21 10.5v3"/>'), // sound waves
  abilities: svg('<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.6 7-1.6M12 10.1v5M12 15.1l-3.5 5.9M12 15.1l3.5 5.9"/>'), // accessibility
  shared: svg('<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>'), // overlapping realities
  jams: svg('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>'), // lightning – made fast
  work: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 13h18"/>') // briefcase
};
// The three research questions + game jams/hackathons as a category
const THEMES = [
  { id: "sight", text: "explore.a", match: (pr) => (pr.themes || []).includes("sight") },
  { id: "abilities", text: "explore.b", match: (pr) => (pr.themes || []).includes("abilities") },
  { id: "shared", text: "explore.c", match: (pr) => (pr.themes || []).includes("shared") },
  { id: "jams", text: "jams", match: (pr) => pr.jam }
];
let theme = "all";
function renderThemes() {
  const L = t("themes");
  const chip = (id, label) => `<button type="button" class="theme" data-theme="${id}" aria-pressed="${theme === id}">
      ${ICONS[id]}${esc(label)}</button>`;
  document.getElementById("themes").innerHTML =
    chip("all", L.all) + THEMES.map((th) => chip(th.id, L[th.id])).join("");
  const desc = document.getElementById("themeDesc");
  const th = THEMES.find((x) => x.id === theme);
  desc.hidden = !th;
  if (th) desc.innerHTML = `<b>${esc(t(th.text + ".t"))}</b> ${esc(t(th.text + ".p"))}`;
}
document.getElementById("themes").addEventListener("click", (e) => {
  const btn = e.target.closest(".theme");
  if (!btn) return;
  theme = btn.dataset.theme;
  renderThemes();
  renderProjects();
});

/* Main grid order (most hyped first) and how many show before "Show all" */
const ORDER = ["historia", "grim", "paper", "cthulhu", "sounds", "thesis", "aroom", "ocean", "hue", "deepspace"];
const FIRST_SHOWN = 4; // featured card + one row of three
let showAllProjects = false;

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const P = I18N[lang].p;
  const active = THEMES.find((th) => th.id === theme);
  const rank = (id) => (ORDER.indexOf(id) + 1 || 99);
  const matching = visibleProjects()
    .filter((pr) => !pr.early && (!active || active.match(pr)))
    .sort((a, b) => rank(a.id) - rank(b.id));
  // the full list starts short; a filter always shows everything that matches
  const limited = !active && !showAllProjects && matching.length > FIRST_SHOWN;
  const shown = limited ? matching.slice(0, FIRST_SHOWN) : matching;
  grid.classList.toggle("is-filtered", theme !== "all"); // filtered: equal cards, no featured layout
  // compact cards: the long description and tech tags live on the project page
  grid.innerHTML = shown.map((pr) => {
    const x = P[pr.id];
    return `
      <button type="button" class="p-card${pr.featured ? " p-card--featured" : ""}" data-id="${pr.id}"
              aria-label="${esc(t("ui").open)}: ${esc(x.title)}">
        <div class="p-card__media">
          ${pic(pr)}
          ${x.badge ? `<span class="p-card__badge">${esc(x.badge)}</span>` : ""}
          ${pr.video ? `<span class="p-card__video">▶ ${esc(t("ui").video)}</span>
          <span class="p-card__play" aria-hidden="true"></span>` : ""}
        </div>
        <div class="p-card__body">
          <p class="p-card__kicker">${esc(x.kicker)}</p>
          <h3 class="p-card__title">${esc(x.title)}</h3>
          ${filled(x.highlight) ? `<p class="p-card__highlight">${esc(x.highlight)}</p>` : ""}
          ${pr.featured && theme === "all" ? `<p class="p-card__summary">${esc(x.summary)}</p>` : ""}
          ${filled(x.role) ? `<p class="p-card__role"><b>${esc(t("ui").role)}:</b> ${esc(x.role)}</p>` : ""}
          <span class="p-card__more" aria-hidden="true">${esc(t("ui").open)} →</span>
        </div>
      </button>`;
  }).join("");
  const more = document.getElementById("moreProjects");
  more.hidden = !limited;
  more.textContent = t("projects.more").replace("{n}", matching.length - FIRST_SHOWN);
  renderEarly();
}
document.getElementById("moreProjects").addEventListener("click", () => {
  showAllProjects = true;
  const firstNew = FIRST_SHOWN;
  renderProjects();
  document.querySelectorAll("#projectGrid .p-card")[firstNew]?.focus({ preventScroll: true }); // keyboard users land on the new cards
});

/* "My journey" – one step per semester, from the first browser game to the master's.
   Steps point at projects (semester + growth line come from their texts); hidden projects are skipped. */
const JOURNEY = [
  { divider: "tl.bachelor" },
  { id: "nott" }, { id: "nftrade" }, { id: "memeit" }, { id: "ocean" },
  { intern: true, when: "tl.s5" },
  { id: "hue" }, { id: "thesis" },
  { divider: "tl.master" },
  { id: "cthulhu" }, { id: "sounds" }, { id: "aroom" }, { id: "historia", today: true }
];
function renderEarly() {
  const P = I18N[lang].p;
  const visible = visibleProjects();
  const steps = JOURNEY.filter((s) => s.divider || s.intern || visible.some((p) => p.id === s.id));
  document.getElementById("early").hidden = !steps.length;
  document.getElementById("earlyList").innerHTML = steps.map((s) => {
    if (s.divider) return `
    <li class="journey__divider"><span>${esc(t(s.divider))}</span></li>`;
    if (s.intern) return `
    <li class="journey__step">
      <a class="early-card early-card--intern" href="#experience">
        <span class="early-card__media"><span class="ph ph--icon">${ICONS.work}</span></span>
        <span class="early-card__text">
          <span class="early-card__when">${esc(t(s.when))}</span>
          <b class="early-card__title">${esc(t("early.intern.t"))}</b>
          <span class="early-card__growth">${esc(t("early.intern.p"))}</span>
        </span>
      </a>
    </li>`;
    const pr = PROJECTS.find((p) => p.id === s.id), x = P[s.id];
    return `
    <li class="journey__step${s.today ? " is-today" : ""}">
      <button type="button" class="early-card${s.today ? " early-card--today" : ""}" data-id="${s.id}"
              aria-label="${esc(t("ui").open)}: ${esc(x.title)}">
        <span class="early-card__media">${pic(pr)}</span>
        <span class="early-card__text">
          <span class="early-card__when">${esc(s.today ? t("early.now") + " · " + x.semester : x.semester)}</span>
          <b class="early-card__title">${esc(x.title)}</b>
          <span class="early-card__kicker">${esc(x.kicker)}</span>
          ${filled(x.growth) ? `<span class="early-card__growth">${esc(x.growth)}</span>` : ""}
        </span>
      </button>
    </li>`;
  }).join("");
}
document.getElementById("earlyList").addEventListener("click", (e) => {
  const card = e.target.closest("button.early-card");
  if (!card) return;
  lastCardId = card.dataset.id;
  openProject(card.dataset.id);
});

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

/* ============ Project view: a full-screen case study page ============
   Every project has its own link, e.g. crysker.github.io/#project-historia (handy for cover letters),
   and the browser's back button closes the view like a normal page. */
const caseNext = document.getElementById("caseNext");
let pushedHistory = false;

function openProject(id, { push = true } = {}) {
  const pr = PROJECTS.find((p) => p.id === id);
  const x = I18N[lang].p[id];
  const ui = t("ui");
  // "Next project" follows the grid order (ORDER), early semester projects come after
  const rankAll = (p) => (ORDER.includes(p.id) ? ORDER.indexOf(p.id) : 50 + PROJECTS.indexOf(p));
  const list = visibleProjects().sort((a, b) => rankAll(a) - rankAll(b));
  const next = list.length > 1 ? list[(list.findIndex((p) => p.id === id) + 1) % list.length] : null;
  // Video loads only on click: faster, and no YouTube request for people who don't watch
  const media = pr.video
    ? `<button type="button" class="video__play case__video" data-yt="${pr.video}" data-title="${esc(x.title)}"
         aria-label="${esc(ui.watch)}: ${esc(x.title)}">
         <img src="${pr.img}" alt="">
         <span class="video__btn" aria-hidden="true"></span>
         <span class="video__label">${esc(ui.watch)}</span>
       </button>`
    : pic(pr, false);
  const block = (label, val) => filled(val) ? `
    <section class="case__block"><h3>${esc(label)}</h3>${
      Array.isArray(val) ? `<ul>${val.map((v) => `<li>${esc(v)}</li>`).join("")}</ul>` : `<p>${esc(val)}</p>`
    }</section>` : "";
  const fact = (label, val) => filled(val) ? `<div><dt>${esc(label)}</dt><dd>${esc(val)}</dd></div>` : "";
  modalBody.innerHTML = `
    <article class="case__inner">
      <header class="case__head">
        <p class="p-card__kicker">${esc(x.kicker)}</p>
        <h2 id="modalTitle">${esc(x.title)}</h2>
        ${filled(x.summary) ? `<p class="case__lead">${esc(x.summary)}</p>` : ""}
      </header>
      <div class="case__media">${media}</div>
      <div class="case__grid">
        <aside class="case__facts">
          <dl>${fact(ui.role, x.role)}${fact(ui.when, x.semester)}${fact(ui.duration, x.duration)}</dl>
          <h3>${esc(ui.tools)}</h3>
          <ul class="tags">${pr.tags.map((tg) => `<li>${esc(tg)}</li>`).join("")}</ul>
          ${pr.links.length ? `<div class="case__links">${pr.links.map((l) =>
            `<a class="btn" href="${l.url}" target="_blank" rel="noopener">${esc(ui[l.key])} ↗</a>`).join("")}</div>` : ""}
          ${pr.video ? `<a class="case__qr" href="https://youtu.be/${pr.video}" target="_blank" rel="noopener">
            <img src="assets/qr/${pr.id}.svg" alt="QR code: ${esc(x.title)} on YouTube" width="112" height="112">
            <span>${esc(ui.scan)}</span></a>` : ""}
        </aside>
        <div class="case__story">
          ${block(ui.challenge, x.challenge)}
          ${block(pr.solo ? ui.approachSolo : ui.approach, x.approach)}
          ${block(ui.result, x.result)}
          ${block(ui.learned, x.learned)}
          ${pr.gallery ? `<div class="case__gallery">${pr.gallery.map((g) => !g.video
            ? `<img src="${g}" alt="" loading="lazy">`
            : g.loop // short animation: plays by itself like a GIF
              ? `<video src="${g.video}" poster="${g.poster}" autoplay muted loop playsinline preload="metadata"></video>`
              : `<video src="${g.video}" poster="${g.poster}" controls muted loop playsinline preload="none"></video>`).join("")}</div>` : ""}
        </div>
      </div>
      ${next ? `<button type="button" class="case__nextcard" data-id="${next.id}">
        ${pic(next)}
        <span><small>${esc(ui.next)}</small><b>${esc(I18N[lang].p[next.id].title)} →</b></span>
      </button>` : ""}
    </article>`;
  caseNext.hidden = !next;
  if (next) {
    caseNext.dataset.id = next.id;
    caseNext.innerHTML = `<span class="case__next-label">${esc(ui.next)}</span> <span aria-hidden="true">→</span>`;
    caseNext.setAttribute("aria-label", `${ui.next}: ${I18N[lang].p[next.id].title}`);
  }
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
  modal.querySelector(".case__back").focus({ preventScroll: true });

  const hash = "#project-" + id;
  if (location.hash !== hash) {
    // First open adds a history entry (so "back" closes it); switching projects replaces it
    if (push && !pushedHistory && !location.hash.startsWith("#project-")) {
      history.pushState({ project: id }, "", hash);
      pushedHistory = true;
    } else {
      history.replaceState(history.state, "", hash);
    }
  }
  trackProjectOpened(id);
}

document.getElementById("projectGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".p-card");
  if (!card) return;
  stopPreview(card);
  lastCardId = card.dataset.id;
  openProject(card.dataset.id);
});

/* ============ Hover preview (mouse only) ============
   Own short silent clip if the project has one (preview: IMG + "…/clip.mp4", 5–10 s, landscape),
   otherwise the YouTube video, muted, fitted into the card (not zoomed, so nothing is cut off). */
const canHover = matchMedia("(hover: hover) and (pointer: fine)");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
let previewTimer;
// Open the connection to YouTube once the mouse is near the projects, so previews start faster
let warmedUp = false;
document.getElementById("projects").addEventListener("pointerenter", () => {
  if (warmedUp || !canHover.matches) return;
  warmedUp = true;
  ["https://www.youtube-nocookie.com", "https://i.ytimg.com"].forEach((href) => {
    document.head.appendChild(Object.assign(document.createElement("link"), { rel: "preconnect", href, crossOrigin: "" }));
  });
});
function stopPreview(card) {
  clearTimeout(previewTimer);
  card.querySelector(".p-card__preview")?.remove();
  card.classList.remove("is-previewing");
}
document.getElementById("projectGrid").addEventListener("mouseover", (e) => {
  const card = e.target.closest(".p-card");
  if (!card || card.contains(e.relatedTarget) || !canHover.matches || reduceMotion.matches) return;
  const pr = PROJECTS.find((p) => p.id === card.dataset.id);
  if (!pr?.preview && !pr?.video) return;
  previewTimer = setTimeout(() => { // short delay so just moving the mouse across the page doesn't start videos
    let el;
    if (pr.preview) {
      el = Object.assign(document.createElement("video"), {
        className: "p-card__preview", src: pr.preview, muted: true, loop: true, playsInline: true, autoplay: true
      });
      el.addEventListener("playing", () => card.classList.add("is-previewing"), { once: true });
    } else {
      const v = pr.video;
      el = Object.assign(document.createElement("iframe"), {
        className: "p-card__preview p-card__preview--yt", title: "", tabIndex: -1, allow: "autoplay; encrypted-media",
        src: `https://www.youtube-nocookie.com/embed/${v}?autoplay=1&mute=1&controls=0&loop=1&playlist=${v}&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`
      });
      // brief wait after load hides YouTube's black start frame
      el.addEventListener("load", () => setTimeout(() => card.classList.add("is-previewing"), 400));
    }
    el.setAttribute("aria-hidden", "true");
    card.querySelector(".p-card__media").appendChild(el);
  }, 120);
});
document.getElementById("projectGrid").addEventListener("mouseout", (e) => {
  const card = e.target.closest(".p-card");
  if (card && !card.contains(e.relatedTarget)) stopPreview(card);
});
let lastCardId = null;
function finishClose() {
  if (modal.open) modal.close();
  modalBody.innerHTML = ""; // stops video
  pushedHistory = false;
  // put keyboard focus back on the card the visitor came from
  document.querySelector(`.p-card[data-id="${lastCardId}"]`)?.focus({ preventScroll: true });
}
function closeProject() {
  if (pushedHistory) return history.back(); // popstate below finishes the close
  finishClose();
  if (location.hash.startsWith("#project-")) history.replaceState(null, "", location.pathname + location.search);
}
modal.querySelector(".case__back").addEventListener("click", closeProject);
caseNext.addEventListener("click", () => openProject(caseNext.dataset.id));
modal.addEventListener("cancel", (e) => { e.preventDefault(); closeProject(); }); // Esc key
modal.addEventListener("click", (e) => {
  const play = e.target.closest(".case__video");
  if (play) {
    play.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${play.dataset.yt}?autoplay=1" title="${esc(play.dataset.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    unlock("video");
    return;
  }
  const next = e.target.closest(".case__nextcard");
  if (next) openProject(next.dataset.id);
});

/* ============ Image viewer (lightbox): click, zoom, pan ============ */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbStage = document.getElementById("lbStage");
let lbList = [], lbIndex = 0;
const view = { s: 1, x: 0, y: 0 }; // scale + translate (px), transform-origin is the image centre
const MAX_ZOOM = 6;

function lbApply(animate) {
  lbImg.style.transition = animate ? "transform .2s" : "none";
  lbImg.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.s})`;
  lbStage.classList.toggle("is-zoomed", view.s > 1);
}
function lbReset() { view.s = 1; view.x = 0; view.y = 0; lbApply(true); }
// Zoom to `next` so that the screen point (px, py) stays under the finger/cursor
function lbZoom(next, px, py, animate) {
  next = Math.min(MAX_ZOOM, Math.max(1, next));
  const r = lbStage.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const k = next / view.s;
  view.x = px - cx - (px - cx - view.x) * k;
  view.y = py - cy - (py - cy - view.y) * k;
  view.s = next;
  if (next === 1) { view.x = 0; view.y = 0; }
  lbApply(animate);
}
function lbShow(i) {
  lbIndex = (i + lbList.length) % lbList.length;
  lbImg.src = lbList[lbIndex];
  view.s = 1; view.x = 0; view.y = 0; lbApply(false);
  document.getElementById("lbCount").textContent = lbList.length > 1 ? `${lbIndex + 1} / ${lbList.length}` : "";
  document.getElementById("lbPrev").hidden = document.getElementById("lbNext").hidden = lbList.length < 2;
}
function openLightbox(list, index) {
  const L = t("lb");
  document.getElementById("lbHint").textContent = L.hint;
  [["lbClose", L.close], ["lbPrev", L.prev], ["lbNext", L.next], ["lbIn", L.zin], ["lbOut", L.zout]]
    .forEach(([id, label]) => document.getElementById(id).setAttribute("aria-label", label));
  lbList = list;
  lbShow(index);
  lb.showModal();
}
const lbCenter = () => { const r = lbStage.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
document.getElementById("lbClose").addEventListener("click", () => lb.close());
document.getElementById("lbPrev").addEventListener("click", () => lbShow(lbIndex - 1));
document.getElementById("lbNext").addEventListener("click", () => lbShow(lbIndex + 1));
document.getElementById("lbIn").addEventListener("click", () => lbZoom(view.s * 1.6, ...lbCenter(), true));
document.getElementById("lbOut").addEventListener("click", () => lbZoom(view.s / 1.6, ...lbCenter(), true));
lb.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") lbShow(lbIndex + 1);
  else if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
  else if (e.key === "+" || e.key === "=") lbZoom(view.s * 1.6, ...lbCenter(), true);
  else if (e.key === "-") lbZoom(view.s / 1.6, ...lbCenter(), true);
});
lbStage.addEventListener("wheel", (e) => {
  e.preventDefault();
  lbZoom(view.s * (e.deltaY < 0 ? 1.25 : 1 / 1.25), e.clientX, e.clientY, false);
}, { passive: false });
lbStage.addEventListener("dblclick", (e) => {
  if (view.s > 1) lbReset(); else lbZoom(2.5, e.clientX, e.clientY, true);
});
// Pointer handling: one pointer pans (when zoomed), two pointers pinch-zoom; a tap beside the image closes
const pointers = new Map();
let pinchDist = 0, moved = false;
lbStage.addEventListener("pointerdown", (e) => {
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  try { lbStage.setPointerCapture(e.pointerId); } catch (err) {}
  moved = false;
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
  }
});
lbStage.addEventListener("pointermove", (e) => {
  const prev = pointers.get(e.pointerId);
  if (!prev) return;
  const cur = { x: e.clientX, y: e.clientY };
  pointers.set(e.pointerId, cur);
  if (Math.hypot(cur.x - prev.x, cur.y - prev.y) > 2) moved = true;
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (pinchDist) lbZoom(view.s * (d / pinchDist), (a.x + b.x) / 2, (a.y + b.y) / 2, false);
    pinchDist = d;
  } else if (view.s > 1) {
    view.x += cur.x - prev.x; view.y += cur.y - prev.y;
    lbApply(false);
  }
});
const endPointer = (e) => {
  pointers.delete(e.pointerId);
  if (pointers.size < 2) pinchDist = 0;
  // a plain tap on the dark area beside the image closes the viewer
  if (e.type === "pointerup" && !moved && pointers.size === 0 && view.s === 1) {
    const r = lbImg.getBoundingClientRect();
    const onImage = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!onImage) lb.close();
  }
};
lbStage.addEventListener("pointerup", endPointer);
lbStage.addEventListener("pointercancel", endPointer);
// "close" arrives async – ignore it if the viewer was reopened in the meantime
lb.addEventListener("close", () => { if (!lb.open) lbImg.removeAttribute("src"); });

// Every image in a case study opens the viewer (videos keep their own player)
modalBody.addEventListener("click", (e) => {
  const img = e.target.closest(".case__gallery img, .case__media > img");
  if (!img) return;
  const all = [...modalBody.querySelectorAll(".case__media > img, .case__gallery img")];
  openLightbox(all.map((i) => i.currentSrc || i.src), all.indexOf(img));
});

document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-open]");
  if (!a) return;
  e.preventDefault();
  openProject(a.dataset.open);
});

function projectIdFromHash() {
  const id = location.hash.replace("#project-", "");
  return location.hash.startsWith("#project-") && visibleProjects().some((p) => p.id === id) ? id : null;
}
function openProjectFromHash() {
  const id = projectIdFromHash();
  if (id) openProject(id, { push: false });
}
// Browser back/forward, or a project link opened on this page
addEventListener("popstate", () => {
  const id = projectIdFromHash();
  if (id) openProject(id, { push: false });
  else if (modal.open) finishClose();
});

/* ============ Stack flip cards ============ */
function renderStack() {
  const S = t("stack");
  document.getElementById("stackGrid").innerHTML = STACK.map((s) => `
    <button type="button" class="flip" aria-pressed="false">
      <span class="flip__inner">
        <span class="flip__face flip__front">
          <span class="flip__mono${s.glyph ? " flip__mono--glyph" : ""}">${s.logo ? `<img src="${LOGOS[s.logo]}" alt="">` : s.glyph}</span>
          <span>
            <span class="flip__name">${esc(S[s.id][0])}</span><br>
            <span class="flip__hint">${esc(t("stack.hint"))}</span>
          </span>
        </span>
        <span class="flip__face flip__back">${esc(S[s.id][1])}</span>
      </span>
    </button>`).join("");
}
function renderSkills() {
  const G = t("skillGroups"), K = t("skill"), S = t("sheet");
  // RPG-style character sheet: 5 diamond pips per skill, they light up one by one when the section scrolls in
  const stat = ([label, logo, pts]) => `
    <li class="stat" aria-label="${esc(label)}: ${pts} ${esc(S.of)} 5, ${esc(S.levels[pts - 1])}">
      <span class="stat__icon" aria-hidden="true">${logo ? `<img src="${LOGOS[logo]}" alt="">` : esc(label.slice(0, 2))}</span>
      <span class="stat__name" aria-hidden="true">${esc(label)}<small>${esc(S.levels[pts - 1])}</small></span>
      <span class="pips" aria-hidden="true">${[1, 2, 3, 4, 5].map((n) =>
        `<i class="pip${n <= pts ? " is-on" : ""}" style="--i:${n}"></i>`).join("")}</span>
    </li>`;
  const sheet = `
    <section class="sheet" aria-labelledby="sheetTitle">
      <header class="sheet__head">
        <span class="sheet__avatar"><img src="assets/img/portrait.jpg" alt=""></span>
        <span>
          <small class="sheet__kicker" id="sheetTitle">${esc(S.title)}</small>
          <b class="sheet__name">Serkan Sönmez</b>
          <span class="sheet__class">${esc(S.cls)}</span>
        </span>
        <span class="sheet__note">${esc(S.note)}</span>
      </header>
      <div class="sheet__cols">${STATS.map((g) => `
        <div class="sheet__col">
          <h3>${esc(S.groups[g.id])}</h3>
          <ul>${g.items.map(stat).join("")}</ul>
        </div>`).join("")}
      </div>
      <p class="sheet__legend">${esc(S.scale)} ${S.levels.map((l, i) =>
        `<span><i class="pips pips--mini" aria-hidden="true">${"<i class=\"pip is-on\"></i>".repeat(i + 1)}</i><b class="sr-only">${i + 1}</b> ${esc(l)}</span>`).join(" ")} <em>${esc(S.max)}</em></p>
    </section>`;
  const chips = SKILLS.map((g) => `
    <div class="skill-group">
      <h3>${esc(G[g.id])}</h3>
      <ul class="chips">${g.items.map(([label, logo]) => {
        const text = label.startsWith("@") ? K[label.slice(1)] : esc(label); // K values are trusted and may contain <small>
        return `<li class="${logo ? "" : "no-logo"}">${logo ? `<img src="${LOGOS[logo]}" alt="">` : ""}${text}</li>`;
      }).join("")}</ul>
    </div>`).join("");
  document.getElementById("skills").innerHTML = sheet + chips;
}

document.getElementById("stackGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".flip");
  if (card) card.setAttribute("aria-pressed", card.getAttribute("aria-pressed") === "true" ? "false" : "true");
});


/* ============ Reveal on scroll ============ */
const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
// Trigger when the section's top reaches the lower 15% of the screen. (A percentage threshold broke on
// phones: the projects section is so tall that 12% of it never fits on screen, so it stayed invisible.)
}, { threshold: 0, rootMargin: "0px 0px -15% 0px" }) : null;
document.querySelectorAll(".section").forEach((s) => {
  if (!io) return;
  s.classList.add("reveal");
  io.observe(s);
});

/* ============ Back to top (with scroll progress ring) ============ */
const toTop = document.getElementById("toTop");
const toTopProgress = toTop.querySelector(".to-top__progress");
let scrollTick = false;
function updateToTop() {
  const max = document.documentElement.scrollHeight - innerHeight;
  toTop.classList.toggle("is-visible", scrollY > innerHeight * 0.8);
  toTopProgress.style.strokeDashoffset = String(100 - (max > 0 ? (scrollY / max) * 100 : 0));
  if (max > 0 && scrollY >= max - 40) unlock("bottom");
  // Safety net for the fade-in: any section whose top is on screen gets shown, however tall it is
  document.querySelectorAll(".section.reveal:not(.is-in)").forEach((sec) => {
    if (sec.getBoundingClientRect().top < innerHeight * 0.9) sec.classList.add("is-in");
  });
  scrollTick = false;
}
addEventListener("scroll", () => { if (!scrollTick) { scrollTick = true; requestAnimationFrame(updateToTop); } }, { passive: true });
addEventListener("resize", updateToTop);
// All "to the top" links (logo, footer, button). href="#top" alone does nothing: #top is the sticky
// header, which the browser considers already in view.
document.querySelectorAll('a[href="#top"]').forEach((a) => a.addEventListener("click", (e) => {
  e.preventDefault();
  setMenu(false);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  document.querySelector(".nav__logo").focus({ preventScroll: true }); // keep keyboard users at the top too
}));

/* ============ Highlight the menu item of the section in view ============ */
// Sections without their own menu item count towards the closest related one
const NAV_FOR = { projects: "projects", experience: "experience", stack: "experience", contact: "contact" };
const navLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
const spy = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const target = "#" + NAV_FOR[en.target.id];
    navLinks.forEach((a) => {
      if (a.getAttribute("href") === target) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" }) : null;
document.querySelectorAll("main section[id]").forEach((s) => spy && s.id in NAV_FOR && spy.observe(s));
// Back in the hero: nothing is active
const heroSpy = "IntersectionObserver" in window ? new IntersectionObserver(([en]) => {
  if (en.isIntersecting) navLinks.forEach((a) => a.removeAttribute("aria-current"));
}, { rootMargin: "-45% 0px -50% 0px" }) : null;
if (heroSpy) heroSpy.observe(document.querySelector(".hero"));

/* ============ Copy email (mailto links do nothing without a mail app) ============ */
const copyBtn = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");
copyBtn.addEventListener("click", async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
  } catch (e) {
    const tmp = Object.assign(document.createElement("textarea"), { value: email });
    document.body.appendChild(tmp); tmp.select(); document.execCommand("copy"); tmp.remove();
  }
  copyBtn.classList.add("is-done");
  copyStatus.textContent = t("contact.copied");
  clearTimeout(copyBtn.timer);
  copyBtn.timer = setTimeout(() => { copyBtn.classList.remove("is-done"); copyStatus.textContent = ""; }, 2500);
});

/* ============ Achievements – a small game for curious visitors ============ */
const ACHIEVEMENTS = ["first", "video", "all", "lang", "bottom", "secret", "human"];
let achieved = [];
try { achieved = JSON.parse(localStorage.getItem("achievements") || "[]"); } catch (e) {}
const openedProjects = new Set();
const toast = document.getElementById("toast");
let toastTimer;

const trophiesDialog = document.getElementById("trophies");
function renderTrophies() {
  const A = t("ach");
  const n = achieved.length, total = ACHIEVEMENTS.length;
  const count = A.count.replace("{n}", n).replace("{total}", total);
  const footer = document.getElementById("trophyCount");
  footer.textContent = "🏆 " + count + (n < total ? " · " + A.hint : " 🎉");
  footer.setAttribute("aria-label", A.open + ": " + count);
  const btn = document.getElementById("trophyBtn");
  btn.hidden = n === 0; // only for people who already started hunting
  btn.setAttribute("aria-label", A.open + ": " + count);
  document.getElementById("trophyMini").textContent = `${n}/${total}`;

  // Overview: unlocked ones show what you did, locked ones a hint
  document.getElementById("trophiesTitle").textContent = A.title;
  document.getElementById("trophiesCount").textContent = n === total ? A.done : count;
  document.getElementById("trophiesBar").style.width = (n / total) * 100 + "%";
  document.getElementById("trophiesList").innerHTML = ACHIEVEMENTS.map((id) => {
    const got = achieved.includes(id);
    return `<li class="trophy${got ? " is-got" : ""}">
      <span class="trophy__icon" aria-hidden="true">${got ? "🏆" : "🔒"}</span>
      <span><b>${esc(got ? A[id][0] : A.locked)}</b><span>${esc(got ? A[id][1] : A.hints[id])}</span></span>
    </li>`;
  }).join("");
  document.getElementById("trophiesReset").textContent = A.reset;
  document.getElementById("trophiesReset").hidden = n === 0;
  document.getElementById("trophiesClose").textContent = A.close;
}
function openTrophies() {
  renderTrophies();
  if (!trophiesDialog.open) trophiesDialog.showModal();
}
document.getElementById("trophyCount").addEventListener("click", openTrophies);
document.getElementById("trophyBtn").addEventListener("click", openTrophies);
document.getElementById("toast").addEventListener("click", openTrophies);
document.getElementById("trophiesClose").addEventListener("click", () => trophiesDialog.close());
trophiesDialog.addEventListener("click", (e) => { if (e.target === trophiesDialog) trophiesDialog.close(); });
document.getElementById("trophiesReset").addEventListener("click", () => {
  achieved = [];
  openedProjects.clear();
  try { localStorage.removeItem("achievements"); } catch (e) {}
  document.getElementById("captchaOpen").classList.remove("is-verified");
  renderTrophies();
});
function unlock(id) {
  if (achieved.includes(id)) return;
  achieved.push(id);
  try { localStorage.setItem("achievements", JSON.stringify(achieved)); } catch (e) {}
  const A = t("ach");
  toast.innerHTML = `<span class="toast__icon" aria-hidden="true">🏆</span>
    <span><small>${esc(A.unlocked)} · ${achieved.length}/${ACHIEVEMENTS.length}</small>
    <b>${esc(A[id][0])}</b><span>${esc(A[id][1])}</span></span>`;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3800);
  renderTrophies();
}
function trackProjectOpened(id) {
  unlock("first");
  openedProjects.add(id);
  if (visibleProjects().every((p) => openedProjects.has(p.id))) unlock("all");
}

/* Secret: ↑ ↑ ↓ ↓ ← → ← → B A */
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiPos = 0;
addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  konamiPos = key === KONAMI[konamiPos] ? konamiPos + 1 : (key === KONAMI[0] ? 1 : 0);
  if (konamiPos < KONAMI.length) return;
  konamiPos = 0;
  unlock("secret");
  party();
});
function party() {
  if (reduceMotion.matches) return;
  const colors = ["#40e0d0", "#0fb8b0", "#ff7a3d", "#b5e03a", "#ffc93c"];
  const layer = document.createElement("div");
  layer.className = "confetti";
  layer.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 90; i++) {
    const p = document.createElement("i");
    p.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};` +
      `animation-delay:${Math.random() * .6}s;animation-duration:${2.2 + Math.random() * 1.6}s;` +
      `--drift:${(Math.random() - .5) * 240}px;--spin:${(Math.random() - .5) * 1440}deg`;
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  document.querySelector(".hero").classList.add("is-party");
  setTimeout(() => { layer.remove(); document.querySelector(".hero").classList.remove("is-party"); }, 4500);
}

/* ============ reSHAPTCHA – a reCAPTCHA parody with the hero shapes ============ */
const SHAPES = ["sphere", "cube", "ring", "tri", "pill"];
const game = document.getElementById("game");
const gameSlots = document.getElementById("gameSlots");
const gameTray = document.getElementById("gameTray");
const gameMsg = document.getElementById("gameMsg");
const captchaBtn = document.getElementById("captchaOpen");
const verifyBtn = document.getElementById("gameVerify");
let picked = null, fails = 0;

const say = (text) => { gameMsg.textContent = text; };
const shapeName = (s) => t("shapeNames")[s];
const updateVerify = () => { verifyBtn.disabled = gameSlots.querySelectorAll(".slot.is-filled").length < SHAPES.length; };

function startGame() {
  fails = 0; picked = null; say("");
  document.getElementById("gameTitle").textContent = t("captcha.title");
  document.querySelector(".game__hint").hidden = false;
  document.getElementById("gameWin").hidden = true;
  document.getElementById("gamePlay").hidden = false;
  gameSlots.innerHTML = SHAPES.map((s) =>
    `<button type="button" class="slot" data-shape="${s}" aria-label="${esc(t("captcha.slot").replace("{s}", shapeName(s)))}">
       <span class="piece piece--${s} is-ghost" aria-hidden="true"></span></button>`).join("");
  // Fisher–Yates, re-rolled until no shape sits right under its own slot
  let shuffled;
  do {
    shuffled = [...SHAPES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.some((s, i) => s === SHAPES[i]));
  gameTray.innerHTML = shuffled.map((s) =>
    `<button type="button" class="piece-btn" data-shape="${s}" aria-pressed="false" aria-label="${esc(shapeName(s))}">
       <span class="piece piece--${s}" aria-hidden="true"></span></button>`).join("");
  updateVerify();
  if (!game.open) game.showModal();
}

function pick(btn) {
  gameTray.querySelectorAll(".piece-btn").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  picked = btn;
  say(t("captcha.picked"));
}

const shake = (el) => { el.classList.remove("is-wrong"); void el.offsetWidth; el.classList.add("is-wrong"); };

// Any shape fits any slot – like a real CAPTCHA, you only find out when you hit "Verify"
function tryPlace(btn, slot) {
  btn.style.transform = "";
  if (!slot) return;
  if (slot.classList.contains("is-locked")) return shake(btn); // already verified correct
  if (slot.classList.contains("is-filled")) unplace(slot); // swap: the old piece goes back to the tray
  slot.querySelector(".is-ghost").hidden = true;
  slot.appendChild(btn);
  btn.setAttribute("aria-pressed", "false");
  slot.classList.add("is-filled");
  picked = null;
  say("");
  updateVerify();
}
function unplace(slot) {
  const btn = slot.querySelector(".piece-btn");
  if (!btn) return null;
  gameTray.appendChild(btn);
  slot.querySelector(".is-ghost").hidden = false;
  slot.classList.remove("is-filled");
  updateVerify();
  return btn;
}

function verify() {
  const slots = [...gameSlots.querySelectorAll(".slot")];
  const wrong = slots.filter((s) => s.querySelector(".piece-btn").dataset.shape !== s.dataset.shape);
  if (!wrong.length) return win();
  // correct ones get locked in, wrong ones jump back to the tray
  slots.filter((s) => !wrong.includes(s)).forEach((s) => s.classList.add("is-locked"));
  wrong.forEach((s) => { const btn = unplace(s); if (btn) shake(btn); });
  const lines = t("captcha.fail");
  say(lines[fails % lines.length] + (fails >= 2 ? " " + t("captcha.tip") : ""));
  fails++;
}
function win() {
  gameSlots.querySelectorAll(".slot").forEach((s) => s.classList.add("is-locked"));
  verifyBtn.disabled = true;
  say(t("captcha.done"));
  setTimeout(() => {
    document.getElementById("gamePlay").hidden = true;
    document.getElementById("gameWin").hidden = false;
    document.getElementById("gameTitle").textContent = t("captcha.won");
    document.querySelector(".game__hint").hidden = true;
    say("");
    captchaBtn.classList.add("is-verified");
    unlock("human");
  }, 800);
}
verifyBtn.addEventListener("click", verify);

// Drag with pointer events (mouse + touch); a press without movement counts as a tap
let drag = null;
gameTray.addEventListener("pointerdown", (e) => {
  const btn = e.target.closest(".piece-btn");
  if (!btn) return;
  drag = { btn, x: e.clientX, y: e.clientY, moved: false };
  try { btn.setPointerCapture(e.pointerId); } catch (err) {}
});
gameTray.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (!drag.moved && Math.hypot(dx, dy) < 6) return;
  drag.moved = true;
  drag.btn.classList.add("is-dragging");
  drag.btn.style.transform = `translate(${dx}px, ${dy}px)`;
});
gameTray.addEventListener("pointerup", (e) => {
  if (!drag) return;
  const { btn, moved } = drag;
  drag = null;
  btn.classList.remove("is-dragging");
  if (!moved) return pick(btn);
  btn.style.visibility = "hidden"; // look underneath the dragged piece
  const slot = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el.classList?.contains("slot"));
  btn.style.visibility = "";
  tryPlace(btn, slot);
});
gameTray.addEventListener("pointercancel", () => {
  if (drag) { drag.btn.style.transform = ""; drag.btn.classList.remove("is-dragging"); drag = null; }
});
// Keyboard: Enter/Space on a shape picks it (pointer taps are handled above)
gameTray.addEventListener("click", (e) => {
  const btn = e.target.closest(".piece-btn");
  if (btn && e.detail === 0) pick(btn);
});
gameSlots.addEventListener("click", (e) => {
  const slot = e.target.closest(".slot");
  if (!slot) return;
  if (picked) tryPlace(picked, slot);
  else if (slot.classList.contains("is-filled") && !slot.classList.contains("is-locked")) unplace(slot); // take it back out
});

if (achieved.includes("human")) captchaBtn.classList.add("is-verified"); // solved on an earlier visit
captchaBtn.addEventListener("click", startGame);
document.querySelectorAll(".hero .shape").forEach((s) => s.addEventListener("click", startGame)); // the shapes themselves
document.getElementById("gameClose").addEventListener("click", () => game.close());
document.getElementById("gameHire").addEventListener("click", () => game.close()); // link then scrolls to #contact

applyLang();
updateToTop();
openProjectFromHash();
