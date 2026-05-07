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

const notesGrid = document.querySelector("#notesGrid");
const searchInput = document.querySelector("#searchInput");
const categoryButtons = document.querySelectorAll(".category-filter");
const visibleCount = document.querySelector("#visibleCount");
const emptyState = document.querySelector("#emptyState");
const clearFilters = document.querySelector("#clearFilters");
const noteForm = document.querySelector("#noteForm");
const uploadInput = document.querySelector("#transcriptionUpload");
const noteBody = document.querySelector("#noteBody");
const totalNotesHero = document.querySelector("#totalNotesHero");
const voiceCapture = document.querySelector(".voice-capture");
const voiceStatus = document.querySelector("#voiceStatus");
const startVoice = document.querySelector("#startVoice");
const stopVoice = document.querySelector("#stopVoice");

let activeCategory = "All";
let recognition;
let isRecording = false;
let speechStartText = "";
let finalTranscript = "";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function categoryClass(category) {
  return `tag-${categories[category]}`;
}

function noteMatchesSearch(note, query) {
  const searchable = `${note.title} ${note.category} ${note.body} ${note.source}`.toLowerCase();
  return searchable.includes(query);
}

function renderNotes() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => {
    const matchesCategory = activeCategory === "All" || note.category === activeCategory;
    return matchesCategory && noteMatchesSearch(note, query);
  });

  notesGrid.replaceChildren(...filteredNotes.map(createNoteCard));

  visibleCount.textContent = filteredNotes.length;
  totalNotesHero.textContent = notes.length;
  emptyState.hidden = filteredNotes.length > 0;
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

function setActiveCategory(category) {
  activeCategory = category;
  categoryButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });
  renderNotes();
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveCategory(button.dataset.category));
});

searchInput.addEventListener("input", renderNotes);

clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  setActiveCategory("All");
});

function appendTranscript(interimTranscript = "") {
  const baseText = speechStartText.trim();
  const spokenText = `${finalTranscript} ${interimTranscript}`.trim();
  noteBody.value = [baseText, spokenText].filter(Boolean).join(baseText && spokenText ? "\n\n" : "");
}

function setRecordingState(recording) {
  isRecording = recording;
  voiceCapture.classList.toggle("is-recording", recording);
  startVoice.classList.toggle("is-recording", recording);
  startVoice.disabled = recording || !recognition;
  stopVoice.disabled = !recording;
  startVoice.setAttribute("aria-label", recording ? "Voice recording in progress" : "Start voice recording");
}

function setupSpeechRecognition() {
  if (!SpeechRecognition) {
    startVoice.disabled = true;
    stopVoice.disabled = true;
    voiceStatus.textContent =
      "Voice recognition is not supported in this browser. You can still paste notes or upload a transcription.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.addEventListener("start", () => {
    setRecordingState(true);
    voiceStatus.textContent = "Recording... speak naturally. Your words will appear in the note box.";
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
    const fallback = event.error === "not-allowed" ? " Microphone permission was blocked." : "";
    voiceStatus.textContent = `Voice recognition stopped.${fallback}`;
    setRecordingState(false);
  });

  recognition.addEventListener("end", () => {
    setRecordingState(false);
    voiceStatus.textContent = finalTranscript
      ? "Transcription added. Tap the microphone to record more."
      : "Recording stopped. Tap the microphone to try again.";
  });
}

startVoice.addEventListener("click", () => {
  if (!recognition || isRecording) return;

  speechStartText = noteBody.value;
  finalTranscript = "";

  try {
    recognition.start();
  } catch (error) {
    voiceStatus.textContent = "Voice recognition is already starting. Please try again in a moment.";
  }
});

stopVoice.addEventListener("click", () => {
  if (!recognition || !isRecording) return;
  recognition.stop();
  voiceStatus.textContent = "Stopping recording...";
});

uploadInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  const transcription = await file.text();
  noteBody.value = noteBody.value
    ? `${noteBody.value.trim()}\n\n${transcription.trim()}`
    : transcription.trim();
});

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(noteForm);

  notes.unshift({
    title: formData.get("title").trim(),
    category: formData.get("category"),
    body: formData.get("body").trim(),
    source: uploadInput.files.length ? "Uploaded transcription" : "New note",
    date: "Just now",
  });

  noteForm.reset();
  setActiveCategory("All");
  searchInput.value = "";
  renderNotes();
});

setupSpeechRecognition();
renderNotes();
