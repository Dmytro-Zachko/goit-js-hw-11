import { FetchPixabay } from "./js/fetch";
import { refs } from "./js/refs";
import { ClearGallery, CardsListMarkup, isHiddenLoadMoreBtn, isVisibleLoadMoreBtn } from "./js/markup";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { CoolScroll } from "./js/Coolscroll";


refs.form.addEventListener('submit', OnFormSubmit);
refs.LoadMoreBtn.addEventListener('click', LoadMoreClick)

isHiddenLoadMoreBtn();
CoolScroll();
let searchQuery = '';
let page = 1;

async  function OnFormSubmit (e) {
    e.preventDefault()
    searchQuery = e.currentTarget.elements.searchQuery.value
    ClearGallery();

    if (searchQuery) {
        try {
            const response = await FetchPixabay(searchQuery, page)
             if (response.data.totalHits === 0) {
                Notify.failure  ("Sorry, there are no images matching your search query. Please try again.")
             }
            else  {
              refs.gallery.insertAdjacentHTML('beforeend', CardsListMarkup(response.data.hits));
                lightbox.refresh();
                 Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
                 if (response.data.totalHits > 40) {
                     isVisibleLoadMoreBtn();
                 } else {
                     isHiddenLoadMoreBtn();
                 }
            }
          
        } catch (error) {
            Notify.failure(error)
        }
        }
    }

async  function LoadMoreClick() {
    page += 1

try {
    const response = await FetchPixabay(searchQuery, page);
    const Totalpages = response.data.totalHits / 40;
    if (Totalpages < page) {
        isHiddenLoadMoreBtn();
        Notify.warning("We're sorry, but you've reached the end of search results.")
    } else {
     refs.gallery.insertAdjacentHTML('beforeend', CardsListMarkup(response.data.hits));
    lightbox.refresh();   
    }
} catch (error) {
  Notify.failure(error)  
}
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: "img",    
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,    
    });