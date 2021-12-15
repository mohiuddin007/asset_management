/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:27
 * @modify date 2021-10-26 00:12:27
 * @desc [description]
 */
const {
    userIndividualAssets,
    availableAssets,
    assetsCategoryWise,
    returnUserAsset,
    requestUserAsset,

} = require("./asset.service");




module.exports = {

    userIndividualAssets: (req, res) => {
        const body = req.body;

        userIndividualAssets(body.EmployeeId, (error, results) => {
            console.log(results);

            if (!results) {
                return res.json({
                    success: 0,
                    message: "No user found"
                })
            }
            let i = 0;
            while (i < results.length) {

                if (results[i].UsageStart != null) {
                    let string = results[i].UsageStart.toString();
                    results[i].UsageStart = string.slice(0, 24);
                }
                i++;
            }

            return res.json({
                success: 1,
                message: "Update successfully",
                data: results
            })
        })
    },

    availableAssets: (req, res) => {
        const body = req.body;
        availableAssets(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: " sorry No available asset"
                })
            }
            return res.json({
                success: 1,
                message: "here are all available assets to use ",
                data: results
            })
        })
    },

    assetsCategoryWise: (req, res) => {
        const body = req.body;
        assetsCategoryWise(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: " categorywise not shown"
                })
            }

            let i = 0;
            while (i < results.length) {

                if (results[i].UsageStart != null) {
                    let string = results[i].UsageStart.toString();
                    results[i].UsageStart = string.slice(0, 24);
                }
                i++;
            }
            let j = 0;

            while (j < results.length) {

                if (results[j].UsageEnd != null) {
                    let string = results[j].UsageEnd.toString();
                    results[j].UsageEnd = string.slice(0, 24);
                }
                j++;
            }

            return res.json({
                success: 1,
                message: "category wise shown ",
                data: results
            })
        })
    },

    returnUserAsset: (req, res) => {
        const body = req.body;
        returnUserAsset(body, (error, results) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: "asset not returned"
                })
            }
            return res.json({
                success: 1,
                message: "asset returned ",

            })
        })
    },
    requestUserAsset: (req, res) => {
        const body = req.body;
        requestUserAsset(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "asset not requested"
                })
            }
            return res.json({
                success: 1,
                message: "asset requested/added",
            })
        })
    },

}