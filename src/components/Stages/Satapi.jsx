import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Stages from './Stages'
import Class from './Class'
import Loading from '../../pages/Loading/Loading';
import useAxios from '../../hooks/useAxios';
import AuthContext from '../shared/AuthContext';
export default function Satapi(props) {
  const link=props.link;
  const type =props.type;
  const {refresh}=useContext(AuthContext)
  const { fetchData,data, loading} = useAxios()
    useEffect(()=>{
      fetchData('get',link)
    },[refresh])
    if(loading) 
    return <Loading/>

  return <>
        {
        type==='grade'?
        data?.map((item,index)=>
        <Stages level={item} index={index} key={index}/>)
        :
        data?.classes?.map((item,index)=>
        <Class classes={item} index={index} key={index}/>)
      }
  </>
    
  
}
