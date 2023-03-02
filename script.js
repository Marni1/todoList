let TODOINPUT;
let ALERTINFO;
let ADDBTN;
let ULLIST;
let NEWTASK;
let ALLTASK;
let IDNUMBER = 0;
let POPUP;
let POPUPINFO;
let EDITEDTODO;
let POPUPINPUT;
let ADDPOPUPBTN;
let CLOSETODOBTN;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}


const prepareDOMElements = () => {
    TODOINPUT = document.querySelector('.todo-input')
    ALERTINFO = document.querySelector('.alert-info')
    ADDBTN = document.querySelector('.add-btn')
    ULLIST = document.querySelector('.todo-list ul')
    ALLTASK = document.getElementsByTagName('li')
    POPUP = document.querySelector('.popup')
    POPUPINFO = document.querySelector('.popup-info')
    POPUPINPUT = document.querySelector('.popup-input')
    ADDPOPUPBTN = document.querySelector('.accept')
    CLOSETODOBTN = document.querySelector('.cancle')
}

const prepareDOMEvents = () => {
    ADDBTN.addEventListener('click', addNewTask);
    TODOINPUT.addEventListener('keyup', enterCheck);
    ULLIST.addEventListener('click', checkClick);
    ADDPOPUPBTN.addEventListener('click', changeTodo);
    CLOSETODOBTN.addEventListener('click', closePopup)
}

const addNewTask = () => {
    if (TODOINPUT.value !== '') {
        IDNUMBER++;
        NEWTASK = document.createElement('li');
        NEWTASK.innerText = TODOINPUT.value;
        NEWTASK.setAttribute('id', `todo-${IDNUMBER}`)
        ULLIST.append(NEWTASK);
        TODOINPUT.value = '';
        ALERTINFO.innerText = '';
        createToolsArea(NEWTASK)
    } else {
        ALERTINFO.innerText = 'Wpisz treść zadania!'
    }
}

const enterCheck = (event) => {
    if (event.code === 'Enter') {
        addNewTask();
    }
}
const createToolsArea = (task) => {
    tools = document.createElement('div');
    completeBtn = document.createElement('button');
    editBtn = document.createElement('button');
    deleteBtn = document.createElement('button');
    tools.classList.add('tools')

    completeBtn.classList.add('complete');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    editBtn.innerText = 'EDIT'
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
    tools.append(completeBtn, editBtn, deleteBtn);
    task.append(tools)


}

const checkClick = (e) => {
    if (e.target.classList.value !== '') {
        if (e.target.closest('button').classList.contains('complete')) {
            e.target.closest('li').classList.toggle('completed')
            e.target.closest('button').classList.toggle('completed')
        } else if (e.target.closest('button').classList.contains('edit')) {
            editTask(e)
        } else if (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e);
        }
    }
}
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id
    EDITEDTODO = document.getElementById(oldTodo);
    POPUPINPUT.value = EDITEDTODO.firstChild.textContent
    POPUP.style.display = 'flex';


}
const changeTodo = () => {
    if (POPUPINPUT.value !== '') {
        EDITEDTODO.firstChild.textContent = POPUPINPUT.value
        POPUP.style.display = 'none'
        POPUPINFO.textContent = ''
    } else {
        POPUPINFO.innerHTML = 'Musisz podać jakąś treść'
    }
}
const closePopup = () => {
    POPUP.style.display = 'none'
    POPUPINFO.textContent = ''
}
const deleteTask = e => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    if (ALLTASK.length === 0) {
        ALERTINFO.textContent = 'Brak zadań na liście'
    }
}

document.addEventListener('DOMContentLoaded', main)