import axios from 'axios';

const API_KEY = '37165657-d00dd23d90c619afdf7392cca';
const BASE_URL = 'https://pixabay.com/api/';
const PARAM = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';



export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

async fetchImages() {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${PARAM}&page=${this.page}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
            console.log(error);
  }
}

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}