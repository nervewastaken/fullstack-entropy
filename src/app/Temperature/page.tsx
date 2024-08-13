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
  Dot,
} from "recharts";
import moment from "moment";

const Page = () => {
  const [anomaliesData, setAnomaliesData] = useState({});
  const [error, setError] = useState(null);

  const sectors = [
    "Admiralty",
    "Sentosa Island",
    "Jurong (West)",
    "Newton",
    "Changi",
  ];

  const fetchStationAnomalies = async (station) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get_station_anomalies?station=${station}`
      );

      if (response.ok) {
        const jsonData = await response.json();
        const cleanedData = jsonData.map((item) => ({
          ...item,
          date: moment(item.date).format("YYYY-MM-DD"),
        }));
        setAnomaliesData((prevState) => ({
          ...prevState,
          [station]: cleanedData,
        }));
      } else {
        console.log("Request failed with status", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    sectors.forEach((sector) => {
      fetchStationAnomalies(sector);
    });
  }, []);

  const renderCustomizedDot = (props) => {
    const { cx, cy, payload } = props;

    if (payload.anomaly === -1) {
      return <Dot cx={cx} cy={cy} r={5} fill="red" stroke="none" />;
    }
    return null;
  };

  const customTooltip = ({ active, payload }) => {
    if (
      active &&
      payload &&
      payload.length &&
      payload[0].payload.anomaly === -1
    ) {
      const { date, max_temp } = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`Anomaly Detected`}</p>
          <p className="intro">{`Date: ${date}`}</p>
          <p className="desc">{`Max Temp: ${max_temp}°C`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h1>Temperature Anomalies Across Sectors</h1>
      {error && <p>Error: {error.message}</p>}

      {sectors.map((sector) => (
        <div key={sector}>
          <h2>{sector} Temperature Anomalies</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={anomaliesData[sector]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                label={{
                  value: "Date",
                  position: "insideBottomRight",
                  offset: 0,
                }}
                tick={false}
              />
              <YAxis />
              <Tooltip content={customTooltip} />
              <Legend />
              <Line
                type="monotone"
                dataKey="max_temp"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                dot={renderCustomizedDot}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default Page;
