import { Col, Row, Form, Input, Button } from 'antd';
import react from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../redux/actions/userActions';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export default function Login(params) {

    const dispatch = useDispatch();

    function login(values) {
        console.log(values)
        dispatch(loginUser(values));
    }
    return (
        <div className='login'>
            <Row justify='center' className='flex align-items-center' >
                <Col lg={5}><h1 data-aos='slide-right' className='heading1'>Job</h1></Col>
                <Col lg={5} sm={24} className='boxshadow pad loginform'>
                    <h1>Login</h1>
                    <hr></hr>
                    <Form layout='vertical' onFinish={login}>
                        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input></Input>
                        </Form.Item>
                        <Button htmlType='submit' >Login</Button>
                        <br></br>
                        <Link to={'/register'}>Not Registered ?, click here to register</Link>
                    </Form>
                </Col>
                <Col lg={5}><h1 data-aos='slide-left' className='heading2'>Fy...</h1></Col>
            </Row>
        </div>
    )
}

