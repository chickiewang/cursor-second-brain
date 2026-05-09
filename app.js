const categoryConfig = {
  "YouTube Ideas": {
    slug: "youtube",
    icon: "🎥",
    description: "Hooks, scripts, vlog concepts, thumbnails",
    keywords: [
      "youtube",
      "video",
      "vlog",
      "shorts",
      "channel",
      "thumbnail",
      "script",
      "filming",
      "edit",
      "hook",
      "content",
      "episode",
      "reel",
    ],
  },
  School: {
    slug: "school",
    icon: "📚",
    description: "Classes, papers, study plans, campus lists",
    keywords: [
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
      "calculus",
      "history",
      "campus",
    ],
  },
  Travel: {
    slug: "travel",
    icon: "✈️",
    description: "Trips, cafes, packing lists, itineraries",
    keywords: [
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
      "paris",
      "airport",
    ],
  },
  Deadlines: {
    slug: "deadlines",
    icon: "⏰",
    description: "Due dates, applications, submissions",
    keywords: [
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
      "tomorrow",
      "11:59",
      "presentation",
    ],
  },
  "Random Thoughts": {
    slug: "random",
    icon: "☁️",
    description: "Loose ideas, observations, tiny sparks",
    keywords: ["thought", "idea", "maybe", "remember", "journal", "night", "dream", "ritual"],
  },
};

const tagRules = [
  { label: "travel", icon: "✈️", keywords: ["travel", "trip", "flight", "passport", "packing", "tokyo", "lisbon", "kyoto"] },
  { label: "cafe", icon: "☕", keywords: ["cafe", "coffee", "latte", "matcha", "study spot"] },
  { label: "late night", icon: "🌙", keywords: ["night", "midnight", "late", "dream", "sleep"] },
  { label: "content idea", icon: "🎥", keywords: ["youtube", "video", "vlog", "shorts", "thumbnail", "hook", "content", "film"] },
  { label: "school", icon: "📚", keywords: ["school", "class", "exam", "paper", "study", "assignment", "lecture"] },
  { label: "deadline", icon: "⏰", keywords: ["deadline", "due", "submit", "friday", "tomorrow", "11:59", "application"] },
  { label: "soft life", icon: "🕯️", keywords: ["ritual", "reset", "morning", "routine", "journal"] },
];

const thoughts = [
  {
    title: "Cafe study vlog opening",
    category: "YouTube Ideas",
    body:
      "Open the next study vlog with iced coffee, soft morning light on the planner, and a tiny checklist overlay before the campus montage.",
    source: "Voice memo",
    capturedAt: "2026-05-09T07:42:00",
    lastRevisitedAt: "2026-05-09T08:05:00",
    tags: ["☕ cafe", "🎥 content idea", "📚 school"],
  },
  {
    title: "Sociology paper thesis",
    category: "School",
    body:
      "Argue that everyday routines on campus shape belonging more than official orientation programs. Pull two quotes from the lecture notes.",
    source: "Class note",
    capturedAt: "2026-05-09T06:18:00",
    lastRevisitedAt: "2026-05-09T07:10:00",
    tags: ["📚 school", "☕ cafe"],
  },
  {
    title: "Paris packing capsule",
    category: "Travel",
    body:
      "Keep the palette cream, black, ballet pink, and denim. Pack one scarf, tiny umbrella, portable charger, and room for a museum tote.",
    source: "Checklist",
    capturedAt: "2026-05-08T20:52:00",
    lastRevisitedAt: "2026-05-08T21:10:00",
    tags: ["✈️ travel", "☕ cafe"],
  },
  {
    title: "Scholarship portal deadline",
    category: "Deadlines",
    body:
      "Submit the final scholarship essay by Friday at 11:59 PM, upload transcript, and send one gentle reminder for the recommendation letter.",
    source: "Reminder",
    capturedAt: "2026-05-08T16:25:00",
    lastRevisitedAt: "2026-05-08T16:40:00",
    tags: ["⏰ deadline", "📚 school"],
  },
  {
    title: "Tiny product thought",
    category: "Random Thoughts",
    body:
      "People come back to apps that feel emotionally quiet. The best interface should feel like clearing a pretty desk.",
    source: "Pasted note",
    capturedAt: "2026-05-07T23:48:00",
    lastRevisitedAt: "2026-05-08T08:20:00",
    tags: ["🌙 late night", "🕯️ soft life"],
  },
  {
    title: "Dorm reset video series",
    category: "YouTube Ideas",
    body:
      "Make a three-part series: Sunday dorm reset, realistic exam week, then post-finals room refresh with soft voiceover and Pinterest shots.",
    source: "Content brainstorm",
    capturedAt: "2026-05-07T14:05:00",
    lastRevisitedAt: "2026-05-07T14:45:00",
    tags: ["🎥 content idea", "📚 school", "🕯️ soft life"],
  },
  {
    title: "History reading stack",
    category: "School",
    body:
      "Read chapters 8 and 9 before seminar, highlight policy examples, and make one index card for each major date.",
    source: "Study plan",
    capturedAt: "2026-05-06T19:32:00",
    lastRevisitedAt: "2026-05-06T20:08:00",
    tags: ["📚 school", "⏰ deadline"],
  },
  {
    title: "Kyoto quiet afternoon",
    category: "Travel",
    body:
      "Reserve one afternoon with no itinerary: bookshop, garden, cafe journaling, and golden-hour walk back before dinner.",
    source: "Travel note",
    capturedAt: "2026-05-04T12:12:00",
    lastRevisitedAt: "2026-05-04T13:00:00",
    tags: ["✈️ travel", "☕ cafe", "🕯️ soft life"],
  },
  {
    title: "Group presentation tasks",
    category: "Deadlines",
    body:
      "Send the shared slide deck tonight, claim the intro section, and ask Maya for the chart by tomorrow morning.",
    source: "Reminder",
    capturedAt: "2026-05-03T18:30:00",
    lastRevisitedAt: "2026-05-03T19:02:00",
    tags: ["⏰ deadline", "📚 school"],
  },
  {
    title: "Late-night ritual idea",
    category: "Random Thoughts",
    body:
      "Before bed, write down one thing to remember, one thing to release, and one tiny plan for tomorrow morning.",
    source: "Late night note",
    capturedAt: "2026-04-29T23:57:00",
    lastRevisitedAt: "2026-04-30T07:25:00",
    tags: ["🌙 late night", "🕯️ soft life"],
  },
  {
    title: "Lisbon food map",
    category: "Travel",
    body:
      "Pin pasteis de nata, seafood rice, tile museum cafe, and one sunset overlook near the tram route.",
    source: "Saved from notes",
    capturedAt: "2026-04-18T09:15:00",
    lastRevisitedAt: "2026-04-19T11:20:00",
    tags: ["✈️ travel", "☕ cafe"],
  },
  {
    title: "Thumbnail style archive",
    category: "YouTube Ideas",
    body:
      "Collect 12 thumbnails that use cream backgrounds, handwritten arrows, and one expressive face without looking too loud.",
    source: "Design reference",
    capturedAt: "2026-04-10T15:40:00",
    lastRevisitedAt: "2026-04-11T08:00:00",
    tags: ["🎥 content idea"],
  },
];

const categoryList = document.querySelector("#categoryList");
const clearSearch = document.querySelector("#clearSearch");
const dateGroups = document.querySelector("#dateGroups");
const dictationButton = document.querySelector("#dictationButton");
const emptyState = document.querySelector("#emptyState");
const folderCount = document.querySelector("#folderCount");
const form = document.querySelector("#thoughtForm");
const recentTimeline = document.querySelector("#recentTimeline");
const resurfaceCountHero = document.querySelector("#resurfaceCountHero");
const resurfaceList = document.querySelector("#resurfaceList");
const searchInput = document.querySelector("#searchInput");
const thoughtInput = document.querySelector("#thoughtInput");
const totalThoughtsHero = document.querySelector("#totalThoughtsHero");
const visibleCount = document.querySelector("#visibleCount");
const autoCategory = document.querySelector("#autoCategory");
const autoTitle = document.querySelector("#autoTitle");
const voiceFallback = document.querySelector("#voiceFallback");
const voiceStatus = document.querySelector("#voiceStatus");

const categoryNames = Object.keys(categoryConfig);
const openCategories = new Set(["YouTube Ideas", "Random Thoughts"]);
let currentCategory = "Random Thoughts";
let recognition;
let isListening = false;
let speechStartText = "";
let finalTranscript = "";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function formatTimestamp(dateInput) {
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDateGroup(dateInput) {
  const date = new Date(dateInput);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
}

function daysSince(dateInput) {
  const diff = Date.now() - new Date(dateInput).getTime();
  return Math.floor(diff / 86_400_000);
}

function categoryTagClass(category) {
  return `tag-${categoryConfig[category].slug}`;
}

function categoryLabel(category) {
  return `${categoryConfig[category].icon} ${category}`;
}

function noteMatchesSearch(thought, query) {
  if (!query) return true;
  const searchable = [
    thought.title,
    thought.category,
    thought.body,
    thought.source,
    thought.tags.join(" "),
    formatDateGroup(thought.capturedAt),
    formatTimestamp(thought.capturedAt),
  ]
    .join(" ")
    .toLowerCase();
  return searchable.includes(query);
}

function getFilteredThoughts() {
  const query = searchInput.value.trim().toLowerCase();
  return thoughts
    .filter((thought) => noteMatchesSearch(thought, query))
    .sort((a, b) => new Date(b.capturedAt) - new Date(a.capturedAt));
}

function scoreCategory(content, category) {
  const normalized = content.toLowerCase();
  return categoryConfig[category].keywords.reduce((score, keyword) => {
    const pattern = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "gi");
    return score + (normalized.match(pattern) || []).length;
  }, 0);
}

function suggestCategory(content) {
  const normalized = normalizeWhitespace(content);
  if (!normalized) return "Random Thoughts";

  const [bestMatch] = categoryNames
    .map((category) => ({ category, score: scoreCategory(normalized, category) }))
    .sort((a, b) => b.score - a.score);

  return bestMatch.score > 0 ? bestMatch.category : "Random Thoughts";
}

function createTitleFromThought(content) {
  const clean = normalizeWhitespace(content);
  if (!clean) return "Untitled thought";

  const withoutIntro = clean.replace(/^(remember to|note to self:?|idea:?|thought:?)/i, "").trim();
  const sentence = withoutIntro.split(/[.!?]/)[0] || withoutIntro;
  const words = sentence.split(" ").filter(Boolean).slice(0, 6);
  const title = words.join(" ");

  if (!title) return "Untitled thought";
  return title.length > 48 ? `${title.slice(0, 45).trim()}...` : title;
}

function suggestTags(content, category) {
  const normalized = content.toLowerCase();
  const generatedTags = tagRules
    .filter((rule) =>
      rule.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())) ||
      rule.label.toLowerCase() === category.toLowerCase(),
    )
    .map((rule) => `${rule.icon} ${rule.label}`);

  const categoryTag = `${categoryConfig[category].icon} ${category.toLowerCase().replace(" ideas", "")}`;
  return [...new Set([...generatedTags, categoryTag])].slice(0, 4);
}

function createTag(text, extraClass = "") {
  const tag = document.createElement("span");
  tag.className = `tag ${extraClass}`.trim();
  tag.textContent = text;
  return tag;
}

function createThoughtCard(thought, compact = false) {
  const card = document.createElement("article");
  card.className = compact ? "thought-card compact" : "thought-card";

  const header = document.createElement("div");
  header.className = "thought-card-header";

  const category = createTag(categoryLabel(thought.category), categoryTagClass(thought.category));
  const time = document.createElement("time");
  time.dateTime = thought.capturedAt;
  time.textContent = formatTimestamp(thought.capturedAt);
  header.append(category, time);

  const title = document.createElement("h3");
  title.textContent = thought.title;

  const body = document.createElement("p");
  body.textContent = thought.body;

  const footer = document.createElement("div");
  footer.className = "thought-footer";

  const tags = document.createElement("div");
  tags.className = "tag-row";
  tags.replaceChildren(...thought.tags.map((tag) => createTag(tag, "tag-soft")));

  const source = document.createElement("span");
  source.className = "source";
  source.textContent = thought.source;

  footer.append(tags, source);
  card.append(header, title, body, footer);
  return card;
}

function createTimelineItem(thought) {
  const item = document.createElement("article");
  item.className = "timeline-item";

  const dot = document.createElement("span");
  dot.className = `timeline-dot ${categoryTagClass(thought.category)}`;
  dot.setAttribute("aria-hidden", "true");

  const content = document.createElement("div");
  content.className = "timeline-content";
  content.append(createThoughtCard(thought, true));

  item.append(dot, content);
  return item;
}

function renderRecent(filteredThoughts) {
  const recentThoughts = filteredThoughts.slice(0, 6);
  recentTimeline.replaceChildren(...recentThoughts.map(createTimelineItem));
  emptyState.hidden = filteredThoughts.length > 0;
}

function createCategoryPanel(category, filteredThoughts, hasSearchQuery) {
  const categoryThoughts = filteredThoughts.filter((thought) => thought.category === category);
  const panel = document.createElement("section");
  panel.className = "category-panel";

  const panelId = `category-${categoryConfig[category].slug}`;
  const isOpen = openCategories.has(category) || (hasSearchQuery && categoryThoughts.length > 0);

  const toggle = document.createElement("button");
  toggle.className = "category-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-controls", panelId);

  const summary = document.createElement("span");
  summary.className = "category-summary";

  const folderIcon = document.createElement("span");
  folderIcon.className = "folder-icon";
  folderIcon.textContent = categoryConfig[category].icon;

  const label = document.createElement("span");
  const title = document.createElement("strong");
  title.textContent = category;
  const description = document.createElement("small");
  description.textContent = categoryConfig[category].description;
  label.append(title, description);

  const count = document.createElement("span");
  count.className = "category-count";
  count.textContent = `${categoryThoughts.length}`;

  const chevron = document.createElement("span");
  chevron.className = "chevron";
  chevron.textContent = "⌄";
  chevron.setAttribute("aria-hidden", "true");

  summary.append(folderIcon, label);
  toggle.append(summary, count, chevron);

  const body = document.createElement("div");
  body.className = "category-notes";
  body.id = panelId;
  body.hidden = !isOpen;

  if (categoryThoughts.length) {
    body.replaceChildren(...categoryThoughts.map((thought) => createThoughtCard(thought, true)));
  } else {
    const empty = document.createElement("p");
    empty.className = "empty-category";
    empty.textContent = "Nothing saved here yet.";
    body.append(empty);
  }

  toggle.addEventListener("click", () => {
    if (openCategories.has(category)) {
      openCategories.delete(category);
    } else {
      openCategories.add(category);
    }
    render();
  });

  panel.append(toggle, body);
  return panel;
}

function renderCategories(filteredThoughts) {
  const hasSearchQuery = Boolean(searchInput.value.trim());
  categoryList.replaceChildren(
    ...categoryNames.map((category) => createCategoryPanel(category, filteredThoughts, hasSearchQuery)),
  );
}

function renderDateGroups(filteredThoughts) {
  const groups = filteredThoughts.reduce((acc, thought) => {
    const label = formatDateGroup(thought.capturedAt);
    if (!acc.has(label)) acc.set(label, []);
    acc.get(label).push(thought);
    return acc;
  }, new Map());

  dateGroups.replaceChildren(
    ...Array.from(groups.entries())
      .slice(0, 5)
      .map(([label, groupThoughts]) => {
        const group = document.createElement("div");
        group.className = "date-group";

        const heading = document.createElement("div");
        heading.className = "date-group-heading";

        const title = document.createElement("strong");
        title.textContent = label;
        const count = document.createElement("span");
        count.textContent = `${groupThoughts.length} ${groupThoughts.length === 1 ? "thought" : "thoughts"}`;
        heading.append(title, count);

        const list = document.createElement("ul");
        list.replaceChildren(
          ...groupThoughts.slice(0, 3).map((thought) => {
            const item = document.createElement("li");
            const icon = document.createElement("span");
            icon.textContent = categoryConfig[thought.category].icon;
            const text = document.createElement("span");
            text.textContent = thought.title;
            item.append(icon, text);
            return item;
          }),
        );

        group.append(heading, list);
        return group;
      }),
  );
}

function getResurfacedThoughts() {
  return thoughts
    .filter((thought) => daysSince(thought.lastRevisitedAt || thought.capturedAt) >= 10)
    .sort((a, b) => new Date(a.lastRevisitedAt || a.capturedAt) - new Date(b.lastRevisitedAt || b.capturedAt))
    .slice(0, 4);
}

function renderResurface() {
  const resurfaced = getResurfacedThoughts();
  resurfaceCountHero.textContent = resurfaced.length;

  resurfaceList.replaceChildren(
    ...resurfaced.map((thought) => {
      const item = document.createElement("article");
      item.className = "resurface-item";

      const icon = document.createElement("span");
      icon.className = `resurface-icon ${categoryTagClass(thought.category)}`;
      icon.textContent = categoryConfig[thought.category].icon;

      const copy = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = thought.title;
      const meta = document.createElement("p");
      meta.textContent = `Last revisited ${daysSince(thought.lastRevisitedAt || thought.capturedAt)} days ago`;
      copy.append(title, meta);

      item.append(icon, copy);
      return item;
    }),
  );
}

function renderStats(filteredThoughts) {
  totalThoughtsHero.textContent = thoughts.length;
  visibleCount.textContent = `${filteredThoughts.length} shown`;
  folderCount.textContent = `${categoryNames.length} folders`;
}

function render() {
  const filteredThoughts = getFilteredThoughts();
  renderStats(filteredThoughts);
  renderRecent(filteredThoughts);
  renderCategories(filteredThoughts);
  renderDateGroups(filteredThoughts);
  renderResurface();
}

function updateCapturePreview() {
  const content = thoughtInput.value;
  currentCategory = suggestCategory(content);

  const categoryName = document.createElement("strong");
  categoryName.textContent = categoryLabel(currentCategory);
  autoCategory.replaceChildren("Suggested folder: ", categoryName);

  const title = document.createElement("strong");
  title.textContent = createTitleFromThought(content);
  autoTitle.replaceChildren("Title preview: ", title);
}

function setDictationState(listening, statusText) {
  isListening = listening;
  dictationButton.classList.toggle("is-recording", listening);
  dictationButton.setAttribute("aria-label", listening ? "Stop dictation" : "Start dictation");
  voiceStatus.textContent = statusText;
}

function appendTranscript(interimTranscript = "") {
  const baseText = speechStartText.trim();
  const spokenText = normalizeWhitespace(`${finalTranscript} ${interimTranscript}`);
  thoughtInput.value = [baseText, spokenText].filter(Boolean).join(baseText && spokenText ? "\n\n" : "");
  thoughtInput.dispatchEvent(new Event("input"));
}

function setupSpeechRecognition() {
  if (!SpeechRecognition) {
    dictationButton.disabled = true;
    voiceFallback.hidden = false;
    voiceStatus.textContent = "Dictation is unavailable in this browser.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.addEventListener("start", () => {
    setDictationState(true, "Listening softly...");
  });

  recognition.addEventListener("result", (event) => {
    let interimTranscript = "";

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index][0].transcript;
      if (event.results[index].isFinal) {
        finalTranscript = normalizeWhitespace(`${finalTranscript} ${transcript}`);
      } else {
        interimTranscript = normalizeWhitespace(`${interimTranscript} ${transcript}`);
      }
    }

    appendTranscript(interimTranscript);
  });

  recognition.addEventListener("error", (event) => {
    const blocked = event.error === "not-allowed" ? " Microphone permission was blocked." : "";
    setDictationState(false, `Dictation stopped.${blocked}`);
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

  speechStartText = thoughtInput.value;
  finalTranscript = "";

  try {
    recognition.start();
  } catch (error) {
    setDictationState(false, "Dictation stopped.");
  }
});

thoughtInput.addEventListener("input", updateCapturePreview);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const body = normalizeWhitespace(formData.get("thought"));
  if (!body) return;

  const savedCategory = currentCategory;
  const now = new Date().toISOString();

  thoughts.unshift({
    title: createTitleFromThought(body),
    category: savedCategory,
    body,
    source: "New capture",
    capturedAt: now,
    lastRevisitedAt: now,
    tags: suggestTags(body, savedCategory),
  });

  form.reset();
  openCategories.add(savedCategory);
  searchInput.value = "";
  updateCapturePreview();
  setDictationState(false, "Tap the microphone to dictate.");
  render();
});

searchInput.addEventListener("input", render);

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  render();
  searchInput.focus();
});

setupSpeechRecognition();
updateCapturePreview();
render();
