/* eslint-disable no-undef */
// import './App.css';
import { useEffect, useState } from 'react';
import {Routes, Route , Navigate , useNavigate} from 'react-router-dom';
import {Header ,Footer , Home , About , Contact, Posts , Login , AddPostForm , Profile} from './Components/index';


function App() {

  return (
    <div className="container-xxl bg-white p-0">
      <Header />
      <Routes >
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/posts' element={<Posts/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/add' element={<AddPostForm/>} />
        <Route exact path='/profile' element={<Profile/>} />
        
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
