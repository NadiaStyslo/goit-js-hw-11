import './index.css';
import { fetchImages } from './axios';
import Notiflix from 'notiflix/build/notiflix-notify-aio'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'

const refs = {
    searchForm: document.querySelector('.search-form'),
    GalleryContainer: document.querySelector('.gallery'),
    LoadMoreBtn: document.querySelector('.load-more'),
    
  };
  const galleryEl = document.querySelector('.gallery .a')
  console.log(refs.searchForm)
  console.log(refs.GalleryContainer)
  console.log(refs.LoadMoreBtn)

  let searchQuery;
  let page = 1
  const perPage = 40
  let simpleLightBox

  refs.searchForm.addEventListener('submit', onSearch);
  refs.LoadMoreBtn.addEventListener('click', onLoadMoreBtn)

  function onSearch(e) {
    e.preventDefault();
    page = 1
    searchQuery = e.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);
  refs.GalleryContainer.innerHTML = ''
  refs.LoadMoreBtn.classList.add('is-hidden')
  fetchImages()
    if (searchQuery === '') {
      return Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');

    }

    fetchImages(searchQuery, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      } else {
        renderGallery(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)

        if (data.totalHits > perPage) {
          refs.LoadMoreBtn.classList.remove('is-hidden')
        }
      }
    })
    .catch(error => console.log(error))
}

function onLoadMoreBtn() {
  page += 1
  simpleLightBox.destroy()
  fetchImages(searchQuery, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits)
      simpleLightBox = new SimpleLightbox('.gallery a').refresh()

      const totalPages = Math.ceil(data.totalHits / perPage)

      if (page > totalPages) {
        
         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
         refs.LoadMoreBtn.classList.add('is-hidden')
      }
    })
    .catch(error => console.log(error))
}

      function renderGallery(images) {
        const markup = images
          .map(image => {
            const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
            return `
              <a class="gallery__link" href="${largeImageURL}">
                <div class="gallery-item" id="${id}">
                  <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                  <div class="info">
                    <p class="info-item"><b>Likes</b>${likes}</p>
                    <p class="info-item"><b>Views</b>${views}</p>
                    <p class="info-item"><b>Comments</b>${comments}</p>
                    <p class="info-item"><b>Downloads</b>${downloads}</p>
                  </div>
                </div>
              </a>
            `
          })
          .join('')
      
        refs.GalleryContainer.insertAdjacentHTML('beforeend', markup)
      }