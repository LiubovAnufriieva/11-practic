import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryList = document.querySelector('.card-list');
const loader = document.querySelector('.loader');

const instance = new SimpleLightbox('.card-item a', {
  captionsData: 'alt',
  captionDelay: 250, 
});

export function renderCards(data) {
  if (!data.hits) {
    return iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'center',
    });
  }
  const markup = getMarkup(data.hits);
  galleryList.insertAdjacentHTML('beforeend', markup);
  instance.refresh();
}

function getMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="card-item">
  <a href=${largeImageURL}
    ><img src=${webformatURL} alt="${tags}" height="200"/>
    <ul class="card-info">
      <li>
        Likes
        <p>${likes}</p>
      </li>
      <li>
        Views
        <p>${views}</p>
      </li>
      <li>
        Comments
        <p>${comments}</p>
      </li>
      <li>
        Downloads
        <p>${downloads}</p>
      </li>
    </ul></a
  >
</li>`
    )
    .join('');
}

export function toggleLoader() {
  console.log('toggleLoader');
  loader.classList.toggle('is-hidden');
}