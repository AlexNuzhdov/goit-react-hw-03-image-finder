import axios from 'axios';


const REACT_APP_API_KEY = `29509763-c1d5e919ecc6f4e5ff4ac08bb`;
const BASE_URL = axios.defaults.baseURL = 'https://pixabay.com/api/';


export const fetchImages = async ( query, page, perPage) => {
    const response = await axios.get(`${BASE_URL}/`, {
      params: {
        key: `${REACT_APP_API_KEY}`,
        image_type: 'photo',
        orientation: 'horizontal',
        q: query,
        page: page,
        per_page: perPage,
      }
    })
    return response.data;
  };