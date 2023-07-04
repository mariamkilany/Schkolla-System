import React, { useState ,useRef ,useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './popup.css';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import AuthContext from '../shared/AuthContext';

function UpdateTableCell({subjectToTeacher , cellData}) {
    const [selected,setSelected]=useState({})
    const [selectedDay , setSelectedDay] = useState(cellData.day)
    const {fetchData,data,loading}=useAxios()
    const classId=useParams().classId
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const {refresh,setref}=useContext(AuthContext)
    const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
    fetchData('patch',`tableCellRouter/updateCellInTableById/${cellData._id}`,{
        classId,subject:JSON.parse(selected).subject._id,teacher:JSON.parse(selected).teacher._id ,day:selectedDay
    },handleClose).then(()=>setref(!refresh))
    };
    const days = ['السبت','الأحد' ,'الإثنين' ,'الثلاثاء','الأربعاء','الخميس','الجمعة']
    return (
    <>
    <Button variant="warning" className='table-pop' style={{marginLeft: "20px" ,color:"white"}}  onClick={handleShow}> تعديل  </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title> تعديل الحصة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01"  >
                <Form.Label>المعلم و المادة </Form.Label>
                <Form.Select required onChange={(e)=>setSelected(e.target.value)} >
                    <option value=''>اختر </option>
                    {
                        subjectToTeacher?.map((option)=>{
                            if(option?.subject !==null&&option?.teacher!==null)
                            return(
                                <option selected={option?.subject.name===cellData.subject&&option?.teacher.name===cellData.teacher} value={JSON.stringify(option)}>
                                المادة: {option?.subject?.name}
                                -----
                                المعلم: {option?.teacher?.name}
                                </option>
                            )
                        })
                    }
                </Form.Select>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                إغلاق
            </Button>
            <Button variant="primary" type="submit" onClick={ (e)=>{handleSubmit(e)}}>
                حفظ التغييرات
            </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default UpdateTableCell