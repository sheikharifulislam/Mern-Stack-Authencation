const authRouter = require("express").Router();
const { registration, login, currentUser, logOut } = require("../controller/authController");
const checkLogin = require("../middlewares/checkLogin");

authRouter.post("/registration", registration);
authRouter.post("/login", login);
authRouter.get("/current-user", checkLogin, currentUser);
authRouter.get("/logout", logOut);
module.exports = authRouter;
