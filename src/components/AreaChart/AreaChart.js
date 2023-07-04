import React , {useState , useEffect} from 'react'
import Chart from 'react-apexcharts'
import './area.css'
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
function AreaChart() {
    const {fetchData,data,loading} = useAxios();
    const params =useParams().stuId;
    const [properties,setProp]=useState({
            series: [{
              name: 'معدل الحضور',
              data: []
            }, {
              name: 'معدل الغياب',
              data: []
            }],
            options: {
              chart: {
                height: 350,
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'String',
                categories: ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو" , "اغسطس" , "سبتمبر" , "اكتوبر" , "نوفمبر" , "ديسمبر"]
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm'
                },
              },
            },
          })
          useEffect(()=>{
            fetchData('get',`student/getAttendance/${params}`).then((res)=>{
              setProp({...properties , series:[{name: 'معدل الحضور',data: res.studentAtendance},
            {name: 'معدل الغياب',data: res.studentAbsence}
            ]})
        })
          },[])
  return (
    <div>
      <Chart options={properties.options} series={properties.series} type="area" height={350} />
    </div>
  )
}

export default AreaChart
