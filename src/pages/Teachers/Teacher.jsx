import MoreinfoTeacher from '../../components/Moreinfo/MoreinfoTeacher'
import DeletePopup from '../../components/popupComponents/DeletePopup'
import UpdateTeacher from '../../components/popupComponents/UpdateTeacher';
import './teacher.css'
import useAxios from '../../hooks/useAxios';
import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import AuthContext from '../../components/shared/AuthContext';

export default function Teacher() {
    const { refresh }=useContext(AuthContext)
    const { fetchData,data, loading} = useAxios()
    const [teacherData,setTeacherData]=useState({})
    const [classInfo,setClassInfo]=useState({});
    const param=useParams()

    useEffect(() => {
    fetchData('get',`teacher/getTeacher/${param.teacherId}`).then((res)=>setTeacherData(res))
    fetchData('get',`teacher/getClassByTeacherId/${param.teacherId}`).then(
        (res)=>{
            setClassInfo(res)
        }
    )
    },[refresh])

    if(loading)
    return <Loading/>
    return <>
        <div className="container">
            <div className="row mb-4 teacher-row1 gy-4">
            <div className="col-sm-3 btn-container ">
                    <DeletePopup name={` المعلم / ة ${teacherData?.name}`} id={teacherData?._id} link={'teacher/deleteTeacher/'} />
                    <UpdateTeacher teacherData={teacherData} />
            </div>
                <div className="col-sm-6 d-flex justify-content-center flex-column align-items-end presonal">
                    <h2>{teacherData?.name}</h2>
                    <h5>{teacherData?.nationalId}</h5>
                </div>
                <div className="col-sm-3 img-cont">
                    <img src={teacherData?.imgUrl} alt="teacher_photo" className='photo-cont'/>
                </div>
            </div>
            <div class="d-flex row teacher-row-2 align-items-start gy-4">
                <MoreinfoTeacher props={teacherData} classInfo={classInfo} />
            </div>
        </div>
    </>; 
}