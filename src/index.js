import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {findPicture} from './axios.js';


const searchForm = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const loadEl = document.querySelector('load-more');
const galleryEl = document.querySelector('gallery');
const boxEl = document.querySelector('box');


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

const options = {
  rootMargin: '100px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(sectionObserver, options);
function sectionObserver(enteries, observer) {
    enteries.forEach(entry => {
        console.log(entry)
        if (!entry.isIntersectin) {
            return
        }
        console.log(entry);
        headelMore(observer)
    }
 
      
    )
    
}
