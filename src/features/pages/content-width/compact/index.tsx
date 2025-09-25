import React from 'react';
import styles from './CompactWidth.module.scss';

const CompactWidth: React.FC = () => {
  return (
    <div className={styles.compactWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Compact Width Layout</h1>
          <p>
            Sehr kompaktes Layout mit maximalen seitlichen Abständen -
            fokussierter Inhalt
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Kompakte Sektion</h2>
          <p>
            Diese Seite demonstriert ein sehr kompaktes Layout mit maximalen
            seitlichen Abständen. Ideal für fokussierte, zentrierte Inhalte.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>Zentrierte Card</h3>
            <p>Maximale Abstände für maximale Fokussierung</p>
          </div>
        </div>

        <div className={styles.compactSection}>
          <h2>Kompakte Inhalte</h2>
          <p>
            Ideal für Landing Pages, Formulare oder andere Inhalte, die maximale
            Aufmerksamkeit und Fokussierung benötigen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompactWidth;
