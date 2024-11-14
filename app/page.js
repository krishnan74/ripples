"use client";
import React from "react";
import axios from "axios";

const Home = () => {

  const getCircuit = async (userPrompt, choiceOfOperator, fidelityScore) => {
    const circuitResponse = await axios.post(
      "http://127.0.0.1:8080/circuitBot",
      {
        prompt: "Hello I'm here",
      }
    );
    console.log(circuitResponse.data);
  };

  return (
    <div>
      <button onClick={getCircuit} className="px-5 py-2 border">
        Generate Circuit
      </button>
    </div>
  );
  
};

export default Home;
