import Api from '../utils/api';

class SearchService {
    static searchByTermMusics(term) {
        return Api.get(`search/?term=${encodeURIComponent(term)}&limit=5&media=music`);
    }

    static searchByTermArtists(term) {
        return Api.get(`search/?term=${encodeURIComponent(term)}&limit=2&entity=allArtist&attribute=allArtistTerm`);
    }

    static getArtistById(artistId) {
        return Api.get(`lookup/?amgArtistId=${artistId}&entity=album&limit=4`)
    }

    static getArtistDetails(term) {        
        return Api.get(`search/?term=${encodeURIComponent(term)}&limit=5&entity=allArtist&attribute=allArtistTerm`);
    }

    static getArtist(term) {        
        return Api.get(`search/?term=${encodeURIComponent(term)}&limit=5&entity=musicArtist&attribute=artistTerm`);
    }
}

export default SearchService;