import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import useAxios from '../../hooks/useAxios'
import './popup.css';
import {AiOutlineSetting} from 'react-icons/ai'
import React ,{useState,useContext} from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../shared/AuthContext';


function TableSetting() {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [duration ,setDuration ] = useState(0)
    const [lessonNum,setLessonNum] = useState(0)
    const [daysNum , setDaysNum ] = useState(0)
    const [startTime , setStartTime] = useState(0)
    const [endTime , setEndTime ] = useState(0)
    const [firstDay , setFirstDay] = useState("")
    const [lastDay , setLastDay] = useState("")
    const {fetchData,data,loading}=useAxios()
    const{refresh,setref}=useContext(AuthContext)
    const params=useParams()
    const handleClose = (e) => {
        if(e && e.stopPropagation) e.stopPropagation();
        setShow(false)};
    const handleShow = (e) => {
        if(e && e.stopPropagation) e.stopPropagation();
        setShow(true)};
    const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
    fetchData('post','tableCellRouter/createWeekTable',
    {classId:params.classId,duration,startTime,endTime,firstDay,lastDay,lessonNum},handleClose)
    .then(()=>{
            setref(!refresh)
        })
    };

    return (
        <>
        <button  className='btn btn-primary' onClick={handleShow}>
        إعدادات الجدول <AiOutlineSetting/>
        </button>
        <Modal show={show} onHide={handleClose} onClick={(e)=>{if(e && e.stopPropagation) e.stopPropagation();}}>
            <Modal.Header closeButton>
            <Modal.Title>إضافة جدول  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>  مدة الحصة بالدقائق</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder=""
                    onChange={(e)=>{
                        setDuration(e.target.value)
                        // console.log(typeof e.target.value)
                    }}
                    autoFocus
                    value={duration}
                    className='timeInpt'
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label> عدد الحصص</Form.Label>
                <Form.Control
                    required
                    type="number"
                    placeholder=""
                    onChange={(e)=>setLessonNum(e.target.value)}
                    autoFocus
                    value={lessonNum}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label> بداية اليوم</Form.Label>
                <Form.Control
                    required
                    type="time"
                    placeholder=""
                    onChange={(e)=>setStartTime(e.target.value)}
                    autoFocus
                    value={startTime}
                    className='timeInpt'
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>  نهاية اليوم</Form.Label>
                <Form.Control
                    required
                    type="time"
                    placeholder=""
                    onChange={(e)=>setEndTime(e.target.value)}
                    autoFocus
                    value={endTime}
                    className='timeInpt'
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label> اليوم الاول</Form.Label>
                <Form.Select required  value={firstDay} onChange={(e)=>setFirstDay(e.target.value)}>
                    <option value={0} >السبت</option>
                    <option value={1} >الأحد</option>
                    <option value={2} >الإثنين</option>
                    <option value={3} >الثلاثاء</option>
                    <option value={4} >الأربعاء</option>
                    <option value={5} >الخميس</option>
                    <option value={6} >الجمعة</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label> اليوم الأخير </Form.Label>
                <Form.Select required  value={lastDay} onChange={(e)=>setLastDay(e.target.value)}>
                    <option value={0} >السبت</option>
                    <option value={1} >الأحد</option>
                    <option value={2} >الإثنين</option>
                    <option value={3} >الثلاثاء</option>
                    <option value={4} >الأربعاء</option>
                    <option value={5} >الخميس</option>
                    <option value={6} >الجمعة</option>
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

export default TableSetting
