/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:45
 * @modify date 2021-10-26 07:53:49
 * @desc [description]
 */
const pool = require("../../config/database");

module.exports = {

    //user login 

    login: (EmployeeEmail, callBack) => {
        //checking email exists in database or not

        pool.query(`select *,count(EmployeeEmail)employee_count from users where EmployeeEmail = ?`, [EmployeeEmail], (error, results, fields) => {
            if (results[0].employee_count == 0) {
                console.log("wrong email");
                return callBack(error);
            }
            return callBack(null, results);
        })
    },

    //Editing user own individual information

    editUserInformation: (data, callBack) => {
        pool.query(`update users set EmployeeName =? ,EmployeePassword=?,EmployeeFullName=? ,EmployeeIsAdmin=?,EmployeeNumber=?,EmployeeAddress=? where EmployeeEmail= ?;`,
            [data.EmployeeName,
            data.EmployeePassword,
            data.EmployeeFullName,
            data.EmployeeIsAdmin,
            data.EmployeeNumber,
            data.EmployeeAddress,
            data.EmployeeEmail],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, true);
            })
    },

    //Showing user own individual information

    showUserIndividualInformation: (data, callBack) => {
        pool.query(`SELECT * ,count(EmployeeId)emp_cnt FROM users WHERE EmployeeID=? ;`, [data.EmployeeId],

            (error, results, fields) => {
                if (results[0].emp_cnt == 0)

                    return callBack(error);

                return callBack(null, results);


            }
        )
    },

    //depending on date is changes CheckInFlag and ConfirmFlag

    notifyMonthlyCheck: (data, callBack) => {

        // var val = 1;
        // let val1 = 2;
        const d = new Date();
        let date = d.getDate();
        //date=2;
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        const found = array.filter(element => element == date);


        if (found.length > 0) {
            pool.query(`SELECT CheckInFlag,ConfirmFlag FROM users WHERE EmployeeId=? ;`, [data.EmployeeId],

                (error, results, fields) => {


                    if ((results[0].CheckInFlag == 0||results[0].CheckInFlag == 1) && results[0].ConfirmFlag == 0) {
                        pool.query(`UPDATE users SET CheckInFlag = 1  WHERE EmployeeId=?;`, [data.EmployeeId],
                            (error1, results1, fields1) => {
                                if (error1) {

                                    return callBack(error1);
                                }
                                else {

                                    return callBack(null, 1);
                                }

                            }
                        )
                    }
                    else {
                        return callBack(null, 0);
                    }


                }
            )
        }
        else if (found.length == 0) {

            pool.query(`SELECT CheckInFlag FROM users WHERE EmployeeId=? ;`, [data.EmployeeId],

                (error, results, fields) => {


                    if (results[0].CheckInFlag == 1 || results[0].CheckInFlag == 0) {
                        pool.query(`UPDATE users SET CheckInFlag = 0 ,ConfirmFlag = 0 WHERE EmployeeId=?;`, [data.EmployeeId],
                            (error1, results1, fields1) => {
                                if (error1) {

                                    return callBack(error1);
                                }
                                else {

                                    return callBack(null, 0);
                                }

                            }
                        )
                    }
                    else {
                        return callBack(error);
                    }


                }
            )

        }
        else {
            return callBack(null, 0);
        }

    },

    //IsIdentifiable assets IsOkay Changing of users individual assets


    assetHealthInfo: (data, callBack) => {

        if (data.IsIdentifiable == 1) {
            pool.query(`UPDATE asset_details SET IsOkay=? where AssetId =?;`, [data.IsOkay, data.AssetId],

                (error, results, fields) => {

                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, true);


                }
            )
        }
        else {
            return callBack("false");
        }
    },

    //If all the individual assets a user is assigned then this api changes ConfirmFlag=1


    userAssetHealthConfirmation: (data, callBack) => {
        pool.query(`UPDATE users SET ConfirmFlag=1 where EmployeeId =?;`, [data.EmployeeId],

            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, true);


            }
        )
    }

}