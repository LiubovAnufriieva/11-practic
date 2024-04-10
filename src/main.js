import "./css/styles.css"

const BASE_URL = "http://localhost:3000/todos"

const form = document.querySelector(".todo__form");
const container = document.querySelector(".list");

form.addEventListener("submit", handleSubmit);
container.addEventListener("click", handleUpdate);
container.addEventListener("click", handleDelete);


async function fetchData(url, options = {}) {
    const response = await fetch(url, options);
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

fetchData(BASE_URL)
    .then(todos => container.insertAdjacentHTML("beforeend", createMarkup(todos)))
    .catch(error => console.log(error))

function createMarkup(arr) {
    return arr.map(({ id, title, completed }) => `
        <li data-id="${id}" class="list__item">
            <input type="checkbox" class="list__checkbox" ${completed && "checked"}>
            <h2 class="list__title">${title}</h2>
            <button class="list__btn">x</button>
        </li>
    `).join("")
}


function handleSubmit(event) {
    event.preventDefault();

    const { todo } = event.currentTarget.elements;
    
    fetchData(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: todo.value, completed: false })
    })
        .then(data => container.insertAdjacentHTML("beforeend", createMarkup([data])))
        .catch(error => alert(error))
        .finally(() => form.reset())
}

function handleUpdate(event) {
    if(!event.target.classList.contains("list__checkbox")) {
        return;
    }
    event.preventDefault();
    
    const parent = event.target.closest(".list__item");
    const id = parent.dataset.id;
    
    fetchData(`${BASE_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: event.target.checked })
    })
        .then(data => event.target.checked = data.completed)
        .catch(error => console.log(error))
}


function handleDelete(event) {
    if(!event.target.classList.contains("list__btn")) {
        return;
    }
    
    const parent = event.target.closest(".list__item");
    const id = parent.dataset.id;
    
    fetchData(`${BASE_URL}/${id}`, {
        method: "DELETE"
    })
        .then(data => parent.remove())
        .catch(error => alert(error))

}