'use client'
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "We'll tell you when you need an umbrella!";

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

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <div style={{ 
        backgroundColor: 'orange', 
        width: '60%', 
        height: '40%', 
        borderBottomLeftRadius: '0%', 
        borderBottomRightRadius: '100%', 
        position: 'absolute', 
        top: 0,
        zIndex: 1,
        animation: 'slideInDown 1s ease-in-out'
      }}></div>
      
      <div style={{ 
        position: 'absolute', 
        top: '10%', 
        right: '10%', 
        zIndex: 2,
        animation: 'fadeIn 2s ease-in-out'
      }}>
        <select style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}>
          <option>District 1</option>
          <option>District 2</option>
          <option>District 3</option>
          <option>District 4</option>
          <option>District 5</option>
        </select>
        <button style={{ 
          marginLeft: '10px', 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: 'orange', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff8000'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'orange'}>
          Search
        </button>
      </div>

      {/* AeroAura Text */}
      <div style={{ 
        position: 'absolute', 
        top: '40vh', 
        left: '10%', 
        zIndex: 3, 
        fontSize: '5rem', 
        fontWeight: 'bold', 
        color: '#740000', 
        animation: 'fadeIn 2s ease-in-out'
      }}>
        AeroAura
      </div>

      {/* Typing Text */}
      <div style={{ 
        position: 'absolute', 
        top: '50vh', 
        left: '10%', 
        zIndex: 3, 
        fontSize: '2rem', 
        color: '#333', 
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderRight: '2px solid orange', 
        animation: 'blink-caret 0.75s step-end infinite'
      }}>
        {typedText}
      </div>

      <Carousel style={{ marginTop: '80vh', padding: '0 10%', zIndex: 3 }}>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Slide+1"
            alt="First slide"
            style={{ borderRadius: '15px' }}
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
            style={{ borderRadius: '15px' }}
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
            style={{ borderRadius: '15px' }}
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
          from, to {
            border-color: transparent;
          }
          50% {
            border-color: orange;
          }
        }
      `}</style>
    </div>
  );
}

export default Page;
