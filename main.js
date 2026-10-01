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
    themes: ["sight", "games"],
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
    themes: ["games"],
    img: IMG + "hue.png",
    video: "aEI-z94dT4A", // trailer from the itch.io page
    tags: ["Unity", "C#", "Game Design"],
    links: [{ key: "itch", url: "https://inki-gamer.itch.io/hue-of-hope" }]
  },
  {
    id: "ocean",
    themes: ["games"],
    img: IMG + "ocean.jpg",
    video: "yR7QZmcF6Uk",
    // own models first (goblins, huts, straw, bottle, nuclear barrel), then the rest of the cast
    gallery: [
      { video: IMG + "ocean/goblin-walk.mp4", poster: IMG + "ocean/goblin-walk.jpg", loop: true },
      IMG + "ocean/goblin.webp", IMG + "ocean/house.webp", IMG + "ocean/straws.webp",
      IMG + "ocean/water_bottle.webp", IMG + "ocean/nuclear_waste.webp",
      IMG + "ocean/ogres.webp", IMG + "ocean/shark.webp", IMG + "ocean/bucket.webp"
    ],
    sketches: [IMG + "ocean/sketch-ideas.jpg?v=2", IMG + "ocean/sketch-boss.jpg"],
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
    sketches: [IMG + "cthulhu/sketch-creatures.jpg", IMG + "cthulhu/sketch-ruins.jpg"],
    tags: ["Unity", "VR", "Hand Tracking", "Wwise", "Ambisonics", "Level Design", "3D Modelling", "Animation"],
    links: []
  },
  {
    id: "deepspace",
    jam: true,
    themes: ["games"],
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

  /* Early work (early: true) – not listed on the page any more; the case studies still open via their direct links (#project-<id>).
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
    sketches: [IMG + "nftrade/sketch-login.jpg", IMG + "nftrade/sketch-register.jpg"],
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
  { id: "inventory", items: [["Claude Code", "claude"], ["GitHub Copilot", "copilot"], ["Framer", "framer"], ["Java", "java"], ["Slack", "slack"], ["MS Teams", "teams"], ["MS Office", "office"]] },
  { id: "lang", items: [["@tr"], ["@de"], ["@en"], ["@fr"]] }
];

const I18N = {
  en: {
    skip: "Skip to content",
    "nav.about": "About", "nav.explore": "Research", "nav.projects": "Projects",
    "nav.experience": "Experience", "nav.contact": "Contact", "nav.play": "Playground",
    "hero.hello": "Hi, I'm",
    "hero.title": "Interaction Designer &amp; XR Developer",
    "hero.also": "also",
    cv: "Download CV", "nav.cv": "CV ↓",
    "hero.lead": "I design and build interactive experiences for screens, spaces and all the senses. Creative Technologist from St. Pölten, graduating as Dipl.‑Ing. in Interactive Technologies in February 2027.",
   
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
    "projects.all": "See all projects", "projects.titleAll": "All projects", "crumb.home": "Home",
    themes: { all: "All", sight: "Beyond sight", abilities: "Diverse abilities", shared: "Shared realities", games: "Games", jams: "Jams & hackathons" },
    "games.t": "Games", "games.p": "Complete, playable games: from a deckbuilder on itch.io to VR and XR games with bosses, trash-dumping goblins and space junk.",
    "jams.t": "Game jams & hackathons", "jams.p": "A weekend, a team, one idea: where I try the wild stuff fast.",
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
    "exp.work": "Work experience", "exp.edu": "Education",
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
    "contact.title": "Let's build something<br><em>people remember.</em>",
    "contact.book": "Book a 30-min call",
    "contact.copy": "Copy", "contact.copied": "Email address copied",
    toTop: "Back to top", "case.back": "All projects", "case.goback": "Back",
    lb: { close: "Close", prev: "Previous image", next: "Next image", zin: "Zoom in", zout: "Zoom out", hint: "Scroll, pinch or double-click to zoom · drag to move" },
    "footer.fun": "No game engine was harmed in the making of this site.",
    ach: {
      unlocked: "Achievement unlocked", count: "{n}/{total} achievements found", hint: "Can you find them all?",
      title: "Achievements", locked: "???", reset: "Reset progress", close: "Close", open: "Show achievements",
      done: "All found. You're officially thorough. 🎉",
      hints: {
        first: "Curiosity pays off: open something.", video: "Some things are better in motion.",
        all: "Leave no project unopened.", lang: "Sprechen Sie Deutsch?", bottom: "How deep does this page go?",
        secret: "↑ ↑ ↓ ↓ … you know the rest.", human: "Prove you're not a robot (on the Playground page).",
        guess: "Play a game in the Playground.", bullseye: "Guess a number almost exactly.", wizard: "Be really good at guessing.", maestro: "Fill the stage in Tiny Orchestra.", conductor: "Find every secret in Tiny Orchestra."
      },
      first: ["Curious mind", "Opened your first project"],
      video: ["Popcorn time", "Watched a video"],
      all: ["Completionist", "Opened every project"],
      lang: ["Polyglot", "Switched the language"],
      bottom: ["Deep diver", "Scrolled all the way down"],
      secret: ["Cowabunga! 🐢", "Found the secret code"],
      human: ["Certified human", "Passed the reSHAPTCHA"],
      guess: ["Educated guesser", "Finished a round of Guess the Average"],
      bullseye: ["Bullseye", "Guessed within 5% of the real number"],
      wizard: ["Statistics Wizard", "Scored 85% or more in a round"],
      maestro: ["Maestro", "Placed 6 creatures on the Tiny Orchestra stage and pressed play"],
      conductor: ["Conductor", "Found all 8 secret combinations in Tiny Orchestra"]
    },
    "footer.top": "Back to top ↑",
    ui: {
      duration: "Duration", role: "My role", team: "Team", solo: "Solo project", more: "More projects",
      challenge: "Challenge", approach: "What we built", approachSolo: "What I built", scan: "Scan to watch it on your phone or in VR", result: "Result", learned: "What I learned", sketches: "Early sketches",
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
        team: "Serkan, Georg, Flo and Sophia (Chris was part of the early phase)",
        role: "A bit of everything: UI, 3D modelling, level design, puzzles, Meta Avatars, bug fixing, testing and evaluation",
        challenge: "Make three people in the same physical room feel like they share one virtual world. Multiplayer and the shared space were the biggest struggle, especially on a Wi-Fi that could barely carry several Quest 3 headsets at once. On top of that, the puzzles had to require real collaboration without getting too hard, and every interaction had to feel intuitive with bare hands.",
        approach: "Every player gets one tool (an axe, a peel or flint and steel), so nobody can solve the room alone. Hand tracking replaces controllers, Shared Spatial Anchors align everyone's world, and Meta Avatars give each player a body. One teammate built most of the advanced scripting and the multiplayer, another did project management and some coding and helped with testing, and the first and I shared the evaluation. I designed the UI, modelled and built the levels, implemented the avatars and designed and fixed the puzzles. The two of them did the audio. There was no shortcut for the networking and the puzzles: we tested and fixed, again and again, with around 50 players so far.",
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
        team: "With Jakob Mayr",
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
        team: "Serkan and Georg",
        role: "Level design, Unity setup, UI (designed in Figma, imported into Unity) and UX tuning of the scents",
        challenge: "Smell has hardly ever been part of a game. We had to design it as real gameplay, not a gimmick: which scent, where, how strong and when, all within the time limit of a game jam.",
        approach: "We used the Omara, a small scent device with cartridges for 16 different smells. Following its official tutorial, scents are triggered by colliders in the forest: each one defines what is sprayed and how strongly, and the closer you get to the collider's centre, the stronger the smell gets. I built the level around these scent zones and tuned them until they felt right to the player.",
        result: "A playable VR forest you can smell, submitted to the Global Game Jam 2026. Playtesters found it cool and funny, because smelling is something you never get to do in a game.",
        learned: "Smell is powerful, and very easy to overdo. Timing matters as much as the scent itself."
      },
      paper: {
        title: "Paper Therapy",
        kicker: "SensAI Hackathon Barcelona 2025 · MR + ML",
        highlight: "Real-time fold recognition: a working prototype in 48 hours",
        summary: "A mixed reality origami coach: a YOLO model recognises your current fold in real time, and a 3D animation shows the next step right on your paper.",
        duration: "48 hours",
        team: "Serkan, Florian, Flo and Xaver",
        role: "UI, plus the Roboflow pipeline: annotating the dataset and training the model",
        challenge: "Folding from a screen is frustrating: you look at a video, then at your paper, then back. Could MR put the next fold right onto the paper? That needs a model that reliably tells which fold step you are on, trained on data we had to collect ourselves within 48 hours, and then wired into a Meta Quest app in Unity.",
        approach: "We photographed every folding step of an origami heart, split across the team: A teammate and I took the pictures of every step and I annotated them in Roboflow, one teammate built the Unity integration, another handled the machine learning, and I designed the UI. When we ran out of Roboflow credits, the two of us trained the model on our own accounts. A YOLO model recognises the current step, and the Quest 3 app plays an animated 3D model of the next fold until it sees that fold on your paper.",
        result: "A full pipeline in 48 hours, from photos to a Quest app that animates the next fold, and probably one of the biggest datasets for heart origami steps. The model was overfitted and did not detect as reliably as we wanted, but we now know exactly what to fix.",
        learned: "We shot everything on plain white paper. A gridded, coloured sheet would have made the fold steps far easier to tell apart. Data quality beats model size, and the set-up of the shoot is part of the data."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelor project",
        semester: "6th semester · 2024",
        growth: "Design and playtesting for a complete game, published on itch.io.",
        highlight: "Published and playable on itch.io",
        summary: "A turn-based deckbuilder inspired by Hollow Knight and Slay the Spire: build your deck, defeat bosses and free the characters who carry the story.",
        duration: "5 months",
        team: "Jaden, Lukas, Christof, Wolfgang, Serkan and Flo",
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
        team: "Lukas, Wolfgang and Serkan (LSW-Studios)",
        role: "3D modelling (goblins, huts, straw, bottle, nuclear waste barrel), goblin animation, Unity setup, world design, UI and UI logic",
        challenge: "Make ocean pollution something you feel, not something you read about: small careless acts pile up until they turn into a threat you can't ignore.",
        approach: "Five scenes, from a tutorial room to the beach, a death cell and a victory party. Goblins (fast, little trash) and ogres (slow, lots of trash) walk from their huts to the rivers via NavMesh; the trash then finds its way to the ocean with A* pathfinding. You collect it by hand into a bucket until the boss fight starts, armed with watermelon swords from the Unity Asset Store. Sound and an in-game announcer with Wwise. The boss runs on an animator with transitions for walking, attacking and dying, and we fine-tuned the fight through a lot of playtesting.",
        result: "A playable Meta Quest game built in two weeks by our team of three (LSW-Studios), with a full boss fight, animations and an easter egg.",
        learned: "VR interactions get very complex once you really dig into them. How players interact and move through the game changes the level design, from where things are placed to how far they have to reach. Even the UI is a VR problem: it only worked reliably once it followed the player's head."
      },
      deepspace: {
        title: "Deep Space Cleaner Corp",
        kicker: "XR Game Jam 2025 · XR",
        highlight: "Keep the space highway clear for the big transport ships",
        summary: "Space junk is blocking the space highway. As a cleaner, you clear the debris so the huge transport ships can pass without trouble.",
        duration: "Game jam",
        team: "Serkan and Christof",
        role: "Level design, coding and animations (team of two)",
        challenge: "Build a complete, playable XR game in the few days of a game jam, with only two people.",
        approach: "Debris drifts across the highway and has to be cleared before the next transport ship comes through. I built the levels, programmed the gameplay and created the animations; my teammate covered the rest.",
        result: "A playable XR game made in two for the XR Game Jam 2025.",
        learned: "In VR, level design follows how players move and interact. Even a simple idea like clearing debris gets complex once the player can reach, turn and walk around it."
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
        team: "Serkan, Georg, Flo and Christof",
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
        challenge: "My first game without an engine: movement, collision, gravity and levels, all from scratch in one project week. Physics was the hardest part: my first version squashed the player together so it could not move, and the jump still is not exactly how I imagined it.",
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
        challenge: "Build a complete web platform with accounts, database relations, offers and a chat in about ten days. The hardest parts were setting the right relations between database tables, and Azure hosting, which worked one day and not the next. The chat only worked about half of the time.",
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
        team: "Serkan and Wolfgang",
        role: "App development (~70%) and design (~30%), user tests together with my teammate Wolfgang",
        challenge: "Design a party game anyone can pick up instantly, and prove it with real users, not just our own opinion. The tooling fought back too: Android Studio kept crashing, and the emulator showed different sizes than a real phone, so the layout had to be adjusted again and again.",
        approach: "Mockups and a user flow in Figma, then a heuristic evaluation that led to fixes like an exit button and confirmation steps. We wrote hypotheses, a test plan with five tasks, informed consent and a SUS questionnaire, and built the Android app.",
        result: "Five participants aged 19–50; SUS scores mostly above 90, the lowest 87.5. Their feedback led to clearer texts, a turn indicator and an app icon.",
        learned: "Five testers aren't statistics, but they find the problems you're blind to."
      }
    }
  },

  de: {
    skip: "Zum Inhalt springen",
    "nav.about": "Über mich", "nav.explore": "Forschung", "nav.projects": "Projekte",
    "nav.experience": "Werdegang", "nav.contact": "Kontakt", "nav.play": "Spielwiese",
    "hero.hello": "Hi, ich bin",
    "hero.title": "Interaction Designer &amp; XR-Entwickler",
    "hero.also": "auch",
    cv: "Lebenslauf herunterladen", "nav.cv": "CV ↓",
    "hero.lead": "Ich gestalte und entwickle interaktive Erlebnisse für Bildschirme, Räume und alle Sinne. Ich bin Creative Technologist aus St. Pölten und schließe im Februar 2027 meinen Master in Interactive Technologies als Dipl.‑Ing. ab.",
   
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
    "projects.all": "Alle Projekte ansehen", "projects.titleAll": "Alle Projekte", "crumb.home": "Start",
    themes: { all: "Alle", sight: "Mehr als Sehen", abilities: "Diverse Fähigkeiten", shared: "Geteilte Realitäten", games: "Games", jams: "Jams & Hackathons" },
    "games.t": "Games", "games.p": "Fertige, spielbare Games: vom Deckbuilder auf itch.io bis zu VR- und XR-Spielen mit Bossen, müllenden Goblins und Weltraumschrott.",
    "jams.t": "Game Jams & Hackathons", "jams.p": "Ein Wochenende, ein Team, eine Idee: Hier probiere ich die verrückten Sachen schnell aus.",
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
    "exp.work": "Berufserfahrung", "exp.edu": "Ausbildung",
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
    "contact.title": "Lass uns etwas bauen,<br><em>das in Erinnerung bleibt.</em>",
    "contact.book": "30-Min-Call buchen",
    "contact.copy": "Kopieren", "contact.copied": "E-Mail-Adresse kopiert",
    toTop: "Nach oben", "case.back": "Alle Projekte", "case.goback": "Zurück",
    lb: { close: "Schließen", prev: "Vorheriges Bild", next: "Nächstes Bild", zin: "Hineinzoomen", zout: "Herauszoomen", hint: "Scrollen, mit zwei Fingern oder Doppelklick zoomen · ziehen zum Verschieben" },
    "footer.fun": "Bei der Erstellung dieser Seite wurde keine Game Engine verletzt.",
    ach: {
      unlocked: "Erfolg freigeschaltet", count: "{n}/{total} Erfolge gefunden", hint: "Findest du alle?",
      title: "Erfolge", locked: "???", reset: "Fortschritt zurücksetzen", close: "Schließen", open: "Erfolge anzeigen",
      done: "Alle gefunden. Du bist offiziell gründlich. 🎉",
      hints: {
        first: "Neugier zahlt sich aus: öffne etwas.", video: "Manches wirkt in Bewegung besser.",
        all: "Lass kein Projekt ungeöffnet.", lang: "Do you speak English?", bottom: "Wie tief geht diese Seite?",
        secret: "↑ ↑ ↓ ↓ … den Rest kennst du.", human: "Beweise auf der Spielwiese, dass du kein Roboter bist.",
        guess: "Spiel ein Spiel auf der Spielwiese.", bullseye: "Schätze eine Zahl fast genau.", wizard: "Sei richtig gut im Schätzen.", maestro: "Füll die Bühne im Mini-Orchester.", conductor: "Finde alle Geheimnisse im Mini-Orchester."
      },
      first: ["Neugierig", "Erstes Projekt geöffnet"],
      video: ["Popcorn-Zeit", "Ein Video angesehen"],
      all: ["Komplettist", "Alle Projekte geöffnet"],
      lang: ["Polyglott", "Sprache gewechselt"],
      bottom: ["Tiefseetaucher", "Ganz nach unten gescrollt"],
      secret: ["Cowabunga! 🐢", "Den geheimen Code gefunden"],
      human: ["Zertifizierter Mensch", "Das reSHAPTCHA bestanden"],
      guess: ["Fundierter Schätzer", "Eine Runde Schätz den Durchschnitt beendet"],
      bullseye: ["Volltreffer", "Bis auf 5% an der echten Zahl"],
      wizard: ["Statistik-Zauberer", "85% oder mehr in einer Runde erreicht"],
      maestro: ["Maestro", "6 Wesen auf die Bühne des Mini-Orchesters gesetzt und Play gedrückt"],
      conductor: ["Dirigent:in", "Alle 8 geheimen Kombinationen im Mini-Orchester gefunden"]
    },
    "footer.top": "Nach oben ↑",
    ui: {
      duration: "Dauer", role: "Meine Rolle", team: "Team", solo: "Einzelprojekt", more: "Weitere Projekte",
      challenge: "Herausforderung", approach: "Was wir gebaut haben", approachSolo: "Was ich gebaut habe", scan: "Scannen und am Handy oder in VR ansehen", result: "Ergebnis", learned: "Was ich gelernt habe", sketches: "Erste Skizzen",
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
        team: "Serkan, Georg, Flo und Sophia (Chris war in der Anfangsphase dabei)",
        role: "Ein bisschen von allem: UI, 3D-Modellierung, Level Design, Rätsel, Meta Avatars, Bugfixing, Testing und Evaluierung",
        challenge: "Drei Menschen im selben physischen Raum sollen das Gefühl haben, eine gemeinsame virtuelle Welt zu teilen. Multiplayer und der geteilte Raum waren die größte Hürde, besonders mit einem WLAN, das mehrere Quest 3 kaum gleichzeitig tragen konnte. Dazu sollten die Rätsel echte Zusammenarbeit erfordern, ohne zu schwer zu werden, und jede Interaktion sollte sich mit bloßen Händen intuitiv anfühlen.",
        approach: "Jede Person bekommt ein Werkzeug (Axt, Brotschieber oder Feuerstein), niemand kann den Raum allein lösen. Hand Tracking ersetzt Controller, Shared Spatial Anchors richten die Welten aneinander aus, Meta Avatars geben allen einen Körper. Ein Teamkollege hat den Großteil des fortgeschrittenen Scriptings und den Multiplayer gebaut, ein anderer hat Projektmanagement und etwas Code übernommen und beim Testen geholfen, die Evaluierung haben der erste und ich gemeinsam gemacht. Ich habe die UI gestaltet, Levels modelliert und gebaut, die Avatars umgesetzt und die Rätsel entworfen und gefixt. Audio haben die beiden gemacht. Für Netzwerk und Rätsel gab es keine Abkürzung: Wir haben immer wieder getestet und gefixt, bisher mit rund 50 Spieler:innen.",
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
        team: "Mit Jakob Mayr",
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
        team: "Serkan und Georg",
        role: "Level Design, Unity-Setup, UI (in Figma gestaltet und in Unity importiert) und UX-Feintuning der Gerüche",
        challenge: "Geruch war in Spielen bisher kaum ein Thema. Wir mussten ihn als echtes Gameplay gestalten statt als Gimmick: welcher Duft, wo, wie stark und wann, und das in der kurzen Zeit eines Game Jams.",
        approach: "Wir haben das Omara verwendet, ein kleines Duftgerät mit Kartuschen für 16 verschiedene Gerüche. Nach dem offiziellen Tutorial werden Düfte über Collider im Wald ausgelöst: Jeder legt fest, was versprüht wird und wie stark, und je näher man dem Mittelpunkt des Colliders kommt, desto intensiver wird der Geruch. Ich habe das Level um diese Duftzonen herum gebaut und sie so lange abgestimmt, bis sie sich für Spielende richtig anfühlten.",
        result: "Ein spielbarer VR-Wald, den man riechen kann, eingereicht beim Global Game Jam 2026. Die Playtester fanden es cool und lustig, weil man in einem Spiel sonst nie etwas riecht.",
        learned: "Geruch ist mächtig und schnell zu viel. Timing ist genauso wichtig wie der Duft selbst."
      },
      paper: {
        title: "Paper Therapy",
        kicker: "SensAI Hackathon Barcelona 2025 · MR + ML",
        highlight: "Faltschritt-Erkennung in Echtzeit: funktionierender Prototyp in 48 Stunden",
        summary: "Ein Mixed-Reality-Origami-Coach: Ein YOLO-Modell erkennt deinen aktuellen Faltschritt in Echtzeit, eine 3D-Animation zeigt den nächsten direkt auf deinem Papier.",
        duration: "48 Stunden",
        team: "Serkan, Florian, Flo und Xaver",
        role: "UI sowie die Roboflow-Pipeline: Annotation des Datensatzes und Training des Modells",
        challenge: "Falten nach Bildschirm ist mühsam: Video anschauen, aufs Papier schauen, wieder zurück. Kann MR den nächsten Falz direkt aufs Papier legen? Dafür braucht es ein Modell, das zuverlässig erkennt, bei welchem Schritt man gerade ist, trainiert mit Daten, die wir in 48 Stunden selbst sammeln mussten, und danach in eine Meta-Quest-App in Unity eingebunden.",
        approach: "Wir haben jeden Faltschritt eines Origami-Herzens fotografiert, im Team aufgeteilt: Ein Teamkollege und ich haben jeden Schritt fotografiert und ich habe alles in Roboflow annotiert, ein Teamkollege hat die Unity-Integration gebaut, ein weiterer das Machine Learning übernommen, und ich habe die UI gestaltet. Als uns die Roboflow-Credits ausgingen, haben wir beide das Modell auf unseren eigenen Accounts trainiert. Ein YOLO-Modell erkennt den aktuellen Schritt, und die Quest-3-App spielt ein animiertes 3D-Modell des nächsten Falzes ab, bis sie diesen auf deinem Papier erkennt.",
        result: "Eine komplette Pipeline in 48 Stunden, vom Foto bis zur Quest-App, die den nächsten Falz animiert, und wohl einer der größten Datensätze für Herz-Origami-Schritte. Das Modell war überangepasst und erkannte nicht so zuverlässig wie gewünscht, aber wir wissen jetzt genau, was zu verbessern ist.",
        learned: "Wir haben alles auf glattem weißem Papier fotografiert. Ein kariertes, farbiges Blatt hätte die Faltschritte viel leichter unterscheidbar gemacht. Datenqualität schlägt Modellgröße, und der Aufbau des Fotoshootings gehört zu den Daten."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelorprojekt",
        semester: "6. Semester · 2024",
        growth: "Design und Playtesting für ein komplettes Spiel, veröffentlicht auf itch.io.",
        highlight: "Veröffentlicht und spielbar auf itch.io",
        summary: "Ein rundenbasierter Deckbuilder, inspiriert von Hollow Knight und Slay the Spire: Deck aufbauen, Bosse besiegen und die Figuren befreien, die die Geschichte erzählen.",
        duration: "5 Monate",
        team: "Jaden, Lukas, Christof, Wolfgang, Serkan und Flo",
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
        team: "Lukas, Wolfgang und Serkan (LSW-Studios)",
        role: "3D-Modellierung (Goblins, Hütten, Strohhalm, Flasche, Atommüllfass), Goblin-Animation, Unity-Setup, World Design, UI und UI-Logik",
        challenge: "Meeresverschmutzung spürbar machen statt nur darüber zu lesen: Kleine achtlose Handlungen summieren sich zu einer Bedrohung, die man nicht mehr ignorieren kann.",
        approach: "Fünf Szenen, vom Tutorial-Raum über den Strand bis zur Todeszelle und der Siegesfeier. Goblins (schnell, wenig Müll) und Oger (langsam, viel Müll) laufen per NavMesh von ihren Hütten zu den Flüssen; der Müll findet dann per A*-Pathfinding seinen Weg ins Meer. Man sammelt ihn per Hand in einen Eimer, bis der Bosskampf beginnt, bewaffnet mit Wassermelonen-Schwertern aus dem Unity Asset Store. Sound und ein Ansager im Spiel mit Wwise. Der Boss läuft über ein Animator-System mit Übergängen für Gehen, Angreifen und Sterben, und den Kampf haben wir durch viele Playtests abgestimmt.",
        result: "Ein spielbares Meta-Quest-Spiel, in zwei Wochen von unserem Dreierteam (LSW-Studios) gebaut, mit komplettem Bosskampf, Animationen und einem Easter Egg.",
        learned: "VR-Interaktionen werden sehr komplex, sobald man wirklich in die Tiefe geht. Wie Spielende interagieren und sich durchs Spiel bewegen, verändert das Level Design, von der Platzierung der Objekte bis zur Reichweite. Sogar die UI ist in VR ein Problem: Sie funktionierte erst zuverlässig, als sie dem Kopf der Spielenden folgte."
      },
      deepspace: {
        title: "Deep Space Cleaner Corp",
        kicker: "XR Game Jam 2025 · XR",
        highlight: "Halte den Space-Highway frei für die großen Transportschiffe",
        summary: "Weltraumschrott blockiert den Space-Highway. Als Reinigungskraft räumst du die Trümmer weg, damit die riesigen Transportschiffe ohne Probleme durchkommen.",
        duration: "Game Jam",
        team: "Serkan und Christof",
        role: "Level Design, Programmierung und Animationen (Zweierteam)",
        challenge: "Ein komplettes, spielbares XR-Spiel in den wenigen Tagen eines Game Jams bauen, nur zu zweit.",
        approach: "Trümmer treiben über den Highway und müssen weg, bevor das nächste Transportschiff kommt. Ich habe die Levels gebaut, das Gameplay programmiert und die Animationen erstellt; mein Teamkollege hat den Rest übernommen.",
        result: "Ein spielbares XR-Spiel, zu zweit für den XR Game Jam 2025 entwickelt.",
        learned: "In VR folgt das Level Design dem Bewegen und Interagieren der Spielenden. Selbst eine einfache Idee wie Trümmer wegräumen wird komplex, sobald man sie greifen, drehen und umrunden kann."
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
        team: "Serkan, Georg, Flo und Christof",
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
        challenge: "Mein erstes Spiel ohne Engine: Bewegung, Kollision, Schwerkraft und Levels, alles selbst gebaut, in einer Projektwoche. Die Physik war am schwierigsten: In meiner ersten Version wurde die Spielfigur zusammengequetscht und konnte sich nicht bewegen, und der Sprung ist bis heute nicht ganz so, wie ich ihn mir vorgestellt habe.",
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
        challenge: "Eine komplette Webplattform mit Accounts, Datenbank-Relationen, Angeboten und einem Chat in etwa zehn Tagen. Am schwierigsten waren die richtigen Beziehungen zwischen den Datenbanktabellen und das Azure-Hosting, das an einem Tag lief und am nächsten nicht. Der Chat funktionierte nur etwa jedes zweite Mal.",
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
        team: "Serkan und Wolfgang",
        role: "App-Entwicklung (~70 %) und Design (~30 %), User Tests gemeinsam mit meinem Teamkollegen Wolfgang",
        challenge: "Ein Partyspiel gestalten, das jede Person sofort versteht, und das mit echten Nutzer:innen beweisen, nicht nur mit unserer Meinung. Dazu kam das Werkzeug: Android Studio stürzte ständig ab, und der Emulator zeigte andere Größen als ein echtes Handy, sodass das Layout immer wieder angepasst werden musste.",
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
  const cv = CV[lang] || CV.en;
  document.querySelectorAll(".js-cv").forEach((a) => { a.href = cv || "#"; a.hidden = !cv; });
  document.querySelectorAll(".js-cv-item").forEach((li) => { li.hidden = !cv; });
  document.getElementById("langToggle").setAttribute(
    "aria-label", lang === "en" ? "Auf Deutsch umschalten" : "Switch to English"
  );
  applyMode();
  renderThemes();
  renderProjects();
  renderSkills();
  renderTrophies();
  if (typeof renderPlay === "function") renderPlay();
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "en" ? "de" : "en";
  unlock("lang");
  try { localStorage.setItem("lang", lang); } catch (e) {}
  applyLang();
});

/* ============ Light / dark ============
   No choice yet = follow the system; the button then stores an explicit choice. */
const themeBtn = document.getElementById("themeToggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
function applyMode() {
  const explicit = document.documentElement.dataset.theme;
  const dark = explicit ? explicit === "dark" : systemDark.matches;
  document.documentElement.dataset.mode = dark ? "dark" : "light";
  const playLink = document.getElementById("playLink");
  playLink.setAttribute("aria-label", t("nav.play"));
  playLink.title = t("nav.play");
  themeBtn.setAttribute("aria-label", lang === "en"
    ? (dark ? "Switch to light mode" : "Switch to dark mode")
    : (dark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"));
}
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.mode === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  applyMode();
});
systemDark.addEventListener("change", applyMode);
applyMode();

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

/* ============ Signature next to the photo ============
   It writes itself when you hover the photo (mouse), tap it (touch) and once when the photo first scrolls into view. */
const portrait = document.querySelector(".hero__portrait");
/* The whole signature is one continuous motion with an ease-out (fast at the start, slowing down at the end).
   One progress value runs through all four strokes in order (S top, lower curve, long line, dot) by their real lengths. */
const SIGN_MS = 1200;
const sigPaths = [...portrait.querySelectorAll(".hero__sig path")];
const sigLens = sigPaths.map((p) => p.getTotalLength());
const sigTotal = sigLens.reduce((a, b) => a + b, 0);
let sigFrame = 0;
function setSigProgress(progress) { // 0..1 over the whole signature
  let start = 0;
  sigPaths.forEach((path, i) => {
    const f = Math.max(0, Math.min(1, (progress * sigTotal - start) / sigLens[i]));
    path.style.strokeDashoffset = f <= 0 ? "1.05" : String(1 - f); // 1.05 = fully unwritten, no stray round-cap dot
    start += sigLens[i];
  });
}
function signNow() {
  cancelAnimationFrame(sigFrame);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const t0 = performance.now();
  setSigProgress(0);
  const frame = (now) => {
    const t = Math.min(1, (now - t0) / SIGN_MS);
    setSigProgress(1 - Math.pow(1 - t, 3)); // ease-out (cubic)
    if (t < 1) sigFrame = requestAnimationFrame(frame);
    else sigPaths.forEach((p) => p.style.removeProperty("stroke-dashoffset")); // back to the resting, fully written look
  };
  sigFrame = requestAnimationFrame(frame);
}
portrait.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") signNow(); });
portrait.addEventListener("click", signNow);
if ("IntersectionObserver" in window) {
  const once = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { signNow(); once.disconnect(); }
  }, { threshold: 0.6 });
  once.observe(portrait);
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
  games: svg('<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle cx="15.5" cy="11.5" r=".6"/><circle cx="17.5" cy="13.5" r=".6"/>'), // gamepad
  jams: svg('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>'), // lightning – made fast
  work: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 13h18"/>') // briefcase
};
// The three research questions + games + game jams/hackathons as categories
const THEMES = [
  { id: "sight", text: "explore.a", match: (pr) => (pr.themes || []).includes("sight") },
  { id: "abilities", text: "explore.b", match: (pr) => (pr.themes || []).includes("abilities") },
  { id: "shared", text: "explore.c", match: (pr) => (pr.themes || []).includes("shared") },
  { id: "games", text: "games", match: (pr) => (pr.themes || []).includes("games") },
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
const FIRST_SHOWN = 3; // the home page shows the three strongest projects; the rest lives on the "All projects" view (#projects-all)
/* The "All projects" view is a second screen inside this page (link: crysker.github.io/#projects-all):
   it hides the other sections, lists everything with the topic filters, and the back link returns to the home page. */
let allView = location.hash === "#projects-all";

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const P = I18N[lang].p;
  const active = allView ? THEMES.find((th) => th.id === theme) : null;
  const rank = (id) => (ORDER.indexOf(id) + 1 || 99);
  const matching = visibleProjects()
    .filter((pr) => (allView || !pr.early) && (!active || active.match(pr))) // the old semester projects only appear on the full list
    .sort((a, b) => rank(a.id) - rank(b.id));
  const shown = allView ? matching : matching.slice(0, FIRST_SHOWN);
  document.body.classList.toggle("view-all", allView);
  document.getElementById("projectsTitle").textContent = t(allView ? "projects.titleAll" : "projects.title");
  const crumbs = document.getElementById("projectsCrumbs");
  crumbs.hidden = !allView;
  crumbs.innerHTML = `<ol><li><a href="#">${esc(t("crumb.home"))}</a></li><li aria-current="page">${esc(t("projects.titleAll"))}</li></ol>`;
  // topic filters belong to the full list; the home page stays calm
  document.getElementById("themes").hidden = !allView;
  const more = document.getElementById("moreProjects");
  more.hidden = allView;
  more.textContent = t("projects.all") + " →";
  grid.classList.toggle("is-filtered", !!active);
  // compact cards: the long description and tech tags live on the project page
  grid.innerHTML = shown.map((pr) => {
    const x = P[pr.id];
    return `
      <button type="button" class="p-card" data-id="${pr.id}"
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
          ${filled(x.role) ? `<p class="p-card__role"><b>${esc(t("ui").role)}:</b> ${esc(x.role)}</p>` : ""}
          <span class="p-card__more" aria-hidden="true">${esc(t("ui").open)} →</span>
        </div>
      </button>`;
  }).join("");
}

/* switching between the home page and the "All projects" view follows the address (#projects-all) */
function syncView() {
  const h = location.hash;
  const next = h === "#projects-all" ? true : (h.startsWith("#project-") ? allView : false); // a case study keeps the view behind it
  if (next === allView) return;
  allView = next;
  if (allView) theme = "all";
  renderThemes();
  renderProjects();
  if (allView) window.scrollTo({ top: 0, behavior: "auto" });
  else { // back on the home page: go to the section that was asked for (#projects, #experience, ...), otherwise to the top
    const target = h.length > 1 ? document.getElementById(h.slice(1)) : null;
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0, behavior: "auto" });
  }
}
addEventListener("hashchange", syncView);

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

/* ============ Project view: a full-screen case study page ============
   Every project has its own link, e.g. crysker.github.io/#project-historia (handy for cover letters),
   and the browser's back button closes the view like a normal page. */
const caseNext = document.getElementById("caseNext");
let pushedHistory = false;
let afterClose = null; // runs once the case study is closed (used by the "Home" crumb)

function openProject(id, { push = true } = {}) {
  const pr = PROJECTS.find((p) => p.id === id);
  const x = I18N[lang].p[id];
  const ui = t("ui");
  // "Next project" follows the grid order (ORDER), early semester projects come after
  const rankAll = (p) => (ORDER.includes(p.id) ? ORDER.indexOf(p.id) : 50 + PROJECTS.indexOf(p));
  const list = visibleProjects().sort((a, b) => rankAll(a) - rankAll(b));
  const at = list.findIndex((p) => p.id === id);
  const next = list.length > 1 ? list[(at + 1) % list.length] : null;
  const others = [1, 2].map((d) => list[(at + d) % list.length]).filter((p, i, a) => p.id !== id && a.indexOf(p) === i);
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
          <dl>${fact(ui.role, x.role)}${fact(ui.team, x.team || (pr.solo ? ui.solo : ""))}${fact(ui.when, x.semester)}${fact(ui.duration, x.duration)}</dl>
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
          ${pr.sketches ? `<section class="case__block"><h3>${esc(ui.sketches)}</h3>
            <div class="case__gallery">${pr.sketches.map((g) => `<img src="${g}" alt="${esc(ui.sketches)}: ${esc(x.title)}" loading="lazy">`).join("")}</div></section>` : ""}
          ${pr.gallery ? `<div class="case__gallery">${pr.gallery.map((g) => !g.video
            ? `<img src="${g}" alt="" loading="lazy">`
            : g.loop // short animation: plays by itself like a GIF
              ? `<video src="${g.video}" poster="${g.poster}" autoplay muted loop playsinline preload="metadata"></video>`
              : `<video src="${g.video}" poster="${g.poster}" controls muted loop playsinline preload="none"></video>`).join("")}</div>` : ""}
        </div>
      </div>
      ${others.length ? `<section class="case__more" aria-labelledby="moreTitle">
        <h3 id="moreTitle">${esc(ui.more)}</h3>
        <div class="case__morelist">${others.map((o) => `<button type="button" class="case__nextcard" data-id="${o.id}">
          ${pic(o)}
          <span><small>${esc(I18N[lang].p[o.id].kicker)}</small><b>${esc(I18N[lang].p[o.id].title)} →</b></span>
        </button>`).join("")}</div>
      </section>` : ""}
    </article>`;
  renderCaseCrumbs(x.title);
  caseNext.hidden = !next;
  if (next) {
    caseNext.dataset.id = next.id;
    caseNext.innerHTML = `<span class="case__next-label">${esc(ui.next)}</span> <span aria-hidden="true">→</span>`;
    caseNext.setAttribute("aria-label", `${ui.next}: ${I18N[lang].p[next.id].title}`);
  }
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
  document.querySelector("#caseCrumbs a")?.focus({ preventScroll: true });

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
  const cb = afterClose;
  afterClose = null;
  if (cb) cb();
}
function closeProject() {
  if (pushedHistory) return history.back(); // popstate below finishes the close
  finishClose();
  if (location.hash.startsWith("#project-")) history.replaceState(null, "", location.pathname + location.search);
}
document.getElementById("caseBack").addEventListener("click", closeProject);
function renderCaseCrumbs(title) { // Home > Projects (or All projects) > this project
  document.querySelector("#caseCrumbs ol").innerHTML = `
    <li><a href="#" data-go="home">${esc(t("crumb.home"))}</a></li>
    <li><a href="#" data-go="back">${esc(t(allView ? "projects.titleAll" : "projects.title"))}</a></li>
    <li aria-current="page">${esc(title)}</li>`;
}
document.getElementById("caseCrumbs").addEventListener("click", (e) => {
  const a = e.target.closest("a[data-go]");
  if (!a) return;
  e.preventDefault();
  if (a.dataset.go === "home") afterClose = () => { // back to the very top of the home page
    history.replaceState(null, "", location.pathname + location.search);
    syncView();
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  closeProject();
});
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
  syncView();
  const id = projectIdFromHash();
  if (id) openProject(id, { push: false });
  else if (modal.open) finishClose();
});

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
        <span class="sheet__avatar"><img src="assets/img/portrait.jpg?v=2" alt=""></span>
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
  // Perks, inventory and languages share one calm card; the perks fold away on phones (they are the long ones)
  const chipList = (g) => `<ul class="chips">${g.items.map(([label, logo]) => {
    const text = label.startsWith("@") ? K[label.slice(1)] : esc(label); // K values are trusted and may contain <small>
    return `<li class="${logo ? "" : "no-logo"}">${logo ? `<img src="${LOGOS[logo]}" alt="">` : ""}${text}</li>`;
  }).join("")}</ul>`;
  const groups = SKILLS.map((g) => g.id === "perks"
    ? `<details class="skill-group skill-group--fold" data-fold><summary><h3>${esc(G[g.id])} <small>${g.items.length}</small></h3></summary>${chipList(g)}</details>`
    : `<div class="skill-group"><h3>${esc(G[g.id])}</h3>${chipList(g)}</div>`).join("");
  document.getElementById("skills").innerHTML = sheet + `<div class="skill-more">${groups}</div>`;
  document.querySelector("[data-fold]").open = matchMedia("(min-width: 761px)").matches;
}


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
  if (allView) { // from the full list the logo always leads back to the home page
    history.pushState(null, "", location.pathname + location.search);
    syncView();
    document.querySelector(".nav__logo").focus({ preventScroll: true });
    return;
  }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  document.querySelector(".nav__logo").focus({ preventScroll: true }); // keep keyboard users at the top too
}));

/* ============ Highlight the menu item of the section in view ============ */
// Sections without their own menu item count towards the closest related one
const NAV_FOR = { projects: "projects", stack: "projects", experience: "experience", contact: "contact" };
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
const ACHIEVEMENTS = ["first", "video", "all", "lang", "bottom", "secret", "human", "guess", "bullseye", "wizard", "maestro", "conductor"];
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
document.getElementById("toast").addEventListener("click", openTrophies);
document.getElementById("trophiesClose").addEventListener("click", () => trophiesDialog.close());
trophiesDialog.addEventListener("click", (e) => { if (e.target === trophiesDialog) trophiesDialog.close(); });
document.getElementById("trophiesReset").addEventListener("click", () => {
  achieved = [];
  openedProjects.clear();
  try { localStorage.removeItem("achievements"); } catch (e) {}
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
  if (visibleProjects().filter((p) => !p.early).every((p) => openedProjects.has(p.id))) unlock("all");
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

applyLang();
updateToTop();
openProjectFromHash();
