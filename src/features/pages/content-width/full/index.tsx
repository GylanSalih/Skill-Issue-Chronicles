import React from 'react';
import styles from './FullWidth.module.scss';

const FullWidth: React.FC = () => {
  return (
    <div className={styles.fullWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Full Width Layout</h1>
          <p>
            Komplett randloser Inhalt - nutzt die gesamte verfügbare Breite ohne
            Abstände
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Vollbreite Sektion</h2>
          <p>
            Diese Seite demonstriert ein Layout ohne seitliche Abstände. Der
            Inhalt erstreckt sich über die gesamte verfügbare Breite des
            Viewports.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>Card 1</h3>
            <p>Vollbreite Karten ohne seitliche Abstände</p>
          </div>
          <div className={styles.card}>
            <h3>Card 2</h3>
            <p>Ideal für Dashboard-ähnliche Layouts</p>
          </div>
          <div className={styles.card}>
            <h3>Card 3</h3>
            <p>Maximale Nutzung des verfügbaren Platzes</p>
          </div>
        </div>

        <div className={styles.fullWidthSection}>
          <h2>Vollbreite Inhalte</h2>
          <p>
            Perfekt für Hero-Bereiche, Bildergalerien oder
            Datenvisualisierungen, die den gesamten Bildschirm nutzen sollen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullWidth;
