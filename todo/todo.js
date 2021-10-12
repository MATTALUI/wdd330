(() => {

  function Config() {
    const MODES = {
      ALL: 'All',
      ACTIVE: 'Active',
      COMPLETE: 'Completed',
    };

    this.init = function(options={}) {
        this.mode = options.mode || MODES.ALL;
    };

    this.modes = function() {
      // Spread this bad boy in in order to guarantee immutability;
      return { ...MODES };
    };

    this.init();
  }

  function Todo({ id, content, completed, }={}) {
    // TODO: we're generating a random number ID here since we can't have ids that match
    this.id = id || new Date().getTime();
    this.content = content;
    this.completed = completed || false;
  }

  function TodoList() {
    // Member Data
    this.config = new Config();
    this.todos = [];

    // Private Methods
    const handleCheckboxClick = event => {
      event.preventDefault();
      this.toggleTodo(+event.target.closest('.todo').getAttribute('data-todo'));
    };
    const handleDeleteClick = event => {
      event.preventDefault();
      this.removeTodo(+event.target.closest('.todo').getAttribute('data-todo'));
    };
    const _buildTodoEle = todo => {
      const ele = document.querySelector('#todo-template').content.cloneNode(true);
      ele.querySelector('.todo').setAttribute('data-todo', todo.id);
      ele.querySelector('.todo__content').innerHTML = todo.content;
      ele.querySelector('.todo__check').addEventListener('click', handleCheckboxClick);
      ele.querySelector('.todo__close').addEventListener('click', handleDeleteClick);

      if (todo.completed) {
        ele.querySelector('.todo').classList.add('complete');
        ele.querySelector('.todo__check').setAttribute('checked', todo.completed);
      }

      return ele;
    };

    // Public Methods
    this.loadFromStorage = function() {
      let storedState = JSON.parse(localStorage.getItem('TODOAPP::STATE')) || {};
      this.todos = (storedState.todos || []).map(todo => new Todo(todo));
      this.config.init(storedState.config || {});

      return this;
    };

    this.saveToStorage = function() {
      // TODO: actually write this to storage;
      localStorage.setItem('TODOAPP::STATE', JSON.stringify(this));
      return this;
    };

    this.activeTodoSet = () => this.todos.filter(todo => !todo.completed);
    this.completedTodoSet = () => this.todos.filter(todo => todo.completed);

    this.currentTodoSet = function() {
      const modes = this.config.modes();
      switch(this.config.mode) {
        case modes.ACTIVE:
          return this.activeTodoSet();
        case modes.COMPLETE:
          return this.completedTodoSet();
        case modes.ALL:
        default:
          return this.todos;
      }
    };

    this.paint = function() {
      document.querySelector('#todos').innerHTML = '';
      // Paint Todo List
      this.currentTodoSet().forEach(todo => {
        document.querySelector('#todos').appendChild(_buildTodoEle(todo));
      });
      if (this.currentTodoSet().length === 0) {
        const noText = document.createElement('p');
        noText.innerHTML = 'No TODOs here.';
        noText.setAttribute('id', 'nonetext');
        document.querySelector('#todos').appendChild(noText);
      }
      // Paint Todos left uncompleted
      document.querySelector('#todo-count').innerHTML = `${this.activeTodoSet().length} Tasks Left`;
      // Paint config filter tab
      document.querySelectorAll('.mode-switch').forEach(switchEle => {
        if (switchEle.innerHTML === this.config.mode) {
          switchEle.classList.add('active');
        } else {
          switchEle.classList.remove('active');
        }
      });

      return this;
    };

    this.addTodo = function(content) {
      if (!content) { return; }
      const todo = new Todo({ content });
      this.todos.push(todo);
      this.saveToStorage().paint();

      return this;
    };

    this.changeFilter = filterMode => {
      this.config.mode = filterMode;
      this.saveToStorage().paint();

      return this;
    };

    this.toggleTodo = todoId => {
      const todo = this.todos.find(todo => todo.id === todoId);
      todo.completed = !todo.completed;
      this.saveToStorage().paint();

      return this;
    };

    this.removeTodo = todoId => {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
      this.saveToStorage().paint();

      return this;
    };
  }

  const todoList = new TodoList().loadFromStorage().paint();

  document.querySelector('#add-todo').addEventListener('click', () => {
    todoList.addTodo(document.querySelector('#todo-input').value);
    document.querySelector('#todo-input').value = '';
  });
  document.querySelectorAll('.mode-switch').forEach(switchEle => switchEle.addEventListener('click', (event) => {
    todoList.changeFilter(event.target.innerHTML);
  }));
})();
