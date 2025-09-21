import React from "react";
import styles from "./WoodcuttingCard.module.scss";

type Props = {
  skill?: string;
  level?: number;
  expNeeded?: number;
  progress?: number;     // 0..1
  efficiency?: number;   // 0..1
  iconSrc?: string;      // optional eigenes Icon
  locked?: boolean;
};

export default function WoodcuttingCard({
  skill = "Woodcutting",
  level = 5,
  expNeeded = 81,
  progress = 0.6,
  efficiency = 0,
  iconSrc,
  locked = true,
}: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(progress * 100)));
  const eff = Math.max(0, Math.min(100, Math.round(efficiency * 100)));

  return (
    <section className={styles.card} aria-label={`${skill} card`}>
      <div className={styles.header}>
        <div className={styles.iconBlock}>
          {iconSrc ? <img src={iconSrc} alt="" /> : <AxeIcon />}
          <span className={styles.levelBadge}>Lv. {level}</span>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{skill}</h3>

          <div
            className={styles.progress}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div className={styles.fill} style={{ width: `${pct}%` }} />
          </div>

          <div className={styles.meta}>
            <span className={styles.pill}>{expNeeded} EXP Needed</span>
            <span className={styles.pill}>{pct}%</span>
          </div>
        </div>

        <div className={styles.efficiency} aria-label="efficiency">
          {eff}% Efficiency
        </div>
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={locked ? styles.locked : styles.unlocked}
          disabled={locked}
        >
          <LockIcon />
          <span>Ascension Perks</span>
        </button>
      </footer>
    </section>
  );
}

function AxeIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className={styles.icon}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M43 8l9 8-7 7-9-8z"
        fill="#c7a27a"
      />
      <path
        d="M45 10l6 5-3 3-6-5z"
        fill="#8b5e3c"
      />
      <rect x="10" y="30" width="10" height="24" rx="3" fill="#a05a2c" />
      <path
        d="M20 32L44 9l9 8-25 22z"
        fill="#d0d5db"
      />
      <path
        d="M44 9l9 8-3 3-9-8z"
        fill="#9aa3af"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={styles.lockIcon}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 8H9V6a3 3 0 016 0v3z"
      />
    </svg>
  );
}
