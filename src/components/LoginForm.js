import { CancelPresentationOutlined } from '@material-ui/icons';
import { Axios } from 'axios';
import React, { useState } from 'react';
import Api from '../API';

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({ email: "", password: "" });

    const submitHandler = e => {

        // Axios.post(
        //     details.email,
        //     details.password,
        // ).then(response => {
        //     console.log(response.data)

        //     e.preventDefault();

        //     Login(details);
        // });
        e.preventDefault();

        console.log("click pressed");
        Api({
            method: 'post',
            url: '/users/login',
            data: {
                EmployeeEmail: details.email,
                EmployeePassword: details.password
            }
        }).then(response => {
            if (response.data.success == 1) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('isAdmin', response.data.EmplyeeIsAdmin);
                localStorage.setItem('userDetails', JSON.stringify(response.data));
                resetUsedAsset();

            } else {
                localStorage.setItem('isLoggedIn', false);
                alert(JSON.stringify(response.data.data));

            }
            Login(details);
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });

        // Delete the following line
        // Login(details);
        // localStorage.setItem('isLoggedIn', true);



    }

    const resetUsedAsset = () => {

        console.log("/activity/resetUsedAsset")
        console.log(JSON.parse(localStorage.getItem('userDetails')).EmployeeId)

        Api({
            method: 'post',
            url: '/activity/resetUsedAsset',
            data: {
                EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId,
            }
        }).then(response => {
            if (response.data.success == 1) {

            } else {

            }
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
        });
    }


    return (
        <>
            <div className="LoginForm">
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <div className="logo-container">
                            <img src="uxbd_logo.png" alt="UX-BD" className="loginlogo"></img>
                        </div>
                        <h2 className="text-center">Login</h2>
                        {(error != "") ? (<div className="error">
                            {error}

                        </div>) : ""}

                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">password: </label>
                            <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        </div>

                        <div className="form-check ml-1">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Remember Me
                            </label>
                        </div>

                        <input className="button mt-5 btn-block" type="submit" value="LOGIN" />

                    </div>


                </form>
            </div>



        </>



    )
}

export default LoginForm;