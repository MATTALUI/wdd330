LOCALSTORAGE_STATE_KEY = 'TODOAPP::STATE';

const getSavedState = () => JSON.parse(localStorage.getItem(LOCALSTORAGE_STATE_KEY)) || {};
const setSavedState = todoList => localStorage.setItem(LOCALSTORAGE_STATE_KEY, JSON.stringify(todoList));
