module.exports = (req, res, next) => {
  if (!req.cookies.isAdmin) {
    return res.redirect('/auth/signin');
  }
  // console.log(req.cookies);
  next();
}