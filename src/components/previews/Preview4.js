import React, { useRef, useState, useEffect } from 'react'
import Template4 from '../templates/Template4'

import '../../css/Preview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

import html2PDF from 'jspdf-html2canvas';
import html2canvas from 'html2canvas'
import { useNavigate } from 'react-router-dom'

const Preview4 = (props) => {
    const navigate = useNavigate();

    const personal = props.data.personalDetails;
    const education = props.data.education;
    const courses = props.data.courses;
    const internships = props.data.internships;
    const hobbies = props.data.hobbies;
    const skills = props.data.skills;
    const social = props.data.socialHandles;
    const aim = props.data.aim;

    const [image, setImage] = useState('');
    const componentRef = useRef()

    useEffect(() => {

        const pdftoImage = async () => {

            const pdf = componentRef.current;
            if (pdf) {
                await html2canvas(pdf)
                    .then(img => {
                        setImage(img.toDataURL())
                    })
                    .catch(error => console.log(error))
            }

        }
        pdftoImage()
    }, [])


    const handlePrint = async () => {
        const page = componentRef.current;
        await html2PDF(page, {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: 'resume.pdf',
        }).then(() => navigate('/dashboard', { state: image }))
            .catch(err => console.log(err))
    }
    return (

        <div id="bg">
            <center><h1 className='fw-bold heading'>Your Resume is Ready to Print :-)</h1></center>
            <button onClick={handlePrint} class='preview_print'><FontAwesomeIcon icon={faPrint} /> Print Resume</button>
            <div className="previewContainer">
                <div className="scroll-resume">
                    <Template4 ref={componentRef} personal={personal} education={education} courses={courses} intern={internships} hobbies={hobbies} skills={skills} social={social} aim={aim} />
                </div>
            </div>
        </div>
    )
}

export default Preview4