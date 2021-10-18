const todoList = new TodoList().loadFromStorage().paint();

document.querySelector('#add-todo').addEventListener('click', () => {
  todoList.addTodo(document.querySelector('#todo-input').value);
  document.querySelector('#todo-input').value = '';
});

document.querySelectorAll('.mode-switch').forEach(switchEle => switchEle.addEventListener('click', (event) => {
  todoList.changeFilter(event.target.innerHTML);
}));
