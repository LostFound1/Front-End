/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import $ from "jquery"
import Search from './Search';
import Places from './Places';
import RecentPosts from './RecentPosts';


const Home = () => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
    <Hero />
    {/* <Search/> */}
    <Places/>
    <RecentPosts/>
    </>
  )
}

export default Home