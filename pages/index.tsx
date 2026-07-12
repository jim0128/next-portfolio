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
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home: NextPage = () => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-[#0f172a] text-[#f8fafc] min-h-screen selection:bg-cyan-500 selection:text-black" >

      {/* 1. MAIN HERO SECTION */}
      <SelfIntro />


      {/* 2. JOB SECTION (Vertical Timeline) */}
      <Timeline />

      {/* 3. WEB APPS GATEWAY */}
      <SelfProject />


    </div >
  )
}

export default Home
