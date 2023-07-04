import React from 'react'
import logo from './images/logo.png'
import kids from './images/kids.png'
import './login.css'
import Login from '../../components/Login/Login'
function LoginPage() {
    return <>
        <header className='row'>
            <h2 className='log-head mb-3'>إدارة مدرسية</h2>
        </header>
        <div className='row'>
            <h1 className='slogn mb-5'>“كن آمنا كن طيباً كن ذكياً”</h1>
        </div>
        <div className='row mt-sm-2'>
            <img src={kids} alt="kids" className='col-sm-6 kids d-none d-sm-block' />
            <div className='col-sm-6 login-con'>
                <Login/>
            </div>
        </div>
        </>
}

export default LoginPage
