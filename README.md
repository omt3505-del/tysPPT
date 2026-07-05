# tysPPT

面向大学生的动态 PPT Skill 项目。它基于 LivePPT 的 Markdown -> HTML deck 工作流改造，专注生成课程汇报、社团招新、成长规划、竞赛路演、论文开题等校园场景演示页。

## 能做什么

- 一条命令生成大学生场景 Markdown 大纲和动态 HTML PPT
- 支持点击翻页、键盘控制、进度条和单文件分享
- 内置 `campus-vibe` 校园主题，视觉清爽、年轻、适合课堂展示
- 可作为 Codex Skill 使用：`$tysppt`

## 快速开始

```bash
cd skills/public/tysPPT
make build-student-deck \
  SCENARIO=growth \
  MAJOR="计算机科学" \
  NAME="张同学" \
  PLAN=plans/student-growth.md \
  OUTPUT=dist/student-growth.html
open dist/student-growth.html
```

## 场景参数

- `growth`：大学四年成长路线图、个人复盘、班会展示
- `course-report`：课程作业、小组汇报、调研展示
- `club-recruiting`：社团招新、组织介绍、活动宣讲

## 常用命令

```bash
# 校验项目
make validate

# 只生成可编辑 Markdown
python3 scripts/generate_student_ppt_plan.py \
  --scenario course-report \
  --major "新闻传播" \
  --name "李同学" \
  --output plans/course-report.md

# 把任意 Markdown 渲染成校园主题动态 PPT
python3 scripts/render_plan_to_html.py \
  plans/course-report.md \
  --output dist/course-report.html \
  --theme campus-vibe \
  --brand "tysPPT"
```

## 项目结构

```bash
skills/public/tysPPT/
├── SKILL.md
├── agents/openai.yaml
├── scripts/
│   ├── generate_student_ppt_plan.py
│   ├── build_student_deck.py
│   └── render_plan_to_html.py
├── demos/campus-growth-deck/
└── references/
```

## 开源说明

本项目基于 [AIPMAndy/LivePPT](https://github.com/AIPMAndy/LivePPT) 改造，请保留原始许可证和作者信息。发布到自己的 GitHub 时，建议使用 fork 或在 README 中明确注明来源。
