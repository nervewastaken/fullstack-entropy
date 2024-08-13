"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [stationData, setStationData] = useState({});
  const [error, setError] = useState(null);

  const stations = ["Admiralty", "Sentosa Island", "Jurong (West)", "Newton"]; // Add more sectors as needed

  const fetchStationData = async (station) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get_station_data?station=${station}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setStationData((prevData) => ({
          ...prevData,
          [station]: jsonData,
        }));
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
    stations.forEach((station) => {
      fetchStationData(station);
    });
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl text-center mb-8 font-bold">Station Data</h1>
      {error && (
        <p className="text-red-500 font-semibold">Error: {error.message}</p>
      )}
      {stations.map((station) => (
        <div key={station} className="mb-12">
          <h2 className="text-2xl mb-4 font-semibold">
            {station} Forecast Data
          </h2>
          {stationData[station] ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-4 text-left">Year</th>
                  <th className="border p-4 text-left">Month</th>
                  <th className="border p-4 text-left">Temperature</th>
                  <th className="border p-4 text-left">Station</th>
                </tr>
              </thead>
              <tbody>
                {stationData[station].map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-50`}
                  >
                    <td className="border p-4">{row.year}</td>
                    <td className="border p-4">{row.month}</td>
                    <td className="border p-4">{row.temp}</td>
                    <td className="border p-4">{row.station}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading data for {station}...</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
