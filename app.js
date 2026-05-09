const STORAGE_KEY = "second-brain-thoughts";

const categories = [
  {
    name: "YouTube Ideas",
    icon: "🎥",
    keywords: ["youtube", "video", "film", "reel", "thumbnail", "vlog", "camera", "edit", "cinematic"],
  },
  {
    name: "School",
    icon: "☕",
    keywords: ["study", "school", "class", "lecture", "essay", "exam", "campus", "reading", "notes"],
  },
  {
    name: "Travel",
    icon: "✈️",
    keywords: ["travel", "airport", "train", "flight", "hotel", "city", "trip", "passport", "packing"],
  },
  {
    name: "Deadlines",
    icon: "🌙",
    keywords: ["deadline", "due", "submit", "tomorrow", "meeting", "reminder", "appointment", "finish"],
  },
  {
    name: "Random Thoughts",
    icon: "✦",
    keywords: ["thought", "remember", "idea", "feeling", "random", "maybe", "dream", "soft"],
  },
];

const categoryByName = Object.fromEntries(categories.map((category) => [category.name, category]));

const sampleThoughts = [
  {
    body:
      "Film a cozy airport study vlog intro: iced latte on the tray table, passport flat lay, then a voiceover about how traveling makes me romanticize discipline.",
    category: "YouTube Ideas",
    createdAt: minutesAgo(18),
    tags: ["🎥", "✈️", "☕"],
  },
  {
    body:
      "Ask professor if the research reflection can include screenshots from the museum archive. It would make the essay feel more visual and less dry.",
    category: "School",
    createdAt: minutesAgo(64),
    tags: ["☕", "🌙"],
  },
  {
    body:
      "Pack the cream cardigan, film camera, mini tripod, and the tiny notebook with the pink elastic. Leave room for books from the station shop.",
    category: "Travel",
    createdAt: hoursAgo(5),
    tags: ["✈️"],
  },
  {
    body:
      "Submit scholarship paragraph before 9 PM. Make it honest: creative routines, independent study, and why building a personal archive matters.",
    category: "Deadlines",
    createdAt: hoursAgo(11),
    tags: ["🌙"],
  },
  {
    body:
      "Pinterest board idea: desks near windows, peachy lamps, annotated books, soft morning light, tiny bowls of cherries, and handwritten content calendars.",
    category: "Random Thoughts",
    createdAt: daysAgo(1, 9, 35),
    tags: ["☕", "✦"],
  },
  {
    body:
      "YouTube series: 'things I learned from studying in different cities' with each episode tied to one place, one cafe, one book, one lesson.",
    category: "YouTube Ideas",
    createdAt: daysAgo(2, 20, 14),
    tags: ["🎥", "✈️"],
  },
  {
    body:
      "Review flashcards on the train, then rewrite the messy lecture notes into a clean Notion page with only the concepts that keep repeating.",
    category: "School",
    createdAt: daysAgo(3, 7, 48),
    tags: ["☕"],
  },
  {
    body:
      "There is something about hotel desks that makes every idea feel temporary and urgent. Maybe write an essay about borrowed rooms and focus.",
    category: "Random Thoughts",
    createdAt: daysAgo(5, 23, 2),
    tags: ["✈️", "🌙"],
  },
  {
    body:
      "Edit the Rome b-roll into a quiet montage: crosswalk sounds, receipt closeups, pink sunset, then the sentence 'I kept the proof that I was here.'",
    category: "YouTube Ideas",
    createdAt: daysAgo(9, 18, 26),
    tags: ["🎥", "✈️", "🌙"],
  },
  {
    body:
      "Potential thesis angle: memory systems are not just productivity tools, they are emotional safety nets for creative people with too many tabs open.",
    category: "School",
    createdAt: daysAgo(14, 10, 5),
    tags: ["☕", "✦"],
  },
  {
    body:
      "Find the voice memo from the night walk in Lisbon. I said something about streetlights looking like punctuation and it might be a caption.",
    category: "Random Thoughts",
    createdAt: daysAgo(21, 22, 42),
    tags: ["🌙", "✈️"],
  },
  {
    body:
      "Renew passport reminder, check camera battery charger, and download offline maps before the next weekend trip.",
    category: "Deadlines",
    createdAt: daysAgo(24, 16, 17),
    tags: ["✈️", "🌙"],
  },
];

let thoughts = loadThoughts();
let recognition = null;
let isListening = false;
let allExpanded = true;

const els = {
  input: document.querySelector("#thought-input"),
  micButton: document.querySelector("#mic-button"),
  saveButton: document.querySelector("#save-button"),
  suggestedCategory: document.querySelector("#suggested-category"),
  searchInput: document.querySelector("#search-input"),
  recentList: document.querySelector("#recent-list"),
  folders: document.querySelector("#folders"),
  resurfaceList: document.querySelector("#resurface-list"),
  thoughtCount: document.querySelector("#thought-count"),
  expandToggle: document.querySelector("#expand-toggle"),
  dictationStatus: document.querySelector("#dictation-status"),
  noteTemplate: document.querySelector("#note-template"),
};

document.addEventListener("DOMContentLoaded", () => {
  render();
  setupSpeechRecognition();
});

els.input.addEventListener("input", () => {
  els.suggestedCategory.textContent = suggestCategory(els.input.value).name;
});

els.saveButton.addEventListener("click", saveThought);

els.input.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    saveThought();
  }
});

els.searchInput.addEventListener("input", render);
els.expandToggle.addEventListener("click", toggleAllFolders);

document.querySelectorAll(".tag-chip").forEach((button) => {
  button.addEventListener("click", () => {
    const insert = button.dataset.insert;
    const spacer = els.input.value.trim().length ? " " : "";
    els.input.value = `${els.input.value}${spacer}${insert} `;
    els.input.focus();
    els.suggestedCategory.textContent = suggestCategory(els.input.value).name;
  });
});

function loadThoughts() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleThoughts));
    return sampleThoughts;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : sampleThoughts;
  } catch {
    return sampleThoughts;
  }
}

function saveThought() {
  const body = els.input.value.trim();

  if (!body) {
    els.input.focus();
    els.input.classList.add("needs-attention");
    window.setTimeout(() => els.input.classList.remove("needs-attention"), 500);
    return;
  }

  const category = suggestCategory(body).name;
  const thought = {
    body,
    category,
    createdAt: new Date().toISOString(),
    tags: suggestTags(body, category),
  };

  thoughts = [thought, ...thoughts];
  persistThoughts();
  els.input.value = "";
  els.suggestedCategory.textContent = "Random Thoughts";
  render();
}

function persistThoughts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(thoughts));
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    els.micButton.disabled = true;
    els.micButton.title = "Speech recognition is not supported in this browser.";
    els.dictationStatus.textContent =
      "Voice dictation needs Chrome, Edge, or another browser with Web Speech API support.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.addEventListener("start", () => {
    isListening = true;
    els.micButton.classList.add("is-listening");
    els.dictationStatus.textContent = "Listening... speak your messy idea.";
  });

  recognition.addEventListener("result", (event) => {
    const transcript = Array.from(event.results)
      .slice(event.resultIndex)
      .map((result) => result[0].transcript)
      .join("");

    if (transcript) {
      const spacer = els.input.value.trim().length ? " " : "";
      els.input.value = `${els.input.value}${spacer}${transcript.trim()}`;
      els.suggestedCategory.textContent = suggestCategory(els.input.value).name;
    }
  });

  recognition.addEventListener("end", () => {
    isListening = false;
    els.micButton.classList.remove("is-listening");
    els.dictationStatus.textContent = "Dictation paused. Tap the mic again to keep going.";
  });

  recognition.addEventListener("error", (event) => {
    isListening = false;
    els.micButton.classList.remove("is-listening");
    els.dictationStatus.textContent = `Dictation stopped: ${event.error}.`;
  });

  els.micButton.addEventListener("click", () => {
    if (isListening) {
      recognition.stop();
      return;
    }

    recognition.start();
  });
}

function render() {
  const query = els.searchInput.value.trim().toLowerCase();
  const filtered = getFilteredThoughts(query);

  els.thoughtCount.textContent = `${thoughts.length} ${thoughts.length === 1 ? "thought" : "thoughts"}`;
  renderRecent(filtered);
  renderResurface(filtered);
  renderFolders(filtered);
}

function getFilteredThoughts(query) {
  const sorted = [...thoughts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!query) {
    return sorted;
  }

  return sorted.filter((thought) => {
    const haystack = [
      thought.body,
      thought.category,
      generateTitle(thought.body),
      ...(thought.tags || []),
      formatDate(thought.createdAt),
      formatTime(thought.createdAt),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

function renderRecent(items) {
  els.recentList.innerHTML = "";

  if (!items.length) {
    els.recentList.innerHTML = `<p class="empty-state">No thoughts match your search yet.</p>`;
    return;
  }

  items.slice(0, 6).forEach((thought) => {
    els.recentList.appendChild(createNoteCard(thought));
  });
}

function renderResurface(items) {
  els.resurfaceList.innerHTML = "";
  const older = items
    .filter((thought) => daysBetween(new Date(thought.createdAt), new Date()) >= 7)
    .slice(0, 3);

  if (!older.length) {
    els.resurfaceList.innerHTML =
      '<p class="empty-state">Older ideas will appear here once your archive has a little history.</p>';
    return;
  }

  older.forEach((thought) => {
    const item = document.createElement("article");
    item.className = "resurface-item";
    item.innerHTML = `
      <strong>${escapeHtml(generateTitle(thought.body))}</strong>
      <p>${escapeHtml(truncate(thought.body, 120))}</p>
      <div class="note-meta">
        <span>${categoryByName[thought.category]?.icon || "✦"} ${escapeHtml(thought.category)}</span>
        <span>${formatDate(thought.createdAt)}</span>
      </div>
    `;
    els.resurfaceList.appendChild(item);
  });
}

function renderFolders(items) {
  els.folders.innerHTML = "";

  categories.forEach((category) => {
    const categoryThoughts = items.filter((thought) => thought.category === category.name);
    const folder = document.createElement("section");
    folder.className = "folder";
    folder.setAttribute("aria-expanded", String(allExpanded));

    const bodyId = `folder-${slugify(category.name)}`;
    folder.innerHTML = `
      <button class="folder-summary" type="button" aria-controls="${bodyId}" aria-expanded="${allExpanded}">
        <span class="folder-title">${category.icon} ${category.name}</span>
        <span class="soft-badge">${categoryThoughts.length}</span>
      </button>
      <div id="${bodyId}" class="folder-body"></div>
    `;

    const summaryButton = folder.querySelector(".folder-summary");
    const folderBody = folder.querySelector(".folder-body");

    summaryButton.addEventListener("click", () => {
      const expanded = folder.getAttribute("aria-expanded") === "true";
      folder.setAttribute("aria-expanded", String(!expanded));
      summaryButton.setAttribute("aria-expanded", String(!expanded));
    });

    if (categoryThoughts.length) {
      renderDateGroups(folderBody, categoryThoughts);
    } else {
      folderBody.innerHTML = '<p class="empty-state">Nothing here yet.</p>';
    }

    els.folders.appendChild(folder);
  });
}

function renderDateGroups(container, items) {
  const groups = items.reduce((acc, thought) => {
    const label = formatDate(thought.createdAt);
    acc[label] = acc[label] || [];
    acc[label].push(thought);
    return acc;
  }, {});

  Object.entries(groups).forEach(([date, groupThoughts]) => {
    const dateGroup = document.createElement("section");
    dateGroup.className = "date-group";
    dateGroup.innerHTML = `
      <div class="date-row">
        <span>${escapeHtml(date)}</span>
        <span>${groupThoughts.length} ${groupThoughts.length === 1 ? "idea" : "ideas"}</span>
      </div>
    `;

    groupThoughts.forEach((thought) => {
      const mini = document.createElement("article");
      mini.className = "mini-note";
      mini.innerHTML = `
        <strong>${escapeHtml(generateTitle(thought.body))}</strong>
        <p>${escapeHtml(thought.body)}</p>
        <div class="note-meta">
          ${(thought.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          <span>${formatTime(thought.createdAt)}</span>
        </div>
      `;
      dateGroup.appendChild(mini);
    });

    container.appendChild(dateGroup);
  });
}

function createNoteCard(thought) {
  const fragment = els.noteTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".note-card");
  const category = categoryByName[thought.category] || categoryByName["Random Thoughts"];

  card.querySelector(".note-icon").textContent = thought.tags?.[0] || category.icon;
  card.querySelector(".note-time").textContent = formatRelativeTime(thought.createdAt);
  card.querySelector("h4").textContent = generateTitle(thought.body);
  card.querySelector("p").textContent = thought.body;

  const meta = card.querySelector(".note-meta");
  meta.innerHTML = `
    <span>${category.icon} ${escapeHtml(thought.category)}</span>
    <span>${formatDate(thought.createdAt)}</span>
    ${(thought.tags || []).slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
  `;

  return fragment;
}

function suggestCategory(text) {
  const normalized = text.toLowerCase();
  let best = categories[categories.length - 1];
  let bestScore = 0;

  categories.forEach((category) => {
    const score = category.keywords.reduce((total, keyword) => {
      return total + (normalized.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      best = category;
      bestScore = score;
    }
  });

  return best;
}

function suggestTags(text, categoryName) {
  const normalized = text.toLowerCase();
  const tags = new Set();
  const category = categoryByName[categoryName];

  if (category) {
    tags.add(category.icon);
  }

  if (/(travel|airport|flight|train|city|trip|hotel|passport)/.test(normalized)) tags.add("✈️");
  if (/(coffee|cafe|study|class|essay|lecture|morning)/.test(normalized)) tags.add("☕");
  if (/(night|midnight|dream|moon|late|tomorrow|deadline)/.test(normalized)) tags.add("🌙");
  if (/(youtube|film|video|vlog|reel|camera|edit)/.test(normalized)) tags.add("🎥");
  if (!tags.size) tags.add("✦");

  return Array.from(tags).slice(0, 4);
}

function generateTitle(text) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const sentence = cleaned.split(/[.!?]/)[0];
  const words = sentence.split(" ").filter(Boolean);

  if (words.length <= 7) {
    return sentence || "Untitled thought";
  }

  return `${words.slice(0, 7).join(" ")}...`;
}

function formatDate(value) {
  const date = new Date(value);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  }).format(date);
}

function formatTime(value) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatRelativeTime(value) {
  const diff = new Date() - new Date(value);
  const minutes = Math.max(1, Math.floor(diff / 60000));

  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function toggleAllFolders() {
  allExpanded = !allExpanded;
  els.expandToggle.textContent = allExpanded ? "Collapse all" : "Expand all";

  document.querySelectorAll(".folder").forEach((folder) => {
    const button = folder.querySelector(".folder-summary");
    folder.setAttribute("aria-expanded", String(allExpanded));
    button.setAttribute("aria-expanded", String(allExpanded));
  });
}

function daysBetween(older, newer) {
  return Math.floor((newer - older) / 86400000);
}

function truncate(text, length) {
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}

function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60000).toISOString();
}

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 3600000).toISOString();
}

function daysAgo(days, hour, minute) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}
