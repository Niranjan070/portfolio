import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';

export default function App() {
  return (
    <>
      {/* Global SVG filter for liquid glass distortion — used by all glass-btn elements */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter
          id="glass-distortion"
          x="-5%" y="-5%" width="110%" height="110%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" seed="17" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="4" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="2" specularConstant="0.8" specularExponent="80" lightingColor="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="30" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Fixed Three.js space background — persists across all sections */}
      <SpaceBackground />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
