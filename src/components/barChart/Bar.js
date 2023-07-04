import React,{ useState } from 'react';
import Chart from 'react-apexcharts'
import './bar.css'
// import './donut.css'
function Bar() {

        const [series,setSeries]=useState([{name: "نسبة الغياب %",data: [30, 40, 45]}])
        const [options,setOptions]=useState({
        chart: {id: "Attendance Bar"},
        colors: ['#FDBAB1','#63D0B4','#254C71'],
        xaxis: {
            categories: ['ابتدائي','اعدادي','ثانوي']},
        plotOptions: {bar: {distributed: true}}  
        })
        return (
            <div className="mixed-chart">
                <span className='title'>نسب الغياب</span>
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width="500"
                />
            </div>
        );
    }


export default Bar;