/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:35
 * @modify date 2021-10-26 07:53:38
 * @desc [description]
 */
const pool = require("../../config/database");

module.exports = {

    //Shows assets assign to an individual user

    userIndividualAssets: (EmployeeId, callBack) => {
        pool.query(`select  assets.IsIdentifiable,asset_details.AssetId,asset_details.AssetName,asset_details.EmployeeId,asset_details.UsageStart,
        asset_details.IsOkay,asset_details.AssetDetails,asset_details.Comments from asset_details INNER JOIN assets on assets.CategoryId=asset_details.CategoryId 
        where EmployeeId = ? and Request=0`, [EmployeeId], (error, results, fields) => {
            if (results.length == 0) {
                return callBack(error);
            }
            return callBack(null, results);
        })
    },


    //Show available assets isAvailable=1 and Request=0


    availableAssets: (data, callBack) => {
        pool.query(`SELECT asset_details.CategoryId,asset_details.AssetId,asset_details.AssetName,asset_details.IsOkay,asset_details.AssetDetails,assets.IsIdentifiable
        FROM asset_details INNER JOIN assets ON asset_details.CategoryId = assets.CategoryId where IsAvailable = 1 AND Request=0 AND IsIdentifiable<2 AND IsOkay=1 AND (assets.AssetQuantity-assets.AssetUsed)>0;`,

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);


            }
        )
    },

    //show available assets isAvailable=1 and Request=0 for particular category

    assetsCategoryWise: (data, callBack) => {

        pool.query(`SELECT * FROM asset_details WHERE  CategoryId IN (SELECT CategoryId FROM assets where CategoryId = ?);
        `, [data.CategoryId],

            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }

                else {
                    return callBack(null, results);

                }




            }
        )
    },


    requestUserAsset: (data, callBack) => {

        //changes request value to 1
        if (data.IsIdentifiable == 1) {
            pool.query(`SELECT IsAvailable,Request FROM asset_details WHERE AssetId=?`,
                [data.AssetId],
                (error, results, fields) => {
                    if (results[0].IsAvailable == 1 && results[0].Request == 0) {


                        pool.query(`UPDATE asset_details SET request=1, EmployeeId = ?,IsAvailable=0 WHERE AssetId=?`,
                            [data.EmployeeId,
                            data.AssetId,
                            ],
                            (error2, results2, fields2) => {
                                if (error2) {
                                    return callBack(error2);
                                }
                                else {

                                    return callBack(null, true);
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

            //check there is a row in asset_details table or not

            pool.query(
                "SELECT COUNT(EmployeeId)count FROM asset_details WHERE EmployeeId=? AND CategoryId=?",
                [data.EmployeeId,
                data.CategoryId],
                (error, results, fields) => {

                    if (results[0].count == 0) {
                        pool.query(
                            "INSERT INTO asset_details(CategoryId, AssetName, EmployeeId, UsageStart, Comments, AssetDetails, IsAvailable, UsedQuantity)VALUES (?,?,?,CURRENT_TIMESTAMP,?,?,0,1);",
                            [data.CategoryId,
                            data.AssetName,
                            data.EmployeeId,
                            data.Comments,
                            data.AssetDetails
                            ],

                            (error2, results2, fields2) => {

                                pool.query(

                                    "UPDATE assets SET AssetUsed=AssetUsed+1 WHERE CategoryId=?;",
                                    [data.CategoryId],

                                    (error3, results3, fields3) => {

                                        if (error3) {
                                            return callBack(error3);

                                        }
                                        else {
                                            return callBack(null, true);

                                        }



                                    })


                            })

                    }

                    else {

                        pool.query("UPDATE asset_details SET UsedQuantity = UsedQuantity + 1,UsageStart=CURRENT_TIMESTAMP,IsAvailable=0 WHERE EmployeeId=? AND CategoryId=?;",
                            [data.EmployeeId,
                            data.CategoryId],
                            (error4, results4, fields4) => {
                                pool.query(
                                    "UPDATE assets SET AssetUsed=AssetUsed+1 WHERE CategoryId=?;",
                                    [data.CategoryId],

                                    (error5, results5, fields5) => {

                                        if (error5) {
                                            return callBack(error5);

                                        }
                                        else {
                                            return callBack(null, true);
                                        }
                                    })
                            }

                        )
                    }

                }
            )
        }
    },




    returnUserAsset: (data, callBack) => {
        if (data.IsIdentifiable == 1) {
            pool.query(`UPDATE asset_details SET Request = 2 WHERE asset_details.AssetId=?`, [data.AssetId],
                (error, results, fields) => {


                    if (error) {
                        return callBack(error)
                    }
                    else {
                        return callBack(null, true);
                    }
                }

            )
        }

        else {
            pool.query(
                "UPDATE assets SET AssetQuantity = AssetQuantity - 1, AssetUsed = AssetUsed-1,AssetExpired=AssetExpired+1 WHERE assets.CategoryId=?;",
                [data.CategoryId],

                (error, results, fields) => {


                    if (error) {
                        return callBack(error);

                    }
                    else {
                        return callBack(null, true);
                    }

                    // pool.query(
                    //     "SELECT asset_details.UsedQuantity from asset_details WHERE AssetId=?;",
                    //     [data.AssetId],

                    //     (error2, results2, fields2) => {

                    //         if (results2[0].UsedQuantity > 1) {

                    //             pool.query("UPDATE asset_details SET UsedQuantity = UsedQuantity - 1,UsageEnd=CURRENT_TIMESTAMP WHERE asset_details.AssetId=?;", [data.AssetId],
                    //                 (error3, results3, fields3) => {
                    //                     console.log(error3);
                    //                     if (error3) {
                    //                         return callBack(error3);

                    //                     }
                    //                     else {
                    //                         return callBack(null, true);
                    //                     }
                    //                 }

                    //             )
                    //         }
                    //         else {
                    //             pool.query(" DELETE FROM asset_details WHERE assets.AssetId=?;", [data.AssetId],
                    //                 (error4, results4, fields4) => {
                    //                     if (error4) {
                    //                         return callBack(error4);

                    //                     }
                    //                     else {
                    //                         return callBack(null, true);
                    //                     }
                    //                 }
                    //             )

                    //         }

                    //     })


                }

            )



        }
    }

}

