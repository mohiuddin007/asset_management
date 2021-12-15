/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:20
 * @modify date 2021-10-28 07:49:56
 * @desc [description]
 */
const pool = require("../../config/database");

module.exports = {

    // creating new user
    addUser: (data, callBack) => {

        pool.query(`select count(EmployeeEmail) email_count from users where EmployeeEmail = ?`, [data.EmployeeEmail],
            (error, results, fields) => {


                if (results[0].email_count == 1) {
                    console.log("if", error);
                    return callBack(null, false);
                }
                else {

                    pool.query(`insert into users(EmployeeName,EmployeePassword, EmployeeEmail, EmployeeFullName,EmployeeBatchId,EmployeeIsAdmin,EmployeeNumber,EmployeeAddress) 
                         VALUES (?,?,?,?,?,?,?,?);`,
                        [data.EmployeeName,
                        data.EmployeePassword,
                        data.EmployeeEmail,
                        data.EmployeeFullName,
                        data.EmployeeBatchId,
                        data.EmployeeIsAdmin,
                        data.EmployeeNumber,
                        data.EmployeeAddress
                        ],

                        (error, results, fields) => {
                            console.log("true");
                            return callBack(null, true);
                        }
                    )
                }
            })
    },

    // show all users 

    showAllUsers: (data, callBack) => {
        pool.query(`select *from users`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);


            }
        )
    },

    //Adding asset to asset_details and asset table

    addAsset: (data, callBack) => {
        if (data.IsIdentifiable == 0) {
            let quantity = data.Quantity;
            pool.query(`UPDATE assets SET AssetQuantity = AssetQuantity + ${quantity}  WHERE assets.CategoryId=?`, [data.CategoryId],
                (error, results, fields) => {

                    pool.query(`select count(CategoryId)count from asset_details WHERE IsAvailable=1 AND asset_details.CategoryId=?;`, [data.CategoryId],
                        (error1, results1, fields) => {
                            if (results1[0].count == 0) {

                                pool.query(`INSERT INTO asset_details(AssetName,CategoryId,Comments)values(?,?,?)`, [data.AssetName, data.CategoryId, data.Comments],
                                    (error2, results2, fields) => {
                                        

                                    }
                                )
                                return callBack(null,true);

                            }
                            return callBack(null, true);


                        }
                    )

                }

            )
        }

        else {

            pool.query(
                "UPDATE assets SET AssetQuantity = AssetQuantity + 1 WHERE assets.CategoryId=?;",
                [data.CategoryId],

                (error, results, fields) => {
                    pool.query(
                        "INSERT INTO asset_details(CategoryId, AssetName, Comments, AssetDetails,Ram,Hdd,Ssd,Cpu,SerialNumber)VALUES (?,?,?,?,?,?,?,?,?);",
                        [data.CategoryId,
                        data.AssetName,
                        data.Comments,
                        data.AssetDetails,
                        data.Ram,
                        data.Hdd,
                        data.Ssd,
                        data.Cpu,
                        data.SerialNumber
                        ],

                        (error2, results2, fields2) => {
                            return callBack(null, true);
                        })

                }

            )

        }

    },

    //show all assets in asset_details table

    showAllAssets: (data, callBack) => {
        pool.query(`select * from asset_details WHERE Request= 1 or Request = 2;`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);


            }
        )
    },

    // approve add request for Isdividual=1 by Admin
    approveAddRequest: (data, callBack) => {

        if (data.Request == 1 && data.ResponseRequest == 1) {
            pool.query(`UPDATE asset_details SET Request = 0,IsAvailable=0 WHERE asset_details.AssetId=?;`, [data.AssetId],
                (error, results, fields) => {

                    pool.query(`UPDATE assets SET AssetUsed=AssetUsed+1 WHERE assets.CategoryId=?;`, [data.CategoryId],
                        (error2, results2, fields) => {


                            pool.query(`INSERT INTO activity (AssetId, EmployeeId, AssetName, EmployeeName, ActivityType, ActivityTime )
                            SELECT t1.AssetId AssetId, t1.EmployeeId EmployeeId, t1.AssetName AssetName, t2.EmployeeName EmployeeName, "1", CURRENT_TIMESTAMP ActivityTime
                            FROM asset_details t1
                            INNER JOIN users t2 ON t1.EmployeeId = t2.EmployeeId where t1.EmployeeId = ?;`, [data.EmployeeId],
                                (error3, results3, fields3) => {

                                    //Warning quantity checking

                                    pool.query(`UPDATE assets SET WarningFlag= (CASE WHEN (AssetQuantity-AssetUsed)<=WarningQuantity THEN 1 ELSE 0 END) WHERE 
                                    assets.CategoryId=?;`, [data.CategoryId],
                                        (error4, results4, fields) => {


                                            if (error4) {
                                                return callBack(error4);
                                            }
                                            else {
                                                return callBack(null, results4);
                                            }

                                        }
                                    )



                                }
                            )


                        }
                    )


                }
            )
        }

    },

    // approve return request for Isdividual=1 by Admin

    approveReturnRequest: (data, callBack) => {

        if (data.Request == 2 && data.ResponseRequest == 1) {


            pool.query(`INSERT INTO activity (AssetId, EmployeeId, AssetName, EmployeeName, ActivityType, ActivityTime )
                            SELECT t1.AssetId AssetId, t1.EmployeeId EmployeeId, t1.AssetName AssetName, t2.EmployeeName EmployeeName, "2", CURRENT_TIMESTAMP ActivityTime
                            FROM asset_details t1
                            INNER JOIN users t2 ON t1.EmployeeId = t2.EmployeeId where t1.EmployeeId = ?;`, [data.EmployeeId],
                (error, results, fields) => {

                    pool.query(`UPDATE asset_details SET Request = 0,UsageEnd=CURRENT_TIMESTAMP,EmployeeId=NULL,IsAvailable=1 WHERE asset_details.AssetId=?;`, [data.AssetId],
                        (error1, results1, fields1) => {

                            pool.query(`UPDATE assets SET AssetUsed=AssetUsed-1 WHERE assets.CategoryId=?;`, [data.CategoryId],
                                (error2, results2, fields) => {


                                    pool.query(`UPDATE assets SET WarningFlag= (CASE WHEN (AssetQuantity-AssetUsed)>WarningQuantity THEN 0 ELSE 1 END) WHERE 
                                    assets.CategoryId=?;`, [data.CategoryId],
                                        (error3, results3, fields) => {


                                            if (error3) {
                                                return callBack(error3);
                                            }
                                            else {
                                                return callBack(null, results3);
                                            }

                                        }
                                    )

                                }
                            )


                        }
                    )



                }
            )

        }
    },

    // deny add request for Isdividual=1 by Admin

    denyAddRequest: (data, callBack) => {
        if (data.Request == 1 && data.ResponseRequest == 0) {
            pool.query("UPDATE asset_details SET EmployeeId=NULL, Request = 0,IsAvailable=1 WHERE AssetId=?;", [data.AssetId],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    else {
                        return callBack(null, results);
                    }
                }
            )
        }
    },

    // deny return request for Isdividual=1 by Admin

    denyReturnRequest: (data, callBack) => {
        if (data.Request == 2 && data.ResponseRequest == 0) {
            pool.query("UPDATE asset_details SET Request = 0 WHERE AssetId=?;", [data.AssetId],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    else {
                        return callBack(null, results);
                    }
                }
            )
        }
    },

    //deleting individual asset

    deleteIndividualAsset: (data, callBack) => {
        pool.query(`Update assets SET AssetQuantity = AssetQuantity - 1,AssetExpired = AssetExpired + 1 where CategoryId IN (SELECT CategoryId from asset_details where AssetId = ?);
        `, [data.AssetId],
            (error, results, fields) => {


                pool.query(`Delete FROM asset_details where AssetId = ? `, [data.AssetId],
                    (error2, results2, fields2) => {
                        if (error2) {
                            return callBack(error2);
                        }

                        else {
                            return callBack(null, results2);
                        }


                    }
                )



            }
        )
    },

    //Editing asset information

    editIndividualAsset: (data, callBack) => {
        pool.query(`Update asset_details SET AssetName = ? , IsOkay = ?, Comments = ?,AssetDetails = ?,Ram=?,Hdd=?,Ssd=?,Cpu=?,SerialNumber=? where AssetId = ?`,
            [data.AssetName, data.IsOkay, data.Comments, data.AssetDetails, data.Ram, data.Hdd, data.Ssd, data.Cpu, data.SerialNumber, data.AssetId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                else {
                    return callBack(null, true);
                }

            }
        )
    },

    //show all asset Category from assets table

    showAllAssetCategory: (data, callBack) => {
        pool.query(`select * from assets order by IsIdentifiable desc`,
            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                else {
                    return callBack(null, results);
                }

            }
        )
    },

    //deleting a particular user data by admin

    deleteUserInfo: (data, callBack) => {

        pool.query("Select count(EmployeeId)countId from asset_details WHERE EmployeeId=?;", [data.EmployeeId],
            (error, results, fields) => {
                console.log(results[0].countId)
                if (results[0].countId == 0) {
                    pool.query(`Delete FROM users where EmployeeId = ? `, [data.EmployeeId],
                        (error2, results2, fields2) => {
                            if (error2) {
                                return callBack(error2);
                            }

                            else {
                                return callBack(null, results2);
                            }


                        }
                    )

                }

                else {
                    return callBack(error);
                }
            }
        )




    },

    //changing Warning Quantity 

    editAssetCategory: (data, callBack) => {


        pool.query(`Update assets SET  WarningQuantity=? where CategoryId=
                ?`, [data.WarningQuantity, data.CategoryId],
            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                else {
                    return callBack(null, true);
                }

            }
        )

    },

    addCategory: (data, callBack) => {
        pool.query(`INSERT INTO assets (CategoryName,WarningQuantity,IsIdentifiable) VALUES (?,?,?)`, [data.CategoryName, data.WarningQuantity, data.IsIdentifiable],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);


            }
        )
    },

    totalCount: (data, callBack) => {
        pool.query(`SELECT count(EmployeeId) AS Col FROM users UNION SELECT count(AssetId) FROM asset_details UNION SELECT count(CategoryId) FROM assets;`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);


            }
        )
    }
}