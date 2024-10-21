// checkAuth.js
const checkAuth = (req, res, next) => {
    // Check if the user session exists
    if (req.session && req.session.user) {
      return next(); // User is authenticated, proceed to next middleware or route handler
    }
    return res
      .status(401)
      .json({ message: "Prašome prisijungti." });
  };
  
  export { checkAuth };