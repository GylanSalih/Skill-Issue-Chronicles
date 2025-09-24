import {
  Coins,
  CreditCard,
  DollarSign,
  Lock,
  Shield,
  Star,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import React, { useState } from 'react';
import styles from './Bank.module.scss';

const Bank: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('gold');

  const currencies = [
    { id: 'gold', name: 'Gold', symbol: '₽', amount: 125000, icon: '🪙' },
    { id: 'silver', name: 'Silver', symbol: 'S', amount: 50000, icon: '🥈' },
    { id: 'copper', name: 'Copper', symbol: 'C', amount: 25000, icon: '🥉' },
    { id: 'gems', name: 'Gems', symbol: '💎', amount: 150, icon: '💎' },
  ];

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 5000,
      currency: 'gold',
      description: 'Quest Reward - Dragon Slayer',
      timestamp: '2025-01-20 14:30',
      status: 'completed',
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 2500,
      currency: 'gold',
      description: 'Equipment Purchase - Sword of Power',
      timestamp: '2025-01-20 12:15',
      status: 'completed',
    },
    {
      id: 3,
      type: 'deposit',
      amount: 10000,
      currency: 'gold',
      description: 'Boss Drop - Ancient Dragon',
      timestamp: '2025-01-19 18:45',
      status: 'completed',
    },
    {
      id: 4,
      type: 'transfer',
      amount: 1500,
      currency: 'gold',
      description: 'Guild Contribution',
      timestamp: '2025-01-19 16:20',
      status: 'pending',
    },
  ];

  const selectedCurrencyData = currencies.find(c => c.id === selectedCurrency);

  return (
    <div className={styles.bank}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <CreditCard className={styles.titleIcon} />
          <h1>Bank</h1>
        </div>
        <div className={styles.securityStatus}>
          <Shield className={styles.securityIcon} />
          <span>Secure Banking</span>
        </div>
      </div>

      <div className={styles.bankContent}>
        <div className={styles.balanceOverview}>
          <h2>Account Balance</h2>
          <div className={styles.currencyGrid}>
            {currencies.map(currency => (
              <div key={currency.id} className={styles.currencyCard}>
                <div className={styles.currencyIcon}>{currency.icon}</div>
                <div className={styles.currencyInfo}>
                  <h3>{currency.name}</h3>
                  <div className={styles.currencyAmount}>
                    {currency.symbol}
                    {currency.amount.toLocaleString()}
                  </div>
                </div>
                <div className={styles.currencyTrend}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+5.2%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bankActions}>
          <div className={styles.actionTabs}>
            <button
              className={`${styles.tabButton} ${selectedTab === 'deposit' ? styles.active : ''}`}
              onClick={() => setSelectedTab('deposit')}
            >
              <Wallet className={styles.tabIcon} />
              Deposit
            </button>
            <button
              className={`${styles.tabButton} ${selectedTab === 'withdraw' ? styles.active : ''}`}
              onClick={() => setSelectedTab('withdraw')}
            >
              <DollarSign className={styles.tabIcon} />
              Withdraw
            </button>
            <button
              className={`${styles.tabButton} ${selectedTab === 'transfer' ? styles.active : ''}`}
              onClick={() => setSelectedTab('transfer')}
            >
              <Coins className={styles.tabIcon} />
              Transfer
            </button>
          </div>

          <div className={styles.actionForm}>
            <div className={styles.formGroup}>
              <label>Currency</label>
              <select
                value={selectedCurrency}
                onChange={e => setSelectedCurrency(e.target.value)}
                className={styles.currencySelect}
              >
                {currencies.map(currency => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Amount</label>
              <div className={styles.amountInput}>
                <input
                  type='number'
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder='Enter amount'
                  className={styles.amountField}
                />
                <span className={styles.currencySymbol}>
                  {selectedCurrencyData?.symbol}
                </span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Description (Optional)</label>
              <input
                type='text'
                placeholder='Transaction description'
                className={styles.descriptionField}
              />
            </div>

            <button className={styles.actionButton}>
              {selectedTab === 'deposit' && 'Deposit Funds'}
              {selectedTab === 'withdraw' && 'Withdraw Funds'}
              {selectedTab === 'transfer' && 'Transfer Funds'}
            </button>
          </div>
        </div>

        <div className={styles.transactionHistory}>
          <h2>Recent Transactions</h2>
          <div className={styles.transactionList}>
            {transactions.map(transaction => (
              <div key={transaction.id} className={styles.transactionItem}>
                <div className={styles.transactionIcon}>
                  {transaction.type === 'deposit' && (
                    <Wallet className={styles.icon} />
                  )}
                  {transaction.type === 'withdrawal' && (
                    <DollarSign className={styles.icon} />
                  )}
                  {transaction.type === 'transfer' && (
                    <Coins className={styles.icon} />
                  )}
                </div>
                <div className={styles.transactionDetails}>
                  <div className={styles.transactionDescription}>
                    {transaction.description}
                  </div>
                  <div className={styles.transactionTimestamp}>
                    {transaction.timestamp}
                  </div>
                </div>
                <div className={styles.transactionAmount}>
                  <span
                    className={`${styles.amount} ${styles[transaction.type]}`}
                  >
                    {transaction.type === 'deposit' ? '+' : '-'}
                    {transaction.amount.toLocaleString()} {transaction.currency}
                  </span>
                  <span
                    className={`${styles.status} ${styles[transaction.status]}`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bankFeatures}>
          <h2>Banking Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <Lock className={styles.featureIcon} />
              <h3>Secure Storage</h3>
              <p>Your funds are protected with advanced encryption</p>
            </div>
            <div className={styles.featureCard}>
              <Star className={styles.featureIcon} />
              <h3>Interest Rates</h3>
              <p>Earn 2.5% annual interest on your deposits</p>
            </div>
            <div className={styles.featureCard}>
              <Shield className={styles.featureIcon} />
              <h3>Insurance</h3>
              <p>Full protection against theft and loss</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
