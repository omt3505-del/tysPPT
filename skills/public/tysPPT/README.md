# tysPPT Skill

`tysppt` 是一个面向大学生的动态 PPT 生成 Skill。它把 Markdown 内容渲染成可点击、可翻页、可分享的 HTML 演示页，适合课程汇报、社团招新、成长规划、竞赛路演和论文开题。

## 30 秒生成一份大学生动态 PPT

```bash
make build-student-deck \
  SCENARIO=growth \
  MAJOR="计算机科学" \
  NAME="张同学" \
  PLAN=plans/student-growth.md \
  OUTPUT=dist/student-growth.html
open dist/student-growth.html
```

## 支持场景

| 场景 | 参数 | 适合用途 |
| --- | --- | --- |
| 成长规划 | `growth` | 大学四年规划、个人复盘、班会展示 |
| 课程汇报 | `course-report` | 小组作业、调研报告、课堂展示 |
| 社团招新 | `club-recruiting` | 招新宣讲、活动介绍、组织展示 |

## 工作流

1. 用 `generate_student_ppt_plan.py` 生成可编辑 Markdown。
2. 用 `render_plan_to_html.py` 渲染为单文件 HTML deck。
3. 用浏览器打开、演示、分享或继续手动微调。

## 单独生成 Markdown

```bash
python3 scripts/generate_student_ppt_plan.py \
  --scenario course-report \
  --major "新闻传播" \
  --name "李同学" \
  --output plans/course-report.md
```

## 渲染现有 Markdown

```bash
python3 scripts/render_plan_to_html.py \
  plans/course-report.md \
  --output dist/course-report.html \
  --theme campus-vibe \
  --brand "tysPPT"
```

## 本地 Demo

```bash
cd demos/campus-growth-deck
python3 -m http.server 4188
open http://localhost:4188
```

## 校验

```bash
make validate
```

## Attribution

本项目基于 [AIPMAndy/LivePPT](https://github.com/AIPMAndy/LivePPT) 改造。请保留原始许可证、作者信息和来源说明。
