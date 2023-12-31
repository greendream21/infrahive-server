const routerx = require("express-promise-router")
const authController = require("../controllers/authController")
const tokenMiddleware = require("../middlewares/token")

const Router = routerx()

Router.post("/login", authController.Login)
Router.post("/register", authController.Register)
Router.post("/sessionCheck", tokenMiddleware.check_token, authController.sessionCheck)
Router.delete("/sendLogout", tokenMiddleware.check_token, authController.Logout)
Router.post("/join_wait_list", authController.JoinWaitList)


module.exports = Router