import React, { useState } from 'react'
import { Input, Button, Modal, Form, Select } from 'antd';
import {
    FilterOutlined,
  } from '@ant-design/icons';
  import { searchJobs, sortJobs } from '../redux/actions/jobActions';
  import { useDispatch } from 'react-redux';

const { Search } = Input;

function Filter(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataFilter, setDataFilter] = useState();
    const [search, setSearch] = useState();
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

function onFilter(params) {
    dispatch(sortJobs(params));
    handleCancel();
    // setDataFilter(params);
}

function onSearch(params) {
    // setSearch(params);
    dispatch(searchJobs(params));
}
console.log(dataFilter)
// console.log(search)

  return (
    <div className='flex justify-content-between'>
        <Search placeholder="input search text" enterButton onSearch={onSearch} className='search'/>
        <FilterOutlined onClick={showModal} />
        <Modal footer={false} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form onFinish={onFilter}>
                <Form.Item name='experience' label='Experience'>
                <Select>
                    <Select.Option></Select.Option>
                    <Select.Option value={0}>Without</Select.Option>
                    <Select.Option value={1}>1 year</Select.Option>
                    <Select.Option value={2}>2 years</Select.Option>
                    <Select.Option value={3}>3 years</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item name='salary' label='Salary'>
                <Select>
                    <Select.Option></Select.Option>
                    <Select.Option value={10000}>10.000</Select.Option>
                    <Select.Option value={50000}>50.000</Select.Option>
                    <Select.Option value={70000}>+ 70.000</Select.Option>
                </Select>
                </Form.Item>

            <Button htmlType="submit" >Filter</Button>
            </Form>
      </Modal>
    </div>
  )
}

export default Filter