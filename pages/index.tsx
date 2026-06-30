'use client';

import type { NextPage } from 'next'
import Script from 'next/script';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import styles from '../styles/Home.module.css'
import SelfIntro from '../components/SelfIntro'
import Timeline from '../components/Timeline'
import SelfProject from '../components/SelfProject'

const Home: NextPage = () => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    // { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-[#0f172a] text-[#f8fafc] min-h-screen selection:bg-cyan-500 selection:text-black" >


      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>JIM.CHAN | Portfolio</title>
        {/* <!-- Google Fonts for a tech/monospaced aesthetic --> */}
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </Head>

      {/* 1. HEADER SECTION */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#0f172a]/85 backdrop-blur-md border-b border-cyan-500/30 z-50">
        <div className="max-w-6xl mx-auto px-5 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#34d399]">
            JIM.CHAN
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm tracking-wider text-[#cbd5e1] hover:text-[#38bdf8] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
              >
                // {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#38bdf8] p-1 cursor-pointer focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>


        {/* Mobile Dropdown Menu */}
        <div className={`fixed top-16 left-0 w-full bg-[#0f172a] border-b border-cyan-500/40 flex-col p-5 pb-6 gap-4 z-40 transition-all duration-300 ${isMenuOpen ? 'flex opacity-100' : 'hidden opacity-0'}`}>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg text-[#f8fafc] py-2 border-b border-[#334155]"
            >
              &gt; {item.name}
            </a>
          ))}
        </div>
      </header>


      {/* 2. MAIN HERO SECTION */}
      <SelfIntro />


      {/* 3. JOB SECTION (Vertical Timeline) */}
      <Timeline />

      {/* 4. WEB APPS GATEWAY */}
      {/* <SelfProject /> */}


      {/* 5. FOOTER SECTION */}
      <footer id="contact" className="border-t border-[#1e293b] py-10 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-xs text-[#64748b] tracking-wider">&copy;ALL RIGHTS SECURED.</div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/jim-chan-707793114/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#cbd5e1] hover:text-[#38bdf8] transition-colors">
              LinkedIn
            </a>
            {/* <a href="/your-cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#cbd5e1] hover:text-[#38bdf8] transition-colors">
              <FileText size={16} /> Download_CV
            </a> */}
          </div>
        </div>
      </footer>


    </div >
  )
}

export default Home
