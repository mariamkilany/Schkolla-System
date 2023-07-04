import React, {useState ,useEffect} from 'react';
import Select from 'react-select'
import QRCode from 'react-qr-code';
import AreaChart from '../AreaChart/AreaChart'
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from 'html2canvas';
import './moreinfo.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
export default function More({props}) {


    const [datesState, setDatesState] = useState([
  "Thu, May 11, 2023, 12:03:27 PM PDT"
])
 const {fetchData,data,loading}=useAxios();
  const formattedDates = datesState.map(dateString => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  });
    const tileDisabled = ({ activeStartDate, date, view }) => {
    const result = formattedDates.some(d => {
      const currentDate = new Date(d);
      return date.getTime() === currentDate.getTime();
    });
    return result;
 }
 const params = useParams();
    useEffect(()=>{
        fetchData('get',`student/getAttendanceDays/${params.stuId}`).then((res)=>{
            setDatesState(res);
            console.log("respose",res);
        })
    },[])
    const printRef = React.useRef();
      const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
    const options = [
        { value: 'January ', label: 'يناير ' },
        { value: 'February', label: 'فبراير ' },
        { value: 'March ', label: 'مارس' },
        { value: 'April ', label: 'أبريل' },
        { value: 'May', label: 'مايو' },
        { value: 'June ', label: 'يونيو' },
        { value: 'July ', label: 'يوليو' },
        { value: 'August ', label: 'أغسطس' },
        { value: 'September ', label: 'سبتمبر' },
        { value: 'October ', label: 'أكتوبر' },
        { value: 'November', label: 'نوفمبر' },
        { value: 'December', label: 'ديسمبر' }
    ]
        const handleUpload =() => {
    alert("File uploaded")
        };
        const events = [
            {
                title: "الحصه الاولى",
                start: "2023-02-20T08:00:00",
                end: "2023-02-20T09:00:00"
                },
                {
                    title: "الحصه الثانية",
                    start: "2023-02-20T09:00:00",
                    end: "2023-02-20T10:00:00",
                
                },
                {
                    title: "الحثة الثالثه",
                    start: "2023-02-20T10:00:00",
                    end: "2023-02-20T11:00:00",
                
                }]
            
return <>
        <div class="d-flex align-items-start">
        <div class="nav nav-teacher flex-column nav-pills me-3 w-25 h-100" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">معلومات شخصية</button>
    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">الغياب و الحضور</button>
    <button class="nav-link" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false">التقارير المدرسية</button>
    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">عرض و طباعة الكود </button>
    </div>
<div className='information-container h-100'>
<div class="tab-content" id="v-pills-tabContent">
    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
        <div className="personal-info">
            <h3>الجنس : {props.gender}</h3>
            <h3>المرحلة: {props.grade?.name}</h3>
            <h3>الفصل: {props.classId?.name}</h3>
            <h3> {props.email} :<span>الإيميل</span></h3>
            {props.elWasy?.map((contact,index)=>{
                return(
                    <div className='d-flex justify-content-between'>
                    <h3>الاسم:{contact.relationName}</h3>
                    <h3>صلة القرابة:{contact.relation}</h3>
                    <h3> رقم الهاتف:{contact.phoneNumber}</h3>
                    </div>
                    
                    
                )
            }
            )}

            <h3>العنوان : طنطا شارع الفاتح تفرع عمر بن عبد العزيز</h3>
            <h3>وسيلة التنقل : {props.meanOfTransport}</h3>
        </div>
        </div>
    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
    <div>
    <div className="upsent m-3 d-flex  align-items-center justify-content-around">
            <div className="showcalender ">
                <Calendar tileDisabled={tileDisabled}   />
            </div>
            <div className="attnedanceData d-flex  align-items-center justify-content-around">
                <div className="AttColor me-3"></div>
                <span>أيام الحضور</span>
    </div>
    </div>
    <AreaChart/>
        </div>
    </div>
    <div class="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabindex="0">
        <div className="report">
            <h3>اختر الشهر</h3>
                <Select 
                closeMenuOnSelect={false}
                options={options} />
            <div className='uplaod'>
            <div className="App">
                <form onSubmit={handleUpload}>
                    <h1 className='mt-5'>Upload a file</h1>
                    <input type="file" />
                    <button type="submit">Upload</button>
                </form>
            </div>
            </div>
        </div>
    </div>
    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
    <div ref={printRef}>
        <QRCodeCanvas 
    className='my-4'
        id="qrCode"     
        value={props._id}  
        size={300}   
        bgColor={"#ffffff"}  
        level={"H"}  
    />
    </div>
    <div className='my-3'>
        <button onClick={handleDownloadImage} className="btn btn-primary px-5" >تحميل </button>
    </div>
    </div>
    </div>
</div>
</div>
</>
}