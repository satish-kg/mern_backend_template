// contains all the API routes from ther server
// Put it in "router" folder
// import { Router } from "express";
import { verifyToken } from '../middleware/verifyToken.js';
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from "../middleware/auth.js";
import multer from 'multer';
import path from 'path';

// Configure multer to save files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });
 
/** POST Methods */
// router.route("/memberlist/").post(verifyToken, controller.getMemberlist);
router.route("/register").post(controller.register); // register group
router.route("/addmember").post(verifyToken, Auth, controller.addmember); // register user
router.route("/registerMail").post(verifyToken, registerMail); // send the email
router
  .route("/authenticate")
  .post( controller.verifyUserID, (req, res) => res.end()); // authenticate user
router
  .route("/addpayment")
  .post(verifyToken, controller.verifyUserID, controller.addpayment); // add payment
router.route("/signup").post(controller.signup);

/** GET Methods */
router.route('/images').get(controller.getImage); // get image for slideshow
router.route("/verifyUsername/:username").get(controller.verifyUsername); // user with username
router.route("/user/:username").get( verifyToken, controller.getUser); // user with username
router.route("/memberlist/").get( verifyToken,  controller.getMemberlist); // user list
router.route("/gettotal/:userId").get(verifyToken, controller.getTotal); // Get total amount 

/** PUT Methods */
router.route("/updateuser").put(verifyToken, Auth, controller.updateUser); // is use to update the user profile

/** DELETE Methods */ 
router.route("/deleteSingleExpense/:eid").delete( Auth, controller.deleteSingleExpense);
router.route("/deleteimage/:imageId").delete( controller.deleteImage);


export default router;
