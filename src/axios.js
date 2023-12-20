
  
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41332989-a42d222afbe6c07d8529bbab0';

export function getPhotos(q, page) {
  return axios.get(`${BASE_URL}`, {
    params: {
      q,
      key: API_KEY,
      page,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
}
