import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField';
import  {auth,db} from './firebase';
import {doc} from "firebase/firestore"
import { setDoc } from 'firebase/firestore';

function MyComponent({title,id,poster_path}) {
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [text,setText]=useState('')
    const handleOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    let x=auth.currentUser;
    let y="random"+Math.floor(Math.random()*10000)
    const documentReference=doc(db,"reviews",y)
    setDoc(documentReference,{
     moviename:title,
     movieid:id,
     userid:x.email,
     reviewtext:text,
     movierating:value,
     poster:poster_path,
     id:y
    }).catch(err=>{
      console.log("data is added")
    })
    }
    
     return (
      <div>
        <Button  variant="contained" onClick={handleOpen}>Post Review</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Post Your Review for:<span style={{color:'orange'}}>{title}</span></DialogTitle>
          <DialogContent>
          <Rating name="simple-controlled" value={value}
        onChange={(event,newValue) => {
          setValue(newValue);
        }}/>
           <h4>Your Review</h4>
           <TextField style={{width:'500px'}}
            id="outlined-multiline-flexible"
            multiline
            onChange={(e)=>setText(e.currentTarget.value)}
          maxRows={20}
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}  variant="contained" >Submit</Button>
          </DialogActions>
        </Dialog>
      </div>

    );
      }
export default MyComponent;  