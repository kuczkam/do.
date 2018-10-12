let tasks = (() => {
    'use strict';
  
    const arrTasks = [];
    const input = document.getElementById('js__task-input');
    const list = document.getElementById('js__tasks');
    const button = document.getElementById('js__task-add');
    const date = document.getElementById('js__task-date');
    const edit = document.getElementById('task-options');
    const btnRemove = document.getElementById('js__task-remove');
  
    const addTask = () => {
        if (input.value !== '') {
            arrTasks.push(input.value);
            createTaskElement(input.value);
        }
        input.value = '';
        date.value = '';
    }
  
    const bindEvents = () => {
      input.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (e.keyCode === 13) {
            button.click();
          }
      });
      button.addEventListener('click', addTask);
      btnRemove.addEventListener('click', deleteTask);
      list.addEventListener('click', options);
    }
  
    const createTaskElement = (value) => {
        const element = document.createElement('li');
        const taskDate = document.createElement('div');
  
        taskDate.innerText = date.value
        element.innerText = value;
        element.setAttribute('class', 'todo-element');
        element.setAttribute('id', __uniqueId());
        element.appendChild(taskDate);
        list.appendChild(element);
    }
  
    const __taskIndex = () => {
        const li = document.getElementsByClassName('js__to-remove')[0];
        var nodes = Array.prototype.slice.call( list.children );
        var index = nodes.indexOf(li);
        return index;
    }

    const deleteTask = (index) => {
        if(btnRemove) {
            const $todos = document.querySelectorAll('#js__tasks li');
            if ($todos.length > 0) {
                [...$todos].find(($todo, key) => key === __taskIndex()).remove();
                arrTasks.splice(__taskIndex(), 1);    
            } 
        }
    }

    const __uniqueId = () => {
        return Math.random().toString(36).substr(2, 5);
    }

    const options = (e) => {
        if (e.target.tagName === 'LI') {
            const item = e.target.closest('LI');
            item.classList.add('js__to-remove');

            console.log(e.target.id);
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
