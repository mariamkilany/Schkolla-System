import React from 'react'
import './stages.css'
import student from '../../imge/students.png'
import DeletePopup from '../popupComponents/DeletePopup'
import UpdateClass from '../popupComponents/UpdateClass'
import { useNavigate ,useParams } from 'react-router-dom'
export default function Class(props) {
const classes=props.classes;
console.log(classes)
const index=props.index;
const color =localStorage.getItem('stagecolor')
const navigate=useNavigate();
const param=useParams();
const handleClick=()=>{
navigate(classes._id)
}
  return <>
      <div className="col-md-4 w3-center w3-animate-left" key={index} onClick={handleClick} >
              <div className="stag-container p-3">
                  <div className={color==='green'?'stage stage-3 py-4 bg-white':color==='blue'?'stage-2 py-4 bg-white stage':'stage-1 py-4 bg-white stage'}>
                    <div className={color}>
                    <div className=" px-5 py-1">
                          <h4 className='mt-1 fs-5'> الفصل {classes.name}</h4>
                      </div>
                    </div>                  
                      <div className="student-num mt-5 py-4">
                      <h3 className='fs-3'> عدد الطلاب:{classes.studentsCount}</h3>
                      <img src={student} alt="" className='w-25' />
                      </div>
                      <div className="btm w-100">
                      <DeletePopup name={`الفصل ${classes.name}`} id={param.classId} link={'class/deleteClass/'}/>
                      <UpdateClass classId={classes._id} />
                      </div>
                      
                  </div>
              </div>
          </div>
  </>
}
