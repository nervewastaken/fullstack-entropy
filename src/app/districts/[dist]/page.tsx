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
import Image from "next/image";

const districtInfo = {
  Admiralty: {
    weather:
      "Admiralty generally experiences warm weather year-round with occasional showers. Temperatures range from 24°C to 32°C.",
    description:
      "Admiralty is known for its consistent tropical climate with occasional rain showers, especially during the monsoon seasons.",
  },
  "Sentosa Island": {
    weather:
      "Sentosa Island enjoys a tropical climate with temperatures ranging between 25°C and 31°C. It's a bit more humid compared to other regions due to its coastal location.",
    description:
      "Sentosa Island is typically warm and humid throughout the year. Being a coastal area, it experiences slightly cooler temperatures during the evenings.",
  },
  "Jurong (West)": {
    weather:
      "Jurong West experiences a warm and humid climate year-round. Expect temperatures from 24°C to 33°C with higher humidity levels.",
    description:
      "Jurong West is one of the warmer regions in Singapore, with high humidity and regular rainfall, particularly during the northeast monsoon season.",
  },
  Newton: {
    weather:
      "Newton has a warm climate with temperatures averaging between 24°C and 31°C. It receives moderate rainfall throughout the year.",
    description:
      "Newton's weather is generally warm with regular rainfall, making it a typical example of Singapore’s tropical rainforest climate.",
  },
  Changi: {
    weather:
      "Changi is known for its relatively cooler temperatures ranging from 23°C to 30°C due to its proximity to the sea. The area also experiences frequent rain showers.",
    description:
      "Changi, being close to the coast, has a more temperate climate with cooler temperatures and higher wind speeds compared to inland areas.",
  },
};

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

  const districtData = districtInfo[decodedDistrict];

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
            <Image
              src="/NightSing.png"
              alt="Sample"
              className={styles.image}
              width={600}
              height={1000}
            />

            <div className={styles.below}>
              <div className={styles.textContainer}>
                <h1 className={styles.heading}>{decodedDistrict}</h1>
                <p className={styles.description}>
                  {districtData ? districtData.description : ""} - Dashboard for
                  your district
                </p>
                <p className={styles.weatherInfo}>
                  Weather: {districtData ? districtData.weather : ""}
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
                  Click here to view district health.
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
