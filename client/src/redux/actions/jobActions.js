import axios from 'axios';
import { message } from 'antd';
import jobReducer from '../reducers/jobReducer';

export async function getAllJobs(dispatch) {

    dispatch({type:"LOADING", payload: true});

    try {
        const response = await axios.get('/api/jobs/getalljobs/'); // no pongo localhost... porque ya lo puse en el package.json como proxy
        console.log(response.data);
        dispatch({type: "GET_ALL_JOBS", payload: response.data})
        dispatch({type:"LOADING", payload: false});
    } catch (error) {
        console.log(error.message);
        dispatch({type:"LOADING", payload: false});
    }
}

export const postJob = (values => async (dispatch) => {

    const userObj = JSON.parse(localStorage.getItem('user'))
    values.postedBy = userObj._id;

    dispatch({type: 'LOADING', payload: true});

    try {
        const res = await axios.post('/api/jobs/postjob', values);
        message.success('Job created');
        console.log(res.data);
        dispatch({type:"LOADING", payload: false});
        setTimeout(() => {
            window.location.href="/"
        }, 1000);
    } catch (error) {
        console.log(error.message);
        dispatch({type:"LOADING", payload: false});
    }

})

export const editJob = (values) => async dispatch => {

    dispatch({type: 'LOADING', payload: true});

    try {
        console.log(values, "in action")
        const res = await axios.put('/api/jobs/editjob', values);
        message.success("Job Updated");
        dispatch({type:"LOADING", payload: false});
        setTimeout(() => {
            window.location.href='/'
        }, 1000);
    } catch (error) {
        console.log(error.message);
        dispatch({type:"LOADING", payload: false});
    }

}

export const applyJob = (job) => async (dispatch) => {

    dispatch({type: 'LOADING', payload: true});

    const user = JSON.parse(localStorage.getItem('user')); 
    console.log(user, "en actions")

    try {
        const res = await axios.post('/api/jobs/applyjob', {job, user});
        message.success("Job Applied, congratulations!");
        dispatch({type:"LOADING", payload: false});
        // setTimeout(() => {
        //     window.location.href='/'
        // }, 1000);
    } catch (error) {
        console.log(error.message);
        dispatch({type:"LOADING", payload: false});
    }

}

export const searchJobs = (value) => async (dispatch) => {
    dispatch({type: 'LOADING', payload: true});
    try {
        const response = await axios.get('api/jobs/getalljobs/');
        const jobs = response.data;
        console.log(jobs);
        const search = jobs && jobs.filter(e => e.title.toLowerCase().includes(value));
        console.log(search);
        dispatch({type: 'LOADING', payload: false});
        dispatch({type: 'GET_ALL_JOBS', payload: search})
    } catch (error) {
        console.log(error.message)
        dispatch({type: 'LOADING', payload: false});
    }

}

export const sortJobs = (value) => async (dispatch) => {
    dispatch({type: 'LOADING', payload: true});
    
    try {
        const response = await axios.get('api/jobs/getalljobs/');
        const jobs = response.data;
        const salary = parseInt(value.salary);
        console.log(typeof salary)

        
        let filterJobs = jobs;

        if (value.experience && !value.salary) {
            filterJobs = jobs.filter(e => e.experience <= parseInt(value.experience) );
        }

        if (value.salary && !value.experience) {
            filterJobs= jobs.filter(e => e.salaryTo >= salary); 
        }
        if (value.salary && value.experience) {
            filterJobs= jobs.filter(e => e.salaryTo >= salary && e.experience <= parseInt(value.experience)); 
        }




        console.log(filterJobs);

        dispatch({type: 'LOADING', payload: false});
        dispatch({type: 'GET_ALL_JOBS', payload: filterJobs})
    } catch (error) {
        console.log(error.message)
        dispatch({type: 'LOADING', payload: false});
    }

}