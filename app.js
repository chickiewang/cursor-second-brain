const categories = {
  "YouTube Ideas": "youtube",
  School: "school",
  Travel: "travel",
  Deadlines: "deadlines",
  "Random Thoughts": "random",
};

const notes = [
  {
    title: "Video hook: study reset",
    category: "YouTube Ideas",
    body:
      "Open with a messy desk time-lapse, then cut to a quiet 25-minute planning ritual with warm music and captions.",
    source: "Pasted note",
    date: "Today",
  },
  {
    title: "History paper thesis",
    category: "School",
    body:
      "Argue that local newspapers shaped public opinion faster than official speeches during the early reform period.",
    source: "Class notes",
    date: "Yesterday",
  },
  {
    title: "Lisbon food list",
    category: "Travel",
    body:
      "Try pasteis de nata near Belem, book the tile museum, and keep one slow afternoon open for Alfama photos.",
    source: "Voice memo",
    date: "Mar 18",
  },
  {
    title: "Scholarship application",
    category: "Deadlines",
    body:
      "Draft personal statement by Friday, request recommendation letter, and upload transcript before 11:59 PM.",
    source: "Reminder",
    date: "Mar 16",
  },
  {
    title: "Tiny observation",
    category: "Random Thoughts",
    body:
      "People remember how simple a tool feels more than how many features it technically has.",
    source: "Random thought",
    date: "Mar 14",
  },
  {
    title: "Voice memo: channel themes",
    category: "YouTube Ideas",
    body:
      "Three recurring playlists: productive weekends, honest school diaries, and travel planning breakdowns.",
    source: "Transcription",
    date: "Mar 12",
  },
  {
    title: "Calculus exam prep",
    category: "School",
    body:
      "Review integration by parts, redo problem set 6, and make a formula sheet from the last three quizzes.",
    source: "Study plan",
    date: "Mar 10",
  },
  {
    title: "Tokyo packing notes",
    category: "Travel",
    body:
      "Pack compression cubes, portable charger, rain shell, Suica card, and one blank notebook for cafe sketches.",
    source: "Checklist",
    date: "Mar 8",
  },
  {
    title: "Project pitch due",
    category: "Deadlines",
    body:
      "Finalize slides, add a quick prototype recording, and rehearse the two-minute problem statement.",
    source: "Deadline",
    date: "Mar 7",
  },
  {
    title: "Late night idea",
    category: "Random Thoughts",
    body:
      "Build a weekly review ritual around three questions: what mattered, what moved, and what needs a home?",
    source: "Pasted note",
    date: "Mar 5",
  },
  {
    title: "Dorm room grocery run",
    category: "School",
    body:
      "Coffee filters, oats, bananas, printer paper, blue pens, sticky notes, and a new desk lamp bulb.",
    source: "Quick list",
    date: "Mar 3",
  },
  {
    title: "Weekend itinerary template",
    category: "Travel",
    body:
      "One anchor activity per day, two food options nearby, transit backup, and one no-plan wandering block.",
    source: "Template",
    date: "Mar 1",
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

let recognition;
let isListening = false;
let speechStartText = "";
let finalTranscript = "";
let currentAutoCategory = "Random Thoughts";
const openCategories = new Set(["Random Thoughts"]);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const categoryKeywords = {
  "YouTube Ideas": [
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
    "calculus",
    "history",
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
    "tomorrow",
    "11:59",
  ],
};

function categoryClass(category) {
  return `tag-${categories[category]}`;
}

function noteMatchesSearch(note, query) {
  const searchable = `${note.title} ${note.category} ${note.body} ${note.source}`.toLowerCase();
  return searchable.includes(query);
}

function renderNotes() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => noteMatchesSearch(note, query));

  categoryList.replaceChildren(
    ...Object.keys(categories).map((category) => {
      const categoryNotes = filteredNotes.filter((note) => note.category === category);
      return createCategoryPanel(category, categoryNotes, Boolean(query));
    }),
  );

  visibleCount.textContent = filteredNotes.length;
  totalNotesHero.textContent = notes.length;
  emptyState.hidden = filteredNotes.length > 0;
}

function createCategoryPanel(category, categoryNotes, hasSearchQuery) {
  const panel = document.createElement("section");
  panel.className = "category-panel";

  const panelId = `category-${categories[category]}`;
  const isOpen = openCategories.has(category) || (hasSearchQuery && categoryNotes.length > 0);

  const toggle = document.createElement("button");
  toggle.className = "category-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-controls", panelId);

  const summary = document.createElement("span");
  summary.className = "category-summary";

  const tag = document.createElement("span");
  tag.className = `tag ${categoryClass(category)}`;
  tag.textContent = category;

  const count = document.createElement("span");
  count.className = "category-count";
  count.textContent = `${categoryNotes.length} ${categoryNotes.length === 1 ? "note" : "notes"}`;

  const icon = document.createElement("span");
  icon.className = "category-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = isOpen ? "-" : "+";

  summary.append(tag, count);
  toggle.append(summary, icon);

  const body = document.createElement("div");
  body.className = "category-notes";
  body.id = panelId;
  body.hidden = !isOpen;

  if (categoryNotes.length) {
    body.replaceChildren(...categoryNotes.map(createNoteCard));
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
    renderNotes();
  });

  panel.append(toggle, body);
  return panel;
}

function createNoteCard(note) {
  const card = document.createElement("article");
  card.className = "note-card";

  const tag = document.createElement("span");
  tag.className = `tag ${categoryClass(note.category)}`;
  tag.textContent = note.category;

  const title = document.createElement("h3");
  title.textContent = note.title;

  const body = document.createElement("p");
  body.textContent = note.body;

  const meta = document.createElement("div");
  meta.className = "note-meta";

  const source = document.createElement("span");
  source.textContent = note.source;

  const date = document.createElement("span");
  date.textContent = note.date;

  meta.append(source, date);
  card.append(tag, title, body, meta);

  return card;
}

searchInput.addEventListener("input", renderNotes);

clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  renderNotes();
});

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
  categoryName.textContent = category;
  autoCategory.replaceChildren("Auto category: ", categoryName);
}

function updateAutoCategory() {
  currentAutoCategory = suggestCategory(noteBody.value);
  showAutoCategory(currentAutoCategory);
}

function createTitleFromThought(thought) {
  const normalizedThought = thought.replace(/\s+/g, " ").trim();
  if (!normalizedThought) return "Untitled thought";

  const words = normalizedThought.split(" ").slice(0, 7).join(" ");
  return normalizedThought.length > words.length ? `${words}...` : words;
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

noteBody.addEventListener("input", updateAutoCategory);

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(noteForm);
  const thought = formData.get("body").trim();
  const savedCategory = currentAutoCategory;

  notes.unshift({
    title: createTitleFromThought(thought),
    category: savedCategory,
    body: thought,
    source: "New note",
    date: "Just now",
  });

  noteForm.reset();
  updateAutoCategory();
  setDictationState(false, "Tap to dictate");
  openCategories.add(savedCategory);
  searchInput.value = "";
  renderNotes();
});

setupSpeechRecognition();
updateAutoCategory();
renderNotes();
