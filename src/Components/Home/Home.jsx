/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import $ from "jquery"
import Search from './Search';
import Places from './Places';
import RecentPosts from './RecentPosts';


const Home = () => {



  return (
    <>
    <Hero />
    <Search/>
    <Places/>
    <RecentPosts/>
    </>
  )
}

export default Home