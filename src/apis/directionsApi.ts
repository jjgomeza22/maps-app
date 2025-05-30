import axios from 'axios';


const directionsApi = axios.create({
    baseURL: 'http://router.project-osrm.org/route/v1/driving',
    params: {
        overview: 'full',
        geometries: 'geojson'
    },
});

export default directionsApi;