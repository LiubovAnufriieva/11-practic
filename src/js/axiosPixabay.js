import axios from 'axios';

const apiKey = '43230635-158e2f6795128fbec19d81d21';
const url = 'https://pixabay.com/api/?';

let page = 1;

export async function fetchCards(searchQuery, page = 1) {
  try {
    const response = await axios.get(url, {
      params: {
      key: apiKey,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
    });
    if (!response.data.hits) {
      throw new Error('Failed to fetch images. Please try again later.');
    }

    if (page ===1){
      resetPage();
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images. Please try again later.');
  }
}

function resetPage(){
  page = 1;
}