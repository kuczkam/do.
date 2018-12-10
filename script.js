let tasks = (() => {
    'use strict';
  
    const arrTasks      = [];
    const input         = document.getElementById('js__task-input');
    const list          = document.getElementById('js__tasks');
    const button        = document.getElementById('js__task-add');
    const date          = document.getElementById('js__task-date');
    const btnRemove     = document.getElementById('js__task-remove');
    const divAddTask    = document.getElementById('js__task-add_div');
    const divEditTask   = document.getElementById('js__task-edit_div');
    const btnEdittask   = document.querySelector('.js__task-edit');
    const btnAddTask    = document.querySelector('.js__task-add');
    const btnSaveTask   = document.querySelector('.js__task-save');
  
    const addTask = () => {
        if (input.value !== '') {
            arrTasks.push(input.value);
            createTaskElement(input.value);
        }
        input.value = '';
        date.value = '';
    }
  
    const __uniqueId = () => {
        return Math.random().toString(36).substr(2, 5);
    }

    const createTaskElement = (value) => {
        const element = document.createElement('li');
        const taskDate = document.createElement('div');
        const [day, month, year] = date.innerText.split(' '); //użyć tego do pobierania danych do datapickera w edycji
        console.log(day);
        console.log(month);
        console.log(year);
  
        taskDate.innerText = date.innerText;
        element.innerText = value;
        element.setAttribute('class', 'todo-element');
        element.setAttribute('id', __uniqueId());
        taskDate.setAttribute('class', 'task-date');
        element.appendChild(taskDate);
        list.appendChild(element);
    }

    const __taskIndex = () => {
        const li = document.getElementsByClassName('js__to-edit')[0];
        var nodes = Array.prototype.slice.call( list.children );
        var index = nodes.indexOf(li);

        return index;
    }

    const __editTask = () => {
        const li = document.querySelector('.js__to-edit');
        const elementId = li.getAttribute('id');
        const val = document.getElementById(elementId).innerText;

        input.value = val;
        
    }

    const saveTask = () => {
        const newValue = input.value;
        const li = document.querySelector('.js__to-edit');

        li.innerHTML = newValue;
        arrTasks[__taskIndex()] = newValue;
    }

    const deleteTask = (index) => {
        if(btnRemove) {
            const todos = document.querySelectorAll('#js__tasks li');
            if (todos.length > 0) {
                [...todos].find((todo, key) => key === __taskIndex()).remove();
                arrTasks.splice(__taskIndex(), 1);    
            } 
        }
    }

    const _addClassToFindTask = (e) => {
        if (e.target.tagName === 'LI') {
            const c = document.querySelector('#js__tasks li.js__to-edit');
            const item = e.target.closest('LI');
            if ( c !== null) {
                c.classList.remove('js__to-edit');
            }
            item.classList.add('js__to-edit');

            return e.target.id;
        }
    }

    const bindEvents = () => {
        btnAddTask.addEventListener('click', () => {
            divAddTask.className = '';
            getFocus();
        });
        input.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (e.keyCode === 13) {
            button.click();
          }
        });
        btnEdittask.addEventListener('click', __editTask);
        button.addEventListener('click', addTask);
        btnRemove.addEventListener('click', deleteTask);
        list.addEventListener('click', _addClassToFindTask);
        btnSaveTask.addEventListener('click', saveTask);
  
    }
    const getFocus = () => {
        if (divAddTask.classList.contains('visible')) {
            input.focus();
        }
    } 
    return {
        bindEvents: bindEvents,
        addTask: addTask,
        createTaskElement: createTaskElement,
        deleteTask: deleteTask
    }
  })();
tasks.bindEvents();
