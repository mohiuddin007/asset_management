/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:11:56
 * @modify date 2021-10-26 00:11:56
 * @desc [description]
 */
const pool = require("../../config/database");

module.exports = {

    showActivityTable: (data, callBack) => {
        pool.query(`SELECT * FROM activity;`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            })
    },
    showHistoryTable: (data, callBack) => {
        pool.query(`SELECT count(CategoryId)cid FROM assets;`,
            (error, results, fields) => {
                pool.query(`SELECT * FROM history ORDER BY HistoryId DESC LIMIT ${results[0].cid};`,
                    (error1, results1, fields) => {
                        if (error1) {
                            return callBack(error1);
                        }
                        return callBack(null, results1);
                    })
            })
    },
    resetUsedAsset: (data, callBack) => {
        const d = new Date();
        date = d.getDate();
        const array = [1, 2, 3, 4, 5];
        date = 5;

        const found = array.filter(element => element == date);

        if (found.length > 0) {

            pool.query(`SELECT ResetHistoryFlag FROM users where EmployeeId=?;`, [data.EmployeeId],
                (error, results, fields) => {
                    if (results[0].ResetHistoryFlag == 0) {

                        pool.query(`SELECT  CategoryId,CategoryName,AssetExpired,AssetUsed,AssetQuantity from assets;`,
                            (error1, results1, fields1) => {
                                let len = results1.length;
                                let i = 0;
                                while (i < len) {
                                    pool.query(`INSERT INTO history(HistoryDate,CategoryId,CategoryName,AssetExpired,AssetUsed, AssetQuantity)VALUES (CURRENT_TIMESTAMP,?,?,?,?,?);`,
                                        [results1[i].CategoryId,
                                        results1[i].CategoryName,
                                        results1[i].AssetExpired,
                                        results1[i].AssetUsed,
                                        results1[i].AssetQuantity],
                                        (error2, results2, fields2) => {

                                            pool.query(`Update users SET ResetHistoryFlag= 1 ;`,
                                                (error3, results3, fields) => {

                                                    pool.query(`UPDATE assets SET AssetExpired = 0;`,
                                                        (error4, results4, fields) => {
                                                            // if (error1) {
                                                            //     return callBack(error1);
                                                            // }
                                                            // return callBack(null, results1);
                                                        })


                                                })

                                        })
                                    i++;

                                }
                                if (error1) {
                                    return callBack(error1);
                                }
                                return callBack(null, true);

                            })
                    }

                    else {

                        return callBack(error);

                    }


                })


        }
        else {

            pool.query(`Update users SET ResetHistoryFlag= 0 ;`,
                (error, results, field) => {

                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, error);

                })


        }


    },
}



