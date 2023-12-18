import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {findPicture} from './axios.js';


const searchForm = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const loadEl = document.querySelector('load-more');
const galleryEl = document.querySelector('gallery');
const boxEl = document.querySelector('box');

let page = 1;
let currentSum = 0;
//
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

loadEl.addEventListener("click", onLoad);
searchForm.addEventListener('sumbit', onSumbit)

function onSumbit(evt) {
    evt.preventDefault();
    galleryEl.innerHTML = "";
    localStorage.clear()

    const enterValue = evt.currentTarget[0].value.trim()
    if (enterValue === '') {
    loadEl.classList.add('visibility-hidden');
    return Notiflix.Notify.failure('All fields must be filled!');
  }
  localStorage.setItem('key', enteredValue);
  render();
  searchForm.reset();
}
function createGallery(arr) {
    return arr
        .map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => 
      `<div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"> <b>Likes</b><br>${likes}</br> </p>
            <p class="info-item"> <b>Views</b><br>${views}</br>
            </p>
            <p class="info-item"> <b>Comments</b><br>${comments}</br>
            </p>
            <p class="info-item"><b>Downloads</b><br>${downloads}</br>
            </p>
          </div>
        </a>
      </div>`
    ).join('')
}

// const options = {
//   rootMargin: '100px',
//   threshold: 1.0,
// };

// const observer = new IntersectionObserver(sectionObserver, options);
// function sectionObserver(enteries, observer) {
//     enteries.forEach(entry => {
//         console.log(entry)
//         if (!entry.isIntersectin) {
//             return
//         }
//         console.log(entry);
//         headelMore(observer)
//     }
//     ) 
// }
// let page = 1;
// let currentQuery = '';
// let availablePages = 0;

// const lightbox = new SimpleLightbox('.gallery a');
// searchForm.addEventListener('sumbit', handleSearch);

// function handleSearch(evt) {
//     evt.preventDefault()
//       currentQuery = evt.currentTarget.elements.searchQuery.value;
//   gallery.innerHTML = '';
//   page = 1;
//     evt.currentTarget.reset();
    
//     findPicture(currentQuery, page)
//         .then(data => {
//             if (data.hits.length === 0) {
//             Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//             }
//             galleryEl.insertAdjacentHTML('beforeend',createGallery(data))
//              availablePages = Math.ceil(data.totalHits / 40);
//       lightbox.refresh();

//     })
// }