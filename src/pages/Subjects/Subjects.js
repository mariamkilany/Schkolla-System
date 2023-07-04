import axios from 'axios';
import React, { useEffect, useState  ,useCallback, useRef, useContext} from 'react'
import AddSubject from '../../components/popupComponents/AddSubject'
import { Button ,Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Loading from '../Loading/Loading'
import useAxios from '../../hooks/useAxios';
import AuthContext from '../../components/shared/AuthContext';
import './subjects.css'
function Subjects() {
    
    const handleDelete=async(subjectId)=>{
        fetchData('delete',`subject/deleteSubject/${subjectId}`).then(
        ()=> {
            setref(!refresh)
        })};
    const { fetchData,data:subjects , loading} = useAxios()
    const {refresh , setref} = useContext(AuthContext)
    useEffect(() => {
        fetchData('get','subject/getAllSubjects')
    }
    ,[refresh]);
    if(loading) 
    return <Loading/>
    return (
        <>
        <div className="row sub-cont mb-5">
            <AddSubject/>
        </div>
        <Table className='sub-table'>
            <thead>
                <tr>
                    <th>حذف</th>
                    <th>المواد المسجلة</th>
                </tr>
            </thead>
            <TransitionGroup component="tbody">
                {subjects&&subjects?.map((subject,index)=><CSSTransition key={subject.id} timeout={700} classNames="sub">
                    <tr key={index} className={`w3-center w3-animate-left`}>
                    <td><Button variant="danger" onClick={()=>{handleDelete(subject._id)}}>حذف</Button></td>
                    <td>{subject.name}</td>
                    </tr>
                </CSSTransition>)}
            </TransitionGroup>
        </Table>
        </>
    )
}

export default Subjects
