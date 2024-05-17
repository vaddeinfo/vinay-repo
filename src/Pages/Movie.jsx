import { useState,useEffect } from "react"
import axios from "axios";
import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Navbar from './Navbar';
import {auth} from './firebase';
export default function Movie({email1})
{
 const navigation=useNavigate();

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  display:'flex',
  flexDirection:'row'
}));
    const [nowplaying,setnowplaying]=useState([]);
    const [popularmovies,setpopularmovies]=useState([]);
    const [toprated,settoprated]=useState([]);
    const [upcoming,setupcoming]=useState([]);
    const image_api='https://image.tmdb.org/t/p/w500';
    useEffect(()=>{
       const geoApi='https://api.themoviedb.org/3/movie/now_playing?api_key=0f3226be48683270179fa823c72869f6&language=en-US&page=1'
        axios.get(geoApi).then(res=>{
            setnowplaying(res.data.results);
          })    
  })
  useEffect(()=>{
    const geoApi='https://api.themoviedb.org/3/movie/popular?api_key=0f3226be48683270179fa823c72869f6&language=en-US&page=1'
     axios.get(geoApi).then(res=>{
         setpopularmovies(res.data.results)
       })    
})
useEffect(()=>{
    const geoApi='https://api.themoviedb.org/3/movie/top_rated?api_key=0f3226be48683270179fa823c72869f6&language=en-US&page=1'
     axios.get(geoApi).then(res=>{
         settoprated(res.data.results)
       })    
})
useEffect(()=>{
    const geoApi='https://api.themoviedb.org/3/movie/upcoming?api_key=0f3226be48683270179fa823c72869f6&language=en-US&page=1'
     axios.get(geoApi).then(res=>{
         setupcoming(res.data.results);
       })    
})
   
    return (
        <div style={{height:'100vh', width:'100vw',display:'flex',flexDirection:'column'}}>
          <div style={{height:'10vh',width:'100vw'}}>
            <Home email={email1}/>
         </div>
         <div style={{display:'flex'}}>
          <div>
            <Navbar/>  
        </div>
        <div style={{padding:'20px', height:'90vh',overflow:'auto'}}>
      <h4>NOW PLAYING</h4>
       <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        '& > div': {
          overflow: 'auto hidden',
          '&::-webkit-scrollbar': { height: 5, WebkitAppearance: 'none' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 5,
            backgroundColor: 'gray',
          },
          '&::-webkit-scrollbar-track':{
            backgroundColor:'white',
            borderRadius:5,
            },
        },
      })}
    >
      <Box
        sx={{
          width:'1400px'
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>{
              nowplaying.map((movie,index)=>{
                return(
               <div key={index} onClick={()=>{
                navigation(`/moviegallery/${movie.id}`,{state:movie})
               }} style={{margin:5}}>
             <img src={image_api+movie.poster_path} height={300} width={200} /> 
              <h5>{movie.title}</h5>
              </div>
              )})
              
              }</Item>
            
          </Grid>
        </Grid>
      </Box>
      </Box>
      <h4>POPULAR MOVIES</h4>
<Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        '& > div': {
          overflow: 'auto hidden',
          '&::-webkit-scrollbar': { height:5, WebkitAppearance: 'none' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 5,
            backgroundColor: 'gray',
          },
          '&::-webkit-scrollbar-track':{
          backgroundColor:'white',
          borderRadius:5,
          },
        },
      })}
    >
      <Box
        sx={{
          width:'1400px'
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>{
              popularmovies.map((movie,index)=>{
                return(
               <div  key={index} onClick={()=>{
                navigation(`/moviegallery/${movie.id}`,{state:movie})
               }}  style={{margin:5}}>
               <img src={image_api+movie.poster_path} height={300} width={200} /> 
              <h5>{movie.title}</h5>
              </div>
              )})
              
              }</Item>
            
          </Grid>
        </Grid>
      </Box>
      </Box>
<h4>TOP RATED</h4>
   <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        '& > div': {
          overflow: 'auto hidden',
          '&::-webkit-scrollbar': { height:5, WebkitAppearance: 'none' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 5,
            backgroundColor: 'gray',
          },
          '&::-webkit-scrollbar-track':{
            backgroundColor:'white',
            borderRadius:5,
            },
        },
      })}
    >
      <Box
        sx={{
          width:'1400px'
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>{
              toprated.map((movie,index)=>{
                return(
               <div key={index} onClick={()=>{
                navigation(`/moviegallery/${movie.id}`,{state:movie})
               }} style={{margin:5}}>
                <img src={image_api+movie.poster_path} height={300} width={200}  />   
              <h5>{movie.title}</h5>
              </div>
              )})
              
              }</Item>
            
          </Grid>
        </Grid>
      </Box>
      </Box>
<h4>UP COMING MOVIES</h4>
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        '& > div': {
          overflow: 'auto hidden',
          '&::-webkit-scrollbar': { height: 5, WebkitAppearance: 'none' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 5,
            backgroundColor: 'gray',
          },
          '&::-webkit-scrollbar-track':{
            backgroundColor:'white',
            borderRadius:5,
            }, 
        },
      })}>
      <Box
        sx={{
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>{
              upcoming.map((movie,index)=>{
                return(
               <div onClick={()=>{
                navigation(`/moviegallery/${movie.id}`,{state:movie})
               }}
                 key={index}style={{margin:5}}>
                <img src={image_api+movie.poster_path} height={300} width={200}  />   
              <h5>{movie.title}</h5>
              </div>
              )})
              
              }</Item>
            
          </Grid>
        </Grid>
      </Box>
      </Box>
      </div>
       </div>
        </div>

)
}