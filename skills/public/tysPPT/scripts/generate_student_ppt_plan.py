#!/usr/bin/env python3

import argparse
from pathlib import Path


SCENARIOS = {
    "growth": {
        "title": "大学四年成长路线图",
        "audience": "辅导员、同学、学业导师",
        "subtitle": "把学习、项目、竞赛、实习和生活节奏讲成一条清晰的成长路径。",
        "sections": [
            (
                "开场：我想成为怎样的大学生",
                [
                    "大学不是把课表填满，而是把选择变清楚。",
                    "这份展示用一条主线说明：我如何从适应校园，走向能独立完成项目、表达观点并承担协作责任。",
                ],
                ["身份：本科生", "演讲时长：5-8 分钟", "行动：建立个人成长仪表盘"],
            ),
            (
                "现状：时间很多，但方向容易散",
                [
                    "大学生最常见的问题不是不努力，而是努力被课程、社团、证书、实习和社交切成很多碎片。",
                    "如果没有阶段目标，忙碌会带来疲惫，却不一定沉淀成作品、能力和机会。",
                ],
                ["课程任务临近才开始", "竞赛和项目缺少长期积累", "简历上有经历但缺少可证明成果"],
            ),
            (
                "方法：用四个账户管理大学生活",
                [
                    "把大学生活拆成四个账户：学业账户、作品账户、人脉账户、健康账户。",
                    "每个月只问一个问题：这四个账户里，哪个正在透支，哪个正在增值。",
                ],
                ["学业账户：核心课程和专业基础", "作品账户：项目、论文、竞赛、作品集", "人脉账户：同伴、导师、社群", "健康账户：睡眠、运动、情绪"],
            ),
            (
                "路径：四年不是重复四次大一",
                [
                    "大一解决适应，大二建立能力，大三形成证据，大四完成跃迁。",
                    "每一年都应该留下一个能被展示、能被复盘、能帮助下一步选择的成果。",
                ],
                ["大一：探索方向，建立学习系统", "大二：进入项目，形成协作经验", "大三：竞赛/实习/科研选一个主攻", "大四：用作品和经历完成升学或就业表达"],
            ),
            (
                "工具：每周 30 分钟复盘",
                [
                    "动态 PPT 不只是展示结果，也可以成为复盘工具。",
                    "每周用 30 分钟更新一页：本周完成、下周重点、一个卡点、一个证据。",
                ],
                ["成果：学习记录可视化", "行动：保留截图、链接、代码、证书", "下一步：每月生成一次成长简报"],
            ),
            (
                "总结：把大学过成可积累的项目",
                [
                    "真正拉开差距的不是某一次考试，而是持续留下证据的能力。",
                    "当学习、实践和表达形成闭环，大学四年就不再是一段模糊经历，而是一组可以被看见的成长资产。",
                ],
                ["明确方向", "沉淀作品", "持续复盘", "主动表达"],
            ),
        ],
    },
    "course-report": {
        "title": "课程汇报动态演示",
        "audience": "任课老师、课程小组、同班同学",
        "subtitle": "把课程作业讲成问题、方法、过程、结果、反思五段式展示。",
        "sections": [
            ("研究问题", ["先用一句话说明这次作业要解决什么问题，以及它为什么值得研究。"], ["展示对象：任课老师", "演讲时长：6-10 分钟"]),
            ("方法与分工", ["说明资料来源、分析方法、工具链和团队分工，让听众相信过程可靠。"], ["资料检索", "数据整理", "案例分析", "页面制作"]),
            ("核心发现", ["用三条发现代替大段堆叠，给每条发现配一个证据或案例。"], ["发现 1：现象", "发现 2：原因", "发现 3：影响"]),
            ("作品呈现", ["展示最终成果，可以是报告、原型、视频、调研图表或代码运行结果。"], ["成果：可演示", "成果：可复盘", "成果：可继续迭代"]),
            ("反思与下一步", ["讲清楚这次作业的不足，以及下一轮会如何改进。"], ["范围边界：样本有限", "下一步：补充访谈或实验"]),
        ],
    },
    "club-recruiting": {
        "title": "社团招新动态演示",
        "audience": "新生、社团负责人、校园活动组织者",
        "subtitle": "用更有节奏的方式讲清社团价值、活动体验和加入路径。",
        "sections": [
            ("我们是谁", ["用一句话讲清社团定位：我们聚在一起做什么，为什么值得加入。"], ["适用场景：招新宣讲", "演讲时长：3-5 分钟"]),
            ("新生为什么需要我们", ["从新生真实需求切入：认识朋友、探索兴趣、提升技能、获得项目经历。"], ["陪伴感", "成长感", "参与感"]),
            ("我们做过什么", ["展示过去活动、成果、照片和成员反馈。"], ["成果：活动案例", "成果：成员作品", "成果：跨院系协作"]),
            ("加入后会发生什么", ["给出清晰路径：报名、面试、试运行、参与项目、成为骨干。"], ["行动：扫码报名", "行动：加入答疑群", "行动：参加开放日"]),
            ("欢迎你加入", ["用一个明确 CTA 收尾，让同学知道下一步该做什么。"], ["下一步：填写报名表", "下一步：关注通知群"]),
        ],
    },
}


def build_plan(scenario: str, major: str, name: str, style: str) -> str:
    preset = SCENARIOS[scenario]
    lines = [
        f"# {preset['title']}",
        "",
        f"- 目标受众：{preset['audience']}",
        f"- 主风格：{style}",
        f"- 适用场景：{scenario}",
        f"- 身份：{major}学生",
        "",
        preset["subtitle"],
        "",
    ]

    if name:
        lines.extend([f"演讲者：{name}", ""])

    for title, paragraphs, bullets in preset["sections"]:
        lines.append(f"## {title}")
        lines.append("")
        for paragraph in paragraphs:
            lines.append(paragraph)
            lines.append("")
        for bullet in bullets:
            lines.append(f"- {bullet}")
        lines.append("")

    return "\n".join(lines).strip() + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a college-student dynamic PPT markdown plan")
    parser.add_argument("--scenario", choices=sorted(SCENARIOS), default="growth", help="Student presentation scenario")
    parser.add_argument("--major", default="大学", help="Student major or identity label")
    parser.add_argument("--name", default="", help="Presenter name")
    parser.add_argument("--style", default="campus-vibe", help="Visual style token name")
    parser.add_argument("--output", required=True, help="Output markdown path")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(build_plan(args.scenario, args.major, args.name, args.style), encoding="utf-8")
    print(f"Student PPT plan written to {output}")


if __name__ == "__main__":
    main()
