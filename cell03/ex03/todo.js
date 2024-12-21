// Select the ft_list container and New button
const ftList = document.getElementById('ft_list');
const newButton = document.getElementById('new');

// Load existing to-do list from cookies
function loadTodos() {
  const todos = document.cookie
    .split('; ')
    .find(row => row.startsWith('todos='))
    ?.split('=')[1];

  if (todos) {
    JSON.parse(decodeURIComponent(todos)).forEach(todo => addTodoToDOM(todo));
  }
}

// Save the to-do list to cookies
function saveTodos() {
  const todos = Array.from(ftList.children).map(item => item.textContent);
  document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/;`;
}

// Add a new to-do item to the DOM
function addTodoToDOM(text) {
  const todoDiv = document.createElement('div');
  todoDiv.textContent = text;
  todoDiv.className = 'todo-item';
  todoDiv.addEventListener('click', () => {
    if (confirm(`Do you want to remove this TO DO: "${text}"?`)) {
      todoDiv.remove();
      saveTodos();
    }
  });
  ftList.insertBefore(todoDiv, ftList.firstChild);
}

// Handle the New button click
newButton.addEventListener('click', () => {
  const newTodo = prompt('Enter a new TO DO:');
  if (newTodo && newTodo.trim()) {
    addTodoToDOM(newTodo.trim());
    saveTodos();
  }
});
// Initial load
loadTodos();