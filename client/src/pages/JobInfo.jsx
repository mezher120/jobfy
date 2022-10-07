import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout'
import { Button } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { applyJob } from '../redux/actions/jobActions';

function JobInfo(params) {
  const jobId = params.match.params.id;
  console.log(params.match.params.id)
  console.log(jobId)
  const job = useSelector(state => state.jobReducer).jobs
  console.log(job)
  const jobIdFind = job.find(e => e._id === jobId);
  console.log(jobIdFind, "aca estoy")
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const dispatch = useDispatch();

  function applyNow() {
    dispatch(applyJob(jobIdFind));
  }

  return (
    <DefaultLayout>
      <div>
        <h1>Title: {jobIdFind.title} </h1>
        <h4>Company: {jobIdFind.company}</h4>
        <p><b>Description: </b>{jobIdFind.fullDescription}</p>
        <p><b>Skills required: </b> {jobIdFind.skillsRequired}</p>
        <p><b>Minimum Qualification: </b>{jobIdFind.minimumQualification} </p>
        <hr></hr>
        <p><b>Salary Range: </b>{jobIdFind.salaryFrom} - {jobIdFind.salaryTo} </p>
        <p><b>Department: </b>{jobIdFind.department}</p>
        <p><b>Company Profile: </b>{jobIdFind.companyDescription}</p>
        <p><b>Total Candidates Applied: </b>{jobIdFind.appliedCandidates.length}</p>
        <hr></hr>
        <div className='flex justify-content-between'>
          {jobIdFind.postedBy === userId ? <Button><Link to={`/editjob/${jobIdFind._id}`} >Edit Now</Link></Button> : <Button onClick={applyNow}>Apply Now</Button>}
          <p><b>Posted on: </b>{moment(jobIdFind.createdAt).format("MMM Do YY")}</p>
        </div>

      </div>
    </DefaultLayout>
  )
}

export default JobInfo