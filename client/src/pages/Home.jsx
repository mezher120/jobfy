import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllJobs } from '../redux/actions/jobActions'
import { Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';

function Home() {
  const { jobs } = useSelector(state => state.jobReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs);
  }, []);

  return (
    <DefaultLayout>
      <Row gutter={[16,16]}>
        {jobs && jobs.map(e => {
          return (<Col lg={12} sm={24}>
            <div className='box boxshadow'>
              <h4>{e.title}</h4>
              <p>{e.company}</p>
              <hr></hr>
              <p>{e.smallDescription}</p>
              <div className='horizontal'>
              <p>Salary: <b>{e.salaryFrom} to {e.salaryTo}</b></p>
              <p>Experience: {e.experience} Years</p>
              </div>
              <hr></hr>
              <div className='horizontal'>
                {e.id}
                <Link to={`/jobs/${e._id}`}><Button>View</Button></Link>
                <p>Posted: {e.createdAt}</p>
              </div>
            </div>
          </Col>)
        })}
      </Row>

    </DefaultLayout>
  )
}

export default Home