const express = require("express");
const { isAuthenticate } = require("../middlewares/isAuthenticate");
const GatePasses = require("../schemas/gatePass");
const Users = require("../schemas/userSchema");
const { sendPushNotification } = require("../utils");
const router = express.Router();

router.post("/create-pass", isAuthenticate, async (req, res) => {
  try {
    const { date, time, endtime, reason } = req.body;
    //cheking all field are has
    if (!date || !time || !endtime || !reason)
      return res.send({ success: false, message: "all fields are required" });

    if (!req.user?.isVarified && !req.user?.role == "teacher")
      return res.send({
        success: false,
        message: "you are not varified or you are not a teacher",
      });

    const newGatePass = new GatePasses({
      userName: req?.user?.name,
      date,
      exitTime: time,
      returnTime: endtime,
      department: req?.user?.department,
      message: reason,
      email: req?.user?.email,
    });

    await newGatePass.save();

    // finding hod data and send push notification
    const hod = await Users.findOne({
      department: req?.user?.department,
      role: "hod",
    });

    if (
      hod &&
      hod?.department == req?.user?.department &&
      hod?.notificationToken
    ) {
      console.log("notification send");
      sendPushNotification(
        hod?.notificationToken,
        "GATE PASS REQUEST!",
        `Respected HOD you have new gate pass request from ${req?.user?.name}`,
        { key: "value" }
      );
    }

    return res.send({
      success: true,
      message: "Request Send Successfully",
      gatePass: newGatePass,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.get("/getall-request-of-teacher", isAuthenticate, async (req, res) => {
  try {
    const requests = await GatePasses.find({ email: req?.user?.email }).sort({
      createdAt: -1,
    });

    return res.send({
      success: true,
      message: "all request fetch",
      requests: requests || [],
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});
router.get("/all-requests", isAuthenticate, async (req, res) => {
  try {
    if (req?.user?.role == "teacher")
      return res.send({
        success: false,
        message: "you cannot access this data",
      });

    let requests = [];

    if (req?.user?.role == "hod") {
      requests = await GatePasses.find({
        department: req?.user?.department,
      }).sort({ createdAt: -1 });
    }

    if (req?.user?.role == "director") {
      requests = await GatePasses.find({ hodStatus: "confirm" }).sort({
        createdAt: -1,
      });
    }

    return res.send({
      success: true,
      message: "all request fetch",
      requests: requests || [],
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.get('/allRequestForKeeper',async(req,res)=>{
  try {
    const allRequest = await GatePasses.find()

    return res.send({success:true,message:'all request fetch',requests:allRequest})
  } catch (error) {
    return res.send({success:false,message:error.message})
  }
})

router.post("/update-status-of-pass", isAuthenticate, async (req, res) => {
  try {
    const { gatepassid, status } = req.body;

    if (!gatepassid)
      return res.send({ success: false, message: "gate pass id is required" });
    const gatepass = await GatePasses.findById(gatepassid);

    if (!gatepass)
      return res.send({ success: false, message: "gate pass not found" });

    if (req?.user?.role == "hod") {
      gatepass.hodStatus = status;

      if (status == "cancel") {
        gatepass.directorStatus = status;

        // if request is cancel then find user of request and send it notification
        const user = await Users.findOne({ email: gatepass?.email });
        if (user && user?.notificationToken) {
          sendPushNotification(
            user?.notificationToken,
            "GATE DENIED!",
            `${user?.name} your request is cancel!`,
            { key: "value" }
          );
        }
      }

      // sending notification to director
      if (status == "confirm") {
        const director = await Users.findOne({
          role: "director",
        });

        if (director && director?.notificationToken) {
          console.log("notification send");
          sendPushNotification(
            director?.notificationToken,
            "GATE PASS REQUEST!",
            `Respected Director you have new gate pass request!`,
            { key: "value" }
          );
        }
      }
    }
    if (req?.user?.role == "director") {
      gatepass.directorStatus = status;

      if (status == "cancel") gatepass.hodStatus = status;

      // find user of request and send notiication of request has accepted
      const ussr = await Users.findOne({ email: gatepass?.email });

      if (ussr && ussr?.notificationToken) {
        console.log("notification send");
        sendPushNotification(
          ussr?.notificationToken,
          "REQUEST ACCEPTED!",
          `${ussr?.name} your request is ${status} `,
          { key: "value" }
        );
      }
    }

    await gatepass?.save();

    return res.send({
      success: true,
      message: `status updated! ${status}`,
      gatepass,
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.post("/cancel-request", isAuthenticate, async (req, res) => {
  try {
    const { gatePassid } = req.body;

    const request = await GatePasses.findById(gatePassid);

    if (req.user?.email !== request?.email) {
      return res.send({ success: false, message: "this is not your request" });
    }

    await request.deleteOne();

    return res.send({ success: true, message: "Request cancel!" });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
