import React from 'react';
import {
  FileText,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import styles from './GameRules.module.scss';

const GameRules = () => {
  const rules = [
    {
      category: 'General Rules',
      icon: Shield,
      rules: [
        'Respect all players and staff members at all times',
        'No harassment, discrimination, or hate speech',
        'English is the primary language in public channels',
        'Keep discussions appropriate for all ages',
        'No spamming or excessive use of caps',
      ],
    },
    {
      category: 'Gameplay Rules',
      icon: FileText,
      rules: [
        'No cheating, exploiting, or using third-party software',
        'One account per person - no multiple accounts',
        'No sharing accounts with other players',
        'No real money trading (RMT) for in-game items',
        "Report bugs through proper channels, don't exploit them",
      ],
    },
    {
      category: 'Community Guidelines',
      icon: Users,
      rules: [
        'Be helpful and constructive in discussions',
        'No advertising other games or services',
        'Keep personal information private',
        'Use appropriate channels for different topics',
        'Follow moderator instructions immediately',
      ],
    },
    {
      category: 'Prohibited Content',
      icon: AlertTriangle,
      rules: [
        'No inappropriate usernames or character names',
        'No NSFW content in public areas',
        'No political or religious discussions',
        'No sharing of personal information',
        'No content that violates Discord/Platform ToS',
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <FileText className={styles.headerIcon} size={24} />
        <div className={styles.headerContent}>
          <h1>Game Rules</h1>
          <p>
            Please read and follow these rules to ensure a positive gaming
            experience for everyone.
          </p>
        </div>
      </div>

      {/* Rules Sections */}
      <div className={styles.rulesGrid}>
        {rules.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div key={index} className={styles.ruleCard}>
              <div className={styles.ruleHeader}>
                <IconComponent className={styles.ruleIcon} size={24} />
                <h2>{section.category}</h2>
              </div>
              <ul className={styles.ruleList}>
                {section.rules.map((rule, ruleIndex) => (
                  <li key={ruleIndex} className={styles.ruleItem}>
                    <CheckCircle className={styles.checkIcon} size={16} />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Contact Section */}
      <div className={styles.contactCard}>
        <div className={styles.contactContent}>
          <AlertTriangle className={styles.contactIcon} size={24} />
          <div className={styles.contactText}>
            <h3>Need Help or Want to Report?</h3>
            <p>
              If you have questions about these rules or need to report a
              violation, please contact our moderation team through Discord or
              use the in-game report system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRules;
