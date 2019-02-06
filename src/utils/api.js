import axios from 'axios';

const BASE_URL = 'https://itunes.apple.com/search';

class Api {
    static get (uri) {
        return axios.get(`${BASE_URL}/?${uri}`);
    }
}

export default Api;