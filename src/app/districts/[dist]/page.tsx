"use client";
import React, { useState, useEffect } from "react";
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

const Page = ({ params }) => {
  const { dist } = params;
  const [decodedDistrict, setDecodedDistrict] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Decode the URL-encoded district name
      const decodedValue = decodeURIComponent(dist);
      // Store the decoded district name in localStorage
      localStorage.setItem("District", decodedValue);
      // Also set it in state for any other potential uses
      setDecodedDistrict(decodedValue);
    }
  }, [dist]);

  console.log(decodedDistrict);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

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
      <nav
        className={`${styles.sidebar} ${
          isSidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        <ul className={styles.navList}>
          {navItems.map(({ href, icon, title }) => (
            <li
              key={href}
              className={`${styles.navItem} ${
                activeSection === href ? styles.active : ""
              }`}
            >
              <a
                href={href}
                className={styles.navLink}
                title={title}
                onClick={() => handleNavClick(href)}
              >
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

            <div className={styles.below}>
              <div className={styles.textContainer}>
                <h1 className={styles.heading}>{decodedDistrict}</h1>
                <p className={styles.description}>
                  {decodedDistrict} - Dashboard for your district
                </p>
              </div>
            </div>
          </div>

          <div className={styles.cardsContainer}>
            <Link href="/Temperature">
              <div className={styles.card}>
                <p className={styles.cardTitle}>Temperature</p>
                <p className={styles.smallDesc}>
                  Click here for a detailed analysis of the temperature trends
                  in this district.
                </p>
                <div className={styles.goCorner}>
                  <div className={styles.goArrow}>→</div>
                </div>
              </div>
            </Link>

            <Link href="/Prediction">
              <div className={styles.card}>
                <p className={styles.cardTitle}>Prediction</p>
                <p className={styles.smallDesc}>
                  Click here for weather predictions in this district.
                </p>
                <div className={styles.goCorner}>
                  <div className={styles.goArrow}>→</div>
                </div>
              </div>
            </Link>

            <Link href="/amar/mapDistrict">
              <div className={styles.card}>
                <p className={styles.cardTitle}>Maps</p>
                <p className={styles.smallDesc}>
                  Click here for to view district health
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

export default Page;
