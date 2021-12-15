import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from '../API';
import { Modal } from 'react-bootstrap';

function Profile({ show, onHide }) {

    const [showProfile, setShowProfile] = useState(true);

    const [newUserDetails, setNewUserDetails] = useState({
        EmployeeName: "", EmployeeEmail: "", EmployeePassword: "", EmployeeIsAdmin: "",
        EmployeeFullName: "", EmployeeBatchId: "", EmployeeNumber: "", EmployeeAddress: ""
    });
    const [name, setName] = useState("");

    const fetchProfileData = () => {
        // setNewUserDetails(
        //     {...newUserDetails, EmployeeName:"MHS", EmployeeEmail:"MHS", EmployeeNumber:"MHS"},
        // )


        const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;

        console.log("/users/showUserIndividualInformation")
        Api({
            method: 'post',
            url: '/users/showUserIndividualInformation',
            data: {
                EmployeeId: emplyoeeId
            }
        }).then(response => {
            if (response.data.success == 1) {
                // alert("Success")
                console.log("userInfo " + JSON.stringify(response.data));
                console.log("userInfo " + JSON.stringify(response.data.data.EmployeeName));


                console.log("EmployeeIsAdmin: " + response.data.data.EmployeeIsAdmin)

                setNewUserDetails(
                    {
                        ...newUserDetails,
                        EmployeeName: response.data.data.EmployeeName,
                        EmployeeEmail: response.data.data.EmployeeEmail,
                        EmployeePassword: response.data.data.EmployeePassword,
                        EmployeeIsAdmin: response.data.data.EmployeeIsAdmin,
                        EmployeeFullName: response.data.data.EmployeeFullName,
                        EmployeeBatchId: response.data.data.EmployeeBatchId,
                        EmployeeNumber: response.data.data.EmployeeNumber,
                        EmployeeAddress: response.data.data.EmployeeAddress
                    },
                )


            } else {
                alert("Error")

            }
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }

    useEffect(() => {
        fetchProfileData();
    }, [])

    const SubmitHandler = () => {
        //API call here
        if (newUserDetails.EmployeeName !== "" && newUserDetails.EmployeeEmail !== "" && newUserDetails.EmployeePassword !== "" && newUserDetails.EmployeeIsAdmin !== "") {
            console.log("Required Filled")

            console.log(newUserDetails)
            console.log("/users/editUserInformation")
            Api({
                method: 'post',
                url: '/users/editUserInformation',
                data: {
                    EmployeeName: newUserDetails.EmployeeName,
                    EmployeeEmail: newUserDetails.EmployeeEmail,
                    EmployeePassword: newUserDetails.EmployeePassword,
                    EmployeeIsAdmin: newUserDetails.EmployeeIsAdmin,
                    EmployeeFullName: newUserDetails.EmployeeFullName,
                    EmployeeBatchId: newUserDetails.EmployeeBatchId,
                    EmployeeNumber: newUserDetails.EmployeeNumber,
                    EmployeeAddress: newUserDetails.EmployeeAddress
                }
            }).then(response => {
                if (response.data.success == 1) {
                    alert("Success")
                    fetchProfileData()
                } else {
                    alert("Error")

                }
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
                // alert("Something went wrong");
                alert(error);
            });

        } else {
            {
                var error = ""
                if (newUserDetails.EmployeeName == "") error += "Username "
                if (newUserDetails.EmployeeEmail == "") error += "Email "
                if (newUserDetails.EmployeePassword == "") error += "Password "
                if (newUserDetails.EmployeeIsAdmin == "") error += "Admin Level "
                if (newUserDetails.EmployeeIsAdmin < 0 && newUserDetails.EmployeeIsAdmin > 2) error += "Admin Level Issue"
                console.log("Required not Full Filled")
                alert(error)
            }
        }
        console.log(newUserDetails);
    };


    return (
        <>

            <Modal
                show={show}
                size="sg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>

                    <div className="profilePage">

                        <TextField label='Username' placeholder='Enter Username' type='text' fullWidth required focused='true'
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeName: e.target.value })} value={newUserDetails.EmployeeName} />

                        <TextField label='Email' placeholder='Enter Your Email' type='email' fullWidth required disabled
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeEmail: e.target.value })} value={newUserDetails.EmployeeEmail} />

                        <TextField label='Password' placeholder='Enter Password' type='text' value='123456' fullWidth required
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeePassword: e.target.value })} value={newUserDetails.EmployeePassword} />

                        <TextField label='Enter Admin Level' placeholder='Enter Admin Level (0=user, 1=Moderator, 2=Admin)' type='text' fullWidth required disabled
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeIsAdmin: e.target.value })} value={newUserDetails.EmployeeIsAdmin == "2" ? "Admin" : newUserDetails.EmployeeIsAdmin == "1" ? "Moderator" : "User"} />

                        <TextField label='Fullname (optional)' placeholder='Enter Fullname (optional)' type='text' fullWidth
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeFullName: e.target.value })} value={newUserDetails.EmployeeFullName} />

                        <TextField label='BatchId (optional)' placeholder='Enter BatchId (optional)' type='text' fullWidth disabled
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeBatchId: e.target.value })} value={newUserDetails.EmployeeBatchId} />

                        <TextField label='Phone Number (optional)' placeholder='Enter Your Phone Number (optional)' type='text' fullWidth
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeNumber: e.target.value })} value={newUserDetails.EmployeeNumber} />

                        <TextField label='Address (optional)' placeholder='Address (optional)' type='text' fullWidth
                            onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeAddress: e.target.value })} value={newUserDetails.EmployeeAddress} />

                        {/* <button className="adminButton" onClick={SubmitHandler}>Submit</button> */}
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button className="adminButton" onClick={SubmitHandler}>Submit</button>
                    <button className="buttonClose" onClick={onHide}>Close</button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default Profile;