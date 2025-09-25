import React from 'react';
import styles from './NormalWidth.module.scss';

const NormalWidth: React.FC = () => {
  return (
    <div className={styles.normalWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Normal Width Layout</h1>
          <p>
            Standard-Layout mit ausgewogenen Abständen - ähnlich wie Boss Tower
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Normale Sektion</h2>
          <p>
            Diese Seite demonstriert ein Layout mit ausgewogenen seitlichen
            Abständen. Ideal für die meisten Inhalte und bietet gute Lesbarkeit.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>Standard Card</h3>
            <p>Ausgewogene Abstände für optimale Lesbarkeit</p>
          </div>
          <div className={styles.card}>
            <h3>Content Card</h3>
            <p>Perfekt für Artikel und detaillierte Inhalte</p>
          </div>
          <div className={styles.card}>
            <h3>Info Card</h3>
            <p>Gute Balance zwischen Inhalt und Weißraum</p>
          </div>
        </div>

        <div className={styles.normalSection}>
          <h2>Normale Inhalte</h2>
          <p>
            Ideal für die meisten Seiteninhalte, die eine gute Balance zwischen
            Lesbarkeit und Raumnutzung benötigen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NormalWidth;
