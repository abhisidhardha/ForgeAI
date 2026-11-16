/** Validate required auth fields and map service results to HTTP responses; passwords never enter JWTs. */
const authService = require("../services/authService");

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name)
      return res.status(400).json({
        message: "Name is required",
      });
    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });
    if (!password)
      return res.status(400).json({
        message: "Password is required",
      });

    await authService.register(name, email, password);

    return res.status(201).json({
      message: "User registered successfully",
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });
    if (!password)
      return res.status(400).json({
        message: "Password is required",
      });

    const result = await authService.login(email, password);
    return res
      .status(200)
      .json({ message: "User login successfully", token: result });
  }
}

module.exports = new AuthController();
