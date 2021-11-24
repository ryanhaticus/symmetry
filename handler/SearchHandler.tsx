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
  originPreference: string;
  setOriginPreference: Dispatch<SetStateAction<string>>;
  searchError: string[];
  search: () => Promise<void>;
  setTopicSearchTerm: Dispatch<SetStateAction<string>>;
  setSearched: Dispatch<SetStateAction<SearchResult[]>>;
}

const SearchHandler = ({ children }) => {
  const [searched, setSearched] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [originPreference, setOriginPreference] = useState<string>('');
  const [searchError, setSearchError] = useState<string[]>([]);
  const [topicSearchTerm, setTopicSearchTerm] = useState<string>('');
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
  const search = async () => {
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
        originPreference,
        setOriginPreference,
        searchError,
        search,
        setTopicSearchTerm,
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
