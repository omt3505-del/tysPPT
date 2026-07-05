#!/usr/bin/env python3

import argparse
import subprocess
import sys
from pathlib import Path


PRESET_SUBTITLES = {
    "growth": "给大学生的一份动态成长路线图：方向、行动、作品和复盘都能被看见。",
    "course-report": "把课程作业讲成清晰、有证据、有节奏的动态汇报。",
    "club-recruiting": "把社团价值、活动体验和加入路径讲得更有吸引力。",
}


def run(cmd: list[str], cwd: Path) -> None:
    subprocess.run(cmd, cwd=cwd, check=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a college-student dynamic PPT HTML deck")
    parser.add_argument("--scenario", choices=["growth", "course-report", "club-recruiting"], default="growth")
    parser.add_argument("--major", default="大学", help="Student major or identity label")
    parser.add_argument("--name", default="", help="Presenter name")
    parser.add_argument("--style", default="campus-vibe", help="Theme preset")
    parser.add_argument("--brand", default="tysPPT", help="Brand text displayed in the deck")
    parser.add_argument("--plan-output", default="plans/student-ppt.md", help="Output markdown plan path")
    parser.add_argument("--html-output", default="dist/student-ppt.html", help="Output html path")
    parser.add_argument("--subtitle", help="Custom cover subtitle")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path(__file__).resolve().parents[1]
    subtitle = args.subtitle or PRESET_SUBTITLES[args.scenario]

    generate_cmd = [
        sys.executable,
        "scripts/generate_student_ppt_plan.py",
        "--scenario",
        args.scenario,
        "--major",
        args.major,
        "--style",
        args.style,
        "--output",
        args.plan_output,
    ]
    if args.name:
        generate_cmd.extend(["--name", args.name])

    render_cmd = [
        sys.executable,
        "scripts/render_plan_to_html.py",
        args.plan_output,
        "--output",
        args.html_output,
        "--theme",
        args.style,
        "--brand",
        args.brand,
        "--subtitle",
        subtitle,
    ]

    run(generate_cmd, root)
    run(render_cmd, root)
    print(f"Student plan written to {args.plan_output}")
    print(f"Student HTML deck written to {args.html_output}")


if __name__ == "__main__":
    main()
