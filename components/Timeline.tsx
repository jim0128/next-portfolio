import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Timeline: NextPage = () => {
  return (
    <div id="work" className="block md:flex justify-center items-center min-h-full w-full md:pl-28 md:pr-28 pl-12 pr-12">
      <div className="container flex flex-wrap justify-around items-center mx-auto pt-16">

        <h3 className="flex items-center mb-16 text-3xl font-semibold text-white">
          Work Experiences
        </h3>

        <ol className="relative border-l border-gray-200 dark:border-gray-700 md:ml-8">
          <li className="mb-10 ml-6 relative pt-2 pl-4">
            <span className="flex absolute -left-12 top-0 justify-center items-center w-11 h-11 bg-blue-200 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <Image className=" rounded-full" src="/youtrip.jpeg" alt="Vercel Logo" layout='fill' />
            </span>
            <h3 className="flex items-center mb-4 text-2xl font-semibold text-white">
              <a href="https://www.you.co/sg/" target="_blank">YouTrip</a>

              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                Latest
              </span>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              May 2021 - Current
            </time>
            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {/* <div className="p-1">
                Using Flutter to build 2.0 of the user app in Android and iOS. Also need to involved to the maintenance of the 1.0 app with native code.
              </div> */}

              <div className="p-1">
                Also need to build and maintain the backend with golang and grpc.
              </div>
            </div>
            {/* <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                {/* <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path>
              </svg>
              Download ZIP
            </a> */}

          </li>

          <li className="mb-10 ml-6 relative pt-2 pl-4">
            <span className="flex absolute -left-12 top-0 justify-center items-center w-11 h-11 bg-blue-200 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <Image className="rounded-full" src="/shopline.jpeg" alt="Vercel Logo" layout='fill' />
            </span>
            <h3 className="mb-4 text-xl font-semibold text-gray-500">
              <a href="https://shopage.org" target="_blank">SHOPLINE</a>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              April 2020 - May 2021
            </time>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
              <div className="p-1">
                Handling SHOPLINE chatbot application.
              </div>

              <div className="p-1">
                Involved development of the dashboard UI library
              </div>

              <div className="p-1">
                Also the development of a brand new product - App Center
              </div>
            </div>
          </li>

          <li className="mb-10 ml-6 relative pt-2 pl-4">
            <span className="flex absolute -left-12 top-0 justify-center items-center w-11 h-11 bg-blue-200 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <Image className="rounded-full" src="/dashare.jpeg" alt="Vercel Logo" layout='fill' />
            </span>
            <h3 className="mb-4 text-xl font-semibold text-gray-500">
              <a href="https://www.dashare.com" target="_blank">Dashare</a>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              March 2018 - Jan 2020
            </time>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
              <div className="p-1">
                First was focused on the start from scratch Web page, handling both frontend and backend.
              </div>

              <div className="p-1">
                Later on focused on another start from scratch project - a React Native app for the user.
              </div>
            </div>
          </li>



        </ol>
      </div >
    </div >

  )
}

export default Timeline
