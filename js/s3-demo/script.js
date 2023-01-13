
var p;

function constructVis() {
  let container = document.getElementById('container')
  let path = document.getElementById('path')
  let token = document.getElementById('token')
  let secret = document.getElementById('secret')
  let sessionToken = document.getElementById('sessionToken')
  path = path.value
  token = token.value
  secret = secret.value
  sessionToken = sessionToken.value

  p = window.vis.visualize(path, null, null, container, {
    controlPanel: false,
    backlink: false,
    token: null,
    creds: {
      aws_access_key_id: token,
      aws_secret_access_key: secret,
      aws_session_token: sessionToken
    }
  })

  p.then(e => {
    const update = () => {
      requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  })
}
