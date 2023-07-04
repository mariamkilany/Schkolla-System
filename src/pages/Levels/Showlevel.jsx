import React, { useEffect, useState,useContext } from 'react'
import {useParams} from 'react-router-dom';
import Satapi from '../../components/Stages/Satapi'
import AddClass from '../../components/popupComponents/AddClass'
import AuthContext from '../../components/shared/AuthContext'

export default function Showlevel() {
  // const stageId=localStorage.getItem('stageId')
  // const {stageId}=useContext(AuthContext);
  const params =useParams();
  return <>
          <div className="row justify-content-end">
            <AddClass  gradeId={params.stageId}/>
        </div>
        <div className="row flex-row-reverse g-5 mt-2">
          <Satapi link={`grade/getGradeClasses/${params.stageId}`} type={'class'}/> 
        </div>
  </>
}
