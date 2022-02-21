import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div>
        <div className="px-10 space-y-5">
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='overline decoration-black decoration-4'>.blog</span> is a place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect with millions of bloggers just like you.
          </h2>
        </div>

        <div>
        
        </div>  
      </div>
    </div>
  )
}

export default Home

// npm install -g @sanity/cli
// sanity init --coupon sonny2022
