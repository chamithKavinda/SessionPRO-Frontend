import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  count: number;
  label: string;
  navigateTo: string;
}

const Card: React.FC<CardProps> = ({ count, label, navigateTo }) => {
  const navigate = useNavigate();
  
  return (
    <div className="div h-[7em] w-[16em] mt-4 bg-gray-100 m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden" onClick={() => navigate(navigateTo)}>
      <div className="h-[7em] w-[7em] bg-[#5b97f7] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"></div>
      <div className="h-[6em] w-[6em] bg-[#5acdff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"></div>
      <div className="h-[5em] w-[5em] bg-[#996dff] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-4xl font-bold group-hover:text-white duration-100">{count}</h2>
      </div>
      <button className="text-[0.8em] absolute bottom-[1em] left-[1em] group-hover:text-white duration-100">
        <span className="relative before:h-[0.02em] before:absolute before:w-full before:content-[''] before:bg-black group-hover:before:bg-white duration-100 before:bottom-0 before:left-0">See More</span>
      </button>
      <h1 className="z-20 font-bold font-Poppin text-[1.4em] group-hover:text-white duration-100">{label}</h1>
    </div>
  );
};

export default Card;
