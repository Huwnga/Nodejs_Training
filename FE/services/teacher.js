const Teacher = require('../model/teacher');

// get data a apiUrl and return htmlpage with data and message(only ejs framework)
function renderEjsPageWithApiGet (messageName, pagePath, urlApi, req, res, next) {
  const params = req.query;
  const message = req.flash(messageName);
  const token = req.cookies.token;

  Teacher.get(urlApi, token, params)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        return res.render(pagePath, {
          data: data,
          message: message
        });
      } else {
        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}

// post data a apiUrl and return htmlpage with data and message(only ejs framework)
function renderEjsPageWithApiPost (messageName, urlApi, req, res, next) {
  const token = req.cookies.token;
  const params = req.query;
  const body = req.body;

  Teacher.postOne(urlApi, token, body, params)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;
      console.log(data.body);

      if(data.body){
        res.body = data.body;
      }
      req.flash(messageName, error.message);

      return res.redirect(data.path);
    })
    .catch(err => console.log(err));
}