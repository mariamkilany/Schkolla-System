import React, { useState ,useRef ,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './popup.css';
import axios from 'axios';


function BtnPop() {
    const[teacherName,setTeacherName]=useState('')
    const[subjectName,setSubjectName]=useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
    };
    return (
    <>
    <Button variant="warning" className='text-secondary  text-decoration-underline  table-pop' style={{backgroundColor: "transparent",border: "none"}} onClick={handleShow}>تعديل الحصة</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title> تعديل الحصة </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01"  >
                <Form.Label>اسم المعلم</Form.Label>
                <Form.Control
                    required
                    type="text"
                    autoFocus
                    value={teacherName}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>المادة</Form.Label>
                <Form.Control
                    required
                    type="text"
                    value = {subjectName}
                />
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

export default BtnPop
