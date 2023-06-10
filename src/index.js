import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiPixabay from './js/ApiPixabay';
import renderGallery from './js/renderGallery';


const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
//const loader = document.querySelector('.loader');

const apiPixabay = new ApiPixabay();
const lightbox = new SimpleLightbox('.gallery a');


loadMoreBtn.classList.add("is-hidden");
searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', fetchImages);


function onSearch(e) {
   e.preventDefault();

   apiPixabay.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

   if (apiPixabay.searchQuery === '') {
      return Notify.info(`Please, enter what you want to search`);
      };
  
   apiPixabay.resetPage();
   clearGalleryContainer();
   fetchImages();
 }

function fetchImages() {
  
  return apiPixabay.fetchImages().then((response) => {
    
    const totalHits = response.data.totalHits;
    renderGallery(response.data.hits);

    if (totalHits === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
    if (apiPixabay.page === 1) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      loadMoreBtn.classList.remove("is-hidden");
    }
      
    if (apiPixabay.page !== 1) {
      smoothScroll();
    }

    if (galleryContainer.children.length === totalHits) {
      loadMoreBtn.classList.add("is-hidden")
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
   
    apiPixabay.incrementPage();
    lightbox.refresh();
  });
  } 

function clearGalleryContainer() {
  galleryContainer.innerHTML = '';
}

function smoothScroll() {
  const { height: cardHeight } = galleryContainer.firstElementChild.getBoundingClientRect();
    

    window.scrollBy({
       top: cardHeight * 2,
       behavior: "smooth",
     });
}

