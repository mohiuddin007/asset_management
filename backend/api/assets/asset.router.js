/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:31
 * @modify date 2021-10-26 00:12:31
 * @desc [description]
 */
const {
     userIndividualAssets,
     availableAssets,
     requestUserAsset,
     returnUserAsset,
     assetsCategoryWise
} = require("./asset.controller");
const router = require("express").Router();

router.post("/userIndividualAssets", userIndividualAssets);
router.post("/availableAssets", availableAssets);
router.post("/assetsCategoryWise", assetsCategoryWise);
router.post("/requestUserAsset", requestUserAsset);
router.post("/returnUserAsset", returnUserAsset);

module.exports = router;