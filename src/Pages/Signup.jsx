import React, { useState } from 'react';
import {Row,Col,Card, Alert} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase';
export default function Signup({setEmail})
{   
  const [user,setUser]=useState('');
  const [password,setPassword]=useState('');
  let navigate=useNavigate(); 
  const handleLogin=(e)=>{
    setEmail(user);
    e.preventDefault();
    createUserWithEmailAndPassword( auth, user, password).then((userCreditals)=>{
      navigate('/movie')
    }).catch((err)=>{
        if(err.message=="Firebase: Error (auth/email-already-in-use).")
        {
          alert("EMAIL ALREADY IN USE")
        }
    
    })
     
  }
 
    return(
      <div className='login'>
      <Row>
      <Col>
      </Col>
      <Col  style={{paddingTop:'320px',paddingLeft:'320px',paddingRight:'220px'}}>
      <Form onSubmit={handleLogin}>
        <div style={{display:'flex', justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label></Form.Label>
        <Form.Control onChange={(e)=>setUser(e.currentTarget.value)} type="email" placeholder="Enter Username" />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label></Form.Label>
        <Form.Control type="password"  autoComplete="off" onChange={(e)=>setPassword(e.currentTarget.value)} placeholder="Enter Password" />
      </Form.Group>
      </div>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label></Form.Label>
        <Form.Control type="username" placeholder="Enter Your Full Name"/>
        </Form.Group>
     
      <Button type="submit" style={{backgroundColor:'#B7410E',width:'100%',marginTop:'20px',border:'3px solid white',borderRadius:'none'}}>
        Join the club
      </Button>
    </Form>
    <div style={{display:'flex',justifyContent:'center',color:'white',marginTop:'20px'}}>
      Already a member<Card.Link style={{marginLeft:'10px',color:'white'}} 
      href="/">Click here</Card.Link></div>
      </Col>
      </Row>
      </div> 
    )
}