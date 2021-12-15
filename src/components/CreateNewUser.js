import { TextField } from "@material-ui/core";
import { AddToQueueSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import Api from '../API';
import Multiselect from 'multiselect-react-dropdown';

function CreateNewUser({ show, onHide }) {

    const [dropdownSelected, setDropdownSelected] = useState(0);

    const [adminList, setAdminList] = useState(['user', 'moderator', 'admin'])
    const [adminLevel, setAdminLevel] = useState(0)

    const [newUserDetails, setNewUserDetails] = useState({
        EmployeeName: "", EmployeeEmail: "", EmployeePassword: "123456", EmployeeIsAdmin: "0",
        EmployeeFullName: "", EmployeeBatchId: "", EmployeeNumber: "", EmployeeAddress: ""
    });
    

    useEffect(() => {

        setNewUserDetails({
            EmployeeName: "", EmployeeEmail: "", EmployeePassword: "123456", EmployeeIsAdmin: "0",
            EmployeeFullName: "", EmployeeBatchId: "", EmployeeNumber: "", EmployeeAddress: ""
        });
        // setAdminList({id:0, value:"user"}, {id:1, value:"moderator"}, {id:2, value:"admin"})

    },[onHide]);

    const [id, setId] = useState("");
    // useEffect(() => {
    //   //setId(APIIDData());
    // }, []);

   

    const SubmitHandler = () => {
        setNewUserDetails({...newUserDetails, EmployeeIsAdmin: adminLevel})
        console.log(newUserDetails)
        //API call here
        if (newUserDetails.EmployeeName !== "" && newUserDetails.EmployeeEmail !== "" && newUserDetails.EmployeePassword !== "" && newUserDetails.EmployeeIsAdmin !== ""
            && (newUserDetails.EmployeeIsAdmin >= 0 && newUserDetails.EmployeeIsAdmin < 3)) {
            console.log("Required Filled")

            console.log(newUserDetails)
            // Api({
            //     method: 'post',
            //     url: '/admin/addUser',
            //     data: {
            //         EmployeeName: newUserDetails.EmployeeName,
            //         EmployeeEmail: newUserDetails.EmployeeEmail,
            //         EmployeePassword: newUserDetails.EmployeePassword,
            //         EmployeeIsAdmin: newUserDetails.EmployeeIsAdmin,
            //         EmployeeFullName: newUserDetails.EmployeeFullName,
            //         EmployeeBatchId: newUserDetails.EmployeeBatchId,
            //         EmployeeNumber: newUserDetails.EmployeeNumber,
            //         EmployeeAddress: newUserDetails.EmployeeAddress
            //     }
            // }).then(response => {
            //     if (response.data.success == 1) {
            //         alert("Success")
            //         onHide();

            //     } else {
            //         alert("Error")

            //     }
            //     console.log(response.data);
            // }).catch(function (error) {
            //     console.log(error);
            //     // alert("Something went wrong");
            //     alert(error);
            // });

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

    const closeNewUserModal = () => {

    }
    const selectedAdminLevel = (selectedList, RemovedList) => {
        {
            selectedList.toString() == "user" ? setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 0}) : selectedList.toString() == "admin" ? setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 2}) : setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 1})
        }
        console.log(newUserDetails)
        
    }
    
    return (
        <>
            <Modal
                show={show}
                size="sg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New User Create
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <TextField label='Username' placeholder='Enter Username' type='text' fullWidth required focused='true'
                        onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeName: e.target.value })} value={newUserDetails.EmployeeName} />

                    <TextField label='Email' placeholder='Enter Your Email' type='email' fullWidth required
                        onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeEmail: e.target.value })} value={newUserDetails.EmployeeEmail} />

                    <TextField label='Password' placeholder='Enter Password' type='text' value='123456' fullWidth required
                        onChange={e => setNewUserDetails({ ...newUserDetails, EmployeePassword: e.target.value })} value={newUserDetails.EmployeePassword} />

                    <Multiselect 
                        isObject={false}
                        singleSelect={true}
                        selectedValues={[`${adminList[0].toString()}`]}
                        onRemove={function noRefCheck() { }}
                        onSearch={function noRefCheck() { }}
                        onSelect={selectedAdminLevel}
                        options={adminList}
                    />

                    <TextField label='Fullname (optional)' placeholder='Enter Fullname (optional)' type='text' fullWidth
                        onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeFullName: e.target.value })} value={newUserDetails.EmployeeFullName} />

                    <TextField label='BatchId (optional)' placeholder='Enter BatchId (optional)' type='text' fullWidth
                        onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeBatchId: e.target.value })} value={newUserDetails.EmployeeBatchId} />

                    <TextField label='Phone Number (optional)' placeholder='Enter Your Phone Number (optional)' type='text' fullWidth
                        onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeNumber: e.target.value })} value={newUserDetails.EmployeeNumber} />

                    <TextField label='Address (optional)' placeholder='Address (optional)' type='text' fullWidth
                        onChange={e => setNewUserDetails({ ...newUserDetails, EmployeeAddress: e.target.value })} value={newUserDetails.EmployeeAddress} />


                </Modal.Body>


                <Modal.Footer>
                    <button className="button" onClick={SubmitHandler}>Submit</button>
                    <button className="buttonClose" onClick={onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateNewUser;
