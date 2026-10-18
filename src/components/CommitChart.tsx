import React, { useState, useMemo } from "react";
import { FaGithub, FaCodeBranch } from "react-icons/fa";
import { MdLocalFireDepartment, MdHistory, MdInfoOutline } from "react-icons/md";
import gitData from "../data/gitCommits.json";
import "./styles/CommitChart.css";

interface DayData {
  date: string;
  dayOfWeek: number;
  count: number;
  level: number;
}

interface HoveredCell {
  date: string;
  count: number;
  x: number;
  y: number;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export const CommitChart: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
  const { summary, calendarDays } = gitData;

  // Group into 53 weeks
  const { weeks, monthLabels, dayByDate } = useMemo(() => {
    const rawDays = calendarDays as DayData[];
    const weekCols: (DayData | null)[][] = [];
    let currentWeek: (DayData | null)[] = [];

    // Pad first week with nulls until its dayOfWeek
    if (rawDays.length > 0) {
      const firstDayOfWeek = rawDays[0].dayOfWeek;
      for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push(null);
      }
    }

    for (const d of rawDays) {
      currentWeek.push(d);
      if (currentWeek.length === 7) {
        weekCols.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weekCols.push(currentWeek);
    }

    // Determine month labels per column
    const labels: { text: string; weekIndex: number }[] = [];
    let lastLabeledMonth = -1;
    let lastLabeledWeek = -10;

    weekCols.forEach((col, wIdx) => {
      const firstValidDay = col.find((d) => d !== null);
      if (!firstValidDay) return;

      const dateObj = new Date(firstValidDay.date + "T00:00:00");
      const m = dateObj.getMonth();

      // Check if any day in this week is early in the month (days 1-7)
      const hasMonthStart = col.some((d) => {
        if (!d) return false;
        const dayNum = parseInt(d.date.split("-")[2], 10);
        return dayNum >= 1 && dayNum <= 7;
      });

      if (hasMonthStart && m !== lastLabeledMonth && wIdx - lastLabeledWeek >= 3) {
        labels.push({ text: MONTH_NAMES[m], weekIndex: wIdx });
        lastLabeledMonth = m;
        lastLabeledWeek = wIdx;
      }
    });

    const dayMap = new Map<string, DayData>();
    for (const d of rawDays) {
      dayMap.set(d.date, d);
    }

    return { weeks: weekCols, monthLabels: labels, dayByDate: dayMap };
  }, [calendarDays]);

  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest("[data-date]") as HTMLElement | null;
    if (!target) {
      setHoveredCell(null);
      return;
    }

    const date = target.dataset.date;
    const day = date ? dayByDate.get(date) : undefined;
    if (!day) {
      setHoveredCell(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    setHoveredCell({
      date: day.date,
      count: day.count,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleGridMouseLeave = () => {
    setHoveredCell(null);
  };

  const formatDisplayDate = (dStr: string) => {
    try {
      const parts = dStr.split("-");
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dStr;
    }
  };

  return (
    <section className="commit-section" id="commits">
      <div className="section-container">
        <div className="section-header-tag">06 / CODE TELEMETRY</div>

        <div className="commit-header">
          <div className="commit-header-left">
            <h2 className="commit-title">
              Engineering Velocity &amp; <span className="text-accent">Commit Graph</span>
            </h2>
            <p className="commit-subtitle">
              Aggregated git activity and contribution velocity across all projects, capturing <strong>{summary.totalCommits.toLocaleString()} commits</strong>.
            </p>
          </div>

          <div className="github-profile-link">
            <a
              href="https://github.com/antrang"
              target="_blank"
              rel="noreferrer"
              className="github-btn"
              data-cursor="disable"
            >
              <FaGithub />
              <span>github.com/antrang</span>
            </a>
          </div>
        </div>

        {/* Telemetry Metric KPI Cards */}
        <div className="commit-kpi-grid">
          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap">
              <FaCodeBranch />
            </div>
            <div className="kpi-data">
              <span className="kpi-number">{summary.totalCommits.toLocaleString()}</span>
              <span className="kpi-label">Total Commits (Deduplicated)</span>
            </div>
          </div>

          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap kpi-emerald">
              <MdLocalFireDepartment />
            </div>
            <div className="kpi-data">
              <span className="kpi-number">{summary.activeDays}</span>
              <span className="kpi-label">Active Days in 2026</span>
            </div>
          </div>

          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap kpi-accent">
              <MdHistory />
            </div>
            <div className="kpi-data">
              <span className="kpi-number">{summary.totalRepos}</span>
              <span className="kpi-label">Tracked Projects</span>
            </div>
          </div>

          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap kpi-streak">
              <MdInfoOutline />
            </div>
            <div className="kpi-data">
              <span className="kpi-number">{summary.busiestDay.count} / day</span>
              <span className="kpi-label">Peak Velocity ({summary.busiestDay.date})</span>
            </div>
          </div>
        </div>

        {/* GitHub 52-Week Contribution Calendar Box */}
        <div className="commit-heatmap-card">
          <div className="heatmap-header">
            <div className="heatmap-summary">
              <strong>{summary.totalCommits.toLocaleString()} commits</strong> in the last 12 months
            </div>

            <div className="heatmap-legend">
              <span className="legend-label">Less</span>
              <span className="legend-cell level-0"></span>
              <span className="legend-cell level-1"></span>
              <span className="legend-cell level-2"></span>
              <span className="legend-cell level-3"></span>
              <span className="legend-cell level-4"></span>
              <span className="legend-label">More</span>
            </div>
          </div>

          <div className="heatmap-scroll-wrapper">
            <div className="heatmap-grid-container">
              {/* Month Header Row */}
              <div className="heatmap-months-row">
                <div className="weekday-spacer"></div>
                <div className="months-track">
                  {monthLabels.map((lbl, idx) => (
                    <span
                      key={idx}
                      className="month-tag"
                      style={{
                        left: `${lbl.weekIndex * 15}px`,
                      }}
                    >
                      {lbl.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Grid with Days of Week + 53 Week Columns */}
              <div className="heatmap-body">
                {/* Weekday indicators */}
                <div className="weekday-labels">
                  {WEEKDAY_LABELS.map((label, idx) => (
                    <span key={idx} className="weekday-tag">
                      {label}
                    </span>
                  ))}
                </div>

                {/* 53 Columns */}
                <div
                  className="weeks-container"
                  onMouseMove={handleGridMouseMove}
                  onMouseLeave={handleGridMouseLeave}
                >
                  {weeks.map((week, wIdx) => (
                    <div className="week-column" key={wIdx}>
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return <div key={dIdx} className="calendar-cell empty" />;
                        }
                        return (
                          <div
                            key={dIdx}
                            role="gridcell"
                            aria-label={`${day.count} commits on ${day.date}`}
                            className={`calendar-cell level-${day.level}`}
                            data-date={day.date}
                            data-count={day.count}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Floating Tooltip */}
          {hoveredCell && (
            <div
              className="heatmap-tooltip"
              style={{
                left: `${hoveredCell.x}px`,
                top: `${hoveredCell.y - 12}px`,
              }}
            >
              <div className="tooltip-title">
                <strong>{hoveredCell.count} {hoveredCell.count === 1 ? "commit" : "commits"}</strong> on {formatDisplayDate(hoveredCell.date)}
              </div>
            </div>
          )}

          {/* Multi-Profile Distribution Disclaimer Note */}
          <div className="heatmap-footer-note">
            <MdInfoOutline className="note-icon" />
            <span className="note-text">
              <strong>Multi-Entity Distribution:</strong> This graph aggregates deduplicated engineering contributions across multiple private client codebases, company organizations, and distinct development profiles. The public <code>github.com/antrang</code> profile reflects only open-source personal repositories.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitChart;
