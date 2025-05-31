import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

const About = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-700 to-white px-6 py-12 flex">
      <BackButton destination="/" />


      <div className="w-full max-w-screen space-y-10">
        <div
          className={`transition-all transform duration-[1000ms] delay-[500ms] ease-out ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }   `}
        >
          
          <p className="text-white text-5xl font-bold mt-20 ml-80">
          Say hello to <span className={`transition-all transform duration-700 delay-[1300ms] ease-out ${
            loaded ? 'opacity-100 translate-x-0 ml-3 text-7xl text-red-500' : 'opacity-0 -translate-x-10 ml-10 text-4xl'
          }   `}> PenSieve</span>
          </p>
          <p className={`transition-opacity transform duration-700 delay-[2100ms] text-3xl  mt-7  ease-out ${
            loaded ? 'opacity-100 translate-x-0 ml-10' : 'opacity-0 -translate-x-10 ml-20'
          }   text-gray-400`}>
          A modern web companion, forged with the <span className='text-red-500'>MERN</span> stack and styled using Tailwind CSS.
          </p>
        </div>

       
      </div>
    </div>
  );
};

export default About;
