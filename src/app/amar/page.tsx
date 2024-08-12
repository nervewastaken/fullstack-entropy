"use client";

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';

const Page = ({ selectedRegion }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map('map').setView([1.3521, 103.8198], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    function getColor(temperature) {
      return temperature > 36 ? '#FF0000' : // Extreme heat
             temperature > 34 ? '#FF5722' : // High heat
             temperature > 32 ? '#FF8A65' : // Moderate heat
             temperature > 30 ? '#FFCCBC' : // Mild heat
                                '#FFE0B2';  // Normal
    }

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.temperature),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
      };
    }

    function highlightFeature(e) {
      const layer = e.target;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    let geojson;

    // Updated path to the GeoJSON file
    d3.json('/singapore_localities.geojson').then((data) => {
      geojson = L.geoJson(data, {
        style: style,
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });

          layer.bindPopup(`${feature.properties.name}: ${feature.properties.temperature}°C`);

          // Check if this is the selected region
          if (feature.properties.name === selectedRegion) {
            setTimeout(() => {
              layer.openPopup();
              highlightFeature({ target: layer });
              zoomToFeature({ target: layer });
            }, 100);
          }
        }
      }).addTo(map);
    });

    mapRef.current = map;
  }, [selectedRegion]);

  return (
    <div>
      <h1>Choropleth Map of Singapore</h1>
      <div id="map" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};

export default Page;
