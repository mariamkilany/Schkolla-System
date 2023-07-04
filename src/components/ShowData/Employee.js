import Table from 'react-bootstrap/Table';
import"./style.css"
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import useAxios from '../../hooks/useAxios';
import { useNavigate} from 'react-router-dom';
import AuthContext from '../shared/AuthContext';
import Loading from '../../pages/Loading/Loading'

export default function Employee() {
    const accessToken = localStorage.getItem('accessToken');
    const id=localStorage.getItem('id');
    const {fetchData,data,loading}=useAxios()
    const {refresh}=useContext(AuthContext)
    const [stuffId,setStuffId]=useState('')
    const [stuffName,setStuffName]=useState('')
    const [stuffsDate,setStuffsData]=useState([]);
    const regex1=new RegExp(`^${stuffId}`)
    const regex2=new RegExp(`^${stuffName}`)
    const navigate = useNavigate()

    useEffect(()=>{
        fetchData('get',`securityRouter/getAllMembers`).then((res)=>setStuffsData(res))
    },[refresh])

    const handleClick=(id)=>{
        // localStorage.setItem('stuffId',id)
        navigate(id)
    }
    if(loading)
    return <Loading/>
    return (
        <>
        <div className="input-cont row mb-5">
        <input className="col-md-4 search-input" disabled={stuffId!==''?true:false} value={stuffName} onChange={(e)=>setStuffName(e.target.value)}  type="search1"  placeholder="البحث بالاسم"/>
        <input  className="col-md-4 search-input" disabled={stuffName!==''?true:false} type="search2" placeholder="البحث بالرقم القومي" onChange={(e)=>setStuffId(e.target.value)} value={stuffId} />
        </div>
        <Table striped  hover>
                <thead className="line">
                    <th >الرقم القومي</th>
                    <th>الصورة </th>
                    <th>الاسم </th>
                    <th>النوع </th>
                    <th> الوظيفة </th>
                    <th> رقم الهاتف </th>
                    <th> الايميل </th>
                </thead>
                <tbody>
                    { stuffId===''&&stuffName===''? 
                    stuffsDate?.map((data)=>{
                        console.log(data)
                            return(
                        <tr className={`image w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{
                                // data.nationalId
                            3265765867867
                            }</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.job}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.email}</td>
                        </tr>)
                    }):
                    stuffId!==''?
                    stuffsDate?.map((data)=>{
                        return(
                        <tr className={`image ${!regex1.test(data.nationalId)?'disapear':''} w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{
                                // data.nationalId
                                3265765867867
                            }</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.job}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.email}</td>
                        </tr>
                        )
                    }
                    )
                    :
                    stuffsDate?.map((data)=>{
                        console.log(data._id)
                        return(
                        <tr className={`image ${!regex2.test(data.name)?'disapear':''} w3-center w3-animate-left`} 
                        onClick={()=>handleClick(data._id)}>
                            <td>{
                                // data.nationalId
                                3265765867867
                            }</td>
                            <td><img src={data.imgUrl}alt={"name"} /></td>
                            <td>{data.name}</td>
                            <td>{data.gender}</td>
                            <td>{data.job}</td>
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
