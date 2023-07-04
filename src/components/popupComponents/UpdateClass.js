import React, { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './popup.css';

function UpdateClass(props) {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const handleClose = (e) => {
        if(e && e.stopPropagation) e.stopPropagation();
        setShow(false)};
    const handleShow = (e) => {
        if(e && e.stopPropagation) e.stopPropagation();
        setShow(true)};
    const [className ,setClassName]=useState('');
    const [subjects,setSubjects]=useState([]);
    const classId=props.classId;
    const [teachers,setTeachers]=useState([]);
    const [selectedTeachers,setSelectedTeachers]=useState([])
    const [pair,setPairs]=useState([])
    const accessToken =localStorage.getItem('accessToken');
    const id=localStorage.getItem('id');

    const handleAddPair=(e,sub)=>{
        const cleanPairs = pair.filter((p)=>p.subject!==sub._id)
        setPairs([...cleanPairs,{subject:sub._id,teacher:e.target.value}])
    } 
    const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
    await axios.patch(`/class/updateClass/${classId}`,{name:className,subjectToTeacher:pair}, 
        {params: { userId: id } ,headers: {'Authorization': `Bearer ${accessToken}`, withCradintials : true}}).then(handleClose)
    };
    useEffect(
        ()=>{
            axios.get('teacher/getAllTeacherNamesWithIds', 
        {params: { userId: id } ,headers: {'Authorization': `Bearer ${accessToken}`, withCradintials : true}})
        .then((res)=>{
            setTeachers(res.data)
        }
        )
            axios.get(`class/getClassById/${classId}`,
            {params: { userId: id } ,headers: {'Authorization': `Bearer ${accessToken}`, withCradintials : true}}).then(
                (res)=>{
                    console.log(res)
                    setClassName(res.data.name)
                    setPairs(res.data.subjectToTeacher)
                    setSubjects(res.data.subjectToTeacher.map((obj)=>{
                        return obj.subject;
                    }))
                    setSelectedTeachers(res.data.subjectToTeacher.map((obj)=>{
                        return obj.teacher;
                    }))
                }
            )
    }
        ,[])
    return (
        <>
        <button className='btn updat-btn bttm mx-4 pt-2' onClick={handleShow}>
        <h5>تعديل</h5>
        </button>

        <Modal show={show} onHide={handleClose} onClick={(e)=>{if(e && e.stopPropagation) e.stopPropagation();}}>
            <Modal.Header closeButton>
            <Modal.Title>تعديل بيانات الفصل</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>إسم الفصل </Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="مثال : أ"
                    value={className}
                    onChange={(e)=>setClassName(e.target.value)}
                    autoFocus
                />
                </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>المعلم</th>
                                <th>المواد المسجلة</th>
                            </tr>
                        </thead>
                        <tbody>
            {subjects.map((sub,subindex)=>{
                // console.log(selectedTeachers[subindex]._id)
                return (
                sub?<tr key={subindex}>
                <td>
                    <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Select  required  onChange={(e)=>{
                        handleAddPair(e,sub)
                    }}>
                        <option value=''>اختر معلم المادة</option>
                        {teachers.map((teacher,index)=>{
                            return(
                                <option selected={teacher._id===selectedTeachers[subindex]._id} value={teacher._id} key={index}>{teacher.name}</option>
                            )
                            })}
                    </Form.Select>
                    </Form.Group>
                </td>
                <td>{sub.name}</td>
            </tr>
            :''
            )
            })}
        </tbody>
    </Table>
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
    );
}

export default UpdateClass;