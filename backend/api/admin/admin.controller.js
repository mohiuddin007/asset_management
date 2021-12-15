/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:10
 * @modify date 2021-10-28 07:49:49
 * @desc [description]
 */
const { addUser,
    showAllUsers,
    showAllAssets,
    addAsset,
    showAllRequests,
    approveAddRequest,
    approveReturnRequest,
    denyAddRequest,
    denyReturnRequest,
    deleteIndividualAsset,
    editIndividualAsset,
    showAllAssetCategory,
    deleteUserInfo,
    editAssetCategory,
    addCategory,
    totalCount

} = require("./admin.service");


module.exports = {
    addUser: (req, res) => {
        const body = req.body;
        addUser(body, (err, results) => {
            if (results == false) {
                return res.status(500).json({
                    success: 0,
                    message: "user already exists"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "user created"
            })
        })
    },

    addAsset: (req, res) => {
        const body = req.body;
        addAsset(body, (err, results) => {
            if (results == false) {
                return res.status(500).json({
                    success: 0,
                    message: "asset already exists"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "asset created"
            })
        })
    },


    showAllUsers: (req, res) => {
        const body = req.body;
        showAllUsers(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No user found",
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "Update successfully",
                data: results
            })
        })
    },

    showAllAssets: (req, res) => {
        const body = req.body;
        showAllAssets(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Assets found",
                    data: []
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
                message: "All assets shown",
                data: results
            })
        })
    },
    showAllRequests: (req, res) => {
        const body = req.body;
        showAllRequests(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Requests found",
                    data: []
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
                message: "All Requests shown",
                data: results
            })
        })
    },

    approveAddRequest: (req, res) => {
        const body = req.body;
        approveAddRequest(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Add Request ERROR",

                })
            }


            return res.json({
                success: 1,
                message: " Add Request Approved ",
            })
        })
    },

    approveReturnRequest: (req, res) => {
        const body = req.body;
        approveReturnRequest(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Return Request ERROR",

                })
            }
            return res.json({
                success: 1,
                message: " Return Request Approved ",
            })
        })
    },
    denyAddRequest: (req, res) => {
        const body = req.body;
        denyAddRequest(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Deny request error",
                    //data:[]
                })
            }
            return res.json({
                success: 1,
                message: "deny request approved",
                //data:results
            })
        })
    },

    denyReturnRequest: (req, res) => {
        const body = req.body;
        denyReturnRequest(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Deny return request error",
                    //data:[]
                })
            }
            return res.json({
                success: 1,
                message: "deny return request approved",
                //data:results
            })
        })
    },

    deleteIndividualAsset: (req, res) => {
        const body = req.body;
        deleteIndividualAsset(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Individual asset delete error",
                })
            }
            return res.json({
                success: 1,
                message: "Individual asset delete successful",
            })
        })
    },

    editIndividualAsset: (req, res) => {
        const body = req.body;
        editIndividualAsset(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "not successful",
                })
            }
            return res.json({
                success: 1,
                message: "Individual asset edit successful",
            })
        })
    },

    showAllAssetCategory: (req, res) => {
        const body = req.body;
        showAllAssetCategory(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "not successful",
                })
            }
            return res.json({
                success: 1,
                message: "asset category shown successful",
                data: results
            })
        })
    },

    deleteUserInfo: (req, res) => {
        const body = req.body;
        deleteUserInfo(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "not successful due user have assigned assets",
                })
            }
            return res.json({
                success: 1,
                message: "user deleletion successful",
            })
        })
    },




    editAssetCategory: (req, res) => {
        const body = req.body;
        editAssetCategory(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Can not edit asset category",
                })
            }
            return res.json({
                success: 1,
                message: "successfully edited asset category",
            })
        })
    },
    addCategory: (req, res) => {
        const body = req.body;
        addCategory(body, (err, results) => {
            if (results == false) {
                return res.status(500).json({
                    success: 0,
                    message: "category already exists"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "category created"
            })
        })
    },

    totalCount: (req, res) => {
        const body = req.body;
        totalCount(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "total count error"
                })
            }
            data =
            {
                "EmployeeCount": results[0].Col,
                "AssetCount": results[1].Col,
                "CategoryCount": results[2].Col
            }



            return res.status(200).json({
                success: 1,
                message: "total count successful",
                data: data
            })
        })
    }




}