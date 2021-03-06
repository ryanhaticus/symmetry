import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { useProjectHandler } from './ProjectHandler';

const SearchContext = createContext(null);

export interface SearchResult {
  label: string;
  description: string;
  href: string;
}

interface SearchHandlerContextType {
  searched: SearchResult[];
  searching: boolean;
  searchError: string[];
  search: (originPreference: string, topicSearchTerm: string) => Promise<void>;
  setSearched: Dispatch<SetStateAction<SearchResult[]>>;
}

const SearchHandler = ({ children }) => {
  const [searched, setSearched] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string[]>([]);
  const { activeProject } = useProjectHandler();
  useEffect(() => {
    if (activeProject == null) {
      setSearchError([]);
      setSearched([]);
      setSearching(false);
    }
  }, [activeProject]);
  useEffect(() => {
    setSearchError([]);
  }, [activeProject]);
  const search = async (originPreference: string, topicSearchTerm: string) => {
    if (originPreference === '') {
      setSearchError(['Please select an origin preference.']);
      return;
    }
    if (topicSearchTerm.length < 6) {
      setSearchError([
        'Please provide a research topic that is at least 6 characters long.'
      ]);
      return;
    }
    setSearching(true);
    const fetchResults = await fetch(
      `/api/search?topicSearchTerm=${topicSearchTerm}&originPreference=${originPreference}`
    );
    try {
      const { results } = await fetchResults.json();
      setSearchError([]);
      setSearched(results);
      setSearching(false);
    } catch {
      setSearchError(['An error occurred while searching.']);
      setSearching(false);
    }
  };
  return (
    <SearchContext.Provider
      value={{
        searched,
        searching,
        searchError,
        search,
        setSearched
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchHandler;

export const useSearchProvider = () =>
  useContext<SearchHandlerContextType>(SearchContext);
