import './styles/index.scss'

async function getAllTodos() {
  const res =await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
  const todos = await res.json();

  console.log(todos);

  todos.forEach(todo => todoToHTML(todo))
}

window.addEventListener('DOMContentLoaded', getAllTodos);

function todoToHTML(id, completed, title) {
  const todoList = document.getElementById('todos');

  todoList.insertAdjacentHTML('beforeend', 
  `
  <div class="form-check" id="todo${id}">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" ${completed && 'checked'}>
          ${title}
        </label>
      </div>
    </div>
  `
  );
}