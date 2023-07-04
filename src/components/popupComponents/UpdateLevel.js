import React, { useState ,useEffect, } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './popup.css';
import axios from 'axios'
function UpdateLevel(props) {
    const level =props.level
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const[subject,setSubject]=useState('');
    const [subjects,setSubjects]=useState([]);
    const [gradeSubjects,setGradeSubjects]=useState([])
    const [subjectsIds,setSubjectsIds]=useState([])
    const [name,setName]=useState(level.name)
    const accessToken =localStorage.getItem('accessToken');
    const id=localStorage.getItem('id');
    useEffect(()=>{
        axios.get(`subject/getAllSubjects`
    ,{ params: { userId: id } , headers: {authorization: `Bearer ${accessToken}`} })
    .then((response) =>setSubjects(response.data))
        axios.get(`grade/getGradeSubjects/${level._id}`
    ,{ params: { userId: id } , headers: {authorization: `Bearer ${accessToken}`} })
    .then((response) =>{
        setGradeSubjects(response.data.subjects)
        setSubjectsIds(gradeSubjects.map((sub)=>sub._id))
    })
    },[])

    const handleDelete =(subId)=>{
        setGradeSubjects(gradeSubjects.filter((subject)=>{
            return subId!==subject._id
        }))
        setSubjectsIds(subjectsIds.filter((cId)=>cId!==subId))
    }

    const handleAddSub =(sub)=>{
        if(!subjectsIds.includes(sub._id)){
        setGradeSubjects([...gradeSubjects,sub])
        setSubjectsIds([...subjectsIds,sub._id])
        }
    }

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
    await axios.patch(`grade/updateGrade/${level._id}`,{name,subjects:subjectsIds},
    { params: { userId: id } , headers: {authorization: `Bearer ${accessToken}`} }
    ).then(handleClose)
    };
    return (
        <>
        <button  className='btn updat-btn bttm mx-4 pt-2' onClick={handleShow}>
        <h5>تعديل</h5> 
        </button>
        <Modal show={show} onHide={handleClose} onClick={(e)=>{if(e && e.stopPropagation) e.stopPropagation();}}>
            <Modal.Header closeButton>
            <Modal.Title> تعديل بيانات المرحلة  {level.name} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>إسم المرحلة الدراسية</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="مثال : الاولى"
                    onChange={(e)=>setName(e.target.value)}
                    autoFocus
                    value={name}
                />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>إضافة مواد</Form.Label>
                <Form.Select 
                onChange={(e)=>setSubject(e.target.value)}>
                    <option value=''>اختر مادة</option>
                    {subjects.map((sub)=>{
                        return (
                            <option value={sub.name+"  "+sub._id} key={sub._id}>
                                {sub.name}
                            </option>
                        )
                    })}
                </Form.Select>
                    <Button className='addbtn' variant="primary" onClick={()=>{
                        var subname= subject.split("  ")[0]
                        var subid = subject.split("  ")[1]
                        if(subject!=='')
                        handleAddSub({name:subname,_id:subid})
                        setSubject('')
                        }}>إضافة</Button>
                </Form.Group>
            </Form>
            {(gradeSubjects)?
            <Table striped bordered hover>
        <thead>
            <tr>
            <th>حذف</th>
            <th>المواد المسجلة</th>
            </tr>
        </thead>
        <tbody>
            {gradeSubjects.map((sub)=>{
                return (
            <tr key={sub._id}>
                <td><Button variant="danger" onClick={
                    ()=>handleDelete(sub._id)}>حذف</Button>
                </td>
                <td>{sub.name}</td>
            </tr>
            )
            })}
        </tbody>
    </Table>:''}
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

export default UpdateLevel;