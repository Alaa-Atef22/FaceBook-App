


const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log("User authenticated:", req.session.user); 
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

export default isAuthenticated
