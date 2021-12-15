/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:39
 * @modify date 2021-10-28 07:50:59
 * @desc [description]
 */
const {
    login,
    editUserInformation,
    showUserIndividualInformation,
    notifyMonthlyCheck,
    assetHealthInfo,
    userAssetHealthConfirmation
} = require("./user.service");


module.exports = {


    login: (req, res) => {
        const body = req.body;
        login(body.EmployeeEmail, (error, results) => {
            console.log(results);
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }

            if (body.EmployeePassword == results[0].EmployeePassword) {
                return res.json({
                    success: 1,

                    EmployeeEmail: results[0].EmployeeEmail,
                    EmployeeName: results[0].EmployeeName,
                    EmployeeId: results[0].EmployeeId,
                    EmplyeeIsAdmin: results[0].EmployeeIsAdmin
                })
            }
            else {

                return res.json({
                    success: 0,
                    data: "Invalid  password"
                })
            }
        })
    },

    editUserInformation: (req, res) => {
        const body = req.body;
        editUserInformation(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user."
                })
            }
            return res.json({
                success: 1,
                message: "Update successfully"
            })
        })
    },
    showUserIndividualInformation: (req, res) => {
        const body = req.body;
        showUserIndividualInformation(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No user found",
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "User Information Shown",
                data: results[0]
            })
        })
    },
    notifyMonthlyCheck: (req, res) => {
        const body = req.body;
        notifyMonthlyCheck(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "not successful",
                    data: { "MonthlyCheckFlag": "0" }


                })
            }
            return res.json({
                success: 1,
                message: "successful",
                data: { "MonthlyCheckFlag": "1" }

            })
        })
    },

    assetHealthInfo: (req, res) => {
        const body = req.body;
        assetHealthInfo(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "health info not updated",

                })
            }
            return res.json({
                success: 1,
                message: "health info updated",

            })
        })
    },

    userAssetHealthConfirmation: (req, res) => {
        const body = req.body;
        userAssetHealthConfirmation(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "confirm flag 0",

                })
            }
            return res.json({
                success: 1,
                message: "confirm flag 1 ",

            })
        })
    }



}