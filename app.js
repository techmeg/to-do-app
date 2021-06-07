//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//functions

function addTodo(event){
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to localstorage
    saveLocalTodos(todoInput.value);
    //checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear input value
    todoInput.value = '';
}

function deleteCheck (event) {
    const item = event.target;
    const todo = item.parentElement;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        //transition animation
        todo.classList.add('fall');
        removeLocalItem(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    } else if(item.classList[0] === 'complete-btn'){
        todo.classList.toggle('completed');
        const todoText = todo.children[0].innerText;
        console.log(todoText);
        savechecked(todoText);
        removeLocalItem(todo);
    }
}

function filterTodo (e) {
    const todos = todoList.childNodes;
    e.preventDefault();
    console.log(e)
    todos.forEach(function(todo){
        console.log(e.target.value);
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                } break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = 'none';
                } break;
        }
    })
}


function getTodos() {
    //check - any todos in storage?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        makeTodos(todo, todoDiv);

    });

    let completedTodos;
    if(localStorage.getItem('completedTodos') === null){
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'))
    }
    completedTodos.forEach(function(todo){
        //Todo Div
        const todoCompletedDiv = document.createElement('div');
        todoCompletedDiv.classList.add('todo');
        todoCompletedDiv.classList.add('completed');
        makeTodos(todo, todoCompletedDiv);
    });
}

function makeTodos(todo, todoDiv) {
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //checked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
}

function saveLocalTodos (todo) {
    //check - any todos in storage?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function savechecked(todo){
    let completedTodos;
    if(localStorage.getItem('completedTodos') === null){
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'))
    }
    completedTodos.push(todo);
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
}

function removeLocalItem(todo) {
    //check - any todos in storage?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// localStorage.clear();
