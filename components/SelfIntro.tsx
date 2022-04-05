import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const SelfIntro: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full p-28">
      <div className="container flex flex-wrap justify-between items-center mx-auto pt-16">
        <div className="w-2/5 text-slate-50	text-2xl">
          Hi, This is Jim, a software in Hong Kong who love to build web things.
        </div>
        <div className="w-3/5">
          <div className="aspect-video rounded-md bg-cover bg-center bg-[url('/coding.gif')]" />
        </div>
      </div>
    </div >
  )
}

export default SelfIntro
