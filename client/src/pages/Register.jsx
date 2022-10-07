import React from 'react'
import { Col, Row, Form, Input, Button, message } from 'antd';
import { userRegister, registerUser } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function Register() {

const dispatch = useDispatch();

function register(values) {
    if (values.password !== values.confirmpassword) {
        message.error('passwords no coinciden');

    } else {
        console.log('bien')
        dispatch(registerUser(values));
    }
}

  return (
<div className='login'>
            <Row justify='center' className='flex align-items-center'>
                <Col lg={5}><h1 data-aos='slide-left' className='heading1'>Job</h1></Col>
                <Col lg={5} sm={24} className='boxshadow pad loginform'>
                    <h1>Register</h1>
                    <hr></hr>
                    <Form layout='vertical' onFinish={register}>
                        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label='Confirm Password' name='confirmpassword' rules={[{ required: true, message: 'Please confirm your password!' }]}>
                            <Input></Input>
                        </Form.Item>
                        <Button htmlType='submit' >Register</Button>
                        <br></br>
                        <Link to={'/login'} className='linklogin' >Click here to login</Link>
                    </Form>
                </Col>
                <Col lg={5}><h1 data-aos='slide-right' className='heading2'>Fy...</h1></Col>
            </Row>
        </div>
  )
}

export default Register