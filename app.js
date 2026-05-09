const categoryDetails = {
  "YouTube Ideas": { slug: "youtube", icon: "🎥" },
  School: { slug: "school", icon: "📚" },
  Travel: { slug: "travel", icon: "✈️" },
  Deadlines: { slug: "deadlines", icon: "⏰" },
  "Random Thoughts": { slug: "random", icon: "🌙" },
};

const categories = Object.keys(categoryDetails);

const notes = [
  {
    title: "Cozy reset vlog opening",
    category: "YouTube Ideas",
    body:
      "Film a soft Sunday reset: coffee on the nightstand, fresh sheets, desk cleanup, then voiceover about clearing mental tabs before a busy week.",
    createdAt: "2026-05-09T07:45:00",
    lastRevisitedAt: "2026-05-09T08:00:00",
    tags: ["🎥 content idea", "☕ cafe", "🌙 late night"],
  },
  {
    title: "Scholarship essay angle",
    category: "School",
    body:
      "Write about learning to build calm systems when life feels scattered. Tie it back to design, school routines, and helping other students feel less overwhelmed.",
    createdAt: "2026-05-08T18:20:00",
    lastRevisitedAt: "2026-05-08T19:10:00",
    tags: ["📚 study", "✍️ essay"],
  },
  {
    title: "Lisbon morning itinerary",
    category: "Travel",
    body:
      "Start in Alfama before the crowds, find a tiny tiled cafe, then take tram photos near golden hour. Keep the afternoon intentionally unscheduled.",
    createdAt: "2026-05-08T10:15:00",
    lastRevisitedAt: "2026-05-08T11:00:00",
    tags: ["✈️ travel", "☕ cafe"],
  },
  {
    title: "Portfolio submission checklist",
    category: "Deadlines",
    body:
      "Polish the case study intro, export the mobile screens, record a 45-second walkthrough, and submit everything before Friday night.",
    createdAt: "2026-05-07T21:35:00",
    lastRevisitedAt: "2026-05-07T22:00:00",
    tags: ["⏰ deadline", "💻 portfolio"],
  },
  {
    title: "Tiny rule for better notes",
    category: "Random Thoughts",
    body:
      "Every note should either become a task, a memory, a reference, or a question. If it is none of those, it can probably be deleted.",
    createdAt: "2026-05-06T23:42:00",
    lastRevisitedAt: "2026-05-07T08:10:00",
    tags: ["🌙 late night", "🧠 idea"],
  },
  {
    title: "Study-with-me video structure",
    category: "YouTube Ideas",
    body:
      "Three chapters: planning the session, quiet study blocks with timer overlays, and a realistic recap of what actually got done.",
    createdAt: "2026-05-05T14:10:00",
    lastRevisitedAt: "2026-05-05T14:20:00",
    tags: ["🎥 content idea", "📚 study"],
  },
  {
    title: "Exam review ritual",
    category: "School",
    body:
      "Make one pink index card per concept: definition, one example, one mistake to avoid. Review while walking instead of sitting at the desk again.",
    createdAt: "2026-05-04T09:25:00",
    lastRevisitedAt: "2026-05-04T12:40:00",
    tags: ["📚 study", "📝 review"],
  },
  {
    title: "Tokyo packing moodboard",
    category: "Travel",
    body:
      "Neutral capsule outfits, comfortable sneakers, small perfume, travel journal, portable charger, and a blush pouch for receipts and tickets.",
    createdAt: "2026-04-29T17:50:00",
    lastRevisitedAt: "2026-04-30T08:00:00",
    tags: ["✈️ travel", "🧳 packing"],
  },
  {
    title: "Presentation due Monday",
    category: "Deadlines",
    body:
      "Need to simplify slides 6 and 7, make the problem statement feel more human, and practice the opening without reading from notes.",
    createdAt: "2026-04-24T20:12:00",
    lastRevisitedAt: "2026-04-25T07:25:00",
    tags: ["⏰ deadline", "🎤 presentation"],
  },
  {
    title: "Cafe work session idea",
    category: "Random Thoughts",
    body:
      "Try making Friday mornings a gentle admin ritual: cafe, inbox cleanup, calendar review, and one small reward before noon.",
    createdAt: "2026-04-18T08:05:00",
    lastRevisitedAt: "2026-04-18T08:20:00",
    tags: ["☕ cafe", "🌿 routine"],
  },
  {
    title: "Apartment tour short",
    category: "YouTube Ideas",
    body:
      "A 30-second short showing the prettiest corners: lamp glow, jewelry dish, planner stack, flowers, and the window view at sunset.",
    createdAt: "2026-04-12T19:30:00",
    lastRevisitedAt: "2026-04-12T19:45:00",
    tags: ["🎥 content idea", "🏡 home"],
  },
  {
    title: "Question for future self",
    category: "Random Thoughts",
    body:
      "What would my life look like if I protected my attention as carefully as I protect my phone battery?",
    createdAt: "2026-03-28T22:16:00",
    lastRevisitedAt: "2026-03-29T09:00:00",
    tags: ["🌙 late night", "🧠 idea"],
  },
];

const categoryList = document.querySelector("#categoryList");
const searchInput = document.querySelector("#searchInput");
const visibleCount = document.querySelector("#visibleCount");
const emptyState = document.querySelector("#emptyState");
const clearFilters = document.querySelector("#clearFilters");
const noteForm = document.querySelector("#noteForm");
const autoCategory = document.querySelector("#autoCategory");
const noteBody = document.querySelector("#noteBody");
const totalNotesHero = document.querySelector("#totalNotesHero");
const voiceStatus = document.querySelector("#voiceStatus");
const voiceFallback = document.querySelector("#voiceFallback");
const dictationButton = document.querySelector("#dictationButton");
const recentTimeline = document.querySelector("#recentTimeline");
const resurfaceList = document.querySelector("#resurfaceList");

let recognition;
let isListening = false;
let speechStartText = "";
let finalTranscript = "";
let currentAutoCategory = "Random Thoughts";
const openCategories = new Set(["YouTube Ideas", "Random Thoughts"]);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const categoryKeywords = {
  "YouTube Ideas": [
    "youtube",
    "video",
    "vlog",
    "short",
    "channel",
    "thumbnail",
    "script",
    "film",
    "edit",
    "hook",
    "content",
    "voiceover",
    "reel",
  ],
  School: [
    "school",
    "class",
    "homework",
    "paper",
    "essay",
    "exam",
    "quiz",
    "lecture",
    "professor",
    "study",
    "thesis",
    "assignment",
    "review",
  ],
  Travel: [
    "travel",
    "trip",
    "flight",
    "hotel",
    "itinerary",
    "packing",
    "passport",
    "train",
    "museum",
    "cafe",
    "tokyo",
    "lisbon",
    "kyoto",
    "tram",
  ],
  Deadlines: [
    "deadline",
    "due",
    "submit",
    "application",
    "reminder",
    "urgent",
    "finish",
    "schedule",
    "meeting",
    "friday",
    "monday",
    "tomorrow",
    "11:59",
  ],
};

const tagRules = [
  { tag: "✈️ travel", keywords: ["travel", "trip", "flight", "hotel", "passport", "tokyo", "lisbon", "kyoto"] },
  { tag: "☕ cafe", keywords: ["cafe", "coffee", "latte", "morning"] },
  { tag: "🌙 late night", keywords: ["night", "late", "moon", "sleep", "dream"] },
  { tag: "🎥 content idea", keywords: ["youtube", "video", "vlog", "short", "film", "content", "reel"] },
  { tag: "📚 study", keywords: ["study", "school", "exam", "class", "homework", "essay"] },
  { tag: "⏰ deadline", keywords: ["deadline", "due", "submit", "finish", "monday", "friday"] },
];

function categoryClass(category) {
  return `tag-${categoryDetails[category].slug}`;
}

function formatDate(dateString, options = { month: "short", day: "numeric" }) {
  return new Intl.DateTimeFormat("en", options).format(new Date(dateString));
}

function formatTime(dateString) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(dateString));
}

function getDateGroup(dateString) {
  const noteDate = new Date(dateString);
  const today = new Date("2026-05-09T12:00:00");
  const diffDays = Math.floor((today - noteDate) / 86400000);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "This week";
  if (diffDays <= 30) return "Earlier this month";
  return "Older sparks";
}

function noteMatchesSearch(note, query) {
  const searchable = `${note.title} ${note.category} ${note.body} ${note.tags.join(" ")} ${formatDate(note.createdAt)}`.toLowerCase();
  return searchable.includes(query);
}

function renderDashboard() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => noteMatchesSearch(note, query));

  categoryList.replaceChildren(
    ...categories.map((category) => {
      const categoryNotes = filteredNotes.filter((note) => note.category === category);
      return createCategoryPanel(category, categoryNotes, Boolean(query));
    }),
  );

  visibleCount.textContent = filteredNotes.length;
  totalNotesHero.textContent = notes.length;
  emptyState.hidden = filteredNotes.length > 0;
  renderRecentTimeline();
  renderResurfaceList();
}

function createCategoryPanel(category, categoryNotes, hasSearchQuery) {
  const panel = document.createElement("section");
  panel.className = "category-panel";

  const panelId = `category-${categoryDetails[category].slug}`;
  const isOpen = openCategories.has(category) || (hasSearchQuery && categoryNotes.length > 0);

  const toggle = document.createElement("button");
  toggle.className = "category-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-controls", panelId);

  const summary = document.createElement("span");
  summary.className = "category-summary";

  const folder = document.createElement("span");
  folder.className = "folder-icon";
  folder.textContent = categoryDetails[category].icon;

  const titleWrap = document.createElement("span");
  titleWrap.className = "category-title-wrap";

  const title = document.createElement("strong");
  title.textContent = category;

  const count = document.createElement("span");
  count.className = "category-count";
  count.textContent = `${categoryNotes.length} ${categoryNotes.length === 1 ? "thought" : "thoughts"}`;

  const icon = document.createElement("span");
  icon.className = "category-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = isOpen ? "−" : "+";

  titleWrap.append(title, count);
  summary.append(folder, titleWrap);
  toggle.append(summary, icon);

  const body = document.createElement("div");
  body.className = "category-notes";
  body.id = panelId;
  body.hidden = !isOpen;

  if (categoryNotes.length) {
    const groups = groupNotesByDate(categoryNotes);
    body.replaceChildren(...Object.entries(groups).map(([label, groupedNotes]) => createDateGroup(label, groupedNotes)));
  } else {
    const emptyCategory = document.createElement("p");
    emptyCategory.className = "empty-category";
    emptyCategory.textContent = "Nothing saved here yet.";
    body.append(emptyCategory);
  }

  toggle.addEventListener("click", () => {
    if (openCategories.has(category)) {
      openCategories.delete(category);
    } else {
      openCategories.add(category);
    }
    renderDashboard();
  });

  panel.append(toggle, body);
  return panel;
}

function groupNotesByDate(categoryNotes) {
  return categoryNotes
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .reduce((groups, note) => {
      const label = getDateGroup(note.createdAt);
      groups[label] = groups[label] || [];
      groups[label].push(note);
      return groups;
    }, {});
}

function createDateGroup(label, groupedNotes) {
  const group = document.createElement("section");
  group.className = "date-group";

  const heading = document.createElement("h3");
  heading.textContent = label;

  const cards = document.createElement("div");
  cards.className = "note-card-grid";
  cards.replaceChildren(...groupedNotes.map(createNoteCard));

  group.append(heading, cards);
  return group;
}

function createNoteCard(note, compact = false) {
  const card = document.createElement("article");
  card.className = compact ? "note-card note-card-compact" : "note-card";

  const title = document.createElement("h3");
  title.textContent = note.title;

  const body = document.createElement("p");
  body.textContent = note.body;

  const tags = document.createElement("div");
  tags.className = "tag-row";
  tags.replaceChildren(
    ...note.tags.map((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = `tag ${categoryClass(note.category)}`;
      tagElement.textContent = tag;
      return tagElement;
    }),
  );

  const meta = document.createElement("div");
  meta.className = "note-meta";

  const category = document.createElement("span");
  category.textContent = `${categoryDetails[note.category].icon} ${note.category}`;

  const date = document.createElement("span");
  date.textContent = `${formatDate(note.createdAt)} • ${formatTime(note.createdAt)}`;

  meta.append(category, date);
  card.append(tags, title, body, meta);

  return card;
}

function renderRecentTimeline() {
  const recentNotes = notes
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  recentTimeline.replaceChildren(
    ...recentNotes.map((note) => {
      const item = document.createElement("article");
      item.className = "timeline-item";

      const dot = document.createElement("span");
      dot.className = `timeline-dot ${categoryClass(note.category)}`;
      dot.textContent = categoryDetails[note.category].icon;

      const content = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = note.title;

      const meta = document.createElement("p");
      meta.textContent = `${formatDate(note.createdAt, { weekday: "short", month: "short", day: "numeric" })} • ${note.tags[0]}`;

      content.append(title, meta);
      item.append(dot, content);
      return item;
    }),
  );
}

function renderResurfaceList() {
  const oldIdeas = notes
    .slice()
    .sort((a, b) => new Date(a.lastRevisitedAt) - new Date(b.lastRevisitedAt))
    .slice(0, 3);

  resurfaceList.replaceChildren(...oldIdeas.map((note) => createNoteCard(note, true)));
}

function suggestCategory(content) {
  const normalizedContent = content.toLowerCase();
  if (!normalizedContent.trim()) return "Random Thoughts";

  const scoredCategories = Object.entries(categoryKeywords).map(([category, keywords]) => {
    const score = keywords.reduce((total, keyword) => {
      const pattern = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      return total + (normalizedContent.match(pattern) || []).length;
    }, 0);

    return { category, score };
  });

  const bestMatch = scoredCategories.sort((a, b) => b.score - a.score)[0];
  return bestMatch.score > 0 ? bestMatch.category : "Random Thoughts";
}

function showAutoCategory(category) {
  const categoryName = document.createElement("strong");
  categoryName.textContent = `${categoryDetails[category].icon} ${category}`;
  autoCategory.replaceChildren("Auto-sorted to ", categoryName);
}

function updateAutoCategory() {
  currentAutoCategory = suggestCategory(noteBody.value);
  showAutoCategory(currentAutoCategory);
}

function createTitleFromThought(thought) {
  const normalizedThought = thought.replace(/\s+/g, " ").trim();
  if (!normalizedThought) return "Untitled thought";

  const sentence = normalizedThought.split(/[.!?]/)[0].trim();
  const source = sentence || normalizedThought;
  const words = source.split(" ").slice(0, 6).join(" ");
  return source.length > words.length ? `${words}...` : words;
}

function createTagsFromThought(thought, category) {
  const normalizedThought = thought.toLowerCase();
  const matchedTags = tagRules
    .filter(({ keywords }) => keywords.some((keyword) => normalizedThought.includes(keyword)))
    .map(({ tag }) => tag);

  if (!matchedTags.length) {
    return [`${categoryDetails[category].icon} ${category.toLowerCase()}`];
  }

  return [...new Set(matchedTags)].slice(0, 3);
}

function appendTranscript(interimTranscript = "") {
  const baseText = speechStartText.trim();
  const spokenText = `${finalTranscript} ${interimTranscript}`.trim();
  noteBody.value = [baseText, spokenText].filter(Boolean).join(baseText && spokenText ? "\n\n" : "");
  noteBody.dispatchEvent(new Event("input"));
}

function setDictationState(listening, statusText) {
  isListening = listening;
  dictationButton.classList.toggle("is-recording", listening);
  voiceStatus.classList.toggle("is-listening", listening);
  voiceStatus.textContent = statusText;
  dictationButton.setAttribute("aria-label", listening ? "Stop dictation" : "Start dictation");
}

function setupSpeechRecognition() {
  if (!SpeechRecognition) {
    dictationButton.disabled = true;
    voiceFallback.hidden = false;
    voiceStatus.textContent = "Tap to dictate";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.addEventListener("start", () => {
    setDictationState(true, "Listening...");
  });

  recognition.addEventListener("result", (event) => {
    let interimTranscript = "";

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index][0].transcript;
      if (event.results[index].isFinal) {
        finalTranscript = `${finalTranscript} ${transcript}`.trim();
      } else {
        interimTranscript = `${interimTranscript} ${transcript}`.trim();
      }
    }

    appendTranscript(interimTranscript);
  });

  recognition.addEventListener("error", (event) => {
    const permissionMessage = event.error === "not-allowed" ? " Microphone permission was blocked." : "";
    setDictationState(false, `Dictation stopped.${permissionMessage}`);
  });

  recognition.addEventListener("end", () => {
    setDictationState(false, "Dictation stopped.");
  });
}

dictationButton.addEventListener("click", () => {
  if (!recognition) return;

  if (isListening) {
    recognition.stop();
    return;
  }

  speechStartText = noteBody.value;
  finalTranscript = "";

  try {
    recognition.start();
  } catch (error) {
    setDictationState(false, "Dictation stopped.");
  }
});

searchInput.addEventListener("input", renderDashboard);

clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  renderDashboard();
});

noteBody.addEventListener("input", updateAutoCategory);

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(noteForm);
  const thought = formData.get("body").trim();
  if (!thought) return;

  const savedCategory = currentAutoCategory;
  const now = new Date();

  notes.unshift({
    title: createTitleFromThought(thought),
    category: savedCategory,
    body: thought,
    createdAt: now.toISOString(),
    lastRevisitedAt: now.toISOString(),
    tags: createTagsFromThought(thought, savedCategory),
  });

  noteForm.reset();
  updateAutoCategory();
  setDictationState(false, "Tap to dictate");
  openCategories.add(savedCategory);
  searchInput.value = "";
  renderDashboard();
});

setupSpeechRecognition();
updateAutoCategory();
renderDashboard();
