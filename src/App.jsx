import React, { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Home from './Pages/Home'
import {Routes,Route} from 'react-router-dom'
import User from './Pages/User';
import Moviegallery from './Pages/Moviegallery'
import Review from './Pages/Review'
import Movie from './Pages/Movie'


function App() {
  const [email1,setEmail]=useState('')
  return (
      <div style={{overflow:'hidden'}}>
        <Routes>
          <Route path="/" element={<Login setEmail={setEmail}/>}/>
          <Route path="/signup" element={<Signup setEmail={setEmail}/>}/>
          <Route path="/movie" element={<Movie/>}/>
          <Route path="/user"  element={<User/>}/>
          <Route path="/review" element={<Review/>}/>
          <Route path="/moviegallery/:id" element={<Moviegallery/>}/>
          </Routes>
    
    </div>
  )
}


export default App
