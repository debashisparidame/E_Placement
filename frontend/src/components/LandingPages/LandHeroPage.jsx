import React, { useState } from 'react';
import HeroImg from '../../assets/heroImg.jpg';
import { useNavigate } from 'react-router-dom';

function LandingHeroPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleCreateAccount = () => {
    if (email.trim()) {
      navigate('/student/signup', {
        state: { prefillEmail: email }
      });
    } else {
      navigate('/student/signup');
    }
  }

  const handleScrollAbout = () => document.getElementById('about').scrollIntoView();

  return (
    <section
      id="home"
      className="relative h-[90vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Dark glass overlay */}
      <div className="absolute inset-0 bg-black/40 bg-opacity-20 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl text-center">
        <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl drop-shadow-md">
          Empower Your Career with <br />
          <span className="text-3xl text-transparent bg-gradient-to-r from-red-700 via-blue-700 to-purple-800 bg-clip-text sm:text-4xl md:text-5xl">
            College Placement Portal
          </span>
        </h1>

        <p className="mt-6 text-lg font-light text-gray-300 sm:text-xl">
          Discover opportunities, track progress, and connect with your tpo — all in one place.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
          <input
            type="email"
            className="px-5 py-3 text-black transition duration-300 shadow-md w-80 sm:w-96 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 shadow-lg hover:bg-green-600 rounded-xl"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>

        {/* Call-to-action */}
        <div className="mt-8">
          <p
            className="inline-block mt-4 text-sm text-white underline transition duration-300 cursor-pointer opacity-70 hover:opacity-100 underline-offset-4"
            onClick={handleScrollAbout}
          >
            Learn more about CPMS
          </p>
        </div>
      </div>
    </section>
  );
}

export default LandingHeroPage;
