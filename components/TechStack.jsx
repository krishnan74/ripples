import React from 'react'
import Marquee from 'react-fast-marquee';

import "./techstack.css";

const TechStack = () => {

   

  return (
    <Marquee
      className="flex justify-evenly w-full text-[#151515]"
      autoFill={true}
      pauseOnHover={true}
    >
      <div className=" image-wrapper">
        <img src="/nextjs.png" alt="next" className="w-[75px] h-[75px] " />
        <p className="text-sm">Next JS</p>
      </div>


      <div className=" image-wrapper">
        <img src="/cirq.png" alt="next" className="w-[75px] h-[75px] " />
        <p className="text-sm">Cirq</p>
      </div>

      <div className=" image-wrapper">
        <img
          src="/tailwindcss.png"
          alt="tailwind"
          className="w-[75px] h-[75px]"
        />
        <p className="text-sm">Tailwind</p>
      </div>

      <div className="image-wrapper">
        <img
          src="/python.png"
          alt="python"
          className="w-[75px] h-[75px] rounded-full"
        />
        <p className="text-sm">Python</p>
      </div>


      <div className="image-wrapper">
        <img
          src="/flask.png"
          alt="flask"
          className="w-[75px] h-[75px] rounded-full"
        />
        <p className="text-sm">Flask</p>
      </div>

     
    </Marquee>
  );
}

export default TechStack