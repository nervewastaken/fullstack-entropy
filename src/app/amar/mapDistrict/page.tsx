"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as d3 from "d3";

interface PageProps {
  selectedRegion: string;
}

const Page: React.FC<PageProps> = ({ selectedRegion }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return; // Prevent re-initializing the map

    const map = L.map("map").setView([1.3521, 103.8198], 2); // Start with extreme zoom out
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    const getColor = (name: string) => {
      switch (name) {
        case "Admiralty":
          return "#8B0000"; // Dark Red
        case "Sentosa Island":
          return "#FF8C00"; // Dark Orange
        case "Changi":
          return "#228B22"; // Dodger Blue
        default:
          return "#228B22"; // Green
      }
    };

    const style = (feature: any) => ({
      fillColor: getColor(feature.properties.name),
      weight: 3, // Increase line weight for better visibility
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    });

    const highlightFeature = (e: L.LeafletMouseEvent) => {
      const layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    };
    const resetHighlight = (e: L.LeafletMouseEvent) => {
      geojson.resetStyle(e.target);
    };

    const zoomToFeature = (e: L.LeafletMouseEvent) => {
      map.fitBounds(e.target.getBounds());
    };

    let geojson: L.GeoJSON;

    // Load GeoJSON data
    d3.json("/singapore_localities.geojson").then((data) => {
      geojson = L.geoJSON(data, {
        style,
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
          });

          layer.bindPopup(
            `${feature.properties.name}: ${feature.properties.temperature}°C`
          );

          // Automatically highlight and zoom to the selected region
          if (feature.properties.name === selectedRegion) {
            setTimeout(() => {
              layer.openPopup();
              highlightFeature({ target: layer });
              zoomToFeature({ target: layer });
            }, 100);
          }
        },
      }).addTo(map);
    });

    // Transition effect: zoom out completely, then zoominto Changi after 5 seconds
    setTimeout(() => {
      map.flyTo([1.3644, 103.9915], 13, { duration: 2 }); // Fly to Changi with a zoom level of 13
    }, 1000);
    // map.flyTo([1.4406, 103.8005], 13, { duration: 2 }); // Admiralty
    // map.flyTo([1.3473, 103.7094], 13, { duration: 2 }); // Jurong West
    // map.flyTo([1.3138, 103.8362], 13, { duration: 2 }); // Newton
    // map.flyTo([1.2494, 103.8303], 13, { duration: 2 }); // Sentosa Island
  }, [selectedRegion]);

  return (
<<<<<<< HEAD
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
  <h1 style={{ 
    padding: '10px 20px', 
    fontSize: '1.5rem', 
    fontWeight: 'bold', 
    color: '#333', 
    backgroundColor: 'white', 
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto'
  }}>
    Choropleth Map of Singapore
  </h1>
  <div style={{ width: '100%', height: '600px', marginTop: '20px', border: '2px solid grey' }}>
  <div id="map" style={{ width: '100%', height: '100%' }}></div>
</div>

  <div style={{ textAlign: 'left', margin: '20px 0', fontSize: '1rem', color: '#333' }}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <div style={{ width: '30px', height: '5px', backgroundColor: 'red', marginRight: '10px' }}></div>
    <span>Extreme Heat Zone</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <div style={{ width: '30px', height: '5px', backgroundColor: 'orange', marginRight: '10px' }}></div>
    <span>Moderate Heat Zone</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '30px', height: '5px', backgroundColor: 'green', marginRight: '10px' }}></div>
    <span>Thermally Stable Zone</span>
  </div>
</div>

</div>

=======
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <h1
        style={{
          padding: "10px 20px",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        Choropleth Map of Singapore
      </h1>
      <div
        style={{
          width: "100%",
          height: "600px",
          marginTop: "20px",
          border: "2px solid grey",
        }}
      >
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>

      <div
        style={{
          textAlign: "left",
          margin: "20px 0",
          fontSize: "1rem",
          color: "#333",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "5px",
              backgroundColor: "red",
              marginRight: "10px",
            }}
          ></div>
          <span>Extreme Heat Zone</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "5px",
              backgroundColor: "orange",
              marginRight: "10px",
            }}
          ></div>
          <span>Moderate Heat Zone</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "30px",
              height: "5px",
              backgroundColor: "green",
              marginRight: "10px",
            }}
          ></div>
          <span>Thermally Stable Zone</span>
        </div>
      </div>
    </div>
>>>>>>> 81bd37f (stuff)
  );
};

export default Page;
