import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

const SinglePost = () => {
  const {id} = useParams();

  useEffect(async ()=>{
    let response = await axios.get('')
  },[])
  return (
    <div>SinglePost</div>
  )
}

export default SinglePost