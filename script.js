/* ===== EDIT THESE ===== */
const START = new Date("2026-10-18T00:00:00"); // your monthsary start date (the 18th)
const SONG = "araw araw.mp3"; // optional: your own song file in the same folder, e.g. "song.mp3". Leave empty to use the built-in music box tune.
const MOMENTS = [
  {
    date: "Monday, August 10 2026",
    title: "The day we met",
    text: "our first meeting, grabe sobrang ganda mo mahal. nahihiya pa ako sayo dyan pero dahil dinadaldal mo ako, ang bilis ko naging komportable para hawakan agad ang mga kamay mo",
    photo: "photos/first meet up.jpg",
  },
  {
    date: "Monday, August 10 2026",
    title: "Our first date",
    text: "we ate at the mcdo that time. nilalamig ako dyan sobra WHAHAHAHHAHAHAH nahihiya kasi talaga ako sayo nung time na yan eheheh.",
    photo: "photos/first date.jpg",
  },
  {
    date: "Monday, September 21 2026",
    title: "Just us",
    text: "Super random lang. i just love how we spend time together, full of kilig, tawa, and we can just be ourselves freely.",
    photo: "photos/just us.jpg",
  },
  {
    date: "Monday, October 18 2026",
    title: "The day we became official!!!",
    text: "Genuinely unexpected, i don't know what to say. hindi ko nalang napigilan na maging emotional that time. sobrang saya ko kasi ikaw. mahal na mahal kita, let's be togetherness baby:)",
    photo: "photos/official.jpg",
  },
];
const LETTER =
  "happy monthsary, mahal ko,\n\nanother month with you, baby! honestly, i don't even know where to start because there's just so much i want to tell you. first of all, i just want to say how grateful i am to have you in my life. im really really lucky to have someone like you, and i hope you know how much i appreciate you and everything you do for me.\n\nyou're clearly the best girlfriend i could ever ask for. i love everything about you, mahal ko. from ur smile, ur eyes, ur voice, ur humor, urr random yaps, hanggang sa mga simpleng updates mo about your day. i love listening to u, even when ur just talking abt little things that happen to u. you probably don't realize it, but those little things make me happy. i love getting to know you more, chloe.\n\nthank you for always being there for me, especially sa mga araw na hindi tayo okay or hindi okay ang isa sa atin. thank you for understanding me, being patient, and making me feel loved even in the simplestway. i always see ur efforts, even the smallest ones. sobrang na aappreciate ko lahat yon. thank you for being my girlfriend and someone na laging nandito para sakin. thank u for letting me be part of your life and for allowing me to love you.\n\nhappy monthsaryy ulit, mahal ko heheahe i hope we get to celebrate many more monthsaries together diba. please dont ever doubt how much you mean to me, oki? im always thankful that its you. salamat dahil ikaw.\n\n i love you so much, baby. more than i could ever imagine. patuloy pa rin kita ipu-pursue kahit girlfriend na kita. i love you always, chloe. pipiliin kita sa araw araw.";
/* ====================== */

const $ = (id) => document.getElementById(id);

function tick() {
  let ms = Math.max(0, Date.now() - START.getTime());
  const d = Math.floor(ms / 864e5),
    h = Math.floor(ms / 36e5) % 24,
    m = Math.floor(ms / 6e4) % 60,
    s = Math.floor(ms / 1e3) % 60;
  $("count").innerHTML = [
    [d, "days"],
    [h, "hours"],
    [m, "minutes"],
    [s, "seconds"],
  ]
    .map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`)
    .join("");
}
tick();
setInterval(tick, 1000);

$("tl").innerHTML = MOMENTS.map(
  (m) =>
    `<li><time>${m.date}</time><h3>${m.title}</h3><p>${m.text}</p>${
      m.photo
        ? `<div class="ph" style="background-image:url('${m.photo}');border-style:solid"></div>`
        : `<div class="ph">Your photo goes here</div>`
    }</li>`,
).join("");

function heart() {
  const e = document.createElement("div");
  e.className = "heart";
  e.textContent = "♥";
  e.style.left = Math.random() * 100 + "vw";
  e.style.fontSize = 12 + Math.random() * 18 + "px";
  e.style.animationDuration = 7 + Math.random() * 5 + "s";
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 12000);
}
setInterval(heart, 1400);

/* ---- music ---- */
let ctx,
  song,
  timer,
  step = 0,
  playing = false;
const LEAD = [
  523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33, 523.25, 659.25,
  783.99, 1046.5, 987.77, 783.99, 659.25, 783.99, 698.46, 880, 1046.5, 880,
  783.99, 698.46, 659.25, 587.33, 523.25, 659.25, 783.99, 659.25, 587.33,
  493.88, 523.25, 0,
];
const BASS = [130.81, 110, 87.31, 98];
function note(f, t, dur, type, vol) {
  const o = ctx.createOscillator(),
    g = ctx.createGain();
  o.type = type;
  o.frequency.value = f;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t);
  o.stop(t + dur);
}
function tune() {
  const t = ctx.currentTime + 0.05,
    f = LEAD[step % LEAD.length];
  if (f) note(f, t, 1.2, "triangle", 0.09);
  if (step % 8 === 0) note(BASS[(step / 8) % 4], t, 3, "sine", 0.1);
  step++;
}
function play() {
  if (playing) return;
  playing = true;
  try {
    if (SONG) {
      song =
        song || Object.assign(new Audio(SONG), { loop: true, volume: 0.6 });
      song.play().catch(() => {});
    } else {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume();
      timer = setInterval(tune, 420);
    }
  } catch (e) {}
}
function stopMusic() {
  playing = false;
  if (song) song.pause();
  clearInterval(timer);
}
$("mute").onclick = () => {
  if (playing) {
    stopMusic();
    $("mute").textContent = "♪ off";
    $("mute").setAttribute("aria-label", "Play music");
  } else {
    play();
    $("mute").textContent = "♪";
    $("mute").setAttribute("aria-label", "Pause music");
  }
};

let typing = false;
$("open").onclick = () => {
  if (typing) return;
  typing = true;
  play();
  $("mute").style.display = "block";
  $("open").style.display = "none";
  const p = $("paper");
  p.style.display = "block";
  let i = 0;
  const t = setInterval(() => {
    p.textContent = LETTER.slice(0, ++i);
    if (i >= LETTER.length) {
      clearInterval(t);
      $("ask").style.display = "block";
      $("ask").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 45);
};

const no = $("no"),
  btns = $("btns");
function dodge() {
  const r = btns.getBoundingClientRect();
  no.style.position = "absolute";
  no.style.left = Math.random() * (r.width - no.offsetWidth) + "px";
  no.style.top = Math.random() * 60 - 20 + "px";
}
no.addEventListener("mouseenter", dodge);
no.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    dodge();
  },
  { passive: false },
);
no.addEventListener("click", dodge);
$("yes").onclick = () => {
  btns.style.display = "none";
  $("q").style.display = "none";
  $("done").style.display = "block";
  for (let i = 0; i < 25; i++) setTimeout(heart, i * 80);
};
