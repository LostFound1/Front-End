import React, { useEffect } from 'react'
import ProfilePage from './Info';
import Posts from './Posts';

const Profile = () => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
    <ProfilePage />
    <Posts />
    </>
  )
}

export default Profile