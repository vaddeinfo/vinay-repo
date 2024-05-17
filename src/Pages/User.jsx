import Rating from '@mui/material/Rating';
import hom from '../assets/hom.png'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Navbar';
import Home from './Home';
import {db} from './firebase';
import { auth } from './firebase';
import {query,where} from 'firebase/firestore';
import { collection} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {getDocs} from 'firebase/firestore'; 
import { useEffect, useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {  setDoc } from "firebase/firestore"; 
export default function User({email1})
{
  const [open, setOpen] = React.useState(false);
  const [review,setreview]=useState([]);
  const [user1,setUser]=useState('');
  const [details,setDetails]=useState({});
  let [id,setid]=useState('')
  const image_api='https://image.tmdb.org/t/p/w500';
  const handleDelete=(id)=>{
    deleteDoc(doc(db,"reviews",id));
  }
  const handleClickOpen = (rev) => {
    setOpen(true);
    setDetails({...rev});


  };
  const handleClose = () => {
    setOpen(false);
    setDoc(doc(db, "reviews",details.id), {
      movierating:details.movierating,
      reviewtext:details.reviewtext,
      id:details.id,
      movieid:details.movieid,
      moviename:details.moviename,
      userid:details.userid,
      poster:details.poster


    });
    
  };
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
    const q=query(collectionRefDb,where("userid","==",user1))
    const names=[];
    getDocs(q).then(response=>{
      response.forEach(review=>{ names.push(review.data())});
      setreview(names)
     })
}
queryDatabase();
  },)
    return(
        <div style={{overflow:'hidden',height:'100vh',width:'100vw'}}>
        <div style={{display:'flex',height:'10vh',width:'100vw'}}>
           <Home email1={email1}/>
         </div>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div>
             <Navbar/>
              </div>
            <div style={{ height:'90vh',padding:'25px',overflow:'auto'}}>
                <h1>Your Reviews</h1>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                  {
              review.map((rev,index)=>{
                return(
                  <div key={index} style={{display:'flex',marginRight:'10px',marginBottom:'10px',border:'2px solid green',borderRadius:'20px',width:'450px',padding:'20px'}}>
                  <div>
                  <h6>User:{rev.userid}</h6>
                  <Rating name="read-only" value={rev.movierating} readOnly/>
                  <p>{rev.reviewtext}</p>
                  <h6>Review for:{rev.moviename}</h6>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',paddingLeft:'10px'}}>
                  <div>
                   <img src={image_api+rev.poster} height={200} width={150} style={{borderRadius:'10px'}}/>
                  </div>
                  <div style={{marginTop:'15px'}}>
                    <DeleteIcon onClick={()=>{handleDelete(rev.id)}}/> <EditIcon onClick={()=>{handleClickOpen(rev)}}/>
                  </div>
                  </div>
                  </div> 
                )
              })
            }
            </div>
                </div>
                 </div>
                 <Dialog
        open={open} onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <Rating name="simple-controlled" value={details.movierating}
        onChange={(e)=>{setDetails({...details,movierating:e.target.value})}}
        />
        </DialogContentText>
        <TextField
          id="outlined-multiline-static"
          label="Review text"
          multiline
          rows={5}
          defaultValue={details.reviewtext}
          onChange={(e)=>{setDetails({...details,reviewtext:e.target.value})}}
          style={{width:'500px'}}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>{handleClose()}}>Update</Button>
        </DialogActions>
        </Dialog>
      </div> 
    )
}