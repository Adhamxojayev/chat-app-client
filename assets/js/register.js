form.onsubmit = async(event) => {
    event.preventDefault()
    let newUser = {
        username: userInput.value,
        password: passwordInput.value,
        age: ageInput.value,
        gender: gender.value,
        contact: contactInput.value
    }
    
    let response = await request('/register', 'POST', newUser)

    if(response.status == 201){
        response = await response.json()
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('username', userInput.value)
        window.localStorage.setItem('user_id',response.user_id)
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