import axios from "axios"

function FetchPixabay(searchQuery, page) {
    const KEY = '34547023-f6c97b34ab078dd7626ca2ed4'
    const BASE_URL = 'https://pixabay.com/api/'
    const options =  'image_type=photo&orientation=horizontal&safesearch=true'
   return axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}&${options}&per_page=40&page=${page}`)
        
}

export { FetchPixabay }