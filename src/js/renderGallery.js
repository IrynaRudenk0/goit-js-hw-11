const galleryContainer = document.querySelector('.gallery');

export default function renderGallery(array) {
    console.log(array);

    const markup = array.map((image) => {
  
       const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
        

        const markup = `
    <div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
    <img class="photo-card_img" src="${webformatURL}" alt="${tags}" loading = "lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b class="info-item_name">Likes</b>
            <span class="info-item_quantity">${likes}</span>
        </p>
        <p class="info-item">
            <b class="info-item_name">Views</b>
            <span class="info-item_quantity">${views}</span>
        </p>
        <p class="info-item">
            <b class="info-item_name">Comments</b>
            <span class="info-item_quantity">${comments}</span>
        </p>
        <p class="info-item">
            <b class="info-item_name">Downloads</b>
            <span class="info-item_quantity">${downloads}</span>
        </p>
    </div>
</div>`

        return markup;
    }).join("");

    galleryContainer.insertAdjacentHTML('beforeend', markup);
}