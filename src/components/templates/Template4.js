import React, { forwardRef } from 'react'
import './tempCss/Template4.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

const Template4 = forwardRef((props, ref) => {

    const pd = props.personal
    const edu = props.education
    const courses = props.courses
    const intern = props.intern
    const hobbie = props.hobbies
    const skills = props.skills
    const social = props.social
    const aim = props.aim

    return (
        <div class="template4" ref={ref}>
            <header>
                <h1>{pd.fname} {pd.lname}</h1>
                <p>{aim}</p>
            </header>
            <section class="section">
                <h2>Contact Information</h2>
                <div class="info">
                    <p>Email: {pd.email}</p>
                    <p>Phone: {pd.mobile}</p>
                    <p>Address: {pd.address1} {pd.address2}</p>
                </div>
            </section>
            <section class="section education">
                <h2>Education</h2>
                <div class="education">
                    {
                        edu.map((v, i) => {
                            const start = new Date(v.start_year)
                            const end = new Date(v.end_year)
                            return (
                                <div key={i}>
                                    <h3>{v.stream}</h3>
                                    <p>{v.college_name} - {start.getFullYear()}-{end.getFullYear()} - <b>Marks:</b> {v.percent}%</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section class="section experience">
                <h2>Experience</h2>
                <div class="experience">
                    {
                            intern.length > 0?
                            intern.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <h3>{v.domain_name}</h3>
                                        <p>{v.company_name} - {v.start_date} - {v.end_date}  <b className='ms-2'>Mode:</b> {v.mode}</p>
                                    </div>
                                )
                            })
                            :
                            <p>No Internships done yet</p>
                        }
                </div>
            </section>
            <section class="section skills">
                <h2>Skills</h2>
                <div class="skills">
                    {
                        skills.map((v, i) => {
                            return (
                                <div key={i} s>
                                    <h3>{v}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section class="section hobbies">
                <h2>Hobbies</h2>
                <div class="hobbies">
                    {
                        hobbie.map((v, i) => {
                            return (
                                <div key={i}>{v}</div>
                            )
                        })
                    }
                </div>
            </section>
            <section class="section courses">
                <h2>Courses</h2>
                <div class="courses">
                    {
                            courses.length > 0 ?
                            courses.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <h3>{v.domain_name}</h3>
                                        <p>{v.company_name} - {v.start_date} - {v.end_date}</p>
                                    </div>
                                )
                            })
                            :
                            <p>No courses done yet</p>
                        }
                </div>
            </section>
            <section class="section social">
                <h2>Social Handles</h2>
                <div class="social">
                <div hidden={social.github ? false : true}><FontAwesomeIcon icon={faGithub}/> <a className='text-dark' href={social.github} target='_blank'>{social.github}</a></div>
                        <div hidden={social.linkedin ? false : true}><FontAwesomeIcon icon={faLinkedin}/> <a className='text-dark' href={social.linkedin} target='_blank'>{social.linkedin}</a></div>
                        <div hidden={social.insta ? false : true}><FontAwesomeIcon icon={faInstagram}/> <a className='text-dark' href={social.insta} target='_blank'>{social.insta}</a></div>
                        <div hidden={social.twitter ? false : true}><FontAwesomeIcon icon={faTwitter}/> <a className='text-dark' href={social.twitter} target='_blank'>{social.twitter}</a></div>
                </div>
            </section>
        </div>
    )
});

export default Template4