import React, { useState ,useRef ,useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import {SlCloudUpload} from 'react-icons/sl'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './popup.css';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import AuthContext from '../shared/AuthContext';
import { Table } from 'react-bootstrap';

function UpdateEmpolyee({employeeData}) {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {fetchData,data,loading}=useAxios()
    const {refresh,setref}=useContext(AuthContext)
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[nationalId,setNationalId]=useState('')
    const[age,setAge]=useState(0)
    const[password,setPassword]=useState('')
    const [gender,setSelected] = useState('');
    const [imgUrl,setImageUrl] =useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const employeeId = useParams().empolyeeId;

    const handleChange=(e)=> {
    setSelected(e.target.value );
}

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        widgetRef.current= cloudinaryRef.current.createUploadWidget({
            cloudName:'djvazpvio',
            uploadPreset:'rkgmm1az'
    },(error, result) => { 
    if (!error && result && result.event === "success") { 
        setImageUrl(result.info.secure_url)
    }})
    },[])

    const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
    fetchData('patch',`securityRouter/updateSecurityMember/${employeeId}`,{name,age,nationalId,gender:gender,email,phoneNumber,imgUrl,password}
    ,handleClose)
    .then(
        ()=>setref(!refresh)
    )
    };
    useEffect(()=>{
        fetchData('get',`securityRouter/getSecurityMemberById/${employeeId}`).then(
            (res)=>{
        setName(res.name)
        setEmail(res.email)
        setNationalId(res.nationalId)
        setAge(res.age)
        setPassword(res.password)
        setPhoneNumber(res.phoneNumber)
        setSelected(res.gender)
        setImageUrl(res.imgUrl)
        })
    },[])
    return (
        <>
        <Button variant="primary" className='btn btn-warning btn-2 w-100' onClick={handleShow}>تعديل الموظف </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>معلومات الموظف الشخصية</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01" style={{display: "flex",flexDirection: "row-reverse",justifyContent: "space-between"}} >
                <div className='w-75'>
                <Form.Label>الإسم</Form.Label>
                <Form.Control
                    style={{height:"40%"}}
                    required
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                </div>
                <div className='widget-cont'controlId="validationCustom01">
                    <Button onClick={()=>widgetRef.current.open()}>
                        {imgUrl===''?<SlCloudUpload/> :<img src={imgUrl} alt="teacherimg" style={{width:'100%'}}/>}
                    </Button>
                </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>الرقم القومي</Form.Label>
                <Form.Control
                    required
                    type="text"
                    value={nationalId}
                    onChange={(e)=>setNationalId(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>السن</Form.Label>
                <Form.Control
                    required
                    type="number"
                    value={age}
                    onChange={(e)=>setAge(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>رقم الموبايل</Form.Label>
                <Form.Control
                    required
                    type="text"
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>الجنس</Form.Label>
                <Form.Select required  value={gender} onChange={(e)=>handleChange(e)}>
                    <option value={''} disabled>أختر</option>
                    <option defult value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>الإيميل</Form.Label>
                <Form.Control
                value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    type="email"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>كلمة المرور </Form.Label>
                <Form.Control
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    type="password"
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

export default UpdateEmpolyee
