const apiPortAuth = "http://localhost:3000/auth";

exports.apiSign = {
  signIn: apiPortAuth + "/signin",
  signUp: apiPortAuth + "/signup"
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