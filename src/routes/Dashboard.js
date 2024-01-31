import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'
import jsPdf from 'jspdf'

function Dashboard() {

  const navigate = useNavigate()
  const location = useLocation()
  const [image, setImage] = useState(location.state);
  const [userName, setUserName] = useState("");



  useEffect(() => {

    const token = localStorage.getItem("token");

    const authenticate = async () => {

      if (token) {
        const body = {
          token
        }
        await axios.post("http://localhost:8080/authenticate", body)
          .then(resp => { setUserName(resp.data.fname) })
          .catch(error => {
            console.log(error);
            localStorage.removeItem("token")
            navigate('/login')
          })

      } else {
        navigate('/login')
      }

    }

    authenticate()



  }, [image])

  const generatePdf = () => {

    const pdf = new jsPdf({
      unit: 'cm',
      format: 'a4'
    });
    pdf.addImage(image, 'PNG', 0, 0, 15, 20);
    pdf.save("MyResume.pdf");
  }



  return (
    <div className='dashboard'>
      <Navbar />
      <div className='mt-4 px-5 py-3 d-flex justify-content-between border-bottom'>
        <div><h1 style={{fontSize:'40px', fontWeight:'700'}}>Welcome {userName}</h1></div>
        <div>
          <button className='btn btn-info px-4 fw-bold'>Create New Resume</button>
        </div>
      </div>
      <center className='mt-4'><h1>Your Recent Resumes</h1></center>
      <div className='mt-4 d-flex justify-content-evenly align-items-center bg-dark'>

        {
          image &&
          <div className='p-2 m-4' style={{ width: '9cm', height: '14cm', border: '5px solid blueviolet', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <img src={image} alt="" className='w-100' />
            <button className='btn w-100 mt-3' style={{ backgroundColor: 'blueviolet', color: 'white' }} onClick={generatePdf}>Download</button>
          </div>
        }

      </div>
      {
        !image && <center><h3 className='mt-5'>No Recent Resumes..</h3></center>
      }
    </div>
  )
}

export default Dashboard