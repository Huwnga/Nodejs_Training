module.exports = (req, res, next) => {
  token = req.cookies.token;

  if (token && token != '') {
    next();
  } else {
    req.flash('error', 'Let\' Login!');
    return res.redirect('/auth/login');
  }
}