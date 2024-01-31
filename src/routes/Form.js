import React, { useEffect, useState } from 'react'
import '../css/Form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faAdd, faRemove, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';

function Form() {

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    const authenticate = async () => {

      if (token) {
        const body = {
          token
        }
        await axios.post("http://localhost:8080/authenticate", body)
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

  const template = location.state;

  const [states, setStates] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      await axios.get('http://localhost:8080/getStates')
        .then(resp => setStates(resp.data))
        .catch(error => console.log(error))
    }
    getStates()

  }, [])

  const [personalDetails, setPersonalDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    state: ""
  });

  const [socialHandles, setSocialHandles] = useState({
    linkedin: "",
    github: "",
    insta: "",
    twitter: ""
  })

  const [courses, setCourses] = useState([])
  const [internships, setInternships] = useState([])
  const [education, setEducation] = useState([
    {
      college_name: "",
      stream: "",
      percent: "",
      start_year: "",
      end_year: ""
    }
  ])

  const [aim, setAim] = useState("");
  const [hobbies, setHobbies] = useState([""]);
  const [skills, setSkills] = useState([""]);

  const [checkBox, setCheckBox] = useState(false)
  const [internCheckBox, setInternCheckBox] = useState(false)

  const [isDisabeled, setIsDisabled] = useState(false)
  const [courseDisabled, setCourseDisabled] = useState(false)
  const [internDisabled, setInternDisabled] = useState(false)
  const [skillDisabled, setSkillDisabled] = useState(false)
  const [hobbieDisabled, setHobbieDisabled] = useState(false)
  const [educaDisabled, setEducaDisabled] = useState(false)

  const handleGenerateResume = (e) => {
    e.preventDefault();
    const data = {
      personalDetails, aim, socialHandles, hobbies, skills, courses, internships, education
    }
    const combinedData = {
      ...data, ...template
    }
    navigate('/resume_previews', { state: combinedData });
  }

  // Function to check wheather all values are filled in a form or not:-

  const areAllFilled = (e, jsonObject) => {
    e.preventDefault();
    for (let i in jsonObject) {
      if (jsonObject[i] === undefined || jsonObject[i] === null || jsonObject[i] === '') {
        return (
          document.getElementById("pdC").style.visibility = "hidden",
          alert("Please fill all the required fields!")
        )

      }
    }
    return (
      document.getElementById("pdC").style.visibility = "visible",
      setIsDisabled(true)
    )
  }

  // Storing Form Data :-


  // Personal Details

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value
    })
  }

  // AIM 

  const handleAimSubmit = (e) => {
    e.preventDefault();
    if (aim === " ") {
      return (
        alert("Please enter valid aim"),
        document.getElementById("aC").style.visibility = "hidden"
      )
    }
    return (
      document.getElementById("aC").style.visibility = "visible",
      document.getElementById("exampleFormControlTextarea1").disabled = true
    )

  }

  // Social handles

  const handleSocialHandles = (e) => {
    setSocialHandles({
      ...socialHandles,
      [e.target.name]: e.target.value
    })
  }

  const handleSocialSubmit = (e) => {
    e.preventDefault()
    if (socialHandles.github === "" && socialHandles.linkedin === "" && socialHandles.insta === "" && socialHandles.twitter === "") {
      alert("Please provide atleast one social handle");
      document.getElementById("sHC").style.visibility = "hidden"
    } else {
      document.getElementById("sHC").style.visibility = "visible";
      document.getElementsByClassName("social").disabled = true;

    }
  }

  // Courses

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        company_name: "",
        domain_name: "",
        start_date: "",
        end_date: ""
      }
    ])
  }

  const handleRemoveCourse = (e, index) => {
    e.preventDefault()
    const coursesArray = [...courses];
    coursesArray.splice(index, 1);
    setCourses(coursesArray)

  }

  const handleCoursInput = (e, index) => {
    const { name, value } = e.target;
    let coursesArray = [...courses];
    coursesArray[index][name] = value;
    setCourses(coursesArray);
  }

  const handleCheckBoxChange = () => {
    setCheckBox(!checkBox)
    setCourses([])
    setCourseDisabled(!courseDisabled)
  }

  const handleCourseSubmit = (e) => {
    e.preventDefault()
    if (checkBox) {
      setCourseDisabled(true)
      document.getElementById("cC").style.visibility = "visible"
    }
    else if (courses.length >= 1) {
      document.getElementById("cC").style.visibility = "visible";
      setCourseDisabled(true)
    }
    else {
      document.getElementById("cC").style.visibility = "hidden"
      alert("Please provide atleast one answer")
    }
  }


  // Internships

  const handleAddInternship = () => {
    setInternships([
      ...internships,
      {
        company_name: "",
        domain_name: "",
        mode: "",
        start_date: "",
        end_date: ""
      }
    ])
  }

  const handleInternshipChange = (e, i) => {
    const { name, value } = e.target
    const internshipArray = [...internships];
    internshipArray[i][name] = value;
    setInternships(internshipArray)
  }

  const handleInternCheckBoxChange = () => {
    setInternCheckBox(!internCheckBox)
    setInternships([])
    setInternDisabled(!internDisabled)
  }

  const handleRemoveInternship = (e, i) => {
    e.preventDefault()
    const internshipArray = [...internships];
    internshipArray.splice(i, 1);
    setInternships(internshipArray)
  }

  const handleSubmitInternships = (e) => {
    e.preventDefault()
    if (internCheckBox) {
      setInternDisabled(true)
      document.getElementById("inTC").style.visibility = "visible"
    }
    else if (internships.length >= 1) {
      document.getElementById("inTC").style.visibility = "visible";
      setInternDisabled(true)
    }
    else {
      document.getElementById("inTC").style.visibility = "hidden"
      alert("Please provide atleast one answer")
    }
  }

  // Skills

  const handleAddSkills = () => {
    setSkills([
      ...skills,
      ""
    ])
  }

  const handleSkillChange = (e, i) => {
    const skillsArray = [...skills];
    skillsArray[i] = e.target.value;
    setSkills(skillsArray)
  }

  const handleRemoveSkill = (e, i) => {
    e.preventDefault()
    const skillsArray = [...skills];
    skillsArray.splice(i, 1)
    setSkills(skillsArray)
  }

  const handleSkillsSubmit = (e) => {
    e.preventDefault();
    document.getElementById("sC").style.visibility = "visible"
    setSkillDisabled(true)
  }

  // Hobbies

  const handleAddHobie = () => {
    setHobbies([
      ...hobbies,
      ""
    ])
  }

  const handleHobieChange = (e, i) => {
    const hobbieArray = [...hobbies];
    hobbieArray[i] = e.target.value;
    setHobbies(hobbieArray)
  }

  const handleRemoveHobbie = (e, i) => {
    e.preventDefault()
    const hobbieArray = [...hobbies];
    hobbieArray.splice(i, 1)
    setHobbies(hobbieArray)
  }


  const handleHobbiesSubmit = (e) => {
    e.preventDefault();
    document.getElementById("hC").style.visibility = "visible";
    setHobbieDisabled(true)
  }

  // Education

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        college_name: "",
        stream: "",
        percent: "",
        start_year: "",
        end_year: ""
      }
    ])
  }

  const handleEducationChange = (e, i) => {
    const { name, value } = e.target;
    const educationArray = [...education];
    educationArray[i][name] = value;
    setEducation(educationArray)
  }

  const handleRemoveEducation = (e, i) => {
    e.preventDefault()
    const educaArray = [...education];
    educaArray.splice(i, 1);
    setEducation(educaArray)
  }

  const handleSubmitEducation = (e) => {
    e.preventDefault()
    document.getElementById("eC").style.visibility = "visible"
    setEducaDisabled(true)
  }


  return (
    <>
      <div className="accordion" id="accordionExample">
        <center><h1 className='fw-bold'>Fill all the details</h1></center>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Personal Details :-
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="row g-3">
                <form className="row g-3" onSubmit={(e) => areAllFilled(e, personalDetails)}>
                  <div className="col-md-6">
                    <input type="text" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-control" placeholder="First name" name='fname' aria-label="First name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-control" placeholder="Last name" name='lname' aria-label="Last name" required />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-control" id="inputEmail4" name='email' required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Mobile</label>
                    <input type="number" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-control" id="inputPassword4" name='mobile' required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-control" id="inputAddress" name='address1' placeholder="1234 Main St" required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-control" id="inputAddress2" name='address2' placeholder="Apartment, studio, or floor" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-control" id="inputCity" name='city' required />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <select id="inputState" disabled={isDisabeled} onChange={(e) => handlePersonalDetailsChange(e)} className="form-select" name='state' required>
                      <option default>Choose...</option>
                      {
                        states.map((v, i) => {
                          return <option key={i} value={v.name}>{v.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="col-md-4"><button className='btn btn-primary me-2' type='submit'>submit</button><FontAwesomeIcon icon={faCircleCheck} id="pdC" visibility="hidden" /></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Aim or Objective :-
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="mb-3">
                <form onSubmit={(e) => handleAimSubmit(e)}>
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Write your aim or objective in 200 characters maximum</label>
                  <textarea className="form-control" disabled={false} id="exampleFormControlTextarea1" rows="2" placeholder='My aim is to become a ...' required onChange={(e) => setAim(e.target.value)}></textarea>
                  <p className={aim.length > 200 ? "text-danger mt-2" : "mt-2"}>{aim.length} characters</p>
                  <button className='btn btn-primary me-2' type='submit'>submit</button><FontAwesomeIcon icon={faCircleCheck} id="aC" visibility="hidden" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Social Handles :-
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <form onSubmit={(e) => handleSocialSubmit(e)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLinkedin} /></span>
                  <input type="text" disabled={false} className="form-control social" name="linkedin" onChange={(e) => handleSocialHandles(e)} placeholder="Paste link here" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faGithub} /></span>
                  <input type="text" disabled={false} className="form-control social" name="github" onChange={(e) => handleSocialHandles(e)} placeholder="Paste link here" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faTwitter} /></span>
                  <input type="text" disabled={false} className="form-control social" name="twitter" onChange={(e) => handleSocialHandles(e)} placeholder="Paste link here" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faInstagram} /></span>
                  <input type="text" disabled={false} className="form-control social" name="insta" onChange={(e) => handleSocialHandles(e)} placeholder="Paste link here" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <button className='btn btn-primary me-2' type='submit'>submit</button><FontAwesomeIcon icon={faCircleCheck} id="sHC" visibility="hidden" />
              </form>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Courses :-
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <label>Mention courses you have done (maximum 3)</label>
              <button className='btn float-end background border px-2 ' onClick={() => courses.length < 3 ? handleAddCourse() : null} hidden={checkBox || courses.length === 3}><FontAwesomeIcon icon={faAdd} /> Add</button>
              <br /><br />
              <form onSubmit={(e) => handleCourseSubmit(e)}>
                <input type="checkbox" name="checkBox" className='mx-2' onChange={() => handleCheckBoxChange()} /><p className='d-inline-block'>Have not done any course</p>

                <ol>
                  {
                    courses.map((v, i) => {
                      return (
                        <li key={i}>
                          <div className="courses">
                            <input type="text" disabled={courseDisabled} placeholder='Company Name' name="company_name" value={v.company_name} onChange={(e) => handleCoursInput(e, i)} className="m-2 w-25 p-2" required />
                            <input type="text" disabled={courseDisabled} placeholder='Course Domain eg:(Web Development)' value={v.domain_name} onChange={(e) => handleCoursInput(e, i)} name="domain_name" className='m-2 w-25 p-2' required />
                            <span className='me-3'>Start Date :</span>
                            <input type="date" disabled={courseDisabled} name="start_date" className='m-2 p-2' value={v.start_date} onChange={(e) => handleCoursInput(e, i)} required />
                            <span className='me-3'>End Date :</span>
                            <input type="date" disabled={courseDisabled} name="end_date" className='m-2 p-2' value={v.end_date} onChange={(e) => handleCoursInput(e, i)} required />

                            <button className='btn background border' onClick={(e) => handleRemoveCourse(e, i)} hidden={courseDisabled}><FontAwesomeIcon icon={faRemove} /></button>
                          </div>
                        </li>
                      )
                    })
                  }
                </ol>
                <br />
                <button className='btn btn-primary me-2' type='submit'>submit</button>
                <FontAwesomeIcon icon={faCircleCheck} id="cC" visibility="hidden" />
              </form>

            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              Skills :-
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <label>Mention your Skills (minimum 1 , maximum 8)</label>
              <button className='btn float-end background border px-2 ' onClick={() => handleAddSkills()} hidden={skills.length < 8 ? false : true}><FontAwesomeIcon icon={faAdd} /> Add</button>
              <br /><br />
              <form onSubmit={(e) => handleSkillsSubmit(e)}>
                <ol>
                  {
                    skills.map((v, i) => {
                      return (
                        <li key={i} className='d-inline'>
                          <input type="text" disabled={skillDisabled} placeholder='HTML' value={v} onChange={(e) => handleSkillChange(e, i)} className='p-2 m-2' required />
                          <button className='btn background border' onClick={(e) => handleRemoveSkill(e, i)} hidden={i === 0 ? true : skillDisabled}><FontAwesomeIcon icon={faRemove} /></button>
                        </li>
                      )
                    })
                  }
                </ol>
                <br />
                <button className='btn btn-primary me-2' type='submit'>submit</button>
                <FontAwesomeIcon icon={faCircleCheck} id="sC" visibility="hidden" />
              </form>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
              Internships :-
            </button>
          </h2>
          <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <label>Mention internships you have done (maximum 3)</label>
              {!internCheckBox && <button className='btn float-end background border px-2 ' onClick={() => handleAddInternship()} hidden={internships.length < 3 ? false : true}><FontAwesomeIcon icon={faAdd} /> Add</button>}

              <br /><br />
              <input type="checkbox" name="interncheckBox" className='mx-2' onChange={() => handleInternCheckBoxChange()} /><p className='d-inline-block'>Have not done any internships yet</p>
              <form onSubmit={(e) => handleSubmitInternships(e)}>
                <ol>
                  {
                    internships.map((v, i) => {
                      return (
                        <li key={i}>
                          <div className="courses mt-3">
                            <input type="text" disabled={internDisabled} placeholder='Company Name' name="company_name" value={v.company_name} onChange={(e) => handleInternshipChange(e, i)} className='me-3 p-2' required />
                            <input type="text" disabled={internDisabled} placeholder='Course Domain eg:(Web Development)' name="domain_name" value={v.domain_name} onChange={(e) => handleInternshipChange(e, i)} className='me-3 w-25 p-2' required />
                            <select name="mode" disabled={internDisabled} className='me-3 p-2' value={v.mode} onChange={(e) => handleInternshipChange(e, i)}>
                              <option value="" selected>Mode</option>
                              <option value="online">Online</option>
                              <option value="offline">Offline</option>
                            </select>
                            <span className='me-3'>Start Date :</span>
                            <input type="date" disabled={internDisabled} name="start_date" value={v.start_date} onChange={(e) => handleInternshipChange(e, i)} className='me-3 p-2' required />
                            <span className='me-3'>End Date :</span>
                            <input type="date" disabled={internDisabled} name="end_date" value={v.end_date} onChange={(e) => handleInternshipChange(e, i)} className='me-3 p-2' required />
                            <button className='btn background border' onClick={(e) => handleRemoveInternship(e, i)} hidden={internDisabled}><FontAwesomeIcon icon={faRemove} /></button>
                          </div>
                        </li>
                      )
                    })
                  }
                </ol>
                <br />
                <button className='btn btn-primary me-2' type='submit'>submit</button>
                <FontAwesomeIcon icon={faCircleCheck} id="inTC" visibility="hidden" />
              </form>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
              Hobbies :-
            </button>
          </h2>
          <div id="collapseSeven" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <label>Mention your hobbies (minimum 1, maximum 3)</label>
              <button className='btn float-end background border px-2 ' onClick={() => handleAddHobie()} hidden={hobbies.length < 3 ? false : true}><FontAwesomeIcon icon={faAdd} /> Add</button>
              <br /><br />
              <form onSubmit={(e) => handleHobbiesSubmit(e)}>
                <ol>
                  {
                    hobbies.map((v, i) => {
                      return (
                        <li key={i} className='d-inline'>
                          <input type="text" disabled={hobbieDisabled} value={v} onChange={(e) => handleHobieChange(e, i)} className='m-2 p-2 w-25' placeholder='Singing' required />
                          <button className='btn background border' onClick={(e) => handleRemoveHobbie(e, i)} hidden={i === 0 ? true : hobbieDisabled}  ><FontAwesomeIcon icon={faRemove} /></button>
                        </li>
                      )
                    })
                  }
                </ol>
                <br />
                <button className='btn btn-primary me-2' type='submit'>submit</button>
                <FontAwesomeIcon icon={faCircleCheck} id="hC" visibility="hidden" />
              </form>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
              Education :-
            </button>
          </h2>
          <div id="collapseEight" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <label>Mention your education (maximum 3)</label>
              <button className='btn float-end background border px-2 ' onClick={() => handleAddEducation()} hidden={education.length < 3 ? false : true}><FontAwesomeIcon icon={faAdd} /> Add</button>
              <br /><br />
              <form onSubmit={(e) => handleSubmitEducation(e)}>
                <ol>
                  {
                    education.map((v, i) => {
                      return (
                        <li key={i} className='d-inline'>
                          <div className="courses mt-3">
                            <input type="text" disabled={educaDisabled} placeholder='College / School' onChange={(e) => handleEducationChange(e, i)} name="college_name" value={v.college_name} className='me-3 p-2' required />
                            <input type="text" disabled={educaDisabled} placeholder='Stream / Course' onChange={(e) => handleEducationChange(e, i)} name="stream" value={v.stream} className='me-3 w-25 p-2' required />
                            <input type="text" disabled={educaDisabled} placeholder='Percentage %' onChange={(e) => handleEducationChange(e, i)} name="percent" value={v.percent} className='me-3 p-2' required />
                            <span className='me-3'>Start Year :</span>
                            <input type="date" disabled={educaDisabled} name="start_year" onChange={(e) => handleEducationChange(e, i)} value={v.start_year} className='me-3 p-2' required />
                            <span className='me-3'>End Year :</span>
                            <input type="date" disabled={educaDisabled} name="end_year" onChange={(e) => handleEducationChange(e, i)} value={v.end_year} className='me-3 p-2' required />
                            <button className='btn background border' onClick={(e) => handleRemoveEducation(e, i)} hidden={i === 0 ? true : educaDisabled}><FontAwesomeIcon icon={faRemove} /></button>
                          </div>
                        </li>
                      )
                    })
                  }
                </ol>
                <br />
                <button className='btn btn-primary me-2' type='submit'>submit</button>
                <FontAwesomeIcon icon={faCircleCheck} id="eC" visibility="hidden" />
              </form>
            </div>
          </div>
        </div>

        {isDisabeled && hobbieDisabled && courseDisabled && internDisabled && skillDisabled && educaDisabled &&
          <center><button onClick={(e) => handleGenerateResume(e)} className='btn btn-info w-25 fs-4 mt-5'>Generate Resume</button></center>
        }
      </div>


    </>
  )
}

export default Form