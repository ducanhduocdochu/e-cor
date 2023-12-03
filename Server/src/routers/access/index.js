const express = require("express");
const asyncHandler = require("../../helper/asyncHandler");
const accessController = require("../../controllers/access.controller");
const { authentication } = require("../../auth/authUtils");
const passport = require("passport");
const { authenticateGoogle, checkTypeLogin } = require("../../auth/checkAuth");

const router = express.Router();

/**
 * Đăng ký tài khoản
 * @body username
 * @body email
 * @body password
 */
router.post("/register", asyncHandler(accessController.register));

/**
 * Đăng nhập
 * @body email
 * @body password
 */
router.post("/login", asyncHandler(accessController.login));

/**
 * Đăng ký tài khoản với google
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  authenticateGoogle,
  asyncHandler(accessController.loginGoogle)
);

/**
 * Đăng nhập
 * @header user-id
 * @header access-token
 */
router.post("/logout", authentication, asyncHandler(accessController.logout));

/**
 * Yêu cầu đổi mật khẩu hoặc quên mật khẩu hoặc xác nhận email
 * @header user-id
 * @header access-token
 * @params type
 */
router.post(
  "/request-verify/:type",
  authentication,
  checkTypeLogin,
  asyncHandler(accessController.requestVerify)
);

/**
 * Xác nhận token
 * @header user-id
 * @header access-token
 * @body email
 * @body confirmOtp
 */
router.post(
  "/confirm-token",
  authentication,
  asyncHandler(accessController.confirmToken)
);

/**
 * Thay đổi mật khẩu
 * @header user-id
 * @header access-token
 * @body email
 * @body password
 * @body new_password
 * @body confirm_token
 */
router.put(
  "/change-password",
  authentication,
  asyncHandler(accessController.changePassword)
);

/**
 * Đổi access token
 * @header user-id
 * @header refresh-token
 */
router.post(
  "/refresh",
  authentication,
  asyncHandler(accessController.refresh_token)
);

module.exports = router;
