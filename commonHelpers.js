import"./assets/styles-d0c7eb22.js";const i={form:document.querySelector(".js-search"),formContainer:document.querySelector(".js-form-container"),addField:document.querySelector(".js-add"),list:document.querySelector(".js-list")};i.addField.addEventListener("click",d);i.form.addEventListener("submit",p);function d(){i.formContainer.insertAdjacentHTML("beforeend",'<input type="text" class="input-country" name="country" />')}async function p(r){r.preventDefault();const a=new FormData(r.currentTarget).getAll("country").map(t=>t.trim()).filter(t=>t).filter((t,e,n)=>n.indexOf(t)===e);try{const t=await f(a),e=await y(t);i.list.innerHTML=h(e)}catch(t){console.log(t)}finally{i.formContainer.innerHTML='<input type="text" class="input-country" name="country" />'}}async function f(r){const o="https://restcountries.com/v3.1/name/",a=r.map(async e=>{const n=await fetch(`${o}${e}`);return n.ok?n.json():Promise.reject(n.statusText)});return(await Promise.allSettled(a)).filter(({status:e})=>e==="fulfilled").map(({value:e})=>e[0].capital[0])}async function y(r){const o="http://api.weatherapi.com/v1/",a="current.json",t="033b369d9d6241bab00133843241004",e=r.map(async c=>{const l=new URLSearchParams({key:t,q:c,lang:"en"}),s=await fetch(`${o}${a}?${l}`);return s.ok?s.json():Promise.reject(s.statusText)});return(await Promise.allSettled(e)).filter(({status:c})=>c==="fulfilled").map(({value:{current:{condition:{text:c,icon:l},temp_c:s},location:{name:u,country:m}}})=>({text:c,icon:l,temp_c:s,name:u,country:m}))}function h(r){return r.map(({country:o,icon:a,name:t,temp_c:e,text:n})=>`
	<li>
	<img src="${a}" alt="${n}">
	<h2>${o}</h2>
	<h2>${t}</h2>
	<p>${n}</p>
	<p>${e} °C</p>
  </li>
	`).join("")}
//# sourceMappingURL=commonHelpers.js.map
