import { refs } from "./refs";

function CardsListMarkup(array) {
 return array.map(({ webformatURL,largeImageURL,tags,likes,views,comments,downloads }) => {
        return `
        <a class="gallery__link" href="${largeImageURL}">
   <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>
</a> 
`;
    })
    .join(''); 
};

function ClearGallery() {
    refs.gallery.innerHTML = " ";
}

function isHiddenLoadMoreBtn() {
  refs.LoadMoreBtn.classList.add('visually-hidden');
}

function isVisibleLoadMoreBtn() {
    refs.LoadMoreBtn.classList.remove('visually-hidden');
}
    export { isHiddenLoadMoreBtn,isVisibleLoadMoreBtn,CardsListMarkup,ClearGallery}