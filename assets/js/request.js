let host = 'https://chat-backend-ap.herokuapp.com'
async function request (path,method,body,token){
    let headers = {
            'Content-Type' : 'application/json',
    }
    if(token)headers['token'] = window.localStorage.getItem('token')

    let options = {
        method,
        headers
    }
    if(body) options.body = JSON.stringify(body)
    let response = await fetch(host + path, options )
    return response
}
   

