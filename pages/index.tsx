import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SelfIntro from '../components/SelfIntro'
import Timeline from '../components/Timeline'

//  class="scroll-smooth"

const Home: NextPage = () => {
  return (
    <div id="top" className="h-full w-full bg-background">
      <Head>
        <title>Jim's Personal Portfolio</title>
        <meta name="description" content="Welecome to Jim's Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-screen	fixed z-30">
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <a href="./" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Jim Chan</span>
            </a>
            <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"> </path>
              </svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>

            <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <a href="#about" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">About</a>
                </li>
                <li>
                  <a href="#work" className="block py-2 pr-4 pl-3 text-blue-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Work Experience</a>
                </li>
                {/* <li>
                  <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </header>


      <SelfIntro />
      <Timeline />


      <footer className="mt-16 w-full h-20 border-t-white border-t-2">
        <div className="container flex flex-wrap justify-between items-center mx-auto pt-8">

          <a
            className="text-white"
            href="https://www.linkedin.com/in/jim-chan-707793114/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <a
            href="#top"
            rel="noopener noreferrer"
          >
            <div className="h-6 w-6">
              <div className="aspect-square rounded-md bg-cover bg-center bg-[url('/favicon.ico')]" />
            </div>
          </a>
        </div>
      </footer >

    </div >
  )
}

export default Home
