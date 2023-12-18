import axios from "axios";
//import Notiflix from "notiflix";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41332989-a42d222afbe6c07d8529bbab0'


export async function findPicture(query, page) {
    const options = {
        key: API_KEY,
         q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
    }
      try {
    const res = await axios.get(`${BASE_URL}?${options}`);
    return await res.data;
  } catch (error) {
    throw new Error(error);
  }
}
  

