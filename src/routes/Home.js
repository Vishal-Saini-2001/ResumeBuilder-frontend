import React from 'react'
import '../css/Home.css';
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../images/img1.svg';
import img2 from '../images/img2.svg';
import img3 from '../images/img3.svg';
import img4 from '../images/img4.svg';
import img5 from '../images/img5.svg';
import img6 from '../images/img6.svg';
import img7 from '../images/img7.svg';
import img8 from '../images/img8.svg';

function Home() {

    const navigate = useNavigate();
    return (
        <>

            <div className='home-container1'>
                <div id="content" data-aos="fade-up">
                    <h1>Resume Builder</h1>
                    <h3>Elevate your <span>Professional Profile</span> with our <br /> <span>Resume building Expertise</span></h3>
                    <button id='build-btn' onClick={() => navigate('./register')}>Build My Resume</button>
                </div>
                <div id="image1" data-aos="fade-up">
                    <img src={img2} alt="" width='500px' />
                </div>
            </div>

            <div className="home-container2">
                <center><h1 data-aos="zoom-out" className='headings'>Why Choose <span>Us</span></h1></center>
                <div id="content">
                    <div className="contents" data-aos="fade-down-right">
                        <img src={img7} alt="" />
                        <br />
                        <h3 data-aos="fade-down" data-aos-offset="150">Choose a <span>Template</span></h3>
                    </div>
                    <div className="contents" data-aos="fade-down">
                        <img src={img8} alt="" />
                        <br /><br />
                        <h3 data-aos="fade-down" data-aos-offset="150">Fill your <span>Details</span></h3>
                    </div>
                    <div className="contents" data-aos="fade-down-left">
                        <img src={img5} alt="" />
                        <br />
                        <h3 data-aos="fade-down" data-aos-offset="150">Download your <span>Resume</span></h3>
                    </div>
                </div>
            </div>

            <div className="home-container3">
                <center><h1 data-aos="zoom-in" className='headings'>Importance Of A Good <span>Resume</span></h1></center>
                <div className="contents" data-aos="flip-left">
                    <div className="image" data-aos="fade-right">
                        <img src={img1} alt="" width="400px" />
                    </div>
                    <div className="content" data-aos="fade-left">
                        <h2><span>Job</span> Offers</h2>
                        A well-crafted resume is crucial in job offers as it serves as a concise summary of an individual's qualifications, skills, and experience. It provides recruiters with a quick overview, facilitating efficient candidate selection. A compelling resume showcases one's suitability for a specific role, leaving a lasting first impression. It acts as a marketing tool, emphasizing achievements and demonstrating the ability to meet job requirements. In competitive job markets, a strong resume can distinguish applicants and increase their chances of securing interviews. Ultimately, it is the initial gateway for recruiters to assess a candidate's potential, making it an indispensable component in the job application process.
                    </div>
                </div>
                <div className="contents" data-aos="flip-right">
                    <div className="content" data-aos="fade-left">
                        <h2><span>Personal</span> Identification</h2>
                        A resume is crucial for personal identification as it encapsulates one's professional journey, skills, and achievements. Serving as a concise representation of an individual's qualifications, it aids employers in quickly assessing suitability for a role. A well-crafted resume not only establishes identity but also showcases unique strengths, work experience, and educational background. It plays a pivotal role in shaping perceptions, facilitating networking, and securing career opportunities. In essence, a resume is a key document that defines and communicates one's professional identity, making it indispensable for personal branding and career advancement.
                    </div>
                    <div className="image" data-aos="fade-right">
                        <img src={img3} alt="" width="400px" />
                    </div>
                </div>
                <div className="contents" data-aos="flip-up">
                    <div className="image" data-aos="fade-right">
                        <img src={img4} alt="" width="400px" />
                    </div>
                    <div className="content" data-aos="fade-left">
                        <h2>Get <span>Selected</span></h2>
                        A well-crafted resume is crucial for securing a job as it serves as a concise snapshot of one's qualifications, skills, and experiences. It enables employers to quickly assess a candidate's suitability for a role, showcasing their professional background and accomplishments. A compelling resume not only highlights relevant expertise but also demonstrates attention to detail and effective communication. In a competitive job market, a polished resume distinguishes applicants, making a positive first impression and increasing the likelihood of being selected for an interview. Ultimately, it is a key tool that opens doors and lays the foundation for a successful job application process.
                    </div>
                </div>
                <div className="contents" data-aos="flip-down">
                    <div className="content" data-aos="fade-left">
                        <h2>First <span>Impression</span></h2>
                        A resume creates the initial impression for potential employers, offering a snapshot of a candidate's qualifications, skills, and experiences. It serves as a crucial tool for making a positive impact and capturing the employer's attention.
                    </div>
                    <div className="image" data-aos="fade-right">
                        <img src={img6} alt="" width="400px" />
                    </div>
                </div>
            </div>

            <div className="home-footer">
                <div id="logo">
                    <div id='line'></div>
                    <h1>Resume <br /><span id='logo-span'>Builder</span></h1>
                </div>
                <div className="d-flex justify-content-evenly">
                    <div className="links">
                        <ul>
                            <li><Link to="/register">SignUP</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><a href="">Blog</a></li>
                            <li><a href="">Templates</a></li>
                        </ul>
                    </div>
                    <div className="links">
                        <ul>
                            <li><a href="">Privacy Policy</a></li>
                            <li><a href="">Terms & Conditions</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Contact</a></li>
                        </ul>
                    </div>
                </div>

            </div>

        </>

    )
}

export default Home