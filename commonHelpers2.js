import"./assets/styles-d0c7eb22.js";const o="http://localhost:3000/todos",i=document.querySelector(".todo__form"),s=document.querySelector(".list");i.addEventListener("submit",l);s.addEventListener("click",d);s.addEventListener("click",h);async function a(t,n={}){const e=await fetch(t,n);if(!e.ok)throw new Error(e.statusText);return await e.json()}a(o).then(t=>s.insertAdjacentHTML("beforeend",r(t))).catch(t=>console.log(t));function r(t){return t.map(({id:n,title:e,completed:c})=>`
        <li data-id="${n}" class="list__item">
            <input type="checkbox" class="list__checkbox" ${c&&"checked"}>
            <h2 class="list__title">${e}</h2>
            <button class="list__btn">x</button>
        </li>
    `).join("")}function l(t){t.preventDefault();const{todo:n}=t.currentTarget.elements;a(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n.value,completed:!1})}).then(e=>s.insertAdjacentHTML("beforeend",r([e]))).catch(e=>alert(e)).finally(()=>i.reset())}function d(t){if(!t.target.classList.contains("list__checkbox"))return;t.preventDefault();const e=t.target.closest(".list__item").dataset.id;a(`${o}/${e}`,{method:"PATCH",body:JSON.stringify({completed:t.target.checked})}).then(c=>t.target.checked=c.completed).catch(c=>console.log(c))}function h(t){if(!t.target.classList.contains("list__btn"))return;const n=t.target.closest(".list__item"),e=n.dataset.id;a(`${o}/${e}`,{method:"DELETE"}).then(c=>n.remove()).catch(c=>alert(c))}
//# sourceMappingURL=commonHelpers2.js.map
