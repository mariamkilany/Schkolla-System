import React, {useEffect, useRef} from 'react';
import { Button } from 'react-bootstrap';
import {SlCloudUpload} from 'react-icons/sl'
const UploadWidget = ()=>{
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        widgetRef.current= cloudinaryRef.current.createUploadWidget({
            cloudName:'djvazpvio',
            uploadPreset:'rkgmm1az'
    },(error,result)=>{
        console.log(result)
    })
    },[])
    return(
        <Button onClick={()=>widgetRef.current.open()}>
            <SlCloudUpload/>
        </Button>
    )
}
export default UploadWidget;