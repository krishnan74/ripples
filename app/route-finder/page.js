"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
import { Button } from "@/components/ui/button";
import LocationCard from "@/components/LocationCard";
import axios from "axios";
import {
  handleOnDragStart,
  handleDragOver,
  handleOnDropFromLocation,
  handleOnDropToLocation,
  splitCities,
} from "@/lib/utils";
import "./route.css";

const Home = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    choiceOfOperator: "",
    fidelityScore: "",
  });
  const [loading, setLoading] = useState(false);
  const [fromLocation, setFromLocation] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [optimal_path, setOptimalPath] = useState([]);
  const [intermediates_used, setInterMediate] = useState([]);
  const [cost_function_value, setCostFuncValue] = useState(null);

  const [toLocation, setToLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [isRouting, setIsRouting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [connectionStyle, setConnectionStyle] = useState({});

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/ripples.csv");
        const csvText = await response.text();

        // Parse CSV data
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const cityLocations = results.data.map((row) => ({
              name: row.city,
              img: `/images/${row.city.toLowerCase()}.jpg`,
              lat: row.lat,
              lng: row.lng,
              locationID: row.id || row.city,
            }));
            setLocations(cityLocations);
          },
        });
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadCSV();
  }, []);

  const getCircuit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsRouting(true);

    const qoaoCircuitReponse = await axios.post(
      "http://127.0.0.1:8080/generate-qaoa-circuit",
      {
        from_city: fromLocation.name,
        to_city: toLocation.name,
      }
    );

    const imageBase64 = qoaoCircuitReponse.data.image;

    console.log(qoaoCircuitReponse.data);

    setImageUrl(imageBase64);
    setOptimalPath(qoaoCircuitReponse.data.optimal_path);
    setInterMediate(qoaoCircuitReponse.data.intermediates_used);
    setCostFuncValue(qoaoCircuitReponse.data.cost_function_value);

    setLoading(false);
    setIsCompleted(true);
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrop = (e, setLocation) => {
    const data = e.dataTransfer.getData("location");
    const location = JSON.parse(data);
    setLocation(location);
  };

  const clearLocations = () => {
    setFromLocation(null);
    setToLocation(null);
    setIsCompleted(false);
  };

  const swapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
    setIsCompleted(false);
  };

  return (
    <div className="px-24 pt-[20px] overflow-x-hidden bg-white w-screen pl-[250px] h-screen">
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-md"
        />
      </div>

      <div className="mb-10">
        <div className="flex overflow-auto gap-x-4 mt-4 pb-3">
          {filteredLocations.map((location, index) => (
            <LocationCard
              key={index}
              location={location}
              onDragStart={(e) => handleOnDragStart(e, location)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center gap-8">
        <div
          id="fromLocation"
          onDrop={(e) => handleDrop(e, setFromLocation)}
          onDragOver={handleDragOver}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            From Location
          </h3>
          {fromLocation ? (
            <div className="flex flex-col items-center border p-4 rounded-lg h-64 w-56 shadow-md">
              <p className="font-semibold text-lg text-gray-900">
                {fromLocation.name}
              </p>
              <img
                className="rounded mt-4"
                height={150}
                width={150}
                src={fromLocation.img}
                alt={fromLocation.name}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border p-4 rounded-lg h-64 w-56 text-gray-500">
              <p>Drop From Location here</p>
            </div>
          )}
        </div>

        <Button
          className="bg-purple-500 text-white p-4 rounded-full hover:bg-purple-600"
          disabled={loading || isCompleted}
          onClick={getCircuit}
        >
          {loading
            ? "Loading..."
            : isCompleted
            ? "Routing Completed"
            : "Start Routing"}
        </Button>

        <div
          id="toLocation"
          onDrop={(e) => handleDrop(e, setToLocation)}
          onDragOver={handleDragOver}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            To Location
          </h3>
          {toLocation ? (
            <div className="flex flex-col items-center border p-4 rounded-lg h-64 w-56 shadow-md">
              <p className="font-semibold text-lg text-gray-900">
                {toLocation.name}
              </p>
              <img
                className="rounded mt-4"
                height={150}
                width={150}
                src={toLocation.img}
                alt={toLocation.name}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border p-4 rounded-lg h-64 w-56 text-gray-500">
              <p>Drop To Location here</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600"
          onClick={clearLocations}
        >
          Clear Locations
        </Button>
        <Button
          className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600"
          onClick={swapLocations}
        >
          Swap Locations
        </Button>
      </div>

      {isRouting && (
        <div
          style={{
            ...connectionStyle,
            position: "absolute",
            zIndex: 10,
          }}
        />
      )}

      {imageUrl && (
        <div className="mt-8 pb-10">
          <h3 className="text-xl font-semibold mb-2">
            Generated Quantum Circuit:
          </h3>
          <img
            src={`data:image/png;base64,${imageUrl}`}
            alt="Quantum Circuit"
            className="border border-gray-300 rounded"
          />

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Optimal Path:</h3>
            <p>{optimal_path.join("->")}</p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              Intermediates Used:
            </h3>

            <p>
              {intermediates_used.length == 0
                ? "None"
                : intermediates_used.join(",")}
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              Cost Function Value:
            </h3>

            <p>{cost_function_value}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
