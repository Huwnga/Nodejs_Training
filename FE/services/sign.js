const api = require('../model/sign');

exports.getSignIn = (req, res, next) => {
  const message = req.flash("error")[0];

  return res.render('auth/signin', {
    data: {
      pageTitle: 'Login',
      message: `${message}`
    }
  });
}

exports.postSignIn = (req, res, next) => {
  const body = req.body;
  const cb = api.postSign(api.apiSign.signIn, body);

  cb.then(response => {
    return response.json();
  })
    .then(results => {
      const error = results.error;
      const data = results.data;

      switch (error.status) {
        case 200:
          req.flash('error', error.message);
          res.cookie('token', data.account.token);

          return res.redirect(data.path);
          break;
        case 401:
          req.flash('error', error.message);
          return res.redirect('/auth/signin');
          break;
        default:
        // code block
      }
      if (error.status == 200) {
        console.log(data);
      }

      return results;
    })
    .catch(err => console.log(err));
}

exports.getSignUp = (req, res, next) => {
  const message = req.flash("error");

  return res.render('auth/signup', {
    data: {
      pageTitle: 'Sign Up',
      message: `${message}`
    }
  });
}

exports.postSignUp = (req, res, next) => {
  const body = req.body;
  const cb = api.postSignUp(body);

  cb.then(response => {
    return response.json();
  })
    .then(results => {
      const error = results.error;
      const data = results.data;
    })
    .catch(err => console.log(err));
}

exports.postSignOut = (req, res, next) => {
  res.clearCookie("token");
  res.redirect('/auth/signin');
}