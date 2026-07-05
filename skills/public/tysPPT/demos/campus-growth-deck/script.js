const slides = [
  {
    nav: "开场",
    type: "hero",
    title: "把大学过成",
    titleAccent: "可积累的项目",
    lead: "这不是一份鸡汤式规划，而是一套能被复盘、能被展示、能帮助你做选择的大学成长路线图。",
    tags: ["成长规划", "课程展示", "班会分享"],
    metrics: [
      ["4", "年路径"],
      ["30m", "每周复盘"],
      ["1", "个作品集"],
    ],
    note: "开场先把主题说清楚：大学不是简单忙四年，而是持续留下能证明自己的成果。",
  },
  {
    nav: "问题",
    type: "problems",
    title: "时间很多，方向却容易散",
    lead: "大学生真正的挑战，是把课程、社团、竞赛、实习和生活放进同一个系统里。",
    cards: [
      ["任务碎片化", "每件事都重要，但没有一条主线，最后容易只剩忙碌感。"],
      ["经历不可见", "做过很多活动，却没有整理成作品、数据、截图或可讲述的案例。"],
      ["选择靠临时判断", "到升学、就业或转专业节点，才发现自己缺少长期证据。"],
    ],
    note: "这一页要让听众共鸣：不是不努力，而是缺少把努力沉淀下来的方法。",
  },
  {
    nav: "模型",
    type: "map",
    title: "用四个账户管理大学生活",
    lead: "每个月检查一次：哪个账户正在增值，哪个账户正在透支。",
    nodes: [
      ["学业账户", "课程与基础"],
      ["作品账户", "项目与竞赛"],
      ["人脉账户", "同伴与导师"],
      ["健康账户", "睡眠与情绪"],
    ],
    note: "四个账户是整套方法的核心。它足够简单，适合长期坚持。",
  },
  {
    nav: "路径",
    type: "timeline",
    title: "四年不是重复四次大一",
    lead: "每一年都应该留下一个可展示、可复盘、可帮助下一步选择的成果。",
    years: [
      ["大一", "适应与探索", "建立学习系统，找到 2-3 个真实兴趣方向。", "#246bfe"],
      ["大二", "能力与协作", "进入项目或社团核心任务，开始形成作品。", "#10a778"],
      ["大三", "证据与选择", "竞赛、科研、实习至少选择一个主攻方向。", "#f4b740"],
      ["大四", "表达与跃迁", "用作品集和经历讲清升学或就业竞争力。", "#f36f5f"],
    ],
    note: "这一页可以结合自己的专业替换成更具体的路径。",
  },
  {
    nav: "行动",
    type: "checklist",
    title: "每周 30 分钟，让努力留下痕迹",
    lead: "动态 PPT 可以是展示工具，也可以成为复盘工具。",
    items: ["本周完成了什么", "下周只抓哪一件重点", "遇到的一个卡点", "留下一个证据截图或链接", "更新一次个人作品集"],
    note: "现场可以点击清单，模拟复盘完成过程，让页面更像互动演示。",
  },
  {
    nav: "场景",
    type: "modes",
    title: "同一套 Skill，可以服务不同校园场景",
    lead: "内容换一层结构，就能变成课程汇报、社团招新或竞赛路演。",
    modes: {
      growth: ["成长规划", "适合班会、辅导员谈话、个人复盘。重点讲阶段目标、行动证据和下一步。"],
      course: ["课程汇报", "适合小组作业和课堂展示。重点讲问题、方法、发现、成果和反思。"],
      club: ["社团招新", "适合新生宣讲。重点讲加入理由、活动体验、过往成果和报名路径。"],
    },
    note: "这里强调这是一个 Skill 项目，不是单次 PPT 文件。",
  },
  {
    nav: "总结",
    type: "summary",
    title: "把经历变成证据，把证据变成机会",
    lead: "大学四年的价值，不只在于做了多少事，而在于能不能把这些事整理成清晰可信的成长资产。",
    cards: [
      ["方向", "知道自己为什么做"],
      ["行动", "把计划拆成每周可执行"],
      ["证据", "保留作品、数据、链接和反馈"],
      ["表达", "用动态 PPT 讲清自己的成长"],
    ],
    note: "收尾要给行动号召：今天就从一页周复盘开始。",
  },
];

const slideRoot = document.getElementById("slideRoot");
const speakerNote = document.getElementById("speakerNote");
const progressBar = document.getElementById("progressBar");
const dotNav = document.getElementById("dotNav");
const sectionLabel = document.getElementById("sectionLabel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");
const canvas = document.getElementById("motionCanvas");
const ctx = canvas.getContext("2d");

let current = 0;
let activeMode = "growth";
let autoTimer = null;
let particles = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderTags(tags) {
  return `<div class="tag-row">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function renderHero(slide) {
  return `
    <section class="slide hero">
      <div class="hero-panel">
        <span class="kicker">tysPPT</span>
        <h1>${escapeHtml(slide.title)}<span>${escapeHtml(slide.titleAccent)}</span></h1>
        <p class="lead">${escapeHtml(slide.lead)}</p>
        ${renderTags(slide.tags)}
      </div>
      <div class="visual-panel">
        <div class="metric-row">
          ${slide.metrics
            .map(([value, label]) => `<div class="metric"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`)
            .join("")}
        </div>
        <div class="campus-map">
          <div class="map-node">学习<small>Knowledge</small></div>
          <div class="map-node">实践<small>Practice</small></div>
          <div class="map-node">复盘<small>Review</small></div>
          <div class="map-node">表达<small>Showcase</small></div>
          <div class="map-core">成长<br/>资产</div>
        </div>
      </div>
    </section>
  `;
}

function renderProblems(slide) {
  return `
    <section class="slide two-col">
      <div class="panel">
        <span class="kicker">${escapeHtml(slide.nav)}</span>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.lead)}</p>
      </div>
      <div class="problem-list">
        ${slide.cards.map(([title, body]) => `<article class="card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function renderMap(slide) {
  return `
    <section class="slide two-col">
      <div class="panel">
        <span class="kicker">${escapeHtml(slide.nav)}</span>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.lead)}</p>
      </div>
      <div class="visual-panel campus-map">
        ${slide.nodes.map(([title, sub]) => `<div class="map-node">${escapeHtml(title)}<small>${escapeHtml(sub)}</small></div>`).join("")}
        <div class="map-core">月度<br/>复盘</div>
      </div>
    </section>
  `;
}

function renderTimeline(slide) {
  return `
    <section class="slide two-col">
      <div class="panel">
        <span class="kicker">${escapeHtml(slide.nav)}</span>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.lead)}</p>
      </div>
      <div class="timeline">
        ${slide.years
          .map(
            ([year, title, body, tone]) => `
              <article class="year-card" style="--tone:${tone}">
                <div class="year">${escapeHtml(year)}</div>
                <div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>
              </article>`
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderChecklist(slide) {
  return `
    <section class="slide two-col">
      <div class="panel">
        <span class="kicker">${escapeHtml(slide.nav)}</span>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.lead)}</p>
      </div>
      <div class="check-grid">
        ${slide.items.map((item, index) => `<div class="check-item ${index < 2 ? "done" : ""}"><span class="box">✓</span>${escapeHtml(item)}</div>`).join("")}
      </div>
    </section>
  `;
}

function renderModes(slide) {
  const [title, body] = slide.modes[activeMode];
  return `
    <section class="slide two-col">
      <div class="panel">
        <span class="kicker">${escapeHtml(slide.nav)}</span>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.lead)}</p>
      </div>
      <div class="panel">
        <div class="mode-tabs">
          ${Object.entries(slide.modes)
            .map(([key, value]) => `<button class="mode-tab ${key === activeMode ? "active" : ""}" data-mode="${key}" type="button">${escapeHtml(value[0])}</button>`)
            .join("")}
        </div>
        <div class="mode-output">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(body)}</p>
        </div>
      </div>
    </section>
  `;
}

function renderSummary(slide) {
  return `
    <section class="slide">
      <div class="panel">
        <span class="kicker">${escapeHtml(slide.nav)}</span>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.lead)}</p>
      </div>
      <div class="framework">
        ${slide.cards.map(([title, body]) => `<article class="card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function renderSlide(slide) {
  if (slide.type === "hero") return renderHero(slide);
  if (slide.type === "problems") return renderProblems(slide);
  if (slide.type === "map") return renderMap(slide);
  if (slide.type === "timeline") return renderTimeline(slide);
  if (slide.type === "checklist") return renderChecklist(slide);
  if (slide.type === "modes") return renderModes(slide);
  return renderSummary(slide);
}

function stopAuto() {
  window.clearInterval(autoTimer);
  autoTimer = null;
  playBtn.classList.remove("active");
  playBtn.textContent = "▶";
}

function goTo(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  render();
}

function renderDots() {
  dotNav.innerHTML = slides
    .map((slide, index) => `<button class="${index === current ? "active" : ""}" data-index="${index}" aria-label="${escapeHtml(slide.nav)}"></button>`)
    .join("");
}

function render() {
  const slide = slides[current];
  slideRoot.innerHTML = renderSlide(slide);
  sectionLabel.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")} · ${slide.nav}`;
  speakerNote.textContent = `演讲提示：${slide.note}`;
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
  renderDots();
}

prevBtn.addEventListener("click", () => {
  stopAuto();
  goTo(current - 1);
});

nextBtn.addEventListener("click", () => {
  stopAuto();
  goTo(current + 1);
});

playBtn.addEventListener("click", () => {
  if (autoTimer) {
    stopAuto();
    return;
  }
  playBtn.classList.add("active");
  playBtn.textContent = "Ⅱ";
  autoTimer = window.setInterval(() => {
    if (current >= slides.length - 1) {
      stopAuto();
      return;
    }
    goTo(current + 1);
  }, 4200);
});

dotNav.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  stopAuto();
  goTo(Number(button.dataset.index));
});

slideRoot.addEventListener("click", (event) => {
  const checkItem = event.target.closest(".check-item");
  if (checkItem) checkItem.classList.toggle("done");
  const mode = event.target.closest(".mode-tab")?.dataset.mode;
  if (mode) {
    activeMode = mode;
    render();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    stopAuto();
    goTo(current + 1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    stopAuto();
    goTo(current - 1);
  }
});

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: 42 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 1.2 + Math.random() * 3.2,
    vx: -0.22 + Math.random() * 0.44,
    vy: -0.18 + Math.random() * 0.36,
    color: ["#246bfe", "#10a778", "#f4b740", "#f36f5f"][Math.floor(Math.random() * 4)],
  }));
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < -10) particle.x = window.innerWidth + 10;
    if (particle.x > window.innerWidth + 10) particle.x = -10;
    if (particle.y < -10) particle.y = window.innerHeight + 10;
    if (particle.y > window.innerHeight + 10) particle.y = -10;
    ctx.beginPath();
    ctx.fillStyle = `${particle.color}33`;
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
  });
  window.requestAnimationFrame(draw);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
draw();
render();
