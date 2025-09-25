import React from 'react';
import styles from './Typography.module.scss';

const Typography: React.FC = () => {
  return (
    <div className={styles.typography}>
      <div className={styles.header}>
        <h1>Typography</h1>
        <p>
          Verschiedene Schriftarten und Text-Styles für fundamentale
          UI-Komponenten
        </p>
      </div>

      <div className={styles.content}>
        {/* Headings */}
        <section className={styles.section}>
          <h2>Headings</h2>
          <div className={styles.headingGroup}>
            <h1 className={styles.h1}>Heading 1 - Main Title</h1>
            <h2 className={styles.h2}>Heading 2 - Section Title</h2>
            <h3 className={styles.h3}>Heading 3 - Subsection Title</h3>
            <h4 className={styles.h4}>Heading 4 - Card Title</h4>
            <h5 className={styles.h5}>Heading 5 - Small Title</h5>
            <h6 className={styles.h6}>Heading 6 - Tiny Title</h6>
          </div>
        </section>

        {/* Body Text */}
        <section className={styles.section}>
          <h2>Body Text</h2>
          <div className={styles.bodyGroup}>
            <p className={styles.bodyLarge}>
              Large body text - This is used for important descriptions and
              introductory content. It provides good readability and draws
              attention to key information.
            </p>
            <p className={styles.body}>
              Regular body text - This is the standard text size for most
              content. It's comfortable to read and works well for paragraphs
              and general information.
            </p>
            <p className={styles.bodySmall}>
              Small body text - This is used for secondary information,
              captions, and less important details. It helps create visual
              hierarchy without overwhelming the reader.
            </p>
          </div>
        </section>

        {/* Text Colors */}
        <section className={styles.section}>
          <h2>Text Colors</h2>
          <div className={styles.colorGroup}>
            <p className={styles.textPrimary}>
              Primary text color - Main content
            </p>
            <p className={styles.textSecondary}>
              Secondary text color - Supporting content
            </p>
            <p className={styles.textMuted}>
              Muted text color - Less important content
            </p>
            <p className={styles.textSubtle}>
              Subtle text color - Very subtle content
            </p>
            <p className={styles.textSuccess}>
              Success text color - Positive feedback
            </p>
            <p className={styles.textWarning}>
              Warning text color - Caution messages
            </p>
            <p className={styles.textError}>
              Error text color - Error messages
            </p>
            <p className={styles.textInfo}>
              Info text color - Informational content
            </p>
          </div>
        </section>

        {/* Font Weights */}
        <section className={styles.section}>
          <h2>Font Weights</h2>
          <div className={styles.weightGroup}>
            <p className={styles.weightThin}>Thin weight - Very light text</p>
            <p className={styles.weightLight}>Light weight - Light text</p>
            <p className={styles.weightNormal}>Normal weight - Regular text</p>
            <p className={styles.weightMedium}>
              Medium weight - Medium emphasis
            </p>
            <p className={styles.weightSemiBold}>
              Semi-bold weight - Strong emphasis
            </p>
            <p className={styles.weightBold}>
              Bold weight - Very strong emphasis
            </p>
            <p className={styles.weightExtraBold}>
              Extra-bold weight - Maximum emphasis
            </p>
          </div>
        </section>

        {/* Text Styles */}
        <section className={styles.section}>
          <h2>Text Styles</h2>
          <div className={styles.styleGroup}>
            <p className={styles.italic}>Italic text - Emphasized content</p>
            <p className={styles.underline}>
              Underlined text - Important links
            </p>
            <p className={styles.strikethrough}>
              Strikethrough text - Deleted content
            </p>
            <p className={styles.uppercase}>
              Uppercase text - Headers and labels
            </p>
            <p className={styles.lowercase}>
              Lowercase text - Consistent formatting
            </p>
            <p className={styles.capitalize}>
              Capitalize text - Title case formatting
            </p>
            <p className={styles.monospace}>Monospace text - Code and data</p>
          </div>
        </section>

        {/* Text Alignment */}
        <section className={styles.section}>
          <h2>Text Alignment</h2>
          <div className={styles.alignmentGroup}>
            <p className={styles.alignLeft}>
              Left aligned text - Standard reading flow
            </p>
            <p className={styles.alignCenter}>
              Center aligned text - Headers and titles
            </p>
            <p className={styles.alignRight}>
              Right aligned text - Numbers and dates
            </p>
            <p className={styles.alignJustify}>
              Justified text - This text is justified, meaning it spreads out to
              fill the entire width of the container. This creates clean,
              straight edges on both sides of the text block.
            </p>
          </div>
        </section>

        {/* Line Heights */}
        <section className={styles.section}>
          <h2>Line Heights</h2>
          <div className={styles.lineHeightGroup}>
            <p className={styles.lineHeightTight}>
              Tight line height - This text has a tight line height for compact
              layouts. It's useful when space is limited but can make text
              harder to read in long paragraphs.
            </p>
            <p className={styles.lineHeightNormal}>
              Normal line height - This text has a normal line height for
              comfortable reading. It provides good balance between space
              efficiency and readability for most content.
            </p>
            <p className={styles.lineHeightRelaxed}>
              Relaxed line height - This text has a relaxed line height for
              better readability. It's especially useful for long-form content
              and improves reading comfort.
            </p>
          </div>
        </section>

        {/* Text Gradients */}
        <section className={styles.section}>
          <h2>Text Gradients</h2>
          <div className={styles.gradientGroup}>
            <h3 className={styles.gradientPrimary}>Primary Gradient Text</h3>
            <h3 className={styles.gradientAccent}>Accent Gradient Text</h3>
            <h3 className={styles.gradientRainbow}>Rainbow Gradient Text</h3>
            <h3 className={styles.gradientOrange}>Orange Gradient Text</h3>
            <h3 className={styles.gradientBlue}>Blue Gradient Text</h3>
          </div>
        </section>

        {/* Code Text */}
        <section className={styles.section}>
          <h2>Code Text</h2>
          <div className={styles.codeGroup}>
            <code className={styles.inlineCode}>inline code</code>
            <pre className={styles.codeBlock}>
              <code>{`// Code block example
function greetUser(name) {
  return \`Hello, \${name}!\`;
}

const message = greetUser('World');
console.log(message);`}</code>
            </pre>
          </div>
        </section>

        {/* Text Sizes */}
        <section className={styles.section}>
          <h2>Text Sizes</h2>
          <div className={styles.sizeGroup}>
            <p className={styles.textXs}>Extra small text (12px)</p>
            <p className={styles.textSm}>Small text (14px)</p>
            <p className={styles.textBase}>Base text (16px)</p>
            <p className={styles.textLg}>Large text (18px)</p>
            <p className={styles.textXl}>Extra large text (20px)</p>
            <p className={styles.text2xl}>2XL text (24px)</p>
            <p className={styles.text3xl}>3XL text (30px)</p>
            <p className={styles.text4xl}>4XL text (36px)</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Typography;
