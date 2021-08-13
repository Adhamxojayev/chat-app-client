let token = window.localStorage.getItem('token')
let username = window.localStorage.getItem('username')

if(!token && !username) window.location = '/login'
nameUser.textContent = window.localStorage.getItem('username')
let hour = new Date()
let hours = (''+hour.getHours()).padStart(2,0)
let min = (''+hour.getMinutes()).padStart(2,0)
const getTodos = async () => {
   let data = await request('/todos', 'GET', null, true)
   let res =  await data.json()
   renderTodos(res.data)
}

form.onsubmit = async (event) => {
    event.preventDefault()
    let newTodo = {
        todo_text : todoInput.value,
        todo_time : hours + ':' + min
    }
    let res = await request('/todos', 'POST', newTodo, true)
    if(res.status == 201){
        let result = await res.json()
        let todo = result.data
        renderTodos([todo])
    }
}

function renderTodos(todos) {
    for(let todo of todos){
        let li = document.createElement('li')
        let div = document.createElement('div')
        let text = document.createElement('span')
        let time = document.createElement('span')
        let button = document.createElement('button')
        
        let id = window.localStorage.getItem('user_id')
        text.textContent = todo.todo_text
        time.textContent = todo.todo_time
        button.textContent = 'X' 
        button.style.display = 'none'  
        if(id == todo.user_id){
            li.style.display = 'flex'
            li.style.flexDirection = 'row-reverse'
            todoInput.value = ''
            button.style.display = 'inline-block'
            div.setAttribute('class','man')
            time.contentEditable = true
            text.contentEditable = true
        }
        div.append(text)
        div.append(time)
        li.append(div)
        li.append(button)


        todoList.append(li)

        button.onclick = async() => {
            let res = await request('/todos', 'DELETE', {todo_id: todo.todo_id}, true)
            if(res.status == 200){
                li.remove()
            }
        }

        text.onkeyup = async (event) => {
            if(event.keyCode == 13){
                let temp = text.textContent
                let res = await request('/todos', 'PUT', {todo_id: todo.todo_id, todo_text: text.textContent}, true)
                text.textContent = temp

            }
        }
        time.onkeyup = async (event) => {
            if(event.keyCode == 13){
                let temp = time.textContent
                let res = await request('/todos', 'PUT', {todo_id: todo.todo_id, todo_time: time.textContent}, true)
                time.textContent = temp

                
            }
        }

    }
}

logout.onclick = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.location = '/login'
}

getTodos()




















