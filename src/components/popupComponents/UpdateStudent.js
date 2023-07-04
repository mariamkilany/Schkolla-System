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

const UpdateStudent = (props) => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [nationalId,setNationalId] = useState('');
    const [dateOfBirth,setDateOfBirth] = useState('');
    const [age,setAge] = useState('');
    const [gender,setSelected] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [address,setAddress] = useState('');
    const [clss,setClss] = useState('');
    const [classes,setClasses] = useState([]);
    const [relation,setRelation]=useState('')
    const [relationName,setRelationName]=useState('')
    const [contacts,setContacts] = useState([])
    const [imgUrl,setImageUrl] =useState('')
    const [stage,setStage] = useState('');
    const [stages,setStages] = useState([]);
    
    const { refresh , setref}=useContext(AuthContext)
    const { fetchData,data , loading} = useAxios()
    const params = useParams()
    useEffect(()=>{
        fetchData('get',`student/getStudentById/${params.stuId}`).then((studentData)=>{
            console.log(studentData)
            setName(studentData?.name)
            setEmail(studentData?.email)
            setAge(studentData?.age)
            setDateOfBirth(studentData?.dateOfBirth)
            setImageUrl(studentData?.imgUrl)
            setNationalId(studentData?.nationalId)
            setPassword(studentData?.password)
            setAddress(studentData?.address)
            setSelected(studentData?.gender)
            setContacts(studentData?.elWasy)
            console.log(studentData.grade._id)
            setStage(studentData?.grade._id)
            setClss(studentData?.classId._id)
            handleStageChange(studentData?.grade._id)
        }).then(
            ()=>{
                fetchData('get','grade/getAllGrades').then((res)=>{
                    setStages(res)
                    // console.log(stage)
                    // handleStageChange(stage)
            }
        )
    })
            
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    fetchData('patch',`student/updateStudent/${params.stuId}`,{name,age,nationalId,dateOfBirth,gender:gender,email,phoneNumber,address,imgUrl,password}
    ,handleClose)
    .then(
        ()=>setref(!refresh)
    )
    };
    const handleStageChange=async(value)=>{
    setStage(value)
    fetchData('get',`grade/getGradeClasses/${value}`).then((res)=>{
        setClasses(res.classes)
    })
}
    const AddContact = ()=>{
        if(relation!==''&&phoneNumber!==''&&relationName!==''){
            setContacts([...contacts,{relation,phoneNumber,relationName}])
            setRelation('');
            setRelationName('');
            setPhoneNumber('');
        }
    }
    return (
        <>
        <Button variant="primary" className='btn btn-warning btn-2 w-100' onClick={handleShow}>تعديل الطالب </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>معلومات الطالب الشخصية</Modal.Title>
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
                        {imgUrl===''?<SlCloudUpload/> :<img src={imgUrl} alt="studentimg" style={{width:'100%'}}/>}
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
                <Form.Label>تاريخ الميلاد</Form.Label>
                <Form.Control
                    required
                    type="date"
                    value={dateOfBirth}
                    onChange={(e)=>setDateOfBirth(e.target.value)
                    }
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
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>العنوان</Form.Label>
                <Form.Control
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    required
                    type="text"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>المرحلة</Form.Label>
                <Form.Select required  value={stage} onChange={(e)=>handleStageChange(e.target.value)}>
                    <option value={''} disabled>أختر</option>
                    {
                    stages.map((stage)=>{
                        return(
                            <option value={stage._id}>{stage.name}</option>
                        )
                    }
                        )
                    }
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>الفصل</Form.Label>
                <Form.Select required  value={clss} onChange={(e)=>setClss(e.target.value)}>
                    <option value={''} disabled>أختر</option>
                    {
                        classes.map((clss)=>{
                            return(
                                <option value={clss._id}>{clss.name}</option>
                            )
                        })
                    }
                </Form.Select>
                </Form.Group>
                <div className='d-flex mb-5 justify-content-between' style={{height:"50px"}}>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>صلة القرابة</Form.Label>
                <Form.Control
                onChange={(e)=>setRelation(e.target.value)}
                    required
                    value={relation}
                    type="text"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>رقم الموبايل</Form.Label>
                <Form.Control
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    required
                    value={phoneNumber}
                    type="text"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>الاسم </Form.Label>
                <Form.Control
                    onChange={(e)=>setRelationName(e.target.value)}
                    required
                    value={relationName}
                    type="text"
                />
                </Form.Group>
                </div>
                <Button variant='primary' onClick={AddContact} className='mb-5'>
                أضافة جهة اتصال
                </Button>
            </Form>
            <Table striped bordered hover>
        <thead>
            <tr>
            <th>حذف</th>
            <th>صلة القرابة</th>
            <th>رقم الموبايل</th>
            <th>الإسم</th>
            </tr>
        </thead>
        <tbody>
        {contacts.map(({phoneNumber,relationName,relation})=>{
            return(
                <tr>
                    <td><Button variant='danger'>حذف</Button></td>
                    <td>{relation}</td>
                    <td>{phoneNumber}</td>
                    <td>{relationName}</td>
                </tr>
            )
        })}
        </tbody>
        </Table>
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

export default UpdateStudent