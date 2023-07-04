import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './popup.css';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

function DeletePopup(props) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    console.log(props)
    const { fetchData,data , loading} = useAxios()

    const handleClose = (e) => {
        if(e && e.stopPropagation) e.stopPropagation()
        setShow(false)};
    const handleShow = (e) => {
        if(e && e.stopPropagation) e.stopPropagation()
        setShow(true)
    };

const handleDelete=async()=>{
    fetchData('delete',`${props.link}${props.id}`,{},handleClose).then(()=>{
        if(props.link==='teacher/deleteTeacher/'
        ||props.link==='student/deleteStudent/'
        ||props.link==='securityRouter/deleteSecurityMember/')
        navigate(-1)
    })
}

    return (
        <>
        <button className={`btn delete-btn bttm ${props.link==='teacher/deleteTeacher/'||props.link==='student/deleteStudent/'||props.link==='securityRouter/deleteSecurityMember/'?'pt-2 btn-danger btn-1 w-100':''}`} onClick={handleShow}>
            حذف 
        </button>
        <Modal show={show} onHide={handleClose} onClick={(e)=>{if(e && e.stopPropagation) e.stopPropagation();}}>
            <Modal.Header closeButton>
            <Modal.Title>حذف {props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                هل انت متأكد من حذف {props.name} بالكامل؟
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                تراجع
            </Button>
            <Button variant="primary" type="submit" onClick={handleDelete}>
            تأكيد الحذف
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeletePopup;