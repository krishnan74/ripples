"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
import { Button } from "@/components/ui/button";
import LocationCard from "@/components/LocationCard";
import { handleOnDragStart, handleDragOver, handleOnDropFromLocation, handleOnDropToLocation } from "@/lib/utils";

const Home = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    choiceOfOperator: "",
    fidelityScore: "",
  });
  const [loading, setLoading] = useState(false);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [locations, setLocations] = useState([]); // State for locations
  const [isRouting, setIsRouting] = useState(false); // State for triggering routing animation
  const [isCompleted, setIsCompleted] = useState(false); // State for routing completion
  const [connectionStyle, setConnectionStyle] = useState({}); // Style for the connection div

  // Load CSV data
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/ripples.csv"); // Adjust the path to your CSV file
        const csvText = await response.text();

        // Parse CSV data
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            // Extract cities from the 'city' column
            const cityLocations = results.data.map((row) => ({
              name: row.city,
              img: `/images/${row.city.toLowerCase()}.jpg`, 
              lat: row.lat,
              lng: row.lng,
              // Placeholder image; you can update this
              locationID: row.id || row.city, // Assuming there's an 'id' column
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

  // Handle the button click to start routing
  const getCircuit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsRouting(true); // Trigger the routing animation

    // Use a small delay to allow the locations to render and then calculate the connection position
    setTimeout(() => {
      if (fromLocation && toLocation) {
        // Calculate the position of the connection line
        const fromRect = document.getElementById("fromLocation").getBoundingClientRect();
        const toRect = document.getElementById("toLocation").getBoundingClientRect();

        setConnectionStyle({
          left: fromRect.right, // Start at the right edge of fromLocation
          top: fromRect.top + fromRect.height / 2, // Vertically center in the fromLocation div
          width: toRect.left - fromRect.right, // The width will be the gap between the two divs
          height: "2px",
          backgroundColor: "purple",
          opacity: 0.7, // Slightly less opaque for a "frosted" look
          transformOrigin: "left",
          transition: "width 2s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 1s ease-in-out", // Smooth transition
        });
      }

      // End the routing animation after 2.5 seconds
      setTimeout(() => {
        setLoading(false);
        setIsRouting(false);
      }, 2500);

      // Set the completed state after a slight delay
      setTimeout(() => {
        setIsCompleted(true);
      }, 3000);
    }, 100); // Small delay to allow DOM update
  };

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle location drop logic
  const handleDrop = (e, setLocation) => {
    const data = e.dataTransfer.getData("location");
    const location = JSON.parse(data);
    setLocation(location);
  };

  return (
    <div className="px-24 pt-[120px] overflow-x-hidden bg-white w-screen pl-[250px] h-screen">
    
      <div className="flex justify-between items-center gap-8">
        <div
          id="fromLocation"
          onDrop={(e) => handleDrop(e, setFromLocation)}
          onDragOver={handleDragOver}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-700">From Location</h3>
          {fromLocation ? (
            <div className="flex flex-col items-center border p-4 rounded-lg h-64 w-56 shadow-md">
              <p className="font-semibold text-lg text-gray-900">{fromLocation.name}</p>
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
          {loading ? "Loading..." : isCompleted ? "Routing Completed" : "Start Routing"}
        </Button>

        <div
          id="toLocation"
          onDrop={(e) => handleDrop(e, setToLocation)}
          onDragOver={handleDragOver}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-700">To Location</h3>
          {toLocation ? (
            <div className="flex flex-col items-center border p-4 rounded-lg h-64 w-56 shadow-md">
              <p className="font-semibold text-lg text-gray-900">{toLocation.name}</p>
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

      {/* Connection Line */}
      {isRouting && (
        <div
          style={{
            ...connectionStyle,
            position: "absolute",
            zIndex: 10,
          }}
        />
      )}

      {/* Search Bar */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-md"
        />
      </div>

      <div>
        <div className="flex overflow-auto gap-x-4 mt-4">
          {filteredLocations.map((location, index) => (
            <LocationCard
              key={index}
              location={location}
              onDragStart={(e) => handleOnDragStart(e, location)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
