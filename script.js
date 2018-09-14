let tasks = (function() {
    'use strict';
  
    const tasksList = [];
    const input = document.getElementById('task-input');
    const list = document.getElementById('tasks');
    const button = document.getElementById('task-input__button');
    const date = document.getElementById('task-input__date');
  
    const addTask = function() {
        if (input.value != '') {
            tasksList.push(input.value);
            taskList(input.value);
        }
        input.value = '';
        date.value = '';
    }
  
    const bindEvents = function() {
      input.addEventListener('keyup', function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            button.click();
          }
      });
      button.addEventListener('click', addTask);
      list.addEventListener('click', deleteTask);
      list.addEventListener('click', options);
    }
  
    const taskList = function(value) {
        const element = document.createElement('li');
        const remove = document.createElement('button');
        const taskDate = document.createElement('div');
        const rm = document.createTextNode('remove');
  
        taskDate.innerText = date.value
        element.innerText = value;
        element.setAttribute('class', 'todo-element');
        element.setAttribute('id', uniqueId());
        remove.setAttribute('id', 'task-remove__button');
        remove.appendChild(rm);
        element.appendChild(remove);
        element.appendChild(taskDate);
        list.appendChild(element);
    }
  
    const deleteTask = function(e) {
        if (e.target.closest('#task-remove__button') !== null) {
            const todoElem = e.target.closest('.todo-element');
            todoElem.parentNode.removeChild(todoElem);
            tasksList.splice(todoElem, 1);
        }
    }

    const uniqueId = function() {
        return Math.random().toString(36).substr(2, 5);
    }

    const options = function(e) {
        if (e.target.tagName === 'LI') {
            console.log(e.target.id);
        }
    }

    const init = function() {
        bindEvents();
    }
    return {
        init: init,
        addTask: addTask,
        taskList: taskList,
        deleteTask: deleteTask
    }
  })();
  tasks.init();
