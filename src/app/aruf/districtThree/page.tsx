"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHistory,
  faCity,
  faInfoCircle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // Specify type for 'section' as string
  const handleNavClick = (section: string) => setActiveSection(section);

  const navItems = [
    { href: "#home", icon: faHome, title: "Home" },
    { href: "#history", icon: faHistory, title: "History" },
    { href: "#districts", icon: faCity, title: "Districts" },
    { href: "#about", icon: faInfoCircle, title: "About Us" },
    { href: "#contact", icon: faPhone, title: "Contact" },
  ];

  return (
    <div className={styles.page}>
      <nav className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ""}`}>
        <ul className={styles.navList}>
          {navItems.map(({ href, icon, title }) => (
            <li key={href} className={`${styles.navItem} ${activeSection === href ? styles.active : ""}`}>
              <a href={href} className={styles.navLink} title={title} onClick={() => handleNavClick(href)}>
                <FontAwesomeIcon icon={icon} />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.content}>
        <div className={styles.mainContainer}>
          <div className={styles.imageContainer}>
            <img src="/01.jpg" alt="Sample" className={styles.image} />

            {/* First Heading Card */}
            <div className={styles.below}>
              <div className={styles.textContainer}>
                <h1 className={styles.heading}>Beautiful Heading</h1>
                <p className={styles.description}>
                  This is a description text that provides more information about the heading. It’s left-aligned and styled to look attractive.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.cardsContainer}>
            <Link href="/Humidity">
              <div className={styles.card}>
                <p className={styles.cardTitle}>Humidity</p>
                <p className={styles.smallDesc}>
                  Description for Humidity. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <div className={styles.goCorner}>
                  <div className={styles.goArrow}>→</div>
                </div>
              </div>
            </Link>

            <Link href="/Temperature">
              <div className={styles.card}>
                <p className={styles.cardTitle}>Temperature</p>
                <p className={styles.smallDesc}>
                  Description for Temperature. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <div className={styles.goCorner}>
                  <div className={styles.goArrow}>→</div>
                </div>
              </div>
            </Link>

            <Link href="#">
              <div className={styles.card}>
                <p className={styles.cardTitle}>Wind Speed</p>
                <p className={styles.smallDesc}>
                  Description for Wind Speed. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <div className={styles.goCorner}>
                  <div className={styles.goArrow}>→</div>
                </div>
              </div>
            </Link>

            <Link href="#">
              <div className={styles.card}>
                <p className={styles.cardTitle}>Dryness</p>
                <p className={styles.smallDesc}>
                  Description for Dryness. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <div className={styles.goCorner}>
                  <div className={styles.goArrow}>→</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomSVGIcon = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
      />
    </svg>
  );
};

export default App;
