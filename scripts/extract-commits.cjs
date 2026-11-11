/**
 * Automated Git Commit Extraction & Telemetry Generator
 * Scans all local projects and extracts deduplicated commits across:
 * - antrang
 * - pricklabs
 * - kanoonhq
 * - plectrumlabs
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PROJECTS_DIR = path.resolve("/Users/souraw/Documents/Projects");
const OUTPUT_FILE = path.resolve(__dirname, "../src/data/gitCommits.json");

// Primary distinct repositories to inspect (excluding worktrees and submodules)
const TARGET_REPOS = [
  "KanoonHQ",
  "adv-repo",
  "InsuDose",
  "Huntr",
  "Nirav Website",
  "PlectrumLabs",
  "PlectrumMobile",
  "PluckBoard",
  "PluckMaster",
  "PluckNote",
  "PluckStem",
  "Splectrum",
  "CrypTrack",
  "KanoonHQ-ai-telemetry",
  "KanoonHQ-owasp",
  "plectrum.live",
  "awasekar-portfolio",
  "brain",
  "open-laws",
];

// Discover all git repositories under PROJECTS_DIR
function getTargetRepositories() {
  const discovered = new Set();
  if (fs.existsSync(PROJECTS_DIR)) {
    const entries = fs.readdirSync(PROJECTS_DIR);
    for (const entry of entries) {
      const fullPath = path.join(PROJECTS_DIR, entry);
      try {
        if (fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, ".git"))) {
          discovered.add(entry);
        }
      } catch {}
    }
  }
  for (const repo of TARGET_REPOS) {
    discovered.add(repo);
  }
  return Array.from(discovered);
}

// Profile resolution mapping
function resolveProfile(name, email) {
  const n = (name || "").toLowerCase().trim();
  const e = (email || "").toLowerCase().trim();

  // Exclude automated bots/checkpointers
  if (
    n.includes("claude") ||
    e.includes("anthropic.com") ||
    n.includes("posthog") ||
    e.includes("posthog") ||
    n.includes("checkpointer") ||
    e.includes("checkpointer")
  ) {
    return null;
  }

  if (n.includes("pricklabs") || e.includes("pricklabs")) {
    return "pricklabs";
  }
  if (n.includes("kanoon") || e.includes("kanoon") || e === "dev@kanoonhq.com") {
    return "kanoonhq";
  }
  if (n.includes("plectrum") || e.includes("plectrumlabs")) {
    return "plectrumlabs";
  }
  if (
    n.includes("antrang") ||
    e.includes("antrang") ||
    n.includes("awasekar") ||
    e.includes("awasekar") ||
    e === "sourabh.awasekar@gmail.com" ||
    e === "sourabh@awasekar.com" ||
    e === "souraw@local"
  ) {
    return "antrang";
  }
  return null;
}

function extractAllCommits() {
  const commitsByHash = new Map();
  const repos = getTargetRepositories();

  for (const repoName of repos) {
    const repoPath = path.join(PROJECTS_DIR, repoName);
    if (!fs.existsSync(path.join(repoPath, ".git"))) {
      continue;
    }

    try {
      // Format: %H|%an|%ae|%aI|%s
      const stdout = execSync(
        'git log --all --pretty=format:"%H|%an|%ae|%aI|%s"',
        {
          cwd: repoPath,
          maxBuffer: 20 * 1024 * 1024,
          encoding: "utf-8",
        }
      );

      const lines = stdout.split("\n");
      for (const line of lines) {
        if (!line.trim()) continue;
        const [hash, aname, aemail, adate, ...subjectParts] = line.split("|");
        if (!hash || !adate) continue;
        const subject = subjectParts.join("|");

        const profile = resolveProfile(aname, aemail);
        if (!profile) continue;

        if (!commitsByHash.has(hash)) {
          commitsByHash.set(hash, {
            hash: hash.substring(0, 7),
            fullHash: hash,
            author: aname,
            email: aemail,
            date: adate,
            timestamp: new Date(adate).getTime(),
            message: subject.trim(),
            repo: repoName,
            profile,
          });
        }
      }
    } catch (err) {
      console.warn(`Could not read git log for ${repoName}:`, err.message);
    }
  }

  const allCommits = Array.from(commitsByHash.values()).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  console.log(`Found ${allCommits.length} deduplicated user commits.`);
  return allCommits;
}

function generateTelemetry(commits) {
  // Daily map
  const dailyMap = new Map();
  const profileCounts = { antrang: 0, plectrumlabs: 0, kanoonhq: 0, pricklabs: 0 };
  const repoCounts = {};

  for (const c of commits) {
    const day = c.date.substring(0, 10);
    if (!dailyMap.has(day)) {
      dailyMap.set(day, {
        date: day,
        count: 0,
        profiles: { antrang: 0, plectrumlabs: 0, kanoonhq: 0, pricklabs: 0 },
        repos: {},
      });
    }

    const dayObj = dailyMap.get(day);
    dayObj.count += 1;
    dayObj.profiles[c.profile] = (dayObj.profiles[c.profile] || 0) + 1;
    dayObj.repos[c.repo] = (dayObj.repos[c.repo] || 0) + 1;

    profileCounts[c.profile] = (profileCounts[c.profile] || 0) + 1;
    repoCounts[c.repo] = (repoCounts[c.repo] || 0) + 1;
  }

  // 52-week calendar grid ending on current date
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sun, 6 = Sat
  // 52 weeks = 52 * 7 days
  const totalDays = 52 * 7 + dayOfWeek;
  const calendarDays = [];

  for (let i = totalDays; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    const activity = dailyMap.get(dateStr);

    const count = activity ? activity.count : 0;
    let level = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count >= 3 && count <= 5) level = 2;
    else if (count >= 6 && count <= 9) level = 3;
    else if (count >= 10) level = 4;

    calendarDays.push({
      date: dateStr,
      dayOfWeek: d.getDay(),
      count,
      level,
    });
  }

  // Find busiest day
  let busiestDay = { date: "", count: 0 };
  for (const [date, val] of dailyMap.entries()) {
    if (val.count > busiestDay.count) {
      busiestDay = { date, count: val.count };
    }
  }

  // Calculate streaks
  const sortedDays = Array.from(dailyMap.keys()).sort();
  let longestStreak = 0;
  let tempStreak = 0;
  let prevDate = null;

  for (const dStr of sortedDays) {
    const cur = new Date(dStr);
    if (prevDate) {
      const diffTime = Math.abs(cur - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    } else {
      tempStreak = 1;
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    prevDate = cur;
  }

  return {
    summary: {
      totalCommits: commits.length,
      activeDays: dailyMap.size,
      busiestDay,
      longestStreak,
      totalRepos: 18,
      generatedAt: now.toISOString(),
    },
    calendarDays,
  };
}

function main() {
  console.log("Extracting commits from local machine repositories...");
  const commits = extractAllCommits();
  const telemetry = generateTelemetry(commits);

  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(telemetry, null, 2), "utf-8");
  console.log(`Telemetry successfully written to ${OUTPUT_FILE}`);
}

main();
