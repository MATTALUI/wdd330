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
    this.id = id || new Date().getTime();
    this.contend = content;
    this.completed = completed || false;
  }

  function TodoList() {
    // Member Data
    this.config = new Config();
    this.todos = [];

    // Private Methods
    const _buildTodoEle = todo => {
      const ele = document.querySelector('#todo-template').content.cloneNode(true);
      ele.querySelector('.todo__content').innerHTML = todo.contend;

      if (todo.completed) {
        ele.querySelector('.todo').classList.add('complete');
        ele.querySelector('.todo__check').setAttribute('checked', todo.completed);
      }

      return ele;
    };

    // Public Methods
    this.loadFromStorage = function() {
      // TODO: actually load from storage
      this.todos = [
        new Todo({ content: 'Eat the Cat'}),
        new Todo({ content: 'This one is complete', completed: true }),
        new Todo({ content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
        new Todo({ content: 'Win the yo-yo world championships', completed: true}),
      ];

      return this;
    };

    this.saveToStorage = function() {
      // TODO: actually write this to storage;

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
      // Paint Todo List
      document.querySelector('#todos').innerHTML = '';
      this.currentTodoSet().forEach(todo => {
        document.querySelector('#todos').appendChild(_buildTodoEle(todo));
      });
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
