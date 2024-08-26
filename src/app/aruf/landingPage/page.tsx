"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { WavyBackground } from "@/components/ui/wavy-background";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const Page = () => {
  const [typedText, setTypedText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const fullText = "We'll tell you when you need an umbrella!";

  const districts = [
    "Admiralty",
    "Sentosa Island",
    "Jurong (West)",
    "Newton",
    "Changi",
  ];

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust typing speed by changing the interval
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredSuggestions = districts.filter((district) =>
        district.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Hamburger Menu */}
      <div
        style={{ position: "absolute", top: "60px", left: "50px", zIndex: 4 }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            backgroundColor: "orange",
            border: "none",
            borderRadius: "5px",
            padding: "5px",
            paddingRight: "10px",
            paddingLeft: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          ☰
        </button>
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "0",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 5,
              width: "150px",
            }}
          >
            <a
              href="#map"
              style={{
                display: "block",
                padding: "10px",
                color: "black",
                textDecoration: "none",
              }}
            >
              Map
            </a>
            <a
              href="#about"
              style={{
                display: "block",
                padding: "10px",
                color: "black",
                textDecoration: "none",
              }}
            >
              About Us
            </a>
            <a
              href="#source-code"
              style={{
                display: "block",
                padding: "10px",
                color: "black",
                textDecoration: "none",
              }}
            >
              Source Code
            </a>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "orange",
          width: "0%",
          height: "0%",
          borderBottomLeftRadius: "0%",
          borderBottomRightRadius: "100%",
          position: "absolute",
          top: 0,
          zIndex: 1,
          animation: "slideInDown 1s ease-in-out",
        }}
      ></div>

      {/* Search Bar */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          zIndex: 2,
          animation: "fadeIn 2s ease-in-out",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", width: "200px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search districts..."
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "40px",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 5,
                listStyleType: "none",
                padding: "0",
                margin: "0",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Link href={`/districts/${suggestion}`}>{suggestion}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <FaSearch
          style={{
            marginLeft: "10px",
            fontSize: "24px",
            color: "orange",
            cursor: "pointer",
          }}
        />
      </div>

      {/* AeroAura Text */}
      <div
        style={{
          position: "absolute",
          top: "40vh",
          left: "10%",
          zIndex: 3,
          fontSize: "5rem",
          fontWeight: "bold",
          color: "#740000",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        AeroAura
      </div>

      {/* Typing Text */}
      <div
        style={{
          position: "absolute",
          top: "53vh",
          left: "10%",
          zIndex: 3,
          fontSize: "2rem",
          color: "#333",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          overflow: "hidden",
          borderRight: "2px solid orange",
          animation: "blink-caret 0.75s step-end infinite",
        }}
      >
        {typedText}
      </div>

      {/* WavyBackgroundDemo Component */}
      <div style={{ marginTop: "60vh", zIndex: 3 }}>
        <WavyBackground />
      </div>

      <Carousel style={{ marginTop: "100vh", padding: "0 10%", zIndex: 3 }}>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Slide+1"
            alt="First slide"
            style={{ borderRadius: "15px" }}
          />
          <Carousel.Caption>
            <h3>District Insights</h3>
            <p>Discover more about each district.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Slide+2"
            alt="Second slide"
            style={{ borderRadius: "15px" }}
          />
          <Carousel.Caption>
            <h3>Community Events</h3>
            <p>Stay updated with local events.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Slide+3"
            alt="Third slide"
            style={{ borderRadius: "15px" }}
          />
          <Carousel.Caption>
            <h3>Local News</h3>
            <p>Read the latest news from your district.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <style jsx>{`
        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: orange;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
