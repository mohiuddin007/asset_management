/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:16
 * @modify date 2021-10-28 07:49:53
 * @desc [description]
 */
const { addUser,
    showAllUsers,
    addAsset,
    showAllAssets,
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

} = require("./admin.controller");
const router = require("express").Router();

router.post("/addUser", addUser);
router.post("/showAllUsers", showAllUsers);
router.post("/addAsset", addAsset);
router.post("/showAllAssets", showAllAssets);
router.post("/showAllRequests", showAllRequests);
router.post("/approveAddRequest", approveAddRequest);
router.post("/approveReturnRequest", approveReturnRequest);
router.post("/denyAddRequest", denyAddRequest);
router.post("/denyReturnRequest", denyReturnRequest);
router.post("/deleteIndividualAsset", deleteIndividualAsset);
router.post("/editIndividualAsset", editIndividualAsset);
router.post("/showAllAssetCategory", showAllAssetCategory);
router.post("/deleteUserInfo", deleteUserInfo);
router.post("/editAssetCategory", editAssetCategory);
router.post("/addCategory", addCategory);
router.post("/totalCount", totalCount);



module.exports = router;