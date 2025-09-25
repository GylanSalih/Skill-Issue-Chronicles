import React from 'react';
import styles from './NarrowWidth.module.scss';

const NarrowWidth: React.FC = () => {
  return (
    <div className={styles.narrowWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Narrow Width Layout</h1>
          <p>
            Schmales Layout mit größeren seitlichen Abständen - fokussierter
            Inhalt
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Schmale Sektion</h2>
          <p>
            Diese Seite demonstriert ein Layout mit größeren seitlichen
            Abständen. Ideal für fokussierte Inhalte und bessere Lesbarkeit.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>Fokussierte Card</h3>
            <p>Größere Abstände für bessere Konzentration</p>
          </div>
          <div className={styles.card}>
            <h3>Lesbare Card</h3>
            <p>Perfekt für längere Texte und Artikel</p>
          </div>
        </div>

        <div className={styles.narrowSection}>
          <h2>Schmale Inhalte</h2>
          <p>
            Ideal für Blog-Artikel, Dokumentation oder andere textlastige
            Inhalte, die eine optimale Lesbarkeit benötigen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NarrowWidth;
