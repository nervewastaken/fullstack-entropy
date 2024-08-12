'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faCity, faInfoCircle, faPhone } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.page}>
      <nav className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isSidebarCollapsed ? '→' : '←'}
        </button>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${activeSection === '#home' ? styles.active : ''}`}>
            <a href="#home" className={styles.navLink} title="Home" onClick={() => handleNavClick('#home')}>
              <FontAwesomeIcon icon={faHome} />
            </a>
          </li>
          <li className={`${styles.navItem} ${activeSection === '#history' ? styles.active : ''}`}>
            <a href="#history" className={styles.navLink} title="History" onClick={() => handleNavClick('#history')}>
              <FontAwesomeIcon icon={faHistory} />
            </a>
          </li>
          <li className={`${styles.navItem} ${activeSection === '#districts' ? styles.active : ''}`}>
            <a href="#districts" className={styles.navLink} title="Districts" onClick={() => handleNavClick('#districts')}>
              <FontAwesomeIcon icon={faCity} />
            </a>
          </li>
          <li className={`${styles.navItem} ${activeSection === '#about' ? styles.active : ''}`}>
            <a href="#about" className={styles.navLink} title="About Us" onClick={() => handleNavClick('#about')}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </a>
          </li>
          <li className={`${styles.navItem} ${activeSection === '#contact' ? styles.active : ''}`}>
            <a href="#contact" className={styles.navLink} title="Contact" onClick={() => handleNavClick('#contact')}>
              <FontAwesomeIcon icon={faPhone} />
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <div className={styles.mainContainer}>
          <div className={styles.imageContainer}>
            <img src="/01.jpg" alt="Sample" className={styles.image} />
            <div className={styles.below}>
            <div className={styles.box}>
  <h3 className={styles.boxheading}>Your Heading</h3>
  <p className={styles.boxdescription}>Your description goes here. This is where you can add more details about the content of the box.</p>
</div>
<div className={styles.box}>
  <h3 className={styles.boxheading}>Your Heading</h3>
  <p className={styles.boxdescription}>Your description goes here. This is where you can add more details about the content of the box.</p>
</div>
            </div>
            <div className={styles.below}>
            <div className={styles.box}>
  <h3 className={styles.boxheading}>Your Heading</h3>
  <p className={styles.boxdescription}>Your description goes here. This is where you can add more details about the content of the box.</p>
</div>
<div className={styles.box}>
  <h3 className={styles.boxheading}>Your Heading</h3>
  <p className={styles.boxdescription}>Your description goes here. This is where you can add more details about the content of the box.</p>
</div>
            </div>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Humidity</p>
              <p className={styles.smallDesc}>
                Description for Humidity. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className={styles.goCorner}>
                <div className={styles.goArrow}>→</div>
              </div>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Temperature</p>
              <p className={styles.smallDesc}>
                Description for Temperature. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className={styles.goCorner}>
                <div className={styles.goArrow}>→</div>
              </div>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Wind Speed</p>
              <p className={styles.smallDesc}>
                Description for Wind Speed. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className={styles.goCorner}>
                <div className={styles.goArrow}>→</div>
              </div>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Dryness</p>
              <p className={styles.smallDesc}>
                Description for Dryness. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className={styles.goCorner}>
                <div className={styles.goArrow}>→</div>
              </div>
            </div>
            {/* New Cards */}
            <div className={styles.card}>
              <p className={styles.cardTitle}>Precipitation</p>
              <p className={styles.smallDesc}>
                Description for Precipitation. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className={styles.goCorner}>
                <div className={styles.goArrow}>→</div>
              </div>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Visibility</p>
              <p className={styles.smallDesc}>
                Description for Visibility. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className={styles.goCorner}>
                <div className={styles.goArrow}>→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;




