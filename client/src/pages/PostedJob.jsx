import React, { useState } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Modal, Table } from "antd";
import moment from "moment";
import {EditOutlined, OrderedListOutlined} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';


export default function PostedJob(params) {

    const allJobs = useSelector((state) => state.jobReducer).jobs;
    console.log(allJobs)
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId)
    const jobsFiltered = allJobs.filter(e => e.postedBy === userId);
    console.log(jobsFiltered);
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState();

    const columns = [
    {
        title: "Title",
        dataIndex: "title"
    },
    {
        title: "Company",
        dataIndex: "company"
    },
    {
        title: "Posted On",
        dataIndex: "postedon"
    },
    {
        title: "Total applicants",
        dataIndex: "totalapplicants"
    },  
    {
        title: "Actions",
        render: (text, data)=>{
            return (<div className="flex">
                <EditOutlined onClick={() => {history.push(`/editjob/${data.completeJobData._id}`)}}/>
                <OrderedListOutlined onClick={() => showModal(data.completeJobData)} />
            </div>)
        }
    }, 
    ]
    const dataSource = [];

    jobsFiltered.forEach(element => {
        
        let obj = {
            title: element.title,
            company: element.company,
            postedon: moment(element.updatedAt).format('MMM DD yyyy'),
            totalapplicants: element.appliedCandidates.length,
            completeJobData: element
        }

        dataSource.push(obj);

    });

    const showModal = (data) => {
        setIsModalOpen(true);
        setSelectedJob(data);
      };

    console.log(selectedJob);
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const candidatesColumns = [
        {
            title: 'Candidate ID',
            dataIndex: 'candidateId',
            render: (text, data) => {
                return <Link to={`/userinfo/${data.candidateId}`} >{data.candidateId}</Link>
            }
        },
        {
            title: 'Company',
            dataIndex: 'company'
        },
        {
            title: 'Applied Date',
            dataIndex: 'applieddate'
        },
    ]

    const dataCandidates = [];

    selectedJob && selectedJob.appliedCandidates.forEach(e => {
        console.log(e)
        const obj = {
            candidateId: e.userId,
            company: selectedJob.company,
            applieddate: e.dateApplied
        }

        dataCandidates.push(obj);

    })

    console.log(dataCandidates);

    

    return (
        <DefaultLayout>
            <div>PostedJob</div>
            <Table columns={columns}  dataSource={dataSource}> </Table>
            <Modal title="Applied Candiates List" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Table columns={candidatesColumns} dataSource={dataCandidates}></Table>
            </Modal>
        </DefaultLayout>
    )
}
