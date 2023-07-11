import { useQuery } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_GAME_FILTERS } from './queries';

export default function useGetFilters() {
  const query = useQuery(GET_GAME_FILTERS, {
    context: getTokenFromLocalStorage(),
  });

  // TODO: This currently just refetches, but in the future the plan is to fetch the extra filters (companies, publishers, etc.)
  const fetchExtraFilters = () => {
    query.refetch();
  };

  return { query, fetchExtraFilters };
}
