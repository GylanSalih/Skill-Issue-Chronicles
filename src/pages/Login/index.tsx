import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      console.log('Registration attempt:', formData);
      // Hier würde die Registrierungs-Logik implementiert werden
    } else {
      console.log('Login attempt:', formData);
      // Hier würde die Login-Logik implementiert werden
    }
    // Nach Login/Registrierung zur Character Selection weiterleiten
    navigate('/character-selection');
  };

  const handleSkipToGame = () => {
    // Direkt zur Character Selection weiterleiten
    navigate('/character-selection');
  };

  const toggleRegisterMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.background}>
        <img src="/assets/img/scenery/dungeon2.png" alt="Background" className={styles.backgroundImage} />
        </div>
 
      
      <div className={styles.loginContainer}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <img 
              src="/assets/logo/logo2.png" 
              alt="Skill Issue Chronicles" 
              className={styles.logoImage}
            />
          </div>
        </div>

        <div className={styles.loginForm}>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={16} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder={isRegisterMode ? "Benutzername" : "Anmeldename (nicht E-Mail-Adresse)"}
                  className={styles.input}
                />
                <div className={styles.inputDivider}></div>
                <button type="button" className={styles.inputAction}>
                  <User size={16} />
                </button>
              </div>
            </div>

            {isRegisterMode && (
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-Mail-Adresse"
                    className={styles.input}
                  />
                  <div className={styles.inputDivider}></div>
                  <button type="button" className={styles.inputAction}>
                    <Mail size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Passwort"
                  className={styles.input}
                />
                <div className={styles.inputDivider}></div>
                <button 
                  type="button" 
                  className={styles.inputAction}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {!isRegisterMode && <a href="#" className={styles.forgotPassword}>Forgot Password?</a>}
            </div>

            {isRegisterMode && (
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} size={16} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Passwort bestätigen"
                    className={styles.input}
                  />
                  <div className={styles.inputDivider}></div>
                  <button 
                    type="button" 
                    className={styles.inputAction}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

          </form>

          <button type="submit" className={styles.loginButton}>
            {isRegisterMode ? 'Registrieren' : 'Einloggen'}
          </button>

          <div className={styles.additionalLinks}>
            <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); toggleRegisterMode(); }}>
              {isRegisterMode ? 'Bereits registriert? Jetzt einloggen' : 'Neu hier? Jetzt registrieren'}
            </a>
            <span className={styles.linkDivider}>|</span>
            <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); handleSkipToGame(); }}>Überspringen & weiter zum Spiel</a>
          </div>

          <button className={styles.discordButton}>
            <span>Join us on</span>
            <div className={styles.discordLogo}></div>
            <span>Discord</span>
            <ArrowRight size={16} />
          </button>

          <div className={styles.footer}>
            <p>Developed by Jiggi © 2025</p>
            <div className={styles.footerLinks}>
              <a href="#">Sprache ändern</a>
              <span>|</span>
              <a href="#">Datenschutzrichtlinie</a>
              <span>|</span>
              <a href="#">Inhalt melden</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
