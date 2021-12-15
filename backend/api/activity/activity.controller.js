/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-25 00:11:40
 * @modify date 2021-10-26 07:31:17
 * @desc [description]
 */
const {
    showActivityTable, showHistoryTable, resetUsedAsset } = require("./activity.service");

module.exports = {

    showActivityTable: (req, res) => {
        const body = req.body;
        showActivityTable(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "not shown",
                    data: []
                })
            }

            let j = 0;

            while (j < results.length) {

                if (results[j].ActivityTime != null) {
                    let string = results[j].ActivityTime.toString();
                    results[j].ActivityTime = string.slice(0, 24);
                }
                j++;
            }
            return res.json({
                success: 1,
                message: "shown",
                data: results
            })
        })
    },
    showHistoryTable: (req, res) => {
        const body = req.body;
        showHistoryTable(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "not shown",
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "shown",
                data: results
            })
        })
    },
    resetUsedAsset: (req, res) => {
        const body = req.body;
        resetUsedAsset(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "not shown",
                    data: { "flag": "0" }
                })
            }
            return res.json({
                success: 1,
                message: "shown",
                data: { "flag": "1" }
            })
        })
    }

}