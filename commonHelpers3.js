import"./assets/modulepreload-polyfill-3cfb730f.js";import{a as p,S as y,i as a}from"./assets/vendor-09d7c26e.js";const w="43230635-158e2f6795128fbec19d81d21",L="https://pixabay.com/api/?";async function S(e,r=1){try{const t=await p.get(L,{params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}});if(!t.data.hits)throw new Error("Failed to fetch images. Please try again later.");return r===1&&void 0,t.data}catch{throw new Error("Failed to fetch images. Please try again later.")}}const n=document.querySelector(".card-list"),b=document.querySelector(".loader"),E=new y(".card-item a",{captionsData:"alt",captionDelay:250});function q(e){if(!e.hits)return a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});const r=P(e.hits);n.insertAdjacentHTML("beforeend",r),E.refresh()}function P(e){return e.map(({webformatURL:r,largeImageURL:t,tags:u,likes:h,views:g,comments:m,downloads:f})=>`<li class="card-item">
  <a href=${t}
    ><img src=${r} alt="${u}" height="200"/>
    <ul class="card-info">
      <li>
        Likes
        <p>${h}</p>
      </li>
      <li>
        Views
        <p>${g}</p>
      </li>
      <li>
        Comments
        <p>${m}</p>
      </li>
      <li>
        Downloads
        <p>${f}</p>
      </li>
    </ul></a
  >
</li>`).join("")}function c(){console.log("toggleLoader"),b.classList.toggle("is-hidden")}const $=document.querySelector(".search-form"),s=document.getElementById("load-more-btn");let o=1,l,i;$.addEventListener("submit",H);s.addEventListener("click",k);s.classList.add("is-hidden");function C(){s.classList.toggle("is-hidden",n.children.length===0||n.children.length>=i)}async function k(){o+=1,await d(l,o),x()}async function d(e,r){try{c();const t=await S(e,r);(!t.hits||t.hits.length===0)&&a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"}),i=t.totalHits,q(t),C(),M()&&a.info({message:"We're sorry, but you've reached the end of search results."})}catch(t){console.error("Error fetching images:",t),a.error({title:"Error",message:"An unexpected error occurred while fetching images. Please try again.",position:"center"})}finally{c()}}function H(e){e.preventDefault();const t=document.querySelector(".search-input").value.trim();if(t==="")return a.error({title:"Error",message:"Please enter a keyword before submitting the form.",position:"center"}),!1;n.innerHTML="",o=1,l=t,i=0,d(t,o)}function M(){return i<=o*15&&i!==0}function v(){const e=document.querySelector(".card-list li");return e?e.getBoundingClientRect().height:0}function x(){const e=v();e>0&&window.scrollBy(0,e*2)}
//# sourceMappingURL=commonHelpers3.js.map
