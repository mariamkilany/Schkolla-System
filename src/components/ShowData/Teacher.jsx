import Table from 'react-bootstrap/Table';
import"./style.css"
import { useContext, useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import Loading from '../../pages/Loading/Loading';
import AuthContext from '../shared/AuthContext';
export default function TeacherShow() {

    const [teacherId,setTeacherId]=useState('')
    const [teacherName,setTeacherName]=useState('')
    const regex1=new RegExp(`^${teacherId}`)
    const regex2=new RegExp(`^${teacherName}`)
    const navigate = useNavigate()
    const {refresh}=useContext(AuthContext)

    const { fetchData,data:teachersDate , loading} = useAxios()

    useEffect(()=>{
        fetchData('get',`teacher/getAllTeachers`)
    },[refresh])

    const handleClick=(id)=>{
        navigate(id)
    }

    if(loading)
    return <Loading/>

    return (
        <>
        <div className="input-cont row mb-5">
        <input className="col-md-4 search-input" value={teacherName} disabled={teacherId!==''?true:false} onChange={(e)=>setTeacherName(e.target.value)}  type="search1"  placeholder="البحث بالاسم"/>
        <input  className="col-md-4 search-input" value={teacherId} disabled={teacherName!==''?true:false} onChange={(e)=>setTeacherId(e.target.value)} type="search2" placeholder="البحث بالرقم القومي"  />
        </div>
        <Table striped  hover>
                <thead className="line">
                    <th >الرقم القومي</th>
                    <th>الصورة </th>
                    <th>الاسم </th>
                    <th>النوع </th>
                    <th> التخصص </th>
                    <th> رقم الهاتف </th>
                    <th> الايميل </th>
                </thead>
                <tbody>
                    { teacherId ===''&&teacherName ===''? 
                    teachersDate?.map((data)=>{
                            return(
                        <tr className={`image w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{data.nationalId}</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.role}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.email}</td>
                        </tr>)
                    }):
                    teacherId!==''?
                    teachersDate?.map((data)=>{
                        return(
                        <tr className={`image ${!regex1.test(data.nationalId)?'disapear':''} w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{data.nationalId}</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.role}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.email}</td>
                        </tr>
                        )
                    }
                    )
                    :
                    teachersDate?.map((data)=>{
                        return(
                        <tr className={`image ${!regex2.test(data.name)?'disapear':''} w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{data.nationalId}</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.role}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.email}</td>
                        </tr>
                        )
                    }
                    )
                }
                </tbody>
            </Table>
        </>

    );
}
