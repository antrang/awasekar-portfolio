import { useState, useEffect, useRef } from "react";

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\|{}[]";

const SKILL_SETS = [
  ["React", "Next.js", "Node.js", "TypeScript", "JavaScript"],
  ["Python", "SQL", "Snowflake", "Redshift", "PostgreSQL"],
  ["AWS", "Looker", "Metabase", "Tableau", "Apache Superset"],
  ["GitHub", "n8n", "Vercel", "Postman", "Supabase"],
  ["Claude", "Minimax", "Gemini", "OpenCode", "AntiGravity"],
  ["Web Development", "Data Engineering", "Data Visualization", "Machine Learning", "AI"],
  ["Automation", "API Integration", "ETL Pipelines", "Backend Development", "Data Analysis"],
];

const CYCLE_DURATION = 3000;
const SCRAMBLE_FRAMES = 18;
const FRAME_MS = 35;

function useScramble(target: string, trigger: number, startDelay: number) {
  const [display, setDisplay] = useState(target);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame = 0;

    const step = () => {
      if (frame >= SCRAMBLE_FRAMES) {
        setDisplay(target);
        return;
      }
      const progress = frame / SCRAMBLE_FRAMES;
      const resolved = Math.floor(progress * target.length);
      setDisplay(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < resolved) return ch;
            return MATRIX_CHARS[
              Math.floor(Math.random() * MATRIX_CHARS.length)
            ];
          })
          .join("")
      );
      frame++;
      timerRef.current = setTimeout(step, FRAME_MS);
    };

    timerRef.current = setTimeout(step, startDelay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [target, trigger, startDelay]);

  return display;
}

function SkillItem({
  name,
  index,
  trigger,
}: {
  name: string;
  index: number;
  trigger: number;
}) {
  const text = useScramble(name, trigger, index * 100);

  return (
    <div className="skill-row" style={{ animationDelay: `${index * 70}ms` }}>
      <span className="skill-idx">{String(index + 1).padStart(2, "0")}</span>
      <span className="skill-name">{text}</span>
      <span className="skill-bar" />
    </div>
  );
}

const TechStack = () => {
  const [setIndex, setSetIndex] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const outTimer = setTimeout(() => {
      setPhase("out");
    }, CYCLE_DURATION - 500);

    const switchTimer = setTimeout(() => {
      setSetIndex((prev) => (prev + 1) % SKILL_SETS.length);
      setTrigger((prev) => prev + 1);
      setPhase("in");
    }, CYCLE_DURATION);

    return () => {
      clearTimeout(outTimer);
      clearTimeout(switchTimer);
    };
  }, [trigger]);

  const currentSet = SKILL_SETS[setIndex];

  return (
    <div className="techstack">
      <h2>TechStack &amp; Skills</h2>
      <div className={`skills-matrix ${phase === "out" ? "skills-out" : "skills-in"}`}>
        {currentSet.map((skill, i) => (
          <SkillItem
            key={`${setIndex}-${skill}`}
            name={skill}
            index={i}
            trigger={trigger}
          />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
