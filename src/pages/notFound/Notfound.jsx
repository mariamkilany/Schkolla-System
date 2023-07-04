import React from 'react'
import './notfound.css'
import { useNavigate} from 'react-router-dom'

export default function Notfound() {   
  const navigate = useNavigate()
    return<>
        <div className='anm-container'>
        <div className="center">
  <div className="error">
    <div className="number">4</div>
    <div className="illustration">
      <div className="circle"></div>
      <div className="clip">
        <div className="paper">
          <div className="face">
            <div className="eyes">
              <div className="eye eye-left"></div>
              <div className="eye eye-right"></div>
            </div>
            <div className="rosyCheeks rosyCheeks-left"></div>
            <div className="rosyCheeks rosyCheeks-right"></div>
            <div className="mouth"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="number">4</div>
  </div>

  <div className="text">عفوا! هذه الصفحة غير متاحه حاليا</div>
    <a className="button" onClick={()=>navigate('dashboard')}> الصفحة الرئسية</a>
  
</div>
        </div>
    </>
}
