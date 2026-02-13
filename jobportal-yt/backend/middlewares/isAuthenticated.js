import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("=== Auth Middleware ===");
    console.log("Path:", req.path);

    // Check both cookie (for local) and Authorization header (for cross-site)
    let token = req.cookies?.token;

    // Check Authorization header as fallback
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove "Bearer " prefix
        console.log("✓ Token found in Authorization header");
      }
    } else {
      console.log("✓ Token found in cookies");
    }

    if (!token) {
      console.log("❌ NO TOKEN FOUND in cookies or headers");
      console.log("Cookies:", req.cookies);
      console.log("Auth Header:", req.headers.authorization);
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
