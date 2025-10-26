'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ViewAllWorksButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 bg-[#FFFEFA] flex items-center justify-center">
      <div className="flex items-center justify-center space-x-8">
        
        {/* Left Arrows */}
        <div className="flex items-center space-x-1">
          {[...Array(4)].map((_, index) => (
            <div
              key={`left-${index}`}
              className={`
                transition-all duration-500 ease-out
                ${isHovered 
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-40 transform translate-x-2'
                }
              `}
              style={{
                transitionDelay: `${(3 - index) * 100}ms`
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-400"
              >
                <path
                  d="m9 18 6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Main Button */}
        <Link
          href="/proyectos"
          className="group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="
            flex items-center space-x-3 px-8 py-4 
            border border-gray-300 rounded-full
            bg-transparent hover:border-gray-400
            transition-all duration-300 ease-out
            hover:shadow-lg hover:-translate-y-1
          ">
            <span className="text-sm font-medium text-black uppercase tracking-wide">
              VER TODOS LOS PROYECTOS
            </span>
            
            {/* Button Arrow */}
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="m7 7 10 10M7 17 17 7"/>
              </svg>
            </div>
          </div>
        </Link>

        {/* Right Arrows */}
        <div className="flex items-center space-x-1">
          {[...Array(4)].map((_, index) => (
            <div
              key={`right-${index}`}
              className={`
                transition-all duration-500 ease-out
                ${isHovered 
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-40 transform -translate-x-2'
                }
              `}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-400 rotate-180"
              >
                <path
                  d="m9 18 6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}