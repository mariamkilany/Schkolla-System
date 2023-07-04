import AuthContext from "../shared/AuthContext"
import './rgister.css'
import {Button , Form} from 'react-bootstrap';
import React , { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

  export default function Login() {
  const { login } = useContext(AuthContext);
    const formik = useFormik({
      initialValues: {
        email: '',
        password : ''
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('الرجاء ادخال كلمة المرور'),
        email: Yup.string().email('البريد الإلكتروني غير صالح').required('الرجاء ادخال البريد الإلكتروني'),
      }),
      onSubmit: async(values) => {
        await login(values).then((res)=>{
          if (!res?.response && res?.status===400) {
            formik.errors.email = 'السيرفر غير متوفر'
            formik.errors.password = 'السيرفر غير متوفر'
      } else if (res.response?.data.msg.includes(`this email dosen't exist!`)) {
          formik.errors.email = 'البريد الالكتروني غير متوفر'
      } else if (res.response?.data.msg.includes(`this is a wrong password`)) {
          formik.errors.password ='كلمة المرور غير صحيحه'
      } 
        });
      },
    });
    return (
    <Form onSubmit={formik.handleSubmit} className='col-md-6 col-sm-8 w3-center w3-animate-left'>
      <div className="log-container  py-3">
        <h2 className='mb-3 welcome-back'>أهلا بعودتك</h2>
        <div className="input-cont py-4">
          <Form.Group className="mb-5">
          <Form.Control
                    className="loginInpt"
                    type="email"
                    placeholder="البريد الالكترونى"
                    name='email'
                    id='email'
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                    </Form.Control.Feedback>) : null}
          </Form.Group>
          <Form.Group className="mb-5">
          <Form.Control
                    className="loginInpt"
                    type="password"
                    placeholder="كلمة المرور"
                    name='password'
                    id='password'
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                    </Form.Control.Feedback>) : null}
          </Form.Group>
        </div>
          <Button variant="primary" type={'submit'}>تسجيل الدخول </Button>
      </div>
      </Form>
    );
  };