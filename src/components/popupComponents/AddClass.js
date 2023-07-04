import React, { useState ,useEffect , useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import AuthContext from '../shared/AuthContext';
import useAxios from '../../hooks/useAxios';
import './popup.css';

function AddClass(props) {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [className ,setClassName]=useState('');
    const [subjects,setSubjects]=useState([]);
    const gradeId=props.gradeId;
    const [teachers,setTeachers]=useState([]);
    const [pair,setPairs]=useState([])
    const {fetchData,data,loading} = useAxios();
    const{refresh,setref}=useContext(AuthContext)

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
    fetchData('post','/class/addNewClassToGrade',{gradeId,name:className,subjectToTeacher:pair}).then((res)=>{
        if(res.createdClass){
        setref(!refresh)
        handleClose();
        }
    });
    };
    useEffect(
        ()=>{
        fetchData('get','teacher/getAllTeacherNamesWithIds').then(res=>setTeachers(res));
        fetchData('get',`grade/getGradeSubjects/${gradeId}`).then(res=>setSubjects(res.subjects));
    }
        ,[refresh])
    return (
        <>
        <Button variant="primary" className='levelbtn' onClick={handleShow}>
        إضافة فصل جديد
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>إضافة فصل جديد</Modal.Title>
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
            {subjects.map((sub,index)=>{
                return (
            <tr key={index}>
                <td>
                    <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Select  required onChange={(e)=>{
                        handleAddPair(e,sub)
                    }}>
                        <option value=''>اختر معلم المادة</option>
                        {teachers.map((teacher,index)=>{
                            return(
                                <option value={teacher._id} key={index}>{teacher.name}</option>
                            )
                            })}
                    </Form.Select>
                    </Form.Group>
                </td>
                <td>{sub.name}</td>
            </tr>
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

export default AddClass;