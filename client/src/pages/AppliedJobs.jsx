import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllJobs } from '../redux/actions/jobActions'
import { getUsers } from '../redux/actions/userActions'

function AppliedJobs() {

//   const allUsers = useSelector(state => state.userReducer);
//   console.log(allUsers, "aca estoy")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs)
  }, []);

  const allJobs = useSelector(state => state.jobReducer).jobs;
//   const dispatch = useDispatch();

// useEffect(() => {
// dispatch(getUsers());
// }, []);
const user = JSON.parse(localStorage.getItem('user'))._id
// const [appliedjobs, setAppliedJobs] = useState();

const dataSource = [];

allJobs && allJobs.forEach(job => {
  const jobApplied = job.appliedCandidates.find(e => e.userId === user );
  if (jobApplied) {
    jobApplied.company = job.company;
    jobApplied.title = job.title;
    dataSource.push(jobApplied)
  }
});
console.log(dataSource);

const columns = [
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Company',
    dataIndex: 'company'
  },
  {
    title: 'Date Applied',
    dataIndex: 'dateApplied'
  }
]
 


  return (
    <DefaultLayout>
        <h1>AppliedJobs</h1>
        <Table columns={columns}  dataSource={dataSource}> </Table>
    </DefaultLayout>
  )
}

export default AppliedJobs