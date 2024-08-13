'use client'
import React from 'react';
import Globe from "@/components/magicui/globe";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export function GlobeDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}

const Page = () => {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', overflowX: 'hidden', position: 'relative', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ 
        backgroundColor: 'orange', 
        width: '100%', 
        height: '50%', 
        borderBottomLeftRadius: '50%', 
        borderBottomRightRadius: '50%', 
        position: 'absolute', 
        top: 0,
        zIndex: 1,
        animation: 'slideInDown 1s ease-in-out'
      }}></div>

      <div style={{ 
        position: 'absolute', 
        top: '60%', 
        left: '10%', 
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

      <div style={{ 
        position: 'absolute', 
        top: '40%', 
        left: '50%', 
        width: '200px', 
        height: '200px', 
        borderRadius: '50%', 
        backgroundColor: 'yellow', 
        opacity: 0.5,
        animation: 'floatCircle 6s infinite ease-in-out',
        zIndex: 0,
        transform: 'translate(-50%, -50%)'
      }}></div>

      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', zIndex: 3 }}>
        <GlobeDemo />
      </div>

      <Carousel style={{ marginTop: '70vh', padding: '0 10%', zIndex: 3 }}>
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

      <footer style={{ 
        backgroundColor: 'orange', 
        color: 'white', 
        padding: '20px', 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        textAlign: 'center',
        zIndex: 3
      }}>
        <h3>Contact Us</h3>
        <p>Email: contact@districtinfo.com</p>
        <p>Phone: +1 (234) 567-890</p>
      </footer>

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

        @keyframes floatCircle {
          0% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Page;
