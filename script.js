const $ = (id) => document.getElementById(id);

const screens = {
  start: $("start-screen"),
  quiz: $("quiz-screen"),
  result: $("result-screen"),
};

let current = 0;
let score = 0;
let answers = []; // index the player picked for each question

function show(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function init() {
  $("person-name").textContent = QUIZ.name;
  $("tagline").textContent = QUIZ.tagline;
  document.title = `How well do you know ${QUIZ.name}?`;

  $("start-btn").addEventListener("click", startQuiz);
  $("next-btn").addEventListener("click", nextQuestion);
  $("restart-btn").addEventListener("click", startQuiz);
}

// Shuffle each question's options so the correct answer isn't always in the same spot
function shuffleOptions() {
  QUIZ.questions.forEach((q) => {
    const correct = q.options[q.answer];
    for (let i = q.options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
    }
    q.answer = q.options.indexOf(correct);
  });
}

function startQuiz() {
  current = 0;
  score = 0;
  answers = [];
  shuffleOptions();
  show("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = QUIZ.questions[current];
  const total = QUIZ.questions.length;

  $("progress-text").textContent = `Question ${current + 1} of ${total}`;
  $("score-text").textContent = `Score: ${score}`;
  $("progress-bar").style.width = `${(current / total) * 100}%`;
  $("question-text").textContent = q.question;

  const options = $("options");
  options.innerHTML = "";
  q.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `<span class="letter">${String.fromCharCode(65 + i)}</span><span></span>`;
    btn.lastChild.textContent = text;
    btn.addEventListener("click", () => selectAnswer(i));
    options.appendChild(btn);
  });

  $("fact").classList.add("hidden");
  $("next-btn").classList.add("hidden");
}

function selectAnswer(choice) {
  const q = QUIZ.questions[current];
  const buttons = $("options").querySelectorAll(".option");
  const isCorrect = choice === q.answer;

  answers.push(choice);
  if (isCorrect) score++;

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    else if (i === choice) btn.classList.add("wrong");
    else btn.classList.add("dim");
  });

  $("score-text").textContent = `Score: ${score}`;

  const fact = $("fact");
  const verdict = isCorrect ? "✅ Correct!" : `❌ Nope — it's ${q.options[q.answer]}.`;
  fact.textContent = q.fact ? `${verdict} ${q.fact}` : verdict;
  fact.classList.remove("hidden");

  const next = $("next-btn");
  next.textContent = current === QUIZ.questions.length - 1 ? "See my result" : "Next";
  next.classList.remove("hidden");
  next.focus();
}

function nextQuestion() {
  current++;
  if (current < QUIZ.questions.length) renderQuestion();
  else showResult();
}

function showResult() {
  const total = QUIZ.questions.length;
  const pct = Math.round((score / total) * 100);
  const result = QUIZ.results.find((r) => pct >= r.min) || QUIZ.results[QUIZ.results.length - 1];

  $("progress-bar").style.width = "100%";
  $("final-score").textContent = `${score}/${total}`;
  $("result-title").textContent = result.title;
  $("result-text").textContent = result.text;

  const review = $("review");
  review.innerHTML = "";
  QUIZ.questions.forEach((q, i) => {
    const li = document.createElement("li");
    const ok = answers[i] === q.answer;
    const mark = document.createElement("span");
    mark.className = ok ? "ok" : "no";
    mark.textContent = ok ? "✓ " : "✗ ";
    li.append(mark, `${q.question} — ${q.options[q.answer]}`);
    review.appendChild(li);
  });

  show("result");
}

init();
