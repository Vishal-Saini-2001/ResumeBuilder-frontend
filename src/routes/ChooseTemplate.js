import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import temp1 from '../images/temp1.png'
import temp2 from '../images/temp2.png'
import temp3 from '../images/temp3.png'

const ChooseTemplate = () => {

    const navigate = useNavigate();
    const myRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const authenticate = async () => {

            if (token) {
                const body = {
                    token
                }
                await axios.post("https://resume-builder-9gto.onrender.com/authenticate", body)
                    .then(resp => { console.log(resp) })
                    .catch(error => {
                        alert("Session expired")
                        console.log(error);
                        localStorage.removeItem("token")
                        navigate('/login')
                    })

            } else {
                navigate('/login')
            }

        }

        authenticate()
    }, [])

    const [template, setTemplate] = useState({
        template1: false,
        template2: false,
        template3: false
    })

    const [disable, setDisable] = useState(true);

    const [myStyle, setMyStyle] = useState({
        width: '400px',
        height: '500px',
        border: '2px solid blueviolet'
    });

    const [selectedBoxStyle, setSelectedBoxStyle] = useState({
        width: '400px',
        height: '500px',
        border: '3px solid blueviolet',
        boxShadow: '3px 3px 12px blueviolet'
    })


    const selectTemplate = (e) => {
        setTemplate({
            template1: false,
            template2: false,
            template3: false,
            [e.currentTarget.id]: true
        })
        setDisable(false);
        myRef.current.scrollBy(0,100);
    }

    const handleChooseTemplate = () => {
        navigate('/form', { state: template })
    }

    return (
        <div ref={myRef} className='pt-2 pb-4' style={{color:'white', backgroundColor:"rgb(10,20,20)", height:'100vh'}}>
            <center><h1 className='fw-bold'>Choose a <span style={{ color: 'blueviolet' }}>Template</span></h1></center>
            <div className='d-flex justify-content-evenly align-items-center flex-wrap mt-4 mx-2' >
                <div className='d-flex justify-content-center py-3 my-2' style={template.template1 ? selectedBoxStyle : myStyle} id='template1' onClick={selectTemplate}>
                    <img src={temp1} alt="" style={{ width: '90%' }} />
                </div>
                <div className='d-flex justify-content-center py-3 my-2' style={template.template3 ? selectedBoxStyle : myStyle} id='template3' onClick={selectTemplate}>
                    <img src={temp2} alt="" style={{ width: '90%' }} />
                </div>
                <div className='d-flex justify-content-center py-3 my-2' style={template.template2 ? selectedBoxStyle : myStyle} id='template2' onClick={selectTemplate}>
                    <img src={temp3} alt="" style={{ width: '90%' }} />
                </div>
            </div>
            <center>
                <button
                    hidden={disable}
                    className='py-2 px-4 fs-3 text-light fw-bold my-4'
                    style={{ backgroundColor: 'blueviolet', border: 'none', borderRadius: '3px' }}
                    onClick={handleChooseTemplate}
                >
                    Choose Template
                </button>
            </center>
        </div>
    )
}

export default ChooseTemplate
