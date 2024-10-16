import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "user not authorised" });
    }

    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!tokenVerified) {
      return res.status(401).json({ message: "Admin not authorised" });
    }
    console.log("Token Verified:", tokenVerified);

    if (tokenVerified.role !== "admin") {
      return res.status(401).json({ message: "access deniedd" });
    }

    req.admin = tokenVerified;

    next();
  } catch (error) {
    return res.status(401).json({ message: "user autherization failed" });
  }
};
