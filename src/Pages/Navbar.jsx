import React from 'react';
import cam from '../assets/camera.png';
import hom from '../assets/hom.png';
import use from '../assets/user.png';
import { useNavigate } from 'react-router-dom';
export default function Navbar()
{
    let navigate=useNavigate();
    
    return(
        <div>
             <div style={{height:'900px',borderRight:'2px solid black'}} >
       <div style={{height:'300px',padding:'20px',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
      <img src={hom} onClick={()=>{
        navigate('/movie')
      }}height={40} width={40}/>
      <img onClick={()=>{
        navigate('/review')
      }} src={cam} height={40} width={40}/>
      <img  onClick={()=>{
        navigate('/user')
      }} src={use} height={40} width={40}/>
      </div>
      </div>
        </div>
    )
}