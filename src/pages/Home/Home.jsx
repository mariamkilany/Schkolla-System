import teachers from '../../imge/teachers.png'
import student from  '../../imge/students.png'
import employee from '../../imge/emolyee.png'
import Slider from '../../components/studentSlider/Slider'
import Donut from '../../components/donutChart/Donut'
import Bar from '../../components/barChart/Bar'
import './home.css'
import React, { useEffect, useState,useContext } from 'react'
import useAxios from '../../hooks/useAxios';
import AuthContext from '../../components/shared/AuthContext';
import Loading from '../Loading/Loading'


export default function Home() {
    const{refresh ,setref}=useContext(AuthContext)
    const {fetchData,data:conf,loading}=useAxios()
    const [counts,setCounts]=useState({})
    useEffect(()=>{
        fetchData('get','student/getHomePageCounts').then((res)=>{
            setCounts(res)
        })
    },[])
    if(loading)
    return <Loading/>
    return <>
    <div className="row mb-5 gy-5 nums-cont">
        <div className="col-md-4 w3-center w3-animate-left">
            <div className='number-cont py-md-4 py-sm-3 d-flex fs-md-3 '>
            <span  >عدد الطلاب :{counts.studentCount}</span>
            <img src={student} alt="student" />
            </div>
        </div>
        <div className="col-md-4 w3-center w3-animate-left">
            <div className='number-cont py-md-4 py-sm-3 d-flex '>
            <span >عدد المعلمين :{counts.teacherCount}</span>
            <img src={teachers} alt="teachers" />
            </div>
        </div>
        <div className="col-md-4 w3-center w3-animate-left">
            <div className='number-cont py-md-4 py-sm-3 d-flex '>
            <span >عدد الموظفين:{counts.securityCount}</span>
            <img src={employee} alt="employee"  />
            </div>
        </div>        
    </div>
    <div className="row mt-5 w3-center w3-animate-left justify-content-center">
        <div className="col-lg-7 py-5 mt-5 slider-cont">
            <Slider/>
        </div>
        <div className="col-lg-5 col-md-8  py-5 mt-5 dounat-cont w3-center w3-animate-left">
            <Donut />
        </div>
    </div>
    <div className="row mt-5">
        <div className="col-lg-6 col-md-10 bar-cont w3-center w3-animate-left">
            <Bar/>
        </div>
        <div className="col-md-6 py-5 mt-5 w3-center w3-animate-left">
        </div>
    </div>
    </>;
}