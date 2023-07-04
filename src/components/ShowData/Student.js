import Table from 'react-bootstrap/Table';
import"./style.css"
import { useContext, useEffect,useState } from "react";
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import AuthContext from '../shared/AuthContext';
export default function StudentShow(props)
{
    const link = props.link;
    const [studentId,setStudentId]=useState('')
    const [studentName,setStudentName]=useState('')
    const regex1=new RegExp(`^${studentId}`)
    const regex2=new RegExp(`^${studentName}`)
    const navigate = useNavigate()

    const {fetchData,data:studentsDate,loading} = useAxios()
    const {refresh} = useContext(AuthContext)

    useEffect(()=>{
        fetchData('get',link)
    },[refresh])

    const handleClick=(id)=>{
        navigate(id)
    }

    if(loading)
    return <Loading/>
  return<>
        <div className="input-cont row mb-5">
        <input className="col-md-4 search-input" disabled={studentId!==''?true:false} value={studentName} onChange={(e)=>setStudentName(e.target.value)}  type="search1"  placeholder="البحث بالاسم"/>
        <input  className="col-md-4 search-input" disabled={studentName!==''?true:false} value={studentId} onChange={(e)=>setStudentId(e.target.value)} type="search2" placeholder="البحث بالرقم القومي"  />
        </div>
        <Table striped  hover>
                <thead className="line">
                    <th >الرقم القومى</th>
                    <th>الصورة </th>
                    <th>الاسم </th>
                    <th>النوع </th>
                    <th> اسم ولى الأمر </th>
                    <th> رقم ولى الأمر </th>
                    <th>صلة القرابة</th>
                    <th> الايميل </th>
                </thead>
                <tbody>
                    { studentId===''&&studentName===''? studentsDate?.map((data)=>{
                            return(
                        <tr className={`image w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{data.nationalId}</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.elWasy[0].relationName}</td>
                            <td>{data.elWasy[0].phoneNumber}</td>
                            <td>{data.elWasy[0].relation}</td>
                            <td>{data.email}</td>
                        </tr>)
                    }):
                    studentId!==''?
                    studentsDate?.map((data)=>{
                        return(
                        <tr className={`image ${!regex1.test(data.nationalId)?'disapear':''} w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{data.nationalId}</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.elWasy[0].relationName}</td>
                            <td>{data.elWasy[0].phoneNumber}</td>
                            <td>{data.elWasy[0].relation}</td>
                            <td>{data.email}</td>
                        </tr>
                        )
                    }
                    )
                    :
                    studentsDate?.map((data)=>{
                        return(
                        <tr className={`image ${!regex2.test(data.name)?'disapear':''} w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{data.nationalId}</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.elWasy[0].relationName}</td>
                            <td>{data.elWasy[0].phoneNumber}</td>
                            <td>{data.elWasy[0].relation}</td>
                            <td>{data.email}</td>
                        </tr>
                        )
                    }
                    )
                }
                </tbody>
            </Table>
    </>
}