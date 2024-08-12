"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Page = () => {
  const [admiraltyData, setAdmiraltyData] = useState(null);
  const [sentosaData, setSentosaData] = useState(null);
  const [admiraltyAnomalies, setAdmiraltyAnomalies] = useState(null);
  const [sentosaAnomalies, setSentosaAnomalies] = useState(null);
  const [error, setError] = useState(null);

  const fetchStationData = async (station, setData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get_station_data?station=${station}`
      );

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.log("Request failed with status", response.status);
        setError(new Error(`Request failed with status ${response.status}`));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  const fetchStationAnomalies = async (station, setAnomalies) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get_station_anomalies?station=${station}`
      );

      if (response.ok) {
        const jsonData = await response.json();
        setAnomalies(jsonData);
      } else {
        console.log("Request failed with status", response.status);
        setError(new Error(`Request failed with status ${response.status}`));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchStationData("Admiralty", setAdmiraltyData);
    fetchStationData("Sentosa Island", setSentosaData);
    fetchStationAnomalies("Admiralty", setAdmiraltyAnomalies);
    fetchStationAnomalies("Sentosa Island", setSentosaAnomalies);
  }, []);

  return (
    <div>
      <h1>Station Data</h1>
      {error && <p>Error: {error.message}</p>}

      {admiraltyData && sentosaData ? (
        <>
          <h2>Admiralty Forecast Data</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Temperature</th>
                <th>Station</th>
              </tr>
            </thead>
            <tbody>
              {admiraltyData.map((row, index) => (
                <tr key={index}>
                  <td>{row.year}</td>
                  <td>{row.month}</td>
                  <td>{row.temp}</td>
                  <td>{row.station}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Sentosa Island Forecast Data</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Temperature</th>
                <th>Station</th>
              </tr>
            </thead>
            <tbody>
              {sentosaData.map((row, index) => (
                <tr key={index}>
                  <td>{row.year}</td>
                  <td>{row.month}</td>
                  <td>{row.temp}</td>
                  <td>{row.station}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Admiralty Temperature Anomalies</h2>
          {admiraltyAnomalies ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={admiraltyAnomalies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="max_temp"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading Admiralty anomaly data...</p>
          )}

          <h2>Sentosa Island Temperature Anomalies</h2>
          {sentosaAnomalies ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={sentosaAnomalies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="max_temp"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading Sentosa Island anomaly data...</p>
          )}
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Page;
