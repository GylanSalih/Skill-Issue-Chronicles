import React from 'react';
import styles from './Widths.module.scss';

const WidthExamples: React.FC = () => {
  return (
    <div className={styles.widthExamples}>
      <div className={styles.header}>
        <h1>Width Examples</h1>
        <p>
          Demonstration verschiedener Content-Widths für fundamentale
          UI-Komponenten
        </p>
      </div>

      <div className={styles.content}>
        {/* Full Width */}
        <section className={styles.section}>
          <h2>Full Width</h2>
          <div className={styles.fullWidth}>
            <div className={styles.contentBox}>
              <h3>Full Width Content</h3>
              <p>
                Dieser Bereich nutzt die komplette verfügbare Breite des
                Containers.
              </p>
            </div>
          </div>
        </section>

        {/* Normal Width */}
        <section className={styles.section}>
          <h2>Normal Width</h2>
          <div className={styles.normalWidth}>
            <div className={styles.contentBox}>
              <h3>Normal Width Content</h3>
              <p>
                Dieser Bereich nutzt eine standardmäßige Content-Breite mit
                angemessenen Margins.
              </p>
            </div>
          </div>
        </section>

        {/* Small Width */}
        <section className={styles.section}>
          <h2>Small Width</h2>
          <div className={styles.smallWidth}>
            <div className={styles.contentBox}>
              <h3>Small Width Content</h3>
              <p>
                Dieser Bereich nutzt eine kompakte Breite für fokussierte
                Inhalte.
              </p>
            </div>
          </div>
        </section>

        {/* Extra Small Width */}
        <section className={styles.section}>
          <h2>Extra Small Width</h2>
          <div className={styles.extraSmallWidth}>
            <div className={styles.contentBox}>
              <h3>Extra Small Width Content</h3>
              <p>
                Dieser Bereich nutzt eine sehr kompakte Breite für minimale
                Inhalte.
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Width Examples */}
        <section className={styles.section}>
          <h2>Responsive Width Examples</h2>
          <div className={styles.responsiveWidth}>
            <div className={styles.contentBox}>
              <h3>Responsive Content</h3>
              <p>
                Dieser Bereich passt sich verschiedenen Bildschirmgrößen an.
              </p>
              <div className={styles.responsiveGrid}>
                <div className={styles.gridItem}>Mobile: 100%</div>
                <div className={styles.gridItem}>Tablet: 75%</div>
                <div className={styles.gridItem}>Desktop: 50%</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WidthExamples;
