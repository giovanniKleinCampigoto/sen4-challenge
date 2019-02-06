import Api from '../utils/api';

class SearchService {
    static searchByTerm(term) {
        return Api.get(`term=${encodeURIComponent(term)}`);
    }
}

export default SearchService;