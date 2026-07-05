import api from "../services/api";
import { Helmet } from "react-helmet";

import Navbar from "../Components/landing/Navbar";
import Hero from "../Components/landing/Hero";
import About from "../Components/landing/About";
import Features from "../Components/landing/Features";
import MediaPlayer from "../Components/landing/MediaPlayer";
import Quiz from "../Components/landing/Quiz";
import Benefits from "../Components/landing/Benefits";
import Footer from "../Components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Media Pembelajaran Sejarah Kerajaan Indonesia</title>
      </Helmet>

      <div className="min-h-screen bg-bg-soft text-ink">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Features />
          <MediaPlayer />
          <Quiz />
          <Benefits />
        </main>

        <Footer />
      </div>
    </>
  );
}