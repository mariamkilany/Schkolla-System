import './slider.css';

import {Button,Card} from 'react-bootstrap';

import React, { useEffect , useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
// import students from './data';


function Slider() {
    const {fetchData} =useAxios();
    const [students , setStudents] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        fetchData('get','student/getTopTen').then(res=>setStudents(res))
    },[])

    const handleClick=(id)=>{
        navigate(`Students/${id}`)
    }

    return (
    <>
        <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        >
        {
            students?.map((student,index)=>{
                return <SwiperSlide >
                        <Card className={`${index%3===0?'green-card':index%3===1?'blue-card':'pink-card'}`}>
                    <Card.Img variant="top" src={student?.image} />
                    <Card.Body>
                    <Card.Text>
                        <span>الإسم: {student?.studentName}</span>
                        <span>المرحلة: {student?.gradeName}</span>
                        <span> الفصل: {student?.className}</span>
                    </Card.Text>
                    <Button className='btn btn-secondary' onClick={()=>handleClick(student?.studentId)}>عرض الطالب</Button>
                    </Card.Body>
                </Card>
                </SwiperSlide>
            })
        }
        
        </Swiper>
    </>
  );


}

export default Slider
