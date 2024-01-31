import React, {forwardRef} from 'react'
import './tempCss/Template2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Template2 = forwardRef((props, ref) => {

  const pd = props.personal
  const edu = props.education
  const courses = props.courses
  const intern = props.intern
  const hobbie = props.hobbies
  const skills = props.skills
  const social = props.social
  const aim = props.aim



  return (

    <div id='temp2' ref={ref}>
      <div className="strip"></div>

      <h1>{pd.fname} {pd.lname}</h1>
      <div id="personal">
        <div>
          <b>Contact :</b>
        </div>
        <div id="details">
          <div>{pd.mobile}</div>
          <div>{pd.email}</div>
          <div>{pd.address1} {pd.address2}</div>
        </div>
      </div>

      <div id="professional">

        <div id="leftSidebar">
          <div className="left" id='education' >
            <h2>EDUCATION</h2>
            {
              edu.map((v, i) => {
                const start = new Date(v.start_year)
                const end = new Date(v.end_year)
                return (
                  <div key={i}>
                    <h4>{v.stream}</h4>
                    <p>{v.college_name} <br /> {start.getFullYear()} - {end.getFullYear()} <br /> <b>Marks:</b> {v.percent}%</p>
                  </div>
                )
              })
            }

          </div>

          <div className="left">
            <h2>SKILLS</h2>
            <div id='skills'>
              {
                skills.map((v, i) => {
                  return (
                    <div key={i} className='w-50'>
                      {v}
                    </div>
                  )
                })
              }
            </div>

          </div>

          <div className="left" id='social'>
            <h2>HOBBIES</h2>
            {
              hobbie.map((v, i) => {
                return (
                  <div key={i}>{v}</div>
                )
              })
            }
          </div>

          <div className="left" id='social'>
            <h2>SOCIAL HANDLES</h2>
            <div hidden={social.github ? false : true}><FontAwesomeIcon icon={faGithub}/> <a className='text-dark' href={social.github}>Github</a></div>
            <div hidden={social.linkedin ? false : true}><FontAwesomeIcon icon={faLinkedin}/> <a className='text-dark'  href={social.linkedin}>Linkedin</a></div>
            <div hidden={social.insta ? false : true}><FontAwesomeIcon icon={faInstagram}/> <a className='text-dark'  href={social.insta}>Instagram</a></div>
            <div hidden={social.twitter ? false : true}><FontAwesomeIcon icon={faTwitter}/> <a className='text-dark'  href={social.twitter}>Twitter</a></div>
          </div>

        </div>
        <div id="rightSidebar">

          <div className="right">
            <u><h2>ABOUT ME</h2></u>
            <div>
              {aim}
            </div>
          </div>

          <div className="right" id='courses'>
            <u><h2>COURSES</h2></u>
            {
              courses.length > 0 ?
                courses.map((v, i) => {
                  return (
                    <div key={i}>
                      <h4>{v.domain_name}</h4>
                      <p><h5>{v.company_name}</h5>{v.start_date} - {v.end_date}</p>
                    </div>
                  )
                })
                :
                <p>No courses done yet</p>
            }

          </div>

          <div className="right">
            <h2>INTERNSHIPS</h2>
            {
              intern.length > 0 ?
                intern.map((v, i) => {
                  return (
                    <div key={i}>
                      <h4>{v.domain_name}</h4>
                      <p><h5>{v.company_name}</h5>{v.start_date} - {v.end_date}  <b className='ms-2'>Mode:</b> {v.mode}</p>
                    </div>
                  )
                })
                :
                <p>No Internships done yet</p>
            }

          </div>
          <div className="right"></div>

        </div>

      </div>

    </div>
  )
});

export default Template2