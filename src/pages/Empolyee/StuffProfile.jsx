import { useParams } from 'react-router-dom';
import MoreinfoStuff from '../../components/Moreinfo/MoreInfoStuff';
import DeletePopup from '../../components/popupComponents/DeletePopup'
import UpdateTeacher from '../../components/popupComponents/UpdateTeacher';
// import './teacher.css'

import axios from 'axios';
import {useEffect, useState } from 'react';
import UpdateEmpolyee from '../../components/popupComponents/UpdateEmpolyee';
import useAxios from '../../hooks/useAxios';
import Loading from '../Loading/Loading';
export default function StuffProfile() {
    const id=localStorage.getItem('id')
    const accessToken=localStorage.getItem('accessToken')
    const[stuffData,setStuffData]=useState({})
    const{fetchData,data,loading}=useAxios()

    const empolyeeId = useParams().empolyeeId;
    useEffect(() => {
    // axios.get(`securityRouter/getSecurityMemberById/${empolyeeId}`,
    // {params: { userId: id } ,headers: {'Authorization': `Bearer ${accessToken}`, withCradintials : true}})
    // .then(
    //     (response)=>{
    //         setStuffData(response.data)
    //     }
    // )
    fetchData('get',`securityRouter/getSecurityMemberById/${empolyeeId}`).then((res)=>{
        setStuffData(res)
    })
    },[])
    if(loading)
    return <Loading/>

    return <>
        <div className="container">
            <div className="row mb-4 teacher-row1 gy-4">
            <div className="col-sm-3 btn-container ">
                    <DeletePopup name={` الموظف / ة ${stuffData.name}`} id={stuffData._id} link={'securityRouter/deleteSecurityMember/'} />
                    <UpdateEmpolyee employeeData={stuffData} />
            </div>
                <div className="col-sm-6 d-flex justify-content-center flex-column align-items-end presonal">
                    <h2>{stuffData.name}</h2>
                    <h5>{stuffData.nationalId}</h5>
                </div>
                <div className="col-sm-3 img-cont">
                    <img src={stuffData.imgUrl} alt="stuff_photo" className='photo-cont'/>
                </div>
            </div>
            <div class="d-flex row teacher-row-2 align-items-start gy-4">
                <MoreinfoStuff props={stuffData}/>
            </div>
        </div>
    </>
}