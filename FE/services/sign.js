exports.getSignIn = (req, res, next) => {
  return res.render('auth/signin', {
    data: {
      pageTitle: 'Login'
    }
  });
}

exports.getSignUp = (req, res, next) => {

}