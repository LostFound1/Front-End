import React, { useEffect } from 'react'
import { useState } from 'react'
import Search from '../Home/Search'
import Hero from './Hero'
import PostsSection from './PostsSection'

const Posts = () => {

  const [render , setRender] = useState(false);
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
    <Hero/>
    <Search render={render} setRender={setRender}/>
    <PostsSection render={render} setRender={setRender}/>
    </>
  )
}

export default Posts