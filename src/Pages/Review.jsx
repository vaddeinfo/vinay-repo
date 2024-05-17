import hom from '../assets/hom.png'
import Navbar from './Navbar';
import Home from './Home';
import Rating from '@mui/material/Rating';
import {db} from './firebase';
import {collection,query} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {getDocs} from 'firebase/firestore'; 
import { useEffect, useState } from 'react';
import { auth } from './firebase';
export default function Review({email1})
{
  const [user1,setUser]=useState('');
  const [review,setreview]=useState([]);
  const image_api='https://image.tmdb.org/t/p/w500';
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
    const queryDatabase=async()=>{
    const collectionRefDb=collection(db,"reviews")
    const q=query(collectionRefDb) 
      const names=[];
      getDocs(q).then(response=>{
          response.forEach(review=>{ names.push(review.data())});
          setreview(names)
         })
}
queryDatabase();

},)
return(
<div style={{overflow:"hidden",height:'100vh',width:'100vw'}}>
    <div style={{display:'flex',height:'10vh',width:'100vw'}}>
       <Home email1={email1}/>
     </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div>
         <Navbar/>
          </div>
           <div style={{padding:'15px',overflow:'auto',height:'90vh',width:'95vw'}}>
            <h1>Reviews</h1>
            <div style={{display:'flex',flexWrap:'wrap'}}>
              {
                review.map((rev,index)=>{
                  return(
                   <div style={{display:'flex',justifyContent:'space-between',border:'2px solid green',marginRight:'10px',marginBottom:'10px',borderRadius:'10px',padding:'10px',width:"450px"}}>
                    <div>
                     <h5>User:{rev.userid}</h5>
                     <Rating name="read-only" value={rev.movierating} readOnly/>
                     <p>{rev.reviewtext}</p>
                     <h5>Review for:{rev.moviename}</h5>
                    </div>
                    <div >
                    <img src={image_api+rev.poster} height={200} width={150} style={{paddingLeft:'10px',borderRadius:'10px'}}/> 
                    </div>
                   </div> 
                  )
                })
              }
              </div>
          </div>
          </div>
          </div>

    )
}