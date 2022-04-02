import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SelfIntro from '../components/SelfIntro'

const Home: NextPage = () => {
  return (
    <div >
      <SelfIntro/>
    </div>
  )
}

export default Home
