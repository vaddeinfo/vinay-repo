import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {signOut} from 'firebase/auth';
import {auth} from './firebase';
export default function Home({email1})
{
  let navigate=useNavigate();
  function handleLogout()
  {
    signOut(auth).then(response=>{
      navigate('/')
    })

  }

return (
    <div style={{overflow:'hidden',height:'100vh',width:'100vw'}} >
     <Navbar className="bg-body-tertiary" style={{borderBottom:'2px solid black'}}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="150"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            </Navbar.Brand>
          <Button  onClick={handleLogout}style={{backgroundColor:'red',border:'none'}}>Logout</Button>
        </Container>
      </Navbar>
     </div>
    )
}