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
    video: "JfwlEoEAzEo", // Gameplay Trailer (the making-of is in About)
    tags: ["Unity", "C#", "Meta XR SDK", "Hand Tracking", "Shared Spatial Anchors", "Meta Avatars"],
    links: [
      { key: "devpost", url: "https://devpost.com/software/hisotria-virtualis" },
      { key: "award", url: "https://eudres.eu/news/the-winners-of-the-12th-edition-of-the-interactive-digital-media-student-contest-2026" },
      { key: "vernissage", url: "https://projektevernissage.ustp.at/B/projekteinsicht/?id=1922" }
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
    themes: ["sight"],
    img: IMG + "grim.png",
    video: "7VHN2e4oFDc",
    tags: ["Unity", "Meta Quest 3", "Olfactory Display", "Game Jam"],
    links: [{ key: "ggj", url: "https://globalgamejam.org/games/2026/grim-hollow-7" }]
  },
  {
    id: "paper",
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
    tags: ["Unity", "C#", "VR", "A* Pathfinding", "3D Modelling", "Animation"],
    links: []
  },
  {
    id: "deepspace", // hidden until its summary is written
    img: IMG + "deepspace.jpg",
    video: "i_oERAmOcPI",
    tags: ["Unity", "VR", "Game Jam"],
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
const SKILLS = [
  { id: "design", items: [["@webui"], ["@ds"], ["@proto"], ["@research"], ["@a11y"]] },
  { id: "xr", items: [["VR / MR"], ["Hand Tracking"], ["Meta Quest & Meta XR SDK", "meta"], ["Shared Spatial Anchors"], ["Netcode for GameObjects"], ["@3d"]] },
  { id: "code", items: [["C#", "csharp"], ["JavaScript", "javascript"], ["HTML", "html5"], ["CSS", "css3"], ["Java", "java"]] },
  { id: "tools", items: [["Figma", "figma"], ["Unity", "unity"], ["Blender", "blender"], ["Framer", "framer"], ["Miro", "miro"], ["Git", "git"], ["Jira", "jira"], ["Slack", "slack"], ["Photoshop", "photoshop"], ["Illustrator", "illustrator"], ["MS Teams"], ["MS Office"]] },
  { id: "lang", wide: true, items: [["@tr"], ["@de"], ["@en"], ["@fr"]] }
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
    "hero.sticker": "🏆 2× 1st place",
    "hero.lead": "I design and build interactive experiences — on screens, in space, and for all the senses.",
    "hero.cta1": "See my work", "hero.cta2": "Let's talk",
    "hero.scroll": "scroll down and get to know me",
    "about.title": "About me",
    "about.p1": "I'm a Creative Technologist from St. Pölten, Austria, currently finishing my master's degree in Interactive Technologies (AR/VR). My lectures are done: I hand in my master's thesis in January 2027 and graduate as Dipl.-Ing. in February 2027.",
    "about.p2": "I spent two years as a UX/UI designer at EBCONT working on 15 projects — from public administration to enterprise software — and I've been building with Unity for six years.",
    "about.p3": "What drives me: understanding why people do what they do, and designing experiences that work for everyone.",
    "about.f1": "years of Unity", "about.f2": "client projects", "about.f3": "1st place awards",
    "about.video": "Making-of: Historia Virtualis",
    "explore.title": "What I explore",
    "explore.intro": "The questions that connect my projects.",
    "explore.a.t": "Beyond sight",
    "explore.a.p": "How can we experience space through sound, smell and touch? Multisensory XR that doesn't rely on the eyes alone.",
    "explore.b.t": "Designing for diverse abilities",
    "explore.b.p": "Accessibility isn't a checklist, it's a mindset — from accessibility audits in enterprise software to XR for different bodies and senses.",
    "explore.b.r": "EBCONT · Sounds of Shadow · BSc thesis",
    "explore.c.t": "Shared & physical realities",
    "explore.c.p": "Co-located multiplayer and mixed reality that connects digital content with real objects and real people in the same room.",
    "projects.title": "Projects",
    "projects.intro": "Three questions connect my work – pick one, or click a project for the full story.",
    themes: { all: "All", sight: "Beyond sight", abilities: "Diverse abilities", shared: "Shared realities" },
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
    "exp.ebcont.t": "UX/UI Designer · EBCONT",
    "exp.ebcont.p": "15 projects across public administration, publishing, industrial tech and enterprise software. Design systems, high-fidelity prototypes in Figma, UX research, user testing and accessibility analyses. Design lead on selected projects in teams of 4–10 developers.",
    "exp.intern.t": "UX/UI Designer Internship · EBCONT",
    "exp.intern.p": "Prototyping, interaction flows and design system work in interdisciplinary product teams.",
    "exp.msc.t": "Master Interactive Technologies – AR & VR (Dipl.-Ing.) · USTP",
    "exp.msc.p": "AR/VR, prototyping, empirical research methods, AI, computer vision.",
    "exp.bsc.t": "BSc Creative Computing · USTP",
    "exp.bsc.p": "Programming, UX/UI, web & mobile, game development and XR.",
    "stack.title": "Stack & skills",
    "stack.intro": "Hover over or tap a card to flip it.",
    "stack.hint": "Hover or tap",
    "nav.menu": "Menu",
    skillGroups: { design: "Design & UX", xr: "XR", code: "Code", tools: "Tools", lang: "Languages" },
    skill: {
      webui: "Web & UI Design", ds: "Design Systems", proto: "Prototyping & Wireframing (low → high fidelity)",
      research: "UX Research & User Testing", a11y: "Accessibility", "3d": "3D Modelling & 3D Printing",
      tr: "Turkish <small>native</small>", de: "German <small>native</small>", en: "English <small>C1</small>", fr: "French <small>B2</small>"
    },
    stack: {
      figma: ["Figma", "My daily driver for design systems, prototypes and handoff. I once pushed its variables feature so far that Figma support confirmed I'd found a bug."],
      unity: ["Unity", "Six years — from my first games in high school to co-located VR multiplayer with hand tracking and spatial anchors."],
      csharp: ["C#", "My main language: gameplay systems, interaction logic and networked multiplayer with Netcode for GameObjects."],
      metaxr: ["Meta XR SDK", "Hand tracking, passthrough, Shared Spatial Anchors and Meta Avatars on Quest 3."],
      blender: ["Blender", "3D modelling, UV mapping and simple animations — plus prep for 3D printing."],
      research: ["UX Research", "User testing, feature evaluation and accessibility audits, turned into concrete design decisions."]
    },
    "contact.title": "Let's build something<br><em>people remember.</em>",
    "contact.book": "Book a 30-min call",
    "contact.copy": "Copy", "contact.copied": "Email address copied",
    toTop: "Back to top", "case.back": "All projects",
    "captcha.check": "I'm not a robot", "captcha.kicker": "Security check",
    "captcha.title": "Put every shape into its slot", "captcha.hint": "Drag them – or tap a shape, then its slot.",
    "captcha.memeBottom": "Now hire a human",
    "captcha.hire": "Okay, let's talk →", "captcha.close": "Close", "captcha.done": "Verified. Preparing your reward…",
    "captcha.wrong": ["Hmm… suspiciously robotic.", "Beep boop? Try again.", "That's not where that goes, human.", "Are you a toaster?"],
    "captcha.picked": "Picked up – now choose its slot.", "captcha.slot": "Slot for the {s}", "captcha.won": "Verification complete ✓",
    shapeNames: { sphere: "sphere", cube: "cube", ring: "ring", tri: "triangle", pill: "pill" },
    "footer.fun": "No game engine was harmed in the making of this site.",
    ach: {
      unlocked: "Achievement unlocked", count: "{n}/{total} achievements found", hint: "Can you find them all?",
      title: "Achievements", locked: "???", reset: "Reset progress", close: "Close", open: "Show achievements",
      done: "All found – you're officially thorough. 🎉",
      hints: {
        first: "Curiosity pays off – open something.", video: "Some things are better in motion.",
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
      challenge: "Challenge", approach: "What we built", result: "Result", learned: "What I learned",
      open: "View project", close: "Close", next: "Next project", watch: "Watch video", video: "Video", tools: "Tools & tech",
      devpost: "Devpost", ggj: "Global Game Jam page", itch: "Play on itch.io",
      award: "Contest winners", vernissage: "USTP Projektvernissage"
    },
    p: {
      historia: {
        title: "Historia Virtualis",
        kicker: "Co-located multiplayer VR",
        highlight: "1st place at two competitions · shown at the European Researchers' Night",
        badge: "🏆 1st place ×2",
        summary: "Three players, one room, Roman St. Pölten: bake a festive bread in a 1st-century bakery — and only succeed together.",
        duration: "6 months",
        role: "Development, 3D modelling and testing – a bit of everything",
        challenge: "Make three people in the same physical room feel like they share one virtual world, and design puzzles that genuinely require collaboration.",
        approach: "Every player gets one tool — an axe, a peel or flint and steel — so nobody can solve the room alone. Hand tracking replaces controllers, Shared Spatial Anchors align everyone's world, and Meta Avatars give each player a body.",
        result: ["1st place — 12th Interactive Digital Media Student Contest 2026", "1st place — USTP Projektvernissage 2025", "Shown at the European Researchers' Night", "Coming up: Lange Nacht der Forschung"],
        learned: "Tracking struggles with reflective surfaces — we learned to design the physical test space as carefully as the virtual one."
      },
      sounds: {
        title: "Sounds of Shadow",
        kicker: "University project · VR",
        highlight: "Playable VR prototype built around an accessibility question",
        summary: "Navigate total darkness using echolocation. A sonar pulse reveals the room — find three hidden keys without ever seeing clearly.",
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
        summary: "Collect mushrooms in a dangerous forest — and actually smell it. Built for Meta Quest 3 with an olfactory device that releases real scents.",
        duration: "Game jam",
        role: "UI, development and 3D modelling",
        challenge: "Add a whole new sense to VR within the time limit of a game jam.",
        approach: "The game triggers scents from an olfactory device in sync with what happens in the forest, turning smell into part of the gameplay.",
        result: "Submitted to the Global Game Jam 2026.",
        learned: "Smell is powerful — and very easy to overdo. Timing matters as much as the scent itself."
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
        result: "A working prototype after 48 hours — with plans to support more origami designs.",
        learned: "Telling nearly identical fold stages apart is the real challenge — data quality beats model size."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelor project",
        highlight: "Published and playable on itch.io",
        summary: "A turn-based deckbuilder inspired by Hollow Knight and Slay the Spire: build your deck, defeat bosses and free the characters who carry the story.",
        duration: "5 months",
        role: "Design, testing and some development",
        challenge: "Create a card game with enough variety to stay fresh across every battle.",
        approach: "Damage, defence and magic cards, shuffled decks for every fight, rewards after victories and chapter bosses that unlock story NPCs.",
        result: "A playable game published on itch.io.",
        learned: "Balancing is design work — every number is a decision about how the player should feel."
      },
      ocean: {
        title: "#SaveTheOcean",
        kicker: "VR game · Creative Code Lab 4",
        highlight: "A* pathfinding sends the trash downriver – until a sea monster appears",
        summary: "Goblin villagers keep throwing trash into the river. Collect it in VR before it reaches the ocean – let too much through and a sea monster rises that you have to fight.",
        duration: "2 weeks",
        role: "3D modelling and animation of the goblins and their houses, Unity setup, world design, UI and UI logic",
        challenge: "Turn river pollution into a game loop where small careless acts pile up into a threat you can't ignore.",
        approach: "The trash finds its way along the river into the ocean using A* pathfinding. The more of it gets through, the closer the sea monster gets to spawning – so collecting turns into a race before it becomes a boss fight.",
        result: "A playable VR game, built in two weeks as team LSW-Studios.",
        learned: "[One takeaway.]"
      },
      deepspace: {
        title: "Deep Space Cleaner Corp",
        kicker: "XR Game Jam 2025 · VR",
        highlight: "[One-line result]",
        summary: "[One or two sentences about the game.]",
        duration: "Game jam",
        role: "[Your role]",
        challenge: "[Idea / theme]",
        approach: "[What you built]",
        result: "[What came out of it]",
        learned: "[One takeaway]"
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
    "hero.sticker": "🏆 2× 1. Platz",
    "hero.lead": "Ich gestalte und entwickle interaktive Erlebnisse – auf Bildschirmen, im Raum und für alle Sinne.",
    "hero.cta1": "Meine Arbeiten", "hero.cta2": "Lass uns reden",
    "hero.scroll": "scroll runter und lern mich kennen",
    "about.title": "Über mich",
    "about.p1": "Ich bin Creative Technologist aus St. Pölten und schließe gerade meinen Master in Interactive Technologies (AR/VR) ab. Die Lehrveranstaltungen sind erledigt: Im Jänner 2027 gebe ich meine Masterarbeit ab, im Februar 2027 schließe ich als Dipl.-Ing. ab.",
    "about.p2": "Zwei Jahre lang habe ich als UX/UI-Designer bei EBCONT an 15 Projekten gearbeitet – von öffentlicher Verwaltung bis Enterprise Software – und entwickle seit sechs Jahren mit Unity.",
    "about.p3": "Was mich antreibt: verstehen, warum Menschen tun, was sie tun – und Erlebnisse gestalten, die für alle funktionieren.",
    "about.f1": "Jahre Unity", "about.f2": "Kundenprojekte", "about.f3": "1. Plätze",
    "about.video": "Making-of: Historia Virtualis",
    "explore.title": "Was mich beschäftigt",
    "explore.intro": "Die Fragen, die meine Projekte verbinden.",
    "explore.a.t": "Mehr als Sehen",
    "explore.a.p": "Wie lässt sich Raum über Klang, Geruch und Berührung erleben? Multisensorische XR, die sich nicht nur auf die Augen verlässt.",
    "explore.b.t": "Gestalten für diverse Fähigkeiten",
    "explore.b.p": "Barrierefreiheit ist keine Checkliste, sondern eine Haltung – von Accessibility-Analysen in Enterprise Software bis zu XR für unterschiedliche Körper und Sinne.",
    "explore.b.r": "EBCONT · Sounds of Shadow · Bachelorarbeit",
    "explore.c.t": "Geteilte & physische Realitäten",
    "explore.c.p": "Co-located Multiplayer und Mixed Reality, die digitale Inhalte mit echten Objekten und echten Menschen im selben Raum verbinden.",
    "projects.title": "Projekte",
    "projects.intro": "Drei Fragen verbinden meine Arbeit – wähl eine aus oder klick auf ein Projekt für die ganze Geschichte.",
    themes: { all: "Alle", sight: "Mehr als Sehen", abilities: "Diverse Fähigkeiten", shared: "Geteilte Realitäten" },
    "thesis.title": "Bachelorarbeit",
    "thesis.kicker": "BSc Creative Computing · USTP · 2024",
    "thesis.name": "Überlebenstechniken in der Natur spielerisch in VR lernen",
    "thesis.q.t": "Frage", "thesis.b.t": "Gebaut", "thesis.s.t": "Studie", "thesis.f.t": "Ergebnis",
    "thesis.q": "Wie kann gamifizierte VR grundlegende Survival-Skills vermitteln und Lernende dabei motiviert und sicher halten?",
    "thesis.b": "Ein VR-Wald in Unity für Meta Quest mit Stationen zu Unterschlupfbau, Feuermachen, Wasseraufbereitung, Tierspuren sowie essbaren und giftigen Pflanzen. Spatial Audio mit Wwise.",
    "thesis.s": "Teilnehmende zwischen 9 und 70 Jahren, aufgeteilt in eine VR-Gruppe und eine Gruppe mit gedrucktem Leitfaden. Pre-/Post-Tests, Fragebögen, Interviews und Beobachtung.",
    "thesis.f": "Beide Gruppen haben gelernt. VR wurde als „sehr lustig“ und „interaktiv“ beschrieben und funktionierte gut für räumliches, situatives Wissen wie Tierspuren und Begegnungen mit Wildtieren – der Leitfaden war besser bei feinen visuellen Details wie dem Unterscheiden von Beeren. Erkenntnis: In VR müssen die entscheidenden Details bewusst hervorgehoben werden.",
    "thesis.cta": "Arbeit lesen (PDF)",
    "exp.title": "Werdegang & Ausbildung",
    "exp.coach.t": "Game Development Workshop Coach · USTP Young Campus",
    "exp.coach.p": "Praxisnahe Unity- und C#-Workshops für Jugendliche.",
    "exp.ebcont.t": "UX/UI Designer · EBCONT",
    "exp.ebcont.p": "15 Projekte in öffentlicher Verwaltung, Verlagswesen, Industrie und Enterprise Software. Design-Systeme, High-Fidelity-Prototypen in Figma, UX Research, User Testing und Accessibility-Analysen. Designverantwortung für ausgewählte Projekte in Teams mit 4–10 Entwickler:innen.",
    "exp.intern.t": "UX/UI Designer Praktikum · EBCONT",
    "exp.intern.p": "Prototyping, Interaktionsabläufe und Design-Systeme in interdisziplinären Produktteams.",
    "exp.msc.t": "Master Interactive Technologies – AR & VR (Dipl.-Ing.) · USTP",
    "exp.msc.p": "AR/VR, Prototyping, empirische Forschungsmethoden, KI, Computer Vision.",
    "exp.bsc.t": "BSc Creative Computing · USTP",
    "exp.bsc.p": "Programmierung, UX/UI, Web & Mobile, Game Development und XR.",
    "stack.title": "Stack & Skills",
    "stack.intro": "Fahr mit der Maus über eine Karte oder tipp darauf, um sie umzudrehen.",
    "stack.hint": "Hovern oder tippen",
    "nav.menu": "Menü",
    skillGroups: { design: "Design & UX", xr: "XR", code: "Code", tools: "Tools", lang: "Sprachen" },
    skill: {
      webui: "Web & UI Design", ds: "Design-Systeme", proto: "Prototyping & Wireframing (Low → High Fidelity)",
      research: "UX Research & User Testing", a11y: "Barrierefreiheit", "3d": "3D-Modellierung & 3D-Druck",
      tr: "Türkisch <small>Muttersprache</small>", de: "Deutsch <small>Muttersprache</small>", en: "Englisch <small>C1</small>", fr: "Französisch <small>B2</small>"
    },
    stack: {
      figma: ["Figma", "Mein tägliches Werkzeug für Design-Systeme, Prototypen und Übergaben. Mit dem Variables-Feature habe ich Figma einmal so ausgereizt, dass der Support einen Bug bestätigt hat."],
      unity: ["Unity", "Sechs Jahre – von meinen ersten Spielen in der Schule bis zu Co-located-VR-Multiplayer mit Hand Tracking und Spatial Anchors."],
      csharp: ["C#", "Meine Hauptsprache: Gameplay-Systeme, Interaktionslogik und Netzwerk-Multiplayer mit Netcode for GameObjects."],
      metaxr: ["Meta XR SDK", "Hand Tracking, Passthrough, Shared Spatial Anchors und Meta Avatars auf der Quest 3."],
      blender: ["Blender", "3D-Modellierung, UV-Mapping und einfache Animationen – plus Vorbereitung für den 3D-Druck."],
      research: ["UX Research", "User Testing, Feature-Evaluierung und Accessibility-Analysen, übersetzt in konkrete Designentscheidungen."]
    },
    "contact.title": "Lass uns etwas bauen,<br><em>das in Erinnerung bleibt.</em>",
    "contact.book": "30-Min-Call buchen",
    "contact.copy": "Kopieren", "contact.copied": "E-Mail-Adresse kopiert",
    toTop: "Nach oben", "case.back": "Alle Projekte",
    "captcha.check": "Ich bin kein Roboter", "captcha.kicker": "Sicherheitsprüfung",
    "captcha.title": "Bring jede Form an ihren Platz", "captcha.hint": "Ziehen – oder Form antippen, dann ihren Platz.",
    "captcha.memeBottom": "Jetzt stell einen Menschen ein",
    "captcha.hire": "Okay, lass uns reden →", "captcha.close": "Schließen", "captcha.done": "Verifiziert. Belohnung wird geladen…",
    "captcha.wrong": ["Hmm… verdächtig robotisch.", "Beep boop? Nochmal.", "Da gehört das nicht hin, Mensch.", "Bist du ein Toaster?"],
    "captcha.picked": "Aufgehoben – jetzt den Platz wählen.", "captcha.slot": "Platz für: {s}", "captcha.won": "Verifizierung abgeschlossen ✓",
    shapeNames: { sphere: "Kugel", cube: "Würfel", ring: "Ring", tri: "Dreieck", pill: "Pille" },
    "footer.fun": "Bei der Erstellung dieser Seite wurde keine Game Engine verletzt.",
    ach: {
      unlocked: "Erfolg freigeschaltet", count: "{n}/{total} Erfolge gefunden", hint: "Findest du alle?",
      title: "Erfolge", locked: "???", reset: "Fortschritt zurücksetzen", close: "Schließen", open: "Erfolge anzeigen",
      done: "Alle gefunden – du bist offiziell gründlich. 🎉",
      hints: {
        first: "Neugier zahlt sich aus – öffne etwas.", video: "Manches wirkt in Bewegung besser.",
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
      challenge: "Herausforderung", approach: "Was wir gebaut haben", result: "Ergebnis", learned: "Was ich gelernt habe",
      open: "Projekt ansehen", close: "Schließen", next: "Nächstes Projekt", watch: "Video ansehen", video: "Video", tools: "Tools & Technik",
      devpost: "Devpost", ggj: "Global-Game-Jam-Seite", itch: "Auf itch.io spielen",
      award: "Gewinner:innen des Wettbewerbs", vernissage: "USTP Projektvernissage"
    },
    p: {
      historia: {
        title: "Historia Virtualis",
        kicker: "Co-located Multiplayer-VR",
        highlight: "1. Platz bei zwei Wettbewerben · gezeigt bei der European Researchers' Night",
        badge: "🏆 2× 1. Platz",
        summary: "Drei Spieler:innen, ein Raum, das römische St. Pölten: Backt in einer Bäckerei aus dem 1. Jahrhundert ein Festbrot – und schafft es nur gemeinsam.",
        duration: "6 Monate",
        role: "Entwicklung, 3D-Modellierung und Testing – ein bisschen von allem",
        challenge: "Drei Menschen im selben physischen Raum sollen das Gefühl haben, eine gemeinsame virtuelle Welt zu teilen – mit Rätseln, die echte Zusammenarbeit erfordern.",
        approach: "Jede Person bekommt ein Werkzeug – Axt, Brotschieber oder Feuerstein – niemand kann den Raum allein lösen. Hand Tracking ersetzt Controller, Shared Spatial Anchors richten die Welten aneinander aus, Meta Avatars geben allen einen Körper.",
        result: ["1. Platz – 12th Interactive Digital Media Student Contest 2026", "1. Platz – Projektvernissage der USTP 2025", "Präsentiert bei der European Researchers' Night", "Demnächst: Lange Nacht der Forschung"],
        learned: "Tracking hat Probleme mit spiegelnden Oberflächen – wir haben gelernt, den physischen Testraum genauso sorgfältig zu gestalten wie den virtuellen."
      },
      sounds: {
        title: "Sounds of Shadow",
        kicker: "Uniprojekt · VR",
        highlight: "Spielbarer VR-Prototyp rund um eine Accessibility-Frage",
        summary: "Orientiere dich in völliger Dunkelheit per Echoortung. Ein Sonar-Impuls macht den Raum sichtbar – finde drei versteckte Schlüssel.",
        duration: "Semesterprojekt",
        role: "Zentrale VR-Mechaniken, Level Design und Rätsel",
        challenge: "Wie erlebt man Raum ohne Sehen? Das Spiel lässt Spieler:innen eine stockdunkle Umgebung so erkunden, wie Menschen mit Sehbehinderung sich auf Klang verlassen.",
        approach: "Ein Sonar am Controller schießt 3–5 Strahlen, die von Objekten reflektiert werden und die Umgebung kurz sichtbar machen – kombiniert mit immersivem Spatial Audio.",
        result: "Ein spielbarer VR-Prototyp, entstanden mit Jakob Mayr im Rahmen einer Lehrveranstaltung.",
        learned: "Wer für einen fehlenden Sinn gestaltet, muss alle anderen neu denken."
      },
      grim: {
        title: "Grim Hollow",
        kicker: "Global Game Jam 2026 · VR + Geruch",
        highlight: "Echte Gerüche, synchron zum Gameplay auf der Quest 3",
        summary: "Sammle Pilze in einem gefährlichen Wald – und rieche ihn wirklich. Für Meta Quest 3 mit einem Duftgerät, das echte Gerüche abgibt.",
        duration: "Game Jam",
        role: "UI, Entwicklung und 3D-Modellierung",
        challenge: "In der kurzen Zeit eines Game Jams einen ganz neuen Sinn in VR einbinden.",
        approach: "Das Spiel löst passend zum Geschehen im Wald Gerüche über ein Duftgerät aus – Geruch wird Teil des Gameplays.",
        result: "Eingereicht beim Global Game Jam 2026.",
        learned: "Geruch ist mächtig – und schnell zu viel. Timing ist genauso wichtig wie der Duft selbst."
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
        result: "Ein funktionierender Prototyp nach 48 Stunden – mit Plänen für weitere Origami-Modelle.",
        learned: "Fast identische Faltschritte zu unterscheiden ist die eigentliche Herausforderung – Datenqualität schlägt Modellgröße."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelorprojekt",
        highlight: "Veröffentlicht und spielbar auf itch.io",
        summary: "Ein rundenbasierter Deckbuilder, inspiriert von Hollow Knight und Slay the Spire: Deck aufbauen, Bosse besiegen und die Figuren befreien, die die Geschichte erzählen.",
        duration: "5 Monate",
        role: "Design, Testing und etwas Entwicklung",
        challenge: "Ein Kartenspiel mit genug Abwechslung, damit jeder Kampf frisch bleibt.",
        approach: "Schadens-, Verteidigungs- und Magiekarten, neu gemischte Decks in jedem Kampf, Belohnungen nach Siegen und Kapitel-Bosse, die Story-NPCs freischalten.",
        result: "Ein spielbares Spiel, veröffentlicht auf itch.io.",
        learned: "Balancing ist Designarbeit – jede Zahl entscheidet, wie sich Spielende fühlen."
      },
      ocean: {
        title: "#SaveTheOcean",
        kicker: "VR-Spiel · Creative Code Lab 4",
        highlight: "A*-Pathfinding treibt den Müll flussabwärts – bis ein Seemonster auftaucht",
        summary: "Goblin-Dorfbewohner werfen ständig Müll in den Fluss. Sammle ihn in VR ein, bevor er das Meer erreicht – kommt zu viel durch, taucht ein Seemonster auf, gegen das du kämpfen musst.",
        duration: "2 Wochen",
        role: "3D-Modellierung und Animation der Goblins und ihrer Häuser, Unity-Setup, World Design, UI und UI-Logik",
        challenge: "Flussverschmutzung als Spielschleife: Kleine achtlose Handlungen summieren sich zu einer Bedrohung, die man nicht mehr ignorieren kann.",
        approach: "Der Müll findet per A*-Pathfinding seinen Weg den Fluss hinunter ins Meer. Je mehr durchkommt, desto näher rückt das Seemonster – aus dem Sammeln wird ein Wettlauf, bevor es zum Bosskampf kommt.",
        result: "Ein spielbares VR-Spiel, in zwei Wochen als Team LSW-Studios entwickelt.",
        learned: "[Eine Erkenntnis.]"
      },
      deepspace: {
        title: "Deep Space Cleaner Corp",
        kicker: "XR Game Jam 2025 · VR",
        highlight: "[Ergebnis in einem Satz]",
        summary: "[Ein, zwei Sätze zum Spiel.]",
        duration: "Game Jam",
        role: "[Deine Rolle]",
        challenge: "[Idee / Thema]",
        approach: "[Was ihr gebaut habt]",
        result: "[Was daraus wurde]",
        learned: "[Eine Erkenntnis]"
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

/* Theme filter – the three research questions, shown right above the projects */
// Drawn icons (stroke = currentColor) – font symbols looked different in every font
const svg = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  all: svg('<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'),
  sight: svg('<path d="M3 10v4M7.5 6.5v11M12 3.5v17M16.5 7.5v9M21 10.5v3"/>'), // sound waves
  abilities: svg('<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.6 7-1.6M12 10.1v5M12 15.1l-3.5 5.9M12 15.1l3.5 5.9"/>'), // accessibility
  shared: svg('<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>') // overlapping realities
};
const THEMES = [
  { id: "sight", text: "explore.a" },
  { id: "abilities", text: "explore.b" },
  { id: "shared", text: "explore.c" }
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

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const P = I18N[lang].p;
  const shown = visibleProjects().filter((pr) => theme === "all" || (pr.themes || []).includes(theme));
  grid.classList.toggle("is-filtered", theme !== "all"); // filtered: equal cards, no featured layout
  grid.innerHTML = shown.map((pr) => {
    const x = P[pr.id];
    return `
      <button type="button" class="p-card${pr.featured ? " p-card--featured" : ""}" data-id="${pr.id}"
              aria-label="${esc(t("ui").open)}: ${esc(x.title)}">
        <div class="p-card__media">
          <img src="${pr.img}" alt="" loading="lazy">
          ${x.badge ? `<span class="p-card__badge">${esc(x.badge)}</span>` : ""}
          ${pr.video ? `<span class="p-card__video">▶ ${esc(t("ui").video)}</span>` : ""}
        </div>
        <div class="p-card__body">
          <p class="p-card__kicker">${esc(x.kicker)}</p>
          <h3 class="p-card__title">${esc(x.title)}</h3>
          ${filled(x.highlight) ? `<p class="p-card__highlight">${esc(x.highlight)}</p>` : ""}
          <p class="p-card__summary">${esc(x.summary)}</p>
          ${filled(x.role) ? `<p class="p-card__role"><b>${esc(t("ui").role)}:</b> ${esc(x.role)}</p>` : ""}
          <ul class="tags">${pr.tags.map((tg) => `<li>${esc(tg)}</li>`).join("")}</ul>
          <span class="p-card__more" aria-hidden="true">${esc(t("ui").open)} →</span>
        </div>
      </button>`;
  }).join("");
}

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
  const list = visibleProjects();
  const next = list.length > 1 ? list[(list.findIndex((p) => p.id === id) + 1) % list.length] : null;
  // Video loads only on click: faster, and no YouTube request for people who don't watch
  const media = pr.video
    ? `<button type="button" class="video__play case__video" data-yt="${pr.video}" data-title="${esc(x.title)}"
         aria-label="${esc(ui.watch)}: ${esc(x.title)}">
         <img src="${pr.img}" alt="">
         <span class="video__btn" aria-hidden="true">▶</span>
         <span class="video__label">${esc(ui.watch)}</span>
       </button>`
    : `<img src="${pr.img}" alt="">`;
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
          <dl>${fact(ui.role, x.role)}${fact(ui.duration, x.duration)}</dl>
          <h3>${esc(ui.tools)}</h3>
          <ul class="tags">${pr.tags.map((tg) => `<li>${esc(tg)}</li>`).join("")}</ul>
          ${pr.links.length ? `<div class="case__links">${pr.links.map((l) =>
            `<a class="btn" href="${l.url}" target="_blank" rel="noopener">${esc(ui[l.key])} ↗</a>`).join("")}</div>` : ""}
        </aside>
        <div class="case__story">
          ${block(ui.challenge, x.challenge)}
          ${block(ui.approach, x.approach)}
          ${block(ui.result, x.result)}
          ${block(ui.learned, x.learned)}
        </div>
      </div>
      ${next ? `<button type="button" class="case__nextcard" data-id="${next.id}">
        <img src="${next.img}" alt="">
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

/* ============ Hover preview: muted video plays inside the card (mouse only) ============ */
const canHover = matchMedia("(hover: hover) and (pointer: fine)");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
let previewTimer;
// Open the connection to YouTube as soon as the mouse is near the projects, so previews start faster
let warmedUp = false;
document.getElementById("projects").addEventListener("pointerenter", () => {
  if (warmedUp || !canHover.matches) return;
  warmedUp = true;
  ["https://www.youtube-nocookie.com", "https://i.ytimg.com", "https://www.google.com"].forEach((href) => {
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
  if (!pr?.video) return;
  // short delay so just moving the mouse across the page doesn't start videos
  previewTimer = setTimeout(() => {
    const v = pr.video;
    const frame = document.createElement("iframe");
    frame.className = "p-card__preview";
    frame.src = `https://www.youtube-nocookie.com/embed/${v}?autoplay=1&mute=1&controls=0&loop=1&playlist=${v}&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&modestbranding=1`;
    frame.title = "";
    frame.tabIndex = -1;
    frame.setAttribute("aria-hidden", "true");
    frame.allow = "autoplay; encrypted-media";
    // brief wait after load hides YouTube's black start frame
    frame.addEventListener("load", () => setTimeout(() => card.classList.add("is-previewing"), 300));
    card.querySelector(".p-card__media").appendChild(frame);
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
  const G = t("skillGroups"), K = t("skill");
  document.getElementById("skills").innerHTML = SKILLS.map((g) => `
    <div class="skill-group">
      <h3>${esc(G[g.id])}</h3>
      <ul class="chips">${g.items.map(([label, logo]) => {
        const text = label.startsWith("@") ? K[label.slice(1)] : esc(label); // K values are trusted and may contain <small>
        return `<li class="${logo ? "" : "no-logo"}">${logo ? `<img src="${LOGOS[logo]}" alt="">` : ""}${text}</li>`;
      }).join("")}</ul>
    </div>`).join("");
}

document.getElementById("stackGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".flip");
  if (card) card.setAttribute("aria-pressed", card.getAttribute("aria-pressed") === "true" ? "false" : "true");
});

/* ============ YouTube click-to-load (privacy friendly) ============ */
document.querySelectorAll(".video").forEach((v) => {
  v.querySelector(".video__play").addEventListener("click", () => {
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.yt}?autoplay=1" title="Historia Virtualis making-of" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    unlock("video");
  });
});

/* ============ Reveal on scroll ============ */
const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
}, { threshold: 0.12 }) : null;
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
  scrollTick = false;
}
addEventListener("scroll", () => { if (!scrollTick) { scrollTick = true; requestAnimationFrame(updateToTop); } }, { passive: true });
addEventListener("resize", updateToTop);
toTop.addEventListener("click", (e) => {
  e.preventDefault();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  document.querySelector(".nav__logo").focus({ preventScroll: true }); // keep keyboard users at the top too
});

/* ============ Highlight the menu item of the section in view ============ */
// Sections without their own menu item count towards the closest related one
const NAV_FOR = { projects: "projects", thesis: "projects", about: "about", experience: "experience", stack: "experience", contact: "contact" };
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
let picked = null, placedCount = 0, wrongCount = 0;

const say = (text) => { gameMsg.textContent = text; };
const shapeName = (s) => t("shapeNames")[s];

function startGame() {
  placedCount = 0; wrongCount = 0; picked = null; say("");
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
  if (!game.open) game.showModal();
}

function pick(btn) {
  gameTray.querySelectorAll(".piece-btn").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  picked = btn;
  say(t("captcha.picked"));
}

function tryPlace(btn, slot) {
  btn.style.transform = "";
  if (!slot || slot.classList.contains("is-filled")) return;
  if (btn.dataset.shape !== slot.dataset.shape) {
    const lines = t("captcha.wrong");
    say(lines[wrongCount++ % lines.length]);
    btn.classList.remove("is-wrong"); void btn.offsetWidth; btn.classList.add("is-wrong"); // restart shake
    return;
  }
  slot.classList.add("is-filled");
  slot.innerHTML = btn.innerHTML;
  btn.remove();
  picked = null;
  say("");
  if (++placedCount === SHAPES.length) {
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
}

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
  if (slot && picked) tryPlace(picked, slot);
});

if (achieved.includes("human")) captchaBtn.classList.add("is-verified"); // solved on an earlier visit
captchaBtn.addEventListener("click", startGame);
document.querySelectorAll(".hero .shape").forEach((s) => s.addEventListener("click", startGame)); // the shapes themselves
document.getElementById("gameClose").addEventListener("click", () => game.close());
document.getElementById("gameHire").addEventListener("click", () => game.close()); // link then scrolls to #contact

applyLang();
updateToTop();
openProjectFromHash();
