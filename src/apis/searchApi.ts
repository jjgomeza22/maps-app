import axios from 'axios';
import { envs } from '../config/envs';


const searchApi = axios.create({
    baseURL: 'https://api.maptiler.com/geocoding',
    params: {
        language: 'es',
        key: envs.GEO_KEY
    }
});

export default searchApi;