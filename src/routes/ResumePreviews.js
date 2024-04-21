import React, {useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Preview from '../components/previews/Preview'
import Preview2 from '../components/previews/Preview2'
import Preview3 from '../components/previews/Preview3'
import Preview4 from '../components/previews/Preview4'
import Preview5 from '../components/previews/Preview5'


const ResumePreviews = () => {

    const navigate = useNavigate()

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

    const location = useLocation();
    const {...data} = location.state;
    const {...template} = location.state;
    return (
        <>

            {template.template1 && <Preview data={data}/>}
            {template.template2 && <Preview2 data={data}/>}
            {template.template3 && <Preview3 data={data}/>}
            {template.template4 && <Preview4 data={data}/>}
            {template.template5 && <Preview5 data={data}/>}
        </>
    )
}

export default ResumePreviews
