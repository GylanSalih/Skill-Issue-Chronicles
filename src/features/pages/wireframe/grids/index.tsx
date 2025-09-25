import React from 'react';
import styles from './Grids.module.scss';

const GridDesigns: React.FC = () => {
  return (
    <div className={styles.gridDesigns}>
      <div className={styles.header}>
        <h1>Grid Designs</h1>
        <p>Verschiedene Grid-Layouts für fundamentale UI-Komponenten</p>
      </div>

      <div className={styles.content}>
        {/* 2 Column Grid */}
        <section className={styles.section}>
          <h2>2 Column Grid</h2>
          <div className={styles.grid2Col}>
            <div className={styles.gridItem}>Item 1</div>
            <div className={styles.gridItem}>Item 2</div>
          </div>
        </section>

        {/* 3 Column Grid */}
        <section className={styles.section}>
          <h2>3 Column Grid</h2>
          <div className={styles.grid3Col}>
            <div className={styles.gridItem}>Item 1</div>
            <div className={styles.gridItem}>Item 2</div>
            <div className={styles.gridItem}>Item 3</div>
          </div>
        </section>

        {/* 4 Column Grid */}
        <section className={styles.section}>
          <h2>4 Column Grid</h2>
          <div className={styles.grid4Col}>
            <div className={styles.gridItem}>Item 1</div>
            <div className={styles.gridItem}>Item 2</div>
            <div className={styles.gridItem}>Item 3</div>
            <div className={styles.gridItem}>Item 4</div>
          </div>
        </section>

        {/* Auto-fit Grid */}
        <section className={styles.section}>
          <h2>Auto-fit Grid</h2>
          <div className={styles.gridAutoFit}>
            <div className={styles.gridItem}>Auto Item 1</div>
            <div className={styles.gridItem}>Auto Item 2</div>
            <div className={styles.gridItem}>Auto Item 3</div>
            <div className={styles.gridItem}>Auto Item 4</div>
            <div className={styles.gridItem}>Auto Item 5</div>
            <div className={styles.gridItem}>Auto Item 6</div>
          </div>
        </section>

        {/* Asymmetric Grid */}
        <section className={styles.section}>
          <h2>Asymmetric Grid</h2>
          <div className={styles.gridAsymmetric}>
            <div className={styles.gridItemLarge}>Large Item</div>
            <div className={styles.gridItem}>Small Item 1</div>
            <div className={styles.gridItem}>Small Item 2</div>
            <div className={styles.gridItem}>Small Item 3</div>
            <div className={styles.gridItem}>Small Item 4</div>
          </div>
        </section>

        {/* Masonry Grid */}
        <section className={styles.section}>
          <h2>Masonry Grid</h2>
          <div className={styles.gridMasonry}>
            <div className={styles.masonryItem}>Short content</div>
            <div className={styles.masonryItem}>
              This is a longer content item that will take up more vertical
              space
            </div>
            <div className={styles.masonryItem}>Medium content</div>
            <div className={styles.masonryItem}>
              Another longer content item with more text to demonstrate the
              masonry layout
            </div>
            <div className={styles.masonryItem}>Short</div>
            <div className={styles.masonryItem}>
              This is the longest content item that will definitely take up the
              most vertical space in this masonry grid layout
            </div>
          </div>
        </section>

        {/* Responsive Grid */}
        <section className={styles.section}>
          <h2>Responsive Grid</h2>
          <div className={styles.gridResponsive}>
            <div className={styles.gridItem}>Responsive 1</div>
            <div className={styles.gridItem}>Responsive 2</div>
            <div className={styles.gridItem}>Responsive 3</div>
            <div className={styles.gridItem}>Responsive 4</div>
            <div className={styles.gridItem}>Responsive 5</div>
            <div className={styles.gridItem}>Responsive 6</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GridDesigns;
