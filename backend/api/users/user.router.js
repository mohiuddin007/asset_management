/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:42
 * @modify date 2021-10-26 00:12:42
 * @desc [description]
 */
const {
    login,
    editUserInformation,
    showUserIndividualInformation,
    notifyMonthlyCheck,
    assetHealthInfo,
    userAssetHealthConfirmation

} = require("./user.controller");
const router = require("express").Router();


router.post("/login", login);
router.post("/editUserInformation", editUserInformation);
router.post("/showUserIndividualInformation", showUserIndividualInformation);
router.post("/notifyMonthlyCheck", notifyMonthlyCheck);
router.post("/assetHealthInfo", assetHealthInfo);
router.post("/userAssetHealthConfirmation", userAssetHealthConfirmation)

module.exports = router;