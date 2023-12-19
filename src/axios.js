import axios from 'axios'
export { fetchImages }



axios.defaults.baseURL = 'https://pixabay.com/api/';
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '41332989-a42d222afbe6c07d8529bbab0';
   async function fetchImages(searchQuery, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  )
  return response
}


