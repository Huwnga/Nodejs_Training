const apiPort = "http://localhost:3000/auth";

const apiSign = {
  signIn: apiPort + "/signin",
  signUp: apiPort + "/signup"
}

exports.postSignIn = function (body) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = fetch(apiSign.signIn,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      redirect: 'follow'
    });

  return response;
}

exports.getSignUp = function () {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = fetch(apiSign.signUp,
    {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    });

  return response;
}