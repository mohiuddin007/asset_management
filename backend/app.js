/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:53
 * @modify date 2021-10-28 09:15:33
 * @desc [description]
 */
require("dotenv").config();
const express = require("express");
const morgan = require('morgan');


const app = express();
const userRouter = require("./api/users/user.router");
const assetsRouter = require("./api/assets/asset.router");
const adminRouter = require("./api/admin/admin.router");
const activityRouter = require("./api/activity/activity.router");


const cors = require("cors");
app.use(morgan("combined"));
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
  
app.use(express.json());


app.use("/api/users",userRouter);
app.use("/api/assets",assetsRouter);
app.use("/api/admin",adminRouter);
app.use("/api/activity",activityRouter);



app.listen(process.env.APP_PORT,()=>{
    console.log("Server is UP and running or PORT: ", process.env.APP_PORT);
})
