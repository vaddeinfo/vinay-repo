import React, { useState } from 'react';
import { Col, Row,Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from './firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
export default function Login({setEmail})
{
  let navigate=useNavigate();
  const [user,setUser]=useState('');
  const [password,setPassword]=useState('')
  
  const handleLogin=(e)=>{
    setEmail(user);
    
    e.preventDefault();
    signInWithEmailAndPassword(auth,user,password).then((userCridte)=>{
      navigate('/movie')
    }).catch((err)=>{
      if(err.message=="Firebase: Error (auth/invalid-login-credentials).")
      {
        alert("IN VALID USER NAME OR PASSWORD")
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
        <Form.Control type="email"  onChange={(e)=>setUser(e.currentTarget.value)}style={{outline:'none'}} placeholder="Enter Username" />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label></Form.Label>
        <Form.Control type="password" onChange={(e)=>setPassword(e.currentTarget.value)} style={{outline:'none'}} placeholder="Enter Password" />
      </Form.Group>
      </div>
     
      <Button  type="submit" style={{backgroundColor:'brown',width:'100%',marginTop:'20px',border:'3px solid white',borderRadius:'none'}}>
        Login Now
      </Button>
    </Form>
    <div style={{display:'flex',justifyContent:'center',color:'white',marginTop:'20px'}}>
      New Here? Please <Card.Link style={{marginLeft:'10px',color:'white'}} 
      href="/Signup">Sign Up</Card.Link></div>
      </Col>
      </Row>
      </div> 
    )
}