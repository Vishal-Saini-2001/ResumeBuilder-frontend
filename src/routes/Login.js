import React, { useState, useEffect } from 'react'
import login from '../images/login.svg'
import '../css/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader'


function Login() {
  const navigate = useNavigate();

  const [loader,setLoader] = useState(false);

  useEffect(()=>{

    const token = localStorage.getItem("token");
    
    const authenticate = async() => {
      
      if(token){
        const body ={
           token
        }
        await axios.post("http://localhost:8080/authenticate", body)
        .then(resp => {
          console.log(resp)
          navigate('/dashboard')
        })
        .catch(error => {
          console.log(error);
          localStorage.removeItem("token")
        }) 

      }else{
        navigate('/login')
      }
          
    }

  authenticate()

  },[]);


  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();
    await axios.post("http://localhost:8080/login", data)
      .then(res => res.data)
      .then(res => {
        setLoader(false)
        localStorage.setItem("token", res.token)
        navigate('/dashboard')
      })
      .catch(error => {
        setLoader(false)
        alert(error.response.data.msg)
      })
  }

  {
    if(loader){
      return <Loader/>
    }
    else{
      return (
        <div className="login">
          <div id="content">
            <div id="image">
              <img src={login} alt="" />
            </div>
            <div id="form">
              <h1>Login</h1>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input type="email" name="email" onChange={(e) => handleChange(e)} className="same" placeholder='Email' required /> <br />
                <input type="password" name="password" onChange={(e) => handleChange(e)} className="same" placeholder='Password' required /> <br />
                <button type="submit" className='submit'>Submit</button>
                <br />
                <br />
                <center>
                  <p>Don't have an account? SignUP below</p>
                  <button className='submit' onClick={() => navigate('/register')}>SignUP</button>
                </center>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Login