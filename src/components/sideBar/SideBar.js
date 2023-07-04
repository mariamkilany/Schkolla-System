import React, { useContext, useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import './sidebar.css'
import {AiOutlineHome} from 'react-icons/ai';
import {GiStairsGoal,GiTeacher} from 'react-icons/gi';
import {MdOutlinePeopleAlt} from 'react-icons/md';
import {SlPeople} from 'react-icons/sl';
import {IoChatbubblesOutline} from 'react-icons/io5';
import {RiLogoutCircleFill} from 'react-icons/ri';
import {TbBooks} from 'react-icons/tb'
import { useNavigate ,useLocation} from 'react-router-dom';
import AuthContext from "../shared/AuthContext";
// import {useMediaQuery , useTheme} from '@mui/material'
    import SideNav, {
    NavItem,
    NavIcon,
    NavText
    } from "@trendmicro/react-sidenav";
import admin from '../../imge/admin.jpg'
function SideBar() {
    // const theme = useTheme();
    // const isSm=useMediaQuery(theme.breakpoints.down("md"));

    // const [isVisible,setIsVisible]=useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {logout,isVisible,setIsVisible} = useContext(AuthContext);
    // if(isSm)
    // setIsVisible(false)
        return (
        <SideNav expanded={isVisible}>
            <SideNav.Toggle
            onClick={() => {
                setIsVisible(!isVisible)
            }}
            />
            <SideNav.Nav >
                <NavItem onClick={
                    ()=>{navigate('')
                    }} className={location.pathname.toLowerCase()==='/dashboard'?'sidenav---selected---1EK3y sidenav---highlighted---oUx9u':''}>
                <NavIcon>
                <AiOutlineHome className="nav-icon"/>
                </NavIcon>
                <NavText>الصفحة الرئيسية</NavText>
            </NavItem>
                <NavItem onClick={()=>{
                    navigate('Levels')
                    }}className={location.pathname.toLowerCase().includes('levels')?'sidenav---selected---1EK3y sidenav---highlighted---oUx9u':''}
                    >
                <NavIcon>
                    <GiStairsGoal className="nav-icon"/>
                </NavIcon>
                <NavText>المراحل الدراسية</NavText>
            </NavItem>
            <NavItem onClick={()=>{
                navigate('Students')
                }}
                className={location.pathname.toLowerCase().includes('students')?'sidenav---selected---1EK3y sidenav---highlighted---oUx9u':''}
                >
                <NavIcon>
                    <MdOutlinePeopleAlt className="nav-icon"/>
                </NavIcon>
                <NavText>الطلاب</NavText>
            </NavItem>
            <NavItem onClick={()=>{
                navigate('Teachers')
                }}
                className={location.pathname.toLowerCase().includes('teachers')?'sidenav---selected---1EK3y sidenav---highlighted---oUx9u':''}
                >
                <NavIcon>
                    <GiTeacher className="nav-icon"/>
                </NavIcon>
                <NavText>المعلمين</NavText>
            </NavItem>
            <NavItem onClick={()=>{
                navigate('Employee')
                }}
                className={location.pathname.toLowerCase().includes('employee')?'sidenav---selected---1EK3y sidenav---highlighted---oUx9u':''}
                >
                <NavIcon>
                    <SlPeople className="nav-icon"/>
                </NavIcon>
                <NavText>الموظفون</NavText>
            </NavItem>
            <NavItem onClick={()=>{
                navigate('Subjects')
                }}
                className={location.pathname.toLowerCase().includes('subjects')?'sidenav---selected---1EK3y sidenav---highlighted---oUx9u':''}
                >
                <NavIcon>
                    <TbBooks className="nav-icon"/>
                </NavIcon>
                <NavText>المواد الدراسية</NavText>
            </NavItem>
            <NavItem onClick={()=>{
                navigate('Massenger')
                }}
                className={location.pathname.toLowerCase().includes('massenger')?'sidenav---selected---1EK3y sidenav---highlighted---oUx9u':''}
                >
                <NavIcon>
                    <IoChatbubblesOutline className="nav-icon"/>
                </NavIcon>
                <NavText>الأسئلة و الشكاوي</NavText>
            </NavItem>
            <NavItem eventKey="admin" className='admin'>
                <NavIcon>
                    <img src={admin} alt="admin" className="admin-pic shadow-lg rounded-circle"  />
                </NavIcon>
                {/* <NavText>{user.email}</NavText> */}
            </NavItem>
            <NavItem eventKey="logout" onClick={()=>logout()}>
                <NavIcon>
                    <RiLogoutCircleFill className="nav-icon"/>
                </NavIcon>
                <NavText>تسجيل الخروج</NavText>
            </NavItem>
            </SideNav.Nav>
        </SideNav>
        );
}

export default SideBar;
