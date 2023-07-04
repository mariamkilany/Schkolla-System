import React, { useContext } from 'react'
import './stages.css'
import student from '../../imge/students.png'
import DeletePopup from '../popupComponents/DeletePopup'
import UpdateLevel from '../popupComponents/UpdateLevel'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../shared/AuthContext'
export default function Stages(props) {
const level=props.level;
const index=props.index;
const navigate=useNavigate();
const color =index%3===0?'green':(index%3===1)?'blue':'pink'
// const {setStageId}=useContext(AuthContext);
const handleClick=()=>{
// localStorage.setItem('stageId',level._id)
// setStageId(level._id);
localStorage.setItem('stagecolor', color);
navigate(level._id);
}
  return <>
    <div className="col-md-6 col-lg-4 w3-center w3-animate-left" key={index} onClick={handleClick} >
              <div className="stag-container p-3">
                  <div className={index%3===0?'stage stage-3 py-4 bg-white':(index%3===1)?'stage-2 py-4 bg-white stage':'stage-1 py-4 bg-white stage'}>
                    <div className={color}>
                    <div className=" px-5 py-1">
                          <h4 className='mt-1 fs-5'> المرحلة {level.name}</h4>
                      </div>
                    </div>                  
                      <div className="student-num mt-5 py-4">
                      <h3 className='fs-3'> عدد الطلاب:{level.studentsCount}</h3>
                      <img src={student} alt="" className='w-25' />
                      </div>
                      <div className="btm w-100">
                      <DeletePopup name={`المرحلة ${level.name}`} id={level._id} link={'grade/deleteGrade/'}/>
                      <UpdateLevel level={level} />
                      </div>
                      
                  </div>
              </div>
    </div>
  </>
  
}
