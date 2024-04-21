import React, { useEffect, useRef, useState } from 'react'
import ForwardedTemplate1 from '../templates/Template1'
import '../../css/Preview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import { useNavigate } from 'react-router-dom'

function Preview(props) {

  const navigate = useNavigate();

  const personal = props.data.personalDetails;
  const education = props.data.education;
  const courses = props.data.courses;
  const internships = props.data.internships;
  const hobbies = props.data.hobbies;
  const skills = props.data.skills;
  const social = props.data.socialHandles;
  const aim = props.data.aim;

  const componentRef = useRef()

  const [image, setImage] = useState('');

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint:() => navigate('/dashboard', { state: image })

  });


  return (
    

      <div id="bg">
        <center><h1 className='fw-bold m-4 text-light'>Your Resume is Ready to Print :-)</h1></center>
        <button onClick={handlePrint} class='preview_print'><FontAwesomeIcon icon={faPrint} /> Print Resume</button>
        <div className="previewContainer">
          <div className="scroll-resume">
            <ForwardedTemplate1 ref={componentRef} personal={personal} education={education} courses={courses} intern={internships} hobbies={hobbies} skills={skills} social={social} aim={aim} />
          </div>
        </div>
      </div>

    
  )
}

export default Preview