const api = require('../model/sign');

exports.getSignIn = (req, res, next) => {
  return res.render('auth/signin', {
    data: {
      pageTitle: 'Login'
    }
  });
}

exports.postSignIn = (req, res, next) => {
  const body = req.body;
  const data = api.postSignIn(body);

  data.then(response => {
    return response.json();
  })
    .then(results => {
      if (results.error.status == 200) {
        console.log(results);
      }

      return results;
    })
    .catch(err => console.log(err));
}

exports.getSignUp = (req, res, next) => {
  return res.render('auth/signup', {
    data: {
      pageTitle: 'Sign Up'
    }
  });
}