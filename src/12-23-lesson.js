import axios from 'axios';
import './css/styles.css';

const BASE_URL = 'http://localhost:3000/todos';

const form = document.querySelector('.todo-form');
const container = document.querySelector('.list');

form.addEventListener('submit', handleSubmit);
container.addEventListener('click', handleUpdate);
container.addEventListener('click', handleDelete);

render();

async function serviceTodos(options = {}) {
  const { data } = await axios(options);
  return data;
}
function createMarkup(arr) {
  return arr
    .map(
      ({ id, title, completed }) =>
        `<li class="list-item" data-id="${id}">
          <input type="checkbox" class="list-checkbox" ${
            completed && 'checked'
          }>
          <h2 class="list-title">${title}</h2>
          <button class="list-btn">x</button>
        </li> `
    )
    .join('');
}

async function render() {
  try {
    const todos = await serviceTodos({ url: BASE_URL });
    container.insertAdjacentHTML('beforeend', createMarkup(todos));
  } catch (error) {
    alert(error.message);
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const { todo } = event.target.elements;
  console.log(todo.value);

  try {
    const data = await serviceTodos({
      method: 'POST',
      url: BASE_URL,
      data: {
        title: todo.value,
        completed: false,
      },
    });
    container.insertAdjacentHTML('beforeend', createMarkup([data]));
  } catch (error) {
    alert(error.message);
  } finally {
    form.reset();
  }
}

async function handleUpdate(event) {
  if (!event.target.classList.contains('list-checkbox')) {
    return;
  }
  event.preventDefault();
  // console.log(event.target.checked);

  const parent = event.target.closest('.list-item');
  // console.log(parent);
  const id = parent.dataset.id;
  // console.log(id);
  try {
    const done = await serviceTodos({
        url: `${BASE_URL}/${id}`,
        method: 'PATCH',
        data: {
            completed: event.target.checked
        }
        });
        // console.log('done', done);
        event.target.checked = done.completed;
  } catch(error) {
    alert(error.message)
  }
}

async function handleDelete(event) {
    if(!event.target.classList.contains('list-btn')) {
        return;
    }
    // console.log('ok');

    const parent = event.target.closest('.list-item');
    const id = parent.dataset.id;
    // console.log(id);
    try {
        await serviceTodos({
            url: `${BASE_URL}/${id}`,
            method: 'DELETE'
        })
    } catch(error) {
        alert(error.message);
    }
}