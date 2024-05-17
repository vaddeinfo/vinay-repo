import React from 'react';
import {useLocation} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Card} from 'react-bootstrap';
import {getDocs} from 'firebase/firestore'; 
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Rating from '@mui/material/Rating';
import {query,where} from 'firebase/firestore';
import Home from './Home'
import MyComponent from './MyComponent';
import {db} from './firebase';
import { auth } from './firebase';
import {collection} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
export default function Moviegallery({email1})
{  
    const navigate=useNavigate();
    const [user1,setUser]=useState('')
    const [similar,setsimilar]=useState([]);
    const [review,setreview]=useState([]);
    let location=useLocation();
    const image_api='https://image.tmdb.org/t/p/w500'
    const {title,overview,poster_path,id}=location.state;
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          if(user)
          {
           setUser(user.email)
          }
          else
          {
          console.log('user logied in')
          }
        })

      })
    useEffect(()=>{
        const geoApi=`https://api.themoviedb.org/3/movie/${id}/similar?api_key=0f3226be48683270179fa823c72869f6&language=en-US&page=1`
         axios.get(geoApi).then(res=>{
             setsimilar(res.data.results)
           })    
    },[id])
    useEffect(()=>{
        const queryDatabase=async()=>{
        const collectionRefDb=collection(db,"reviews")
        const q=query(collectionRefDb,where("userid","==",user1),where('movieid','==',id)) 
        const names=[];
        getDocs(q).then(response=>{
            response.forEach(review=>{ names.push(review.data())});
            setreview(names)
           })
        }
    
    queryDatabase();
      },)
    return(
        <div style={{height:'100vh',width:'100vw',display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div style={{height:'10vh',width:'100vw'}}>
            <Home email1={email1}/>
            </div>
            <div style={{ height:'90vw',display:'flex',flexDirection:'row'}}> 
            <div>
                <Navbar/>
            </div>

        <div style={{padding:'20px', height:'90vh',overflowY:'auto',overflowX:'hidden'}}>
         <Row>
            <Col style={{padding:'25px'}}>
                <img src={image_api+poster_path} height={500} width={650}/>
                <h4>{title}</h4>
                <p>{overview}</p>
                <div>
                    <MyComponent title={title} id={id}  poster_path={poster_path} email1={email1}/>
                </div>
                <div style={{display:'flex',flexWrap:'wrap'}}> 
                 {
                    similar.map((movie,index)=>{
                    return(
                        <div onClick={()=>{
                            navigate(`/moviegallery/${movie.id}`,{state:movie})
                        }}  key={index} style={{margin:'5px',width:'210px'}}>
                        <img src={image_api+movie.poster_path} height={250} width={200}/>
                        <h5>{movie.title}</h5>
                        </div>
                    )
                })
            }
           </div>
            </Col>
            <Col>
           <h3>Reviews By Cinema Elk Users</h3>
           <div>
           {
            review.map((rev,index)=>{
                return(
                    <div key={index} style={{padding:'20px',border:'2px solid green',borderRadius:'20px',margin:'20px'}}>
                        <p>{rev.reviewtext}</p>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <h5>{rev.userid}</h5>
                            <Rating name="read-only" value={rev.movierating} readOnly />
                        </div>

                    </div>
                )
            })
           }
       </div>
       
            </Col>
         </Row>
        </div>
        </div>
        </div>

    )
}