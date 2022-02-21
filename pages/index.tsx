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
        
      </div>
    </div>
  )
}

export default Home

// npm install -g @sanity/cli
// sanity init --coupon sonny2022
