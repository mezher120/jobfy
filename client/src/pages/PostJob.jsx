import React, { Fragment, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Tabs, Form, Input, Button, Select } from 'antd';
import { updateUser } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import FormItem from 'antd/es/form/FormItem';
import { postJob } from '../redux/actions/jobActions';

const { TextArea } = Input;
const { Option } = Select;


function PostJob() {

  const [jobInfo, setJobInfo] = useState();
  const [activeKey, setActiveKey] = useState('1');
  const dispatch = useDispatch();

  function onNext(values) {
    console.log(values)
    const info = {...jobInfo, ...values}
    setJobInfo(info);
    console.log(jobInfo)
    setActiveKey('2');
  }

  function onFinalInfo(props) {
    console.log(props, "final")
    const info = {...jobInfo, ...props}
    setJobInfo(info);
    console.log(info);
    dispatch(postJob(info));
  }


  return (
    <DefaultLayout>
      <Tabs defaultActiveKey="1" activeKey={activeKey}>
        <Tabs.TabPane tab="Job Info" key="1">
          <Form onFinish={onNext}>
            <Row  gutter={16}>   {/* gutter para espacio entre forms */}
              <Col  lg={8} sm={24}>
              <Form.Item name='title' rules={[{required: true}]} label='Title'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col  lg={8} sm={24}>
              <Form.Item name='department' rules={[{required: true}]} label='Department'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col  lg={8} sm={24}>
              <Form.Item name='experience' rules={[{required: true}]} label='experience'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col  lg={8} sm={24}>
              <Form.Item name='salaryFrom' rules={[{required: true}]} label='salaryFrom'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col  lg={8} sm={24}>
              <Form.Item name='salaryTo' rules={[{required: true}]} label='salaryTo'>
                <Input></Input>
              </Form.Item>
              </Col>
            </Row>

            <Row  gutter={16}>
              <Col  lg={8} sm={24}>
              <Form.Item name='skillsRequired' rules={[{required: true}]} label='Skills'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col  lg={8} sm={24}>
              <Form.Item name='minimumQualification' rules={[{required: true}]} label='Minimum Qualification'>
                <Select>
                <Option value="degree" >Degree</Option>
                <Option value="+ 2" >plus 2</Option>
                <Option value="10" >10th</Option>

                </Select>
              </Form.Item>
              </Col>

              <Col  lg={24} sm={24}>
              <Form.Item name='smallDescription' rules={[{required: true}]} label='small Description'>
                <TextArea rows={4}></TextArea>
              </Form.Item>
              </Col>
              <Col  lg={24} sm={24}>
              <Form.Item name='fullDescription' rules={[{required: true}]} label='full Description'>
                <TextArea rows={6}></TextArea>
              </Form.Item>
              </Col>
            </Row>

          <Button htmlType='submit'>Next</Button>

          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Company Info" key="2">
          <Form onFinish={onFinalInfo}>
            <Row>
              <Col lg={8} sm={24}>
              <Form.Item name='email' rules={[{required: true}]} label='email'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
              <Form.Item name='company' rules={[{required: true}]} label='company'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
              <Form.Item name='phoneNumber' rules={[{required: true}]} label='phoneNumber'>
                <Input></Input>
              </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
              <Form.Item name='companyDescription' rules={[{required: true}]} label='companyDescription'>
                <TextArea  rows={4}></TextArea>
              </Form.Item>
              </Col>
            </Row>

            <Button onClick={() => setActiveKey('1')}>Previous</Button>
            <Button htmlType='submit'>Submit Job</Button>
          </Form>
          </Tabs.TabPane>
      </Tabs>

    </DefaultLayout>
  )
}

export default PostJob