import { useState } from "react";
import "./tabs.css"
import StudentShow from"../ShowData/Student";
import { useEffect } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {useParams} from 'react-router-dom';
import Loading from "../../pages/Loading/Loading";
import useAxios from '../../hooks/useAxios';
import AuthContext from '../../components/shared/AuthContext';
import TimeTable from "../TimeTable/TimeTable";
function Tabs() {
  const [toggleState, setToggleState] = useState(1);
  const { fetchData,data, loading} = useAxios()
  const params =useParams();
  const toggleTab = (index) => {
    setToggleState(index);
  };
  let color =localStorage.getItem('stagecolor');

useEffect(()=>{
  fetchData('get',`class/getClassById/${params.classId}`)
  color =localStorage.getItem('stagecolor');
}
,[])
if(color==='green'){
  color='#63D0B4';
}else if(color==='pink'){
  color='#FDBAB1';
}else if(color==='blue'){
  color='#254C71';
}
if(loading)
return <Loading/>
  return (
    <div className="container">
      <div className="bloc-tabs">
        <button style={{backgroundColor:toggleState===1? color:''}}
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          المواد الدراسية
        </button>
        <button style={{backgroundColor:toggleState===2? color:''}}
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          الجداول الدراسية
        </button>
        <button style={{backgroundColor:toggleState===3? color:''}}
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          عرض التلاميذ
        </button>
      
        </div>
      <div className="content-tabs">
        <div
          style={{margin:'20px auto',width:'70%'}}
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
        <Table striped  hover>
          <thead style={{borderBottom:`${color} solid`}}>
          <th>اسم المعلم </th>
          <th> المادة </th>
          </thead>
          <tbody>
          {
            data?.subjectToTeacher.map(({subject,teacher},index)=>{
            return(
            subject&&teacher?
            <tr key={index}>
              <td>{teacher.name}</td>
              <td>{subject.name}</td>
            </tr>:''
            )
            })
          }
          </tbody>
    </Table>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <TimeTable subjectToTeacher={data?.subjectToTeacher} />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <StudentShow link={`student/getClassStudents/${params.classId}`}/>
          
        </div>
      </div>
    </div>
  );
}

export default Tabs;