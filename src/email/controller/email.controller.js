const Email = require("../../email/model/email.model");

class EmailController {
  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      const email = await Email.findOne({ verificationToken: token });

      if (!email) {
        return res
          .status(404)
          .json({ error: true, message: "Invalid verification token." });
      }

      email.isVerified = true;
      await email.save();

      return res.json({ message: "Email verified successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to verify email." });
    }
  }
}

module.exports = EmailController;
