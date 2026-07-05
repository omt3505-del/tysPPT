---
name: tysppt
description: Create dynamic HTML/PPT-style presentations for college students. Use when users ask for student course reports, class presentations, club recruiting decks, competition roadshows, study plans, personal growth reviews, thesis opening slides, or interactive PPT alternatives for campus scenarios.
---

# tysPPT

## Purpose

把大学生常见的 PPT 需求升级为可点击、可翻页、可分享的动态 HTML 演示页。
默认输出中文内容，适合课程汇报、社团招新、竞赛路演、学习规划、个人成长复盘、论文开题和班会展示。

## Input Contract

先收集最小输入，缺省时用保守默认值继续：

- 场景：`growth`、`course-report`、`club-recruiting`，或用户自定义校园场景。
- 身份：年级、专业、社团/项目角色。
- 受众：老师、同学、评委、招新对象、辅导员、导师。
- 时长：建议 3-10 分钟。
- 必须展示的材料：数据、图片、项目链接、证书、分工、结论、二维码或 CTA。

## Default Workflow

1. 定义叙事主线：`我是谁 -> 遇到什么问题 -> 如何行动 -> 有什么证据 -> 下一步是什么`。
2. 控制页面数量：课堂汇报 5-7 页，社团招新 4-6 页，竞赛路演 7-10 页。
3. 每页只讲一个信息点，优先用“标题 + 两句解释 + 三个要点”。
4. 使用 `campus-vibe` 主题，视觉要清爽、年轻、可信，避免过度商业发布会感。
5. 输出可直接打开的 HTML deck；需要 `.pptx` 时，再用浏览器打印或后续转换流程处理。

## Commands

### Build a student deck

```bash
make build-student-deck \
  SCENARIO=growth \
  MAJOR="计算机科学" \
  NAME="张同学" \
  PLAN=plans/student-growth.md \
  OUTPUT=dist/student-growth.html
```

### Generate only the editable markdown plan

```bash
python3 scripts/generate_student_ppt_plan.py \
  --scenario course-report \
  --major "新闻传播" \
  --name "李同学" \
  --output plans/course-report.md
```

### Render any markdown into a campus themed deck

```bash
python3 scripts/render_plan_to_html.py \
  plans/course-report.md \
  --output dist/course-report.html \
  --theme campus-vibe \
  --brand "tysPPT"
```

## Scenario Guidance

- `growth`：适合个人成长复盘、学业规划、班会展示。强调阶段路径、证据沉淀和下一步行动。
- `course-report`：适合课程作业、小组汇报、调研展示。强调问题、方法、发现、结果和反思。
- `club-recruiting`：适合社团招新、组织介绍、活动宣讲。强调需求、体验、成果和加入路径。
- 自定义竞赛/路演：用“痛点、方案、创新点、验证结果、商业/社会价值、团队、计划”结构。
- 自定义论文开题：用“背景、问题、文献、方法、计划、预期成果、风险”结构。

## Quality Bar

- 学生感：语言真实、清楚、有行动感，不要堆空泛口号。
- 演示感：页面节奏明确，标题能独立表达结论。
- 可信度：每个关键主张尽量配证据，如数据、截图、作品链接、访谈摘要或复盘记录。
- 可复用：内容先写进 Markdown，再渲染为 HTML，方便用户继续改。
- 可访问：键盘翻页、进度条、清晰对比度和移动端可读性必须保留。

## Resources

- `scripts/generate_student_ppt_plan.py`：生成大学生场景 Markdown 大纲。
- `scripts/build_student_deck.py`：一条命令生成 Markdown + HTML。
- `scripts/render_plan_to_html.py`：渲染单文件 HTML deck，包含 `campus-vibe` 主题。
- `demos/campus-growth-deck/`：可直接打开的大学生成长路线图动态 Demo。
- `examples/sample-launch-plan.md`：通用 Markdown deck 示例。
