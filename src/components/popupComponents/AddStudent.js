import React, { useState ,useRef ,useEffect ,useContext  } from 'react';
import Button from 'react-bootstrap/Button';
import {SlCloudUpload} from 'react-icons/sl'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './popup.css';
import { Table } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';
import AuthContext from '../shared/AuthContext';

const AddStudent = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const name = useRef(null);
    const password = useRef(null);
    const nationalId = useRef(null);
    const dateOfBirth = useRef(null);
    const age = useRef(null);
    const [gender,setSelected] = useState('ذكر');
    const email = useRef(null);
    const address = useRef(null);
    const [stage,setStage] = useState('');
    const [stages,setStages] = useState([]);
    const [clss,setClss] = useState('');
    const [classes,setClasses] = useState([]);
    const [relation,setRelation]=useState('')
    const [relationName,setRelationName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [contacts,setContacts] = useState([])
    const [imgUrl,setImageUrl] =useState('')
    const {fetchData,data,loading}=useAxios()
    const{refresh,setref}=useContext(AuthContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange=(e)=> {
    setSelected(e.target.value );
}
const handleStageChange=async(e)=>{
    setStage(e.target.value)
    fetchData('get',`grade/getGradeClasses/${e.target.value}`).then((res)=>{
        setClasses(res.classes)
    })
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

    fetchData('get','grade/getAllGrades').then((res)=>{
        setStages(res)
    })
    },[])
    const AddContact = ()=>{
        if(relation!==''&&phoneNumber!==''&&relationName!==''){
            setContacts([...contacts,{relation,phoneNumber,relationName}])
            setRelation('');
            setRelationName('');
            setPhoneNumber('');
        }
    }
    const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
    fetchData('post','student/addStudent',{name:name.current.value,age:age.current.value,nationalId:nationalId.current.value,
        dateOfBirth:dateOfBirth.current.value,gender:gender,email:email.current.value,address:address.current.value,grade:stage,
        classId:clss,imgUrl:imgUrl,password:password.current.value,elWasy:contacts,meanOfTransport:''},handleClose).then(()=>{
        setref(!refresh)
        name.current.value=null;
        email.current.value=null;
        nationalId.current.value=null;
        dateOfBirth.current.value=null;
        age.current.value=null;
        setSelected(null);
        address.current.value=null;
        setStage('')
        setClss('')
        setImageUrl('');
        })
    };
    return (
        <>
        <Button variant="primary" className='levelbtn mt-5' onClick={handleShow}>إضافة طالب جديد</Button>
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
                    ref={name}
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
                    ref={nationalId}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>تاريخ الميلاد</Form.Label>
                <Form.Control
                    required
                    type="date"
                    ref={dateOfBirth}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>السن</Form.Label>
                <Form.Control
                    required
                    type="number"
                    ref={age}
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
                ref={email}
                    required
                    type="email"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>كلمة المرور </Form.Label>
                <Form.Control
                ref={password}
                    required
                    type="password"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>العنوان</Form.Label>
                <Form.Control
                ref={address}
                    required
                    type="text"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01" >
                <Form.Label>المرحلة</Form.Label>
                <Form.Select required  value={stage} onChange={handleStageChange}>
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

export default AddStudent