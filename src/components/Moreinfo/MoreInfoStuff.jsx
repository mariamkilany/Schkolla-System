import React, {useState } from 'react';
import './moreinfo.css'

export default function MoreinfoStuff(props) {
    const stuffData=props.props
return <>
        <div class="nav nav-teacher flex-column nav-pills me-3 w-25 h-100" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">معلومات شخصية</button>
    </div>
<div className='information-container h-100'>
<div class="tab-content" id="v-pills-tabContent">
    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
        <div className="personal-info">
            <h3>تاريخ الميلاد : <span>20-03-1995</span></h3>
            <h3>السن: {stuffData.age}</h3>
            <h3>الجنس : {stuffData.gender}</h3>
            <h3> {stuffData.email} :<span>الإيميل</span></h3>
            <h3>رقم هاتف :{stuffData.phoneNumber}</h3>
            <h3>العنوان :طنطا الغربية</h3>
            <h3>التخصص: {stuffData.job} </h3>
            <h3>المرتب: {stuffData.salary} ج</h3>
        </div>
        </div>
    </div>
    </div>
</>
}
