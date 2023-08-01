const adminPermissions = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    return res.json({ error: true, message: "Permission denied." });
  }
};

const clientPermissions = (req, res, next) => {
  next();
};

module.exports = {
  adminPermissions,
  clientPermissions,
};
