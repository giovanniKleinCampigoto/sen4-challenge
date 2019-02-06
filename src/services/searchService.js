import Api from '../utils/api';

class SearchService {
    static searchByTerm(term) {
        return Api.get(`term=${encodeURIComponent(term)}&limit=10`);
    }
}

export default SearchService;