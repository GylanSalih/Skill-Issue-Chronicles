import React from 'react';
import styles from './WideWidth.module.scss';

const WideWidth: React.FC = () => {
  return (
    <div className={styles.wideWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Wide Width Layout</h1>
          <p>
            Breites Layout mit minimalen seitlichen Abständen - ähnlich wie
            Shop-Seite
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Breite Sektion</h2>
          <p>
            Diese Seite demonstriert ein Layout mit sehr geringen seitlichen
            Abständen. Ideal für Shop-ähnliche Seiten mit vielen Elementen.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>Produkt 1</h3>
            <p>Minimale Abstände für maximale Produktanzahl</p>
          </div>
          <div className={styles.card}>
            <h3>Produkt 2</h3>
            <p>Perfekt für E-Commerce Layouts</p>
          </div>
          <div className={styles.card}>
            <h3>Produkt 3</h3>
            <p>Effiziente Raumnutzung</p>
          </div>
          <div className={styles.card}>
            <h3>Produkt 4</h3>
            <p>Viele Elemente auf einen Blick</p>
          </div>
        </div>

        <div className={styles.wideSection}>
          <h2>Breite Inhalte</h2>
          <p>
            Ideal für Kataloge, Galerien oder Listen mit vielen Elementen, die
            den verfügbaren Platz optimal nutzen sollen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WideWidth;
