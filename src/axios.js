import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchCards } from './js/axiosPixabay';
import { galleryList, renderCards, toggleLoader } from './js/axiousRender';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.getElementById('load-more-btn'); 
let page = 1;
let currentSearchQuery;
let totalHits;

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);
loadMoreBtn.classList.add('is-hidden');

function renderLoadMoreButton() {
  loadMoreBtn.classList.toggle('is-hidden', galleryList.children.length === 0 || galleryList.children.length >= totalHits);
}

async function loadMoreImages() {
  page += 1;
  await fetchData(currentSearchQuery, page);
  scrollToNewCards();
}

async function fetchData(searchQuery, pageNum) {
  try {
    toggleLoader();
    const data = await fetchCards(searchQuery, pageNum);

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
      });
    }
    totalHits = data.totalHits;

    renderCards(data);
    renderLoadMoreButton();

    if (isLastPage()) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'An unexpected error occurred while fetching images. Please try again.',
      position: 'center',
    });
  } finally {
    toggleLoader();
  }
}

function onSearchFormSubmit(event) {
  event.preventDefault();

  const searchInput = document.querySelector('.search-input');
  const userSearchQuery = searchInput.value.trim();

  if (userSearchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a keyword before submitting the form.',
      position: 'center',
    });
    return false;
  }

  galleryList.innerHTML = '';

  page = 1;
  currentSearchQuery = userSearchQuery; 
  totalHits = 0;
  fetchData(userSearchQuery, page);
}

function isLastPage() {
  return totalHits <= page * 15 && totalHits !== 0;
}

function getCardHeight() {
  const firstCard = document.querySelector('.card-list li');
  if (firstCard) {
    const cardRect = firstCard.getBoundingClientRect();
    return cardRect.height;
  }
  return 0;
}

function scrollToNewCards() {
  const cardHeight = getCardHeight();
  if (cardHeight > 0) {
    window.scrollBy(0, cardHeight * 2);
  }
}