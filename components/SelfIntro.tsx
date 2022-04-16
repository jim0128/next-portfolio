import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const SelfIntro: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full md:p-28 sm:p-0">
      <div className="container flex flex-wrap justify-between items-center h-auto mx-auto md:pt-40">

        {/* self intro */}
        <div className="w-full md:w-2/5 text-slate-50	text-2xl md:p-4 p-10">
          <div className="pb-4 text-3xl font-bold text-slate-300 md:pb-8">
            Hi, This is Jim Chan
          </div>
          A software in Hong Kong who love to build web things.
        </div>
        {/* image part */}
        <div className="w-4/5 mx-auto md:w-3/5 md:p-0 sm:w-full sm:p-28">
          <div className="aspect-video rounded-md bg-cover bg-center bg-[url('/coding.gif')]" />
        </div>
      </div>
    </div >
  )
}

export default SelfIntro
