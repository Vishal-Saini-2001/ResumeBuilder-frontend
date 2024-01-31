import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'

const Navbar = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

  return (
    <div className='navbar d-flex justify-content-between align-items-center px-4 py-2 bg-dark text-light'>
        <div className='fs-3 fw-bold'>
          <img src={logo} alt="" />
        </div>
        <div >
            <button className='btn btn-info' onClick={logout}>Log out</button>
        </div>
    </div>
  )
}

export default Navbar