import React, { useState } from 'react'
import '../css/Register.css'
import registeration from '../images/registration.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Loader from '../components/loader/Loader'

function Register() {
  const navigate = useNavigate();
  
  const [loader,setLoader] = useState(false);

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });

  const [cpass, setCPass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cpassword") {
      setCPass(value)
    }
    else {
      setData({
        ...data,
        [name]: value
      })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    if (data.fname && data.lname && data.email && data.password) {
      if (data.password === cpass) {
        await axios.post("https://resume-builder-9gto.onrender.com/register", data)
          .then(resp => resp.data)
          .then(res => {
            setLoader(false)
            alert(res.msg)
            navigate('/login')
          })
          .catch(error => {
            setLoader(false)
            alert(error.response.data.msg)
          })

      }
      else {
        setLoader(false)
        alert("Confirm password is wrong")
      }
    }
    else {
      setLoader(false)
      alert("Please fill the required details")
    }

  }

  {
    if(loader){
      return <Loader/>
    }
    else{
      return (
        <>
         
         <div className="register">
          <div id="content">
            <div id="image">
              <img src={registeration} alt="" />
            </div>
            <div id="form">
              <h1>SignUP</h1>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div id="name">
                  <input type="text" name="fname" onChange={(e) => handleChange(e)} placeholder='First Name' required />
                  <input type="text" name="lname" onChange={(e) => handleChange(e)} placeholder='Last Name' required />
                </div>
                <input type="email" name="email" className="same" onChange={(e) => handleChange(e)} placeholder='Email' required /> <br />
                <input type="password" name="password" className="same" onChange={(e) => handleChange(e)} placeholder='Password' required /> <br />
                <input type="password" name="cpassword" className="same" onChange={(e) => handleChange(e)} placeholder='Confirm Password' required /> <br />
                <button type="submit" className='submit'>Submit</button>
                <br />
                <br />
                <center>
                  <p>Already have an account? Sign in below</p>
                  <button className='submit' onClick={() => navigate('/login')}>SignIn</button>
                </center>
    
              </form>
            </div>
          </div>
        </div>
        </>
      )
    }
  }

}

export default Register
