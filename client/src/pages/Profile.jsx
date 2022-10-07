import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Tabs, Form, Input, Button } from 'antd';
import { updateUser } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const { TextArea } = Input;

function Profile() {

  const [profile, setProfile] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const dispatch = useDispatch();


  function onClickProfile(values) {
    console.log(values);
    setProfile(values);
    setActiveTab('2')
  }

  function onClickProfileTab2(values) {   
    console.log(values)
    const finalObj = {...profile, ...values}   // para copiar 2 objetos en uno
    const userID = JSON.parse(localStorage.getItem('user'))._id
    finalObj._id = userID; 
    setProfile(finalObj);                     // para verlo en tiempo y forma conviene guardarlo en una variable antes que estado
    console.log(finalObj)
    dispatch(updateUser(finalObj));
  }

  const user = JSON.parse(localStorage.getItem('user')); // para agarrar el valor que se seteo en el localstorage como user

  return (
    <DefaultLayout>

      <Tabs defaultActiveKey="1" activeKey={activeTab}>
        <Tabs.TabPane tab="Personal Information" key="1">
          <Form initialValues={user}  layout='vertical' onFinish={onClickProfile}>
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item label="firstname"
                  name="firstname"
                  rules={[{ required: true, message: 'Please input your firstname!' }]}  >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="lastname"
                  name="lastname"
                  rules={[{ required: true, message: 'Please input your lastname!' }]}  >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}  >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="mobileNumber"
                  name="mobileNumber"
                  rules={[{ required: true, message: 'Please input your mobileNumber!' }]}  >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="porfolio"
                  name="porfolio"
                  rules={[{ required: true, message: 'Please input your porfolio!' }]}  >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item label="about"
                  name="about"
                  rules={[{ required: true, message: 'Please input your about!' }]}  >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item label="adress"
                  name="adress"
                  rules={[{ required: true, message: 'Please input your adress!' }]}  >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
            <Button htmlType='submit'>Next</Button>
          </Form>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Skills and Experience" key="2">
          <Form initialValues={user} layout='vertical' onFinish={onClickProfileTab2}>
            <Row>
              <Col lg={24} sm={24}>
                <Form.List name='education'>
                  {(fieldseducation, { add, remove }) => (
                    <div>
                      {fieldseducation.map((field, index) => (
                        <div className='flex'>
                          <Form.Item required {...field} label='Education' style={{ width: '80%' }} >
                            <TextArea rows={4}></TextArea>
                          </Form.Item>
                          <Button onClick={() => add()}>Add</Button>
                          {(index !== 0 ? <Button onClick={() => remove(index)}>Remove</Button> : null)}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.List>
              </Col>
              <Col lg={24} sm={24}>
                <Form.List name='skills'>
                  {(skills, { add, remove }) => (
                    <div>
                      {skills.map((field, index) => (
                        <div className='flex'>
                          <Form.Item required {...field} label='Skills' style={{ width: '80%' }} >
                            <TextArea rows={4}></TextArea>
                          </Form.Item>
                          <Button onClick={() => add()}>Add</Button>
                          {(index !== 0 ? <Button onClick={() => remove(index)}>Remove</Button> : null)}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.List>
              </Col>
              <Col lg={24} sm={24}>
                <Form.List name='projects'>
                  {(projects, { add, remove }) => (
                    <div>
                      {projects.map((field, index) => (
                        <div className='flex'>
                          <Form.Item required {...field} label='Projects' style={{ width: '80%' }} >
                            <TextArea rows={4}></TextArea>
                          </Form.Item>
                          <Button onClick={() => add()}>Add</Button>
                          {(index !== 0 ? <Button onClick={() => remove(index)}>Remove</Button> : null)}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.List>
              </Col>
              <Col lg={24} sm={24}>
                <Form.List name='experience'>
                  {(experience, { add, remove }) => (
                    <div>
                      {experience.map((field, index) => (
                        <div className='flex'>
                          <Form.Item required {...field} label='Experience' style={{ width: '80%' }} >
                            <TextArea rows={4}></TextArea>
                          </Form.Item>
                          <Button onClick={() => add()}>Add</Button>
                          {(index !== 0 ? <Button onClick={() => remove(index)}>Remove</Button> : null)}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Button onClick={()=>setActiveTab('1')}>Previuos</Button>
            <Button htmlType='submit'>Update</Button>
          </Form>
        </Tabs.TabPane>
      </Tabs>


    </DefaultLayout >
  )
}

export default Profile