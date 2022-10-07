import React from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";

export default function UserInfo(props) {

    const userId = props.match.params.id;
    const users = useSelector(state => state.userReducer).user;
    const userSelected = users.find(e => e._id === userId)
    console.log(userSelected, 'estoy en users');


    return (
        <DefaultLayout>
            <div>
            <h3>Personal Information</h3>
            <p><b>First Name: </b>{userSelected.firstname}</p>
            <p><b>Last Name: </b>{userSelected.lastname}</p>
            <p><b>Mobile Number: </b>{userSelected.mobileNumber}</p>
            <p><b>Address: </b>{userSelected.adress}</p>
            <p><b>E-mail: </b>{userSelected.email}</p>
            <div>{userId}</div>
            <hr></hr>
            <h3>Projects</h3>
            {userSelected.projects && userSelected.projects.map(project => 
                <li>{project}</li>
                )}
            <hr></hr>
            <h3>Education</h3>
            {userSelected.education && userSelected.education.map(edu => 
                <li>{edu}</li>
                )}
            <hr></hr>
            <h3>Skills</h3>
            {userSelected.skills && userSelected.skills.map(skill => 
                <li>{skill}</li>
                )}
            <hr></hr>
            <h3>Experience</h3>
            {userSelected.experience && userSelected.experience.map(exp => 
                <li>{exp}</li>
                )}
            <hr></hr>
            </div>

        </DefaultLayout>
    )
}