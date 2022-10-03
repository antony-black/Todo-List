import './styles/index.scss'


// ======================================================================================================
document.getElementById('addTodo').addEventListener('click', async () => {
try {
  const input = document.getElementById('todoText');
  const title = input.value;

  const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed: false
  })

  console.log(res.data)

  todoToHTML(res.data);

  input.value = '';
}
catch(err) {
  console.error(err)
}
})

async function getAllTodos() {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');

    console.log(res.data);

    res.data.forEach(todo => todoToHTML(todo));
  }
  catch(err) {
    console.error(err)
  }
}

window.addEventListener('DOMContentLoaded', getAllTodos)

function todoToHTML( {id, title, completed} ) {
  const todoList = document.getElementById('todos');

  todoList.insertAdjacentHTML('beforeend', `
  <div class="form-check" id="todo${id}">
  <label class="form-check-label">
    <input  onchange="toggleCompleteTodo( ${id} )" class="form-check-input" type="checkbox" ${completed && 'checked'}>
    ${title}
  </label>
  <button onclick="deleteTodo( ${id} )" type="button" class="btn-close">Remove</button>
</div>
  `)
}

async function deleteTodo(id) {
  try {
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    console.log(res.data)

    if (res) {
      document.querySelector( `#todo${id}` ).remove()
    }
  }
  catch(err) {
    console.error(err)
  }
}

async function toggleCompleteTodo(id) {
  try {
    const completed = document.querySelector( `todo${id} input` ).checked;

    const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`)

    console.log(res.data);
  }
  catch(err) {
    console.error(err)
  }
}
// ========================================================================================================














