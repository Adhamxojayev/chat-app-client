form.onsubmit = async(event) => {
    event.preventDefault()
    let user = {
        username: userInput.value,
        password: passwordInput.value,
    }
    
    let response = await request('/login', 'POST', user)

    if(response.status == 200){
        response = await response.json()
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('username', userInput.value)
        window.localStorage.setItem('user_id', response.user_id)
        errorMessage.textContent = response.message
        errorMessage.style.color = 'green'
        setTimeout(() => {
            window.location.href = '/'
        },2000)
    }else{
        response = await response.json()
        errorMessage.textContent = response.message
        errorMessage.style.color = 'red'
    }
}