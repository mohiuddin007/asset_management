/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:11:53
 * @modify date 2021-10-26 00:14:36
 * @desc [description]
 */
const { 
    showActivityTable,
    showHistoryTable,
    resetUsedAsset
}= require("./activity.controller");
const router = require("express").Router();


router.post("/showActivityTable",showActivityTable);
router.post("/showHistoryTable",showHistoryTable);
router.post("/resetUsedAsset",resetUsedAsset);



module.exports = router;