import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100); // Slight delay before triggering animation
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1
            className={`mb-8 text-4xl font-bold sm:text-6xl lg:text-7xl text-white transition-all duration-[1400ms] delay-[600ms] ease-out transform ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            PenSieve
          </h1>

          <p className={` text-xl text-white mb-27 mt-10 transition-all duration-[1600ms] delay-[1500ms] ease-out transform ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            “Dive into your stories. Store, edit, and explore your book collection with ease.”
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/home"
              className={`rounded-lg px-6 py-3 font-medium border text-white transition-all duration-[1800ms] delay-[2400ms] ease-out transform ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <p className='hover:bg-grey-300'>Get Started</p>
            </Link>
            <Link  to='/about' className={`rounded-lg border px-6 py-3 font-medium border-slate-200  text-white hover:bg-slate-50  transition-all duration-[1800ms] delay-[2400ms] ease-out transform ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
