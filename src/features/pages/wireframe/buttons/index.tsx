import React from 'react';
import styles from './Buttons.module.scss';

const Buttons: React.FC = () => {
  return (
    <div className={styles.buttons}>
      <div className={styles.header}>
        <h1>Buttons</h1>
        <p>Verschiedene Button-Designs für fundamentale UI-Komponenten</p>
      </div>

      <div className={styles.content}>
        {/* Primary Buttons */}
        <section className={styles.section}>
          <h2>Primary Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnPrimary}>Primary Button</button>
            <button className={styles.btnPrimary} disabled>
              Disabled Primary
            </button>
            <button className={styles.btnPrimaryLarge}>Large Primary</button>
            <button className={styles.btnPrimarySmall}>Small Primary</button>
          </div>
        </section>

        {/* Secondary Buttons */}
        <section className={styles.section}>
          <h2>Secondary Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnSecondary}>Secondary Button</button>
            <button className={styles.btnSecondary} disabled>
              Disabled Secondary
            </button>
            <button className={styles.btnSecondaryLarge}>
              Large Secondary
            </button>
            <button className={styles.btnSecondarySmall}>
              Small Secondary
            </button>
          </div>
        </section>

        {/* Success Buttons */}
        <section className={styles.section}>
          <h2>Success Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnSuccess}>Success Button</button>
            <button className={styles.btnSuccess} disabled>
              Disabled Success
            </button>
            <button className={styles.btnSuccessLarge}>Large Success</button>
            <button className={styles.btnSuccessSmall}>Small Success</button>
          </div>
        </section>

        {/* Warning Buttons */}
        <section className={styles.section}>
          <h2>Warning Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnWarning}>Warning Button</button>
            <button className={styles.btnWarning} disabled>
              Disabled Warning
            </button>
            <button className={styles.btnWarningLarge}>Large Warning</button>
            <button className={styles.btnWarningSmall}>Small Warning</button>
          </div>
        </section>

        {/* Danger Buttons */}
        <section className={styles.section}>
          <h2>Danger Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnDanger}>Danger Button</button>
            <button className={styles.btnDanger} disabled>
              Disabled Danger
            </button>
            <button className={styles.btnDangerLarge}>Large Danger</button>
            <button className={styles.btnDangerSmall}>Small Danger</button>
          </div>
        </section>

        {/* Outline Buttons */}
        <section className={styles.section}>
          <h2>Outline Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnOutline}>Outline Button</button>
            <button className={styles.btnOutlineSecondary}>
              Outline Secondary
            </button>
            <button className={styles.btnOutlineSuccess}>
              Outline Success
            </button>
            <button className={styles.btnOutlineWarning}>
              Outline Warning
            </button>
            <button className={styles.btnOutlineDanger}>Outline Danger</button>
          </div>
        </section>

        {/* Ghost Buttons */}
        <section className={styles.section}>
          <h2>Ghost Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnGhost}>Ghost Button</button>
            <button className={styles.btnGhostSecondary}>
              Ghost Secondary
            </button>
            <button className={styles.btnGhostSuccess}>Ghost Success</button>
            <button className={styles.btnGhostWarning}>Ghost Warning</button>
            <button className={styles.btnGhostDanger}>Ghost Danger</button>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className={styles.section}>
          <h2>Icon Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnIcon}>+</button>
            <button className={styles.btnIconSecondary}>-</button>
            <button className={styles.btnIconSuccess}>✓</button>
            <button className={styles.btnIconWarning}>!</button>
            <button className={styles.btnIconDanger}>×</button>
          </div>
        </section>

        {/* Button Groups */}
        <section className={styles.section}>
          <h2>Button Groups</h2>
          <div className={styles.buttonGroup}>
            <div className={styles.btnGroup}>
              <button className={styles.btnPrimary}>First</button>
              <button className={styles.btnSecondary}>Second</button>
              <button className={styles.btnSuccess}>Third</button>
            </div>
            <div className={styles.btnGroupVertical}>
              <button className={styles.btnPrimary}>Top</button>
              <button className={styles.btnSecondary}>Middle</button>
              <button className={styles.btnSuccess}>Bottom</button>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className={styles.section}>
          <h2>Loading States</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.btnPrimary} disabled>
              <span className={styles.spinner}></span>
              Loading...
            </button>
            <button className={styles.btnSecondary} disabled>
              <span className={styles.spinner}></span>
              Processing
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Buttons;
