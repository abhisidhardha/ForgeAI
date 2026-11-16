/** Verify bearer token signatures/expiry and attach the trusted identity to req.user. */
const { verifyToken } = require("../utils/jwt");

const verify = async (req, res, next) => {
  let token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token)
    return res.status(401).json({
      message: "Authorization error",
    });

  try {
    req.user = await verifyToken(token);
    if (!req.user)
      return res.status(401).json({
        message: "Invalid Token",
      });
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verify;
