import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Log incoming request info
    console.log("=== Auth Middleware ===");
    console.log("Path:", req.path);
    console.log("Cookies received:", req.cookies);
    console.log("Headers:", req.headers);

    const token = req.cookies?.token;
    if (!token) {
      console.log("❌ NO TOKEN FOUND");
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    console.log("✓ Token found, verifying...");
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      console.log("❌ TOKEN INVALID");
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    console.log("✓ Token verified for user:", decode.userId);
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("❌ Auth Error:", error.message);
    return res.status(500).json({
      message: "Authentication error",
      success: false,
    });
  }
};
export default isAuthenticated;
