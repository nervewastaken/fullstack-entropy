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
  const [anomaliesData, setAnomaliesData] = useState([]);
  const [error, setError] = useState(null);
  const [district, setSelectedDistrict] = useState("");

  useEffect(() => {
    const selectedDistrict = localStorage.getItem("District");
    if (selectedDistrict) {
      setSelectedDistrict(selectedDistrict);
      fetchStationAnomalies(selectedDistrict);
    } else {
      setError("No district selected or invalid district");
    }
  }, []);

  const fetchStationAnomalies = async (district) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get_station_anomalies?station=${district}`
      );

      if (response.ok) {
        const jsonData = await response.json();
        const cleanedData = jsonData.map((item) => ({
          ...item,
          date: moment(item.date).format("YYYY-MM-DD"),
        }));
        setAnomaliesData(cleanedData);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching anomalies data:", error);
      setError(error.message);
    }
  };

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
    <div className="p-8 font-sans">
      <h1 className="text-3xl text-center mb-8 font-bold">
        {district} Temperature Anomalies
      </h1>
      {error && <p className="text-red-500 font-semibold">Error: {error}</p>}

      {anomaliesData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={anomaliesData}>
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
      )}
    </div>
  );
};

export default Page;
