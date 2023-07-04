import React, { useState ,useRef ,useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './popup.css';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import AuthContext from '../shared/AuthContext';

function AddTableCell({subjectToTeacher,currTime}) {
    const [selected,setSelected]=useState({})
    const [selectedDay , setSelectedDay] = useState('')
    const [selectedTime , setSelectedTime]=useState('');
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
    fetchData('post','tableCellRouter/addNewCellInTable',{classId,subject:JSON.parse(selected).subject._id,
    teacher:JSON.parse(selected).teacher._id ,day:selectedDay,time:selectedTime},handleClose).then(()=>{
        setref(!refresh)
    })
    };
    const days = ['السبت','الأحد' ,'الإثنين' ,'الثلاثاء','الأربعاء','الخميس','الجمعة']
    return (
    <>
    <Button variant="primary"  onClick={handleShow}> إضافة حصة جديدة</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>إضافة حصة جديدة</Modal.Title>
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
                                <option value={JSON.stringify(option)}>
                                المادة: {option?.subject?.name}
                                -----
                                المعلم: {option?.teacher?.name}
                                </option>
                            )
                        })
                    }
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01"  >
                <Form.Label>  اليوم </Form.Label>
                <Form.Select required onChange={(e)=>setSelectedDay(e.target.value)} >
                    <option value=''>اختر </option>
                    {
                        days.map((day,index)=><option value={index}>{day}</option>)
                    }
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01"  >
                <Form.Label> التوقيت</Form.Label>
                <Form.Select required onChange={(e)=>setSelectedTime(e.target.value)} >
                    <option value=''>اختر </option>
                    {
                        currTime?.map((curr)=>{
                            return(
                                <option value={curr}>
                                {curr}
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

export default AddTableCell
