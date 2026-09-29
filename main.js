/* =========================================================
   Serkan Sönmez – Portfolio
   All texts live in I18N (EN + DE). Projects live in PROJECTS.
   To add a project: add an entry to PROJECTS and its texts to
   I18N.en.p / I18N.de.p under the same id.
   ========================================================= */

const IMG = "assets/img/";

const PROJECTS = [
  {
    id: "historia",
    featured: true,
    img: IMG + "historia.jpg",
    video: "9Qa9gazr1qg",
    tags: ["Unity", "C#", "Meta XR SDK", "Hand Tracking", "Shared Spatial Anchors", "Meta Avatars"],
    links: [{ key: "devpost", url: "https://devpost.com/software/hisotria-virtualis" }]
  },
  {
    id: "sounds",
    img: IMG + "sounds.png",
    tags: ["Unity", "C#", "VR", "Spatial Audio"],
    links: []
  },
  {
    id: "grim",
    img: IMG + "grim.png",
    tags: ["Unity", "Meta Quest 3", "Olfactory Display", "Game Jam"],
    links: [{ key: "ggj", url: "https://globalgamejam.org/games/2026/grim-hollow-7" }]
  },
  {
    id: "paper",
    img: IMG + "paper.png",
    tags: ["Unity", "Python", "YOLO", "Roboflow", "Blender", "Mixed Reality"],
    links: [{ key: "devpost", url: "https://devpost.com/software/paper-therapy" }]
  },
  {
    id: "hue",
    img: IMG + "hue.png",
    tags: ["Unity", "C#", "Game Design"],
    links: [{ key: "itch", url: "https://inki-gamer.itch.io/hue-of-hope" }]
  },
  {
    id: "ocean",
    img: IMG + "ocean.jpg",
    tags: ["Unity", "VR"],
    links: []
  }
];

const STACK = [
  { id: "figma", mono: "F", color: "var(--pink)" },
  { id: "unity", mono: "U", color: "var(--yellow)" },
  { id: "csharp", mono: "C#", color: "var(--purple)" },
  { id: "metaxr", mono: "XR", color: "var(--lime)" },
  { id: "blender", mono: "B", color: "var(--orange)" },
  { id: "research", mono: "UX", color: "var(--blue)" }
];

const I18N = {
  en: {
    skip: "Skip to content",
    "nav.about": "About", "nav.explore": "Research", "nav.projects": "Projects",
    "nav.experience": "Experience", "nav.contact": "Contact",
    roles: ["Interaction Designer", "XR Developer", "UX Researcher", "Unity & C# Developer", "Workshop Coach"],
    "hero.hello": "Hi, I'm",
    "hero.sticker": "🏆 2× 1st place",
    "hero.lead": "I design and build interactive experiences — on screens, in space, and for all the senses.",
    "hero.cta1": "See my work", "hero.cta2": "Let's talk",
    "hero.scroll": "scroll down and get to know me",
    "about.title": "About me",
    "about.p1": "I'm a Creative Technologist from St. Pölten, Austria, currently finishing my MSc in Interactive Technologies (AR/VR).",
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
    "projects.intro": "Click a project for the full story.",
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
    "exp.msc.t": "MSc Interactive Technologies – AR & VR · USTP",
    "exp.msc.p": "AR/VR, prototyping, empirical research methods, AI, computer vision.",
    "exp.bsc.t": "BSc Creative Computing · USTP",
    "exp.bsc.p": "Programming, UX/UI, web & mobile, game development and XR.",
    "stack.title": "My stack",
    "stack.intro": "Tap a card to flip it.",
    "stack.hint": "Tap to flip",
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
    "footer.top": "Back to top ↑",
    ui: {
      duration: "Duration", role: "My role", team: "Team",
      challenge: "Challenge", approach: "What we built", result: "Result", learned: "What I learned",
      open: "View project", close: "Close",
      devpost: "Devpost", ggj: "Global Game Jam page", itch: "Play on itch.io"
    },
    p: {
      historia: {
        title: "Historia Virtualis",
        kicker: "Co-located multiplayer VR",
        badge: "🏆 1st place ×2",
        summary: "Three players, one room, Roman St. Pölten: bake a festive bread in a 1st-century bakery — and only succeed together.",
        duration: "6 months",
        role: "[Your role in the team]",
        challenge: "Make three people in the same physical room feel like they share one virtual world, and design puzzles that genuinely require collaboration.",
        approach: "Every player gets one tool — an axe, a peel or flint and steel — so nobody can solve the room alone. Hand tracking replaces controllers, Shared Spatial Anchors align everyone's world, and Meta Avatars give each player a body.",
        result: ["1st place — 12th Interactive Digital Media Student Contest 2026", "1st place — USTP Projektvernissage 2025", "Shown at the European Researchers' Night", "Coming up: Lange Nacht der Forschung"],
        learned: "Tracking struggles with reflective surfaces — we learned to design the physical test space as carefully as the virtual one."
      },
      sounds: {
        title: "Sounds of Shadow",
        kicker: "University project · VR",
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
        summary: "Collect mushrooms in a dangerous forest — and actually smell it. Built for Meta Quest 3 with an olfactory device that releases real scents.",
        duration: "Game jam",
        role: "[Your role in the team]",
        challenge: "Add a whole new sense to VR within the time limit of a game jam.",
        approach: "The game triggers scents from an olfactory device in sync with what happens in the forest, turning smell into part of the gameplay.",
        result: "Submitted to the Global Game Jam 2026.",
        learned: "Smell is powerful — and very easy to overdo. Timing matters as much as the scent itself."
      },
      paper: {
        title: "Paper Therapy",
        kicker: "SensAI Hackathon Barcelona 2025 · MR + ML",
        summary: "A mixed reality origami coach: a YOLO model recognises your current fold in real time, and a 3D animation shows the next step right on your paper.",
        duration: "48 hours",
        role: "[Your role in the team]",
        challenge: "Translating instructions from a screen onto the paper in front of you is frustrating. Could MR guide you step by step instead?",
        approach: "We built a dataset of folding steps for an origami heart, trained a YOLO model with Roboflow and connected its predictions to a Quest 3 app that shows animated 3D models of the next fold.",
        result: "A working prototype after 48 hours — with plans to support more origami designs.",
        learned: "Telling nearly identical fold stages apart is the real challenge — data quality beats model size."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelor project",
        summary: "A turn-based deckbuilder inspired by Hollow Knight and Slay the Spire: build your deck, defeat bosses and free the characters who carry the story.",
        duration: "5 months",
        role: "[Your role in the team]",
        challenge: "Create a card game with enough variety to stay fresh across every battle.",
        approach: "Damage, defence and magic cards, shuffled decks for every fight, rewards after victories and chapter bosses that unlock story NPCs.",
        result: "A playable game published on itch.io.",
        learned: "Balancing is design work — every number is a decision about how the player should feel."
      },
      ocean: {
        title: "#SaveTheOcean",
        kicker: "VR game · Creative Code Lab 4",
        summary: "[One or two sentences about the game.]",
        duration: "2 weeks",
        role: "[Your role]",
        challenge: "[What problem or idea did you start from?]",
        approach: "[What did you build?]",
        result: "[What came out of it?]",
        learned: "[One takeaway.]"
      }
    }
  },

  de: {
    skip: "Zum Inhalt springen",
    "nav.about": "Über mich", "nav.explore": "Forschung", "nav.projects": "Projekte",
    "nav.experience": "Werdegang", "nav.contact": "Kontakt",
    roles: ["Interaction Designer", "XR-Entwickler", "UX-Researcher", "Unity- & C#-Entwickler", "Workshop-Coach"],
    "hero.hello": "Hi, ich bin",
    "hero.sticker": "🏆 2× 1. Platz",
    "hero.lead": "Ich gestalte und entwickle interaktive Erlebnisse – auf Bildschirmen, im Raum und für alle Sinne.",
    "hero.cta1": "Meine Arbeiten", "hero.cta2": "Lass uns reden",
    "hero.scroll": "scroll runter und lern mich kennen",
    "about.title": "Über mich",
    "about.p1": "Ich bin Creative Technologist aus St. Pölten und schließe gerade meinen Master in Interactive Technologies (AR/VR) ab.",
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
    "projects.intro": "Klick auf ein Projekt für die ganze Geschichte.",
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
    "exp.msc.t": "MSc Interactive Technologies – AR & VR · USTP",
    "exp.msc.p": "AR/VR, Prototyping, empirische Forschungsmethoden, KI, Computer Vision.",
    "exp.bsc.t": "BSc Creative Computing · USTP",
    "exp.bsc.p": "Programmierung, UX/UI, Web & Mobile, Game Development und XR.",
    "stack.title": "Mein Stack",
    "stack.intro": "Tipp auf eine Karte, um sie umzudrehen.",
    "stack.hint": "Zum Umdrehen tippen",
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
    "footer.top": "Nach oben ↑",
    ui: {
      duration: "Dauer", role: "Meine Rolle", team: "Team",
      challenge: "Herausforderung", approach: "Was wir gebaut haben", result: "Ergebnis", learned: "Was ich gelernt habe",
      open: "Projekt ansehen", close: "Schließen",
      devpost: "Devpost", ggj: "Global-Game-Jam-Seite", itch: "Auf itch.io spielen"
    },
    p: {
      historia: {
        title: "Historia Virtualis",
        kicker: "Co-located Multiplayer-VR",
        badge: "🏆 2× 1. Platz",
        summary: "Drei Spieler:innen, ein Raum, das römische St. Pölten: Backt in einer Bäckerei aus dem 1. Jahrhundert ein Festbrot – und schafft es nur gemeinsam.",
        duration: "6 Monate",
        role: "[Deine Rolle im Team]",
        challenge: "Drei Menschen im selben physischen Raum sollen das Gefühl haben, eine gemeinsame virtuelle Welt zu teilen – mit Rätseln, die echte Zusammenarbeit erfordern.",
        approach: "Jede Person bekommt ein Werkzeug – Axt, Brotschieber oder Feuerstein – niemand kann den Raum allein lösen. Hand Tracking ersetzt Controller, Shared Spatial Anchors richten die Welten aneinander aus, Meta Avatars geben allen einen Körper.",
        result: ["1. Platz – 12th Interactive Digital Media Student Contest 2026", "1. Platz – Projektvernissage der USTP 2025", "Präsentiert bei der European Researchers' Night", "Demnächst: Lange Nacht der Forschung"],
        learned: "Tracking hat Probleme mit spiegelnden Oberflächen – wir haben gelernt, den physischen Testraum genauso sorgfältig zu gestalten wie den virtuellen."
      },
      sounds: {
        title: "Sounds of Shadow",
        kicker: "Uniprojekt · VR",
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
        summary: "Sammle Pilze in einem gefährlichen Wald – und rieche ihn wirklich. Für Meta Quest 3 mit einem Duftgerät, das echte Gerüche abgibt.",
        duration: "Game Jam",
        role: "[Deine Rolle im Team]",
        challenge: "In der kurzen Zeit eines Game Jams einen ganz neuen Sinn in VR einbinden.",
        approach: "Das Spiel löst passend zum Geschehen im Wald Gerüche über ein Duftgerät aus – Geruch wird Teil des Gameplays.",
        result: "Eingereicht beim Global Game Jam 2026.",
        learned: "Geruch ist mächtig – und schnell zu viel. Timing ist genauso wichtig wie der Duft selbst."
      },
      paper: {
        title: "Paper Therapy",
        kicker: "SensAI Hackathon Barcelona 2025 · MR + ML",
        summary: "Ein Mixed-Reality-Origami-Coach: Ein YOLO-Modell erkennt deinen aktuellen Faltschritt in Echtzeit, eine 3D-Animation zeigt den nächsten direkt auf deinem Papier.",
        duration: "48 Stunden",
        role: "[Deine Rolle im Team]",
        challenge: "Anleitungen vom Bildschirm aufs Papier zu übertragen ist mühsam. Kann MR stattdessen Schritt für Schritt führen?",
        approach: "Wir haben einen Datensatz mit Faltschritten für ein Origami-Herz erstellt, ein YOLO-Modell mit Roboflow trainiert und die Vorhersagen mit einer Quest-3-App verbunden, die den nächsten Schritt animiert zeigt.",
        result: "Ein funktionierender Prototyp nach 48 Stunden – mit Plänen für weitere Origami-Modelle.",
        learned: "Fast identische Faltschritte zu unterscheiden ist die eigentliche Herausforderung – Datenqualität schlägt Modellgröße."
      },
      hue: {
        title: "Hue of Hope",
        kicker: "Deckbuilder · Bachelorprojekt",
        summary: "Ein rundenbasierter Deckbuilder, inspiriert von Hollow Knight und Slay the Spire: Deck aufbauen, Bosse besiegen und die Figuren befreien, die die Geschichte erzählen.",
        duration: "5 Monate",
        role: "[Deine Rolle im Team]",
        challenge: "Ein Kartenspiel mit genug Abwechslung, damit jeder Kampf frisch bleibt.",
        approach: "Schadens-, Verteidigungs- und Magiekarten, neu gemischte Decks in jedem Kampf, Belohnungen nach Siegen und Kapitel-Bosse, die Story-NPCs freischalten.",
        result: "Ein spielbares Spiel, veröffentlicht auf itch.io.",
        learned: "Balancing ist Designarbeit – jede Zahl entscheidet, wie sich Spielende fühlen."
      },
      ocean: {
        title: "#SaveTheOcean",
        kicker: "VR-Spiel · Creative Code Lab 4",
        summary: "[Ein, zwei Sätze zum Spiel.]",
        duration: "2 Wochen",
        role: "[Deine Rolle]",
        challenge: "[Von welcher Idee oder welchem Problem bist du ausgegangen?]",
        approach: "[Was habt ihr gebaut?]",
        result: "[Was ist daraus geworden?]",
        learned: "[Eine Erkenntnis.]"
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

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  document.getElementById("langToggle").setAttribute(
    "aria-label", lang === "en" ? "Auf Deutsch umschalten" : "Switch to English"
  );
  renderProjects();
  renderStack();
  restartRoles();
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "en" ? "de" : "en";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  applyLang();
});

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

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const P = I18N[lang].p;
  grid.innerHTML = PROJECTS.map((pr) => {
    const x = P[pr.id];
    return `
      <button type="button" class="p-card${pr.featured ? " p-card--featured" : ""}" data-id="${pr.id}"
              aria-label="${esc(t("ui").open)}: ${esc(x.title)}">
        <div class="p-card__media">
          <img src="${pr.img}" alt="" loading="lazy">
          ${x.badge ? `<span class="p-card__badge">${esc(x.badge)}</span>` : ""}
        </div>
        <div class="p-card__body">
          <p class="p-card__kicker">${esc(x.kicker)}</p>
          <h3 class="p-card__title">${esc(x.title)}</h3>
          <p class="p-card__summary">${esc(x.summary)}</p>
          <ul class="tags">${pr.tags.map((tg) => `<li>${esc(tg)}</li>`).join("")}</ul>
        </div>
      </button>`;
  }).join("");
}

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

function openProject(id) {
  const pr = PROJECTS.find((p) => p.id === id);
  const x = I18N[lang].p[id];
  const ui = t("ui");
  const media = pr.video
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${pr.video}" title="${esc(x.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
    : `<img src="${pr.img}" alt="">`;
  const block = (label, val) => val ? `
    <div class="modal__block"><h3>${esc(label)}</h3>${
      Array.isArray(val) ? `<ul>${val.map((v) => `<li>${esc(v)}</li>`).join("")}</ul>` : `<p>${esc(val)}</p>`
    }</div>` : "";
  modalBody.innerHTML = `
    <div class="modal__media">${media}</div>
    <div class="modal__content">
      <p class="p-card__kicker">${esc(x.kicker)}</p>
      <h2 id="modalTitle">${esc(x.title)}</h2>
      <div class="modal__meta">
        <span><b>${esc(ui.duration)}:</b> ${esc(x.duration)}</span>
        <span><b>${esc(ui.role)}:</b> ${esc(x.role)}</span>
      </div>
      ${block(ui.challenge, x.challenge)}
      ${block(ui.approach, x.approach)}
      ${block(ui.result, x.result)}
      ${block(ui.learned, x.learned)}
      <ul class="tags">${pr.tags.map((tg) => `<li>${esc(tg)}</li>`).join("")}</ul>
      ${pr.links.length ? `<div class="modal__links">${pr.links.map((l) =>
        `<a class="btn" href="${l.url}" target="_blank" rel="noopener">${esc(ui[l.key])} ↗</a>`).join("")}</div>` : ""}
    </div>`;
  modal.querySelector(".modal__close").setAttribute("aria-label", ui.close);
  modal.showModal();
}

document.getElementById("projectGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".p-card");
  if (card) openProject(card.dataset.id);
});
modal.querySelector(".modal__close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener("close", () => { modalBody.innerHTML = ""; }); // stops video

/* ============ Stack flip cards ============ */
function renderStack() {
  const S = t("stack");
  document.getElementById("stackGrid").innerHTML = STACK.map((s) => `
    <button type="button" class="flip" aria-pressed="false">
      <span class="flip__inner">
        <span class="flip__face flip__front">
          <span class="flip__mono" style="background:${s.color}">${s.mono}</span>
          <span>
            <span class="flip__name">${esc(S[s.id][0])}</span><br>
            <span class="flip__hint">${esc(t("stack.hint"))}</span>
          </span>
        </span>
        <span class="flip__face flip__back">${esc(S[s.id][1])}</span>
      </span>
    </button>`).join("");
}
document.getElementById("stackGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".flip");
  if (card) card.setAttribute("aria-pressed", card.getAttribute("aria-pressed") === "true" ? "false" : "true");
});

/* ============ YouTube click-to-load (privacy friendly) ============ */
document.querySelectorAll(".video").forEach((v) => {
  v.querySelector(".video__play").addEventListener("click", () => {
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.yt}?autoplay=1" title="Historia Virtualis making-of" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
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

applyLang();
