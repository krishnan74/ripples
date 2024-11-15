"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [qasmCode, setQasmCode] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");

  const handleGenerateCircuit = async () => {
    try {
      setError("");
      const response = await axios.post(
        "http://127.0.0.1:8080/generate-circuit",
        {
          qasm_code: qasmCode,
        },
        {
          responseType: "blob",
        }
      );

      const imageBlob = response.data;

      console.log(imageBlob);
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectURL);
    } catch (err) {
      setError("Failed to generate circuit image.");
      console.error(err);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 w-screen">
      <h1 className="text-3xl font-bold mb-4 ">
        Quantum Circuit Generator
      </h1>
      <textarea
        value={qasmCode}
        onChange={(e) => setQasmCode(e.target.value)}
        placeholder="Enter your QASM code here"
        rows={10}
        cols={50}
        className="w-full max-w-lg p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleGenerateCircuit}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Generate Circuit
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">
            Generated Quantum Circuit:
          </h3>
          <img
            src={imageUrl}
            alt="Quantum Circuit"
            className="border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
}
