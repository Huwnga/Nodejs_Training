const apiPort = "http://localhost:3000/auth";

exports.apiSign = {
  signIn: apiPort + "/signin",
  signUp: apiPort + "/signup"
}

exports.postSign = function (url, body) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    redirect: 'follow'
  });

  return response;
}