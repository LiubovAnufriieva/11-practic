
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

import onSearch from "./js/pixabay-api";

const form = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

form.addEventListener("submit", onFormSubmit);
loader.hidden = true;

function onFormSubmit(evt) {
    evt.preventDefault();
    galleryList.innerHTML = "";
    loader.hidden = false;
    const { searchRequest } = evt.currentTarget.elements;
    let searchQuery = searchRequest.value;
    onSearch(searchQuery);
    form.reset();
}


