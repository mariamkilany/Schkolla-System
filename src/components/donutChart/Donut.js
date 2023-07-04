import React,{ useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import useAxios from '../../hooks/useAxios';

import './donut.css'
function Donut() {
        const [series,setSeries]=useState([])
        const {fetchData,data:conf,loading}=useAxios()
        const [chartOptions,setChartOptions]=useState({
            labels: ['طالبات','طلاب'] ,
            fill: {colors: ['#FDBAB1','#63D0B4']},
            legend: {markers: {  fillColors:['#FDBAB1','#63D0B4']}}
        })
        useEffect(()=>{
            fetchData('get','student/getGenderCounts')
        .then((res)=>{
            setSeries([res.femaleCount,res.maleCount])
        })
        },[])
        return (
            <div className="donut">
                <span className='title'>الطلاب</span>
                <Chart options={chartOptions} series={series} type="donut" />
            </div>
        );
    }


export default Donut;