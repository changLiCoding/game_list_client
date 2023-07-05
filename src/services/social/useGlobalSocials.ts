import {
  useQuery,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
} from '@apollo/client';

import { GET_GLOBAL_SOCIALS } from './queries';
import { getTokenFromLocalStorage } from '@/constants';
import { Social as SocialType } from '@/graphql/__generated__/graphql';

type UseGlobalSocialsType = {
  socials: SocialType[];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<{ getGlobalSocials: SocialType[] }>>;
  fetchMore: <
    TFetchData = {
      getGlobalSocials: SocialType[];
    },
    TFetchVars extends OperationVariables = {
      limit: number;
      offset: number;
    }
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
      updateQuery: (
        previousQueryResult: TFetchData,
        options: {
          fetchMoreResult?: TFetchData;
          variables?: TFetchVars | undefined;
        }
      ) => TFetchData;
    }
  ) => Promise<ApolloQueryResult<TFetchData>>;
};

const useGlobalSocials = (): UseGlobalSocialsType => {
  const { data, loading, refetch, fetchMore } = useQuery(GET_GLOBAL_SOCIALS, {
    variables: {
      limit: 5,
      offset: 0,
    },
    context: getTokenFromLocalStorage(),
  });

  try {
    if (!data || !data.getGlobalSocials) {
      throw new Error('Error getting socials');
    }
    const socials = data.getGlobalSocials;
    return {
      socials,
      loading,
      refetch,
      fetchMore: fetchMore as UseGlobalSocialsType['fetchMore'], // Type assertion
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const socials = data ? (data.getGlobalSocials as SocialType[]) : [];

      return {
        socials,
        loading,
        refetch,
        fetchMore: fetchMore as UseGlobalSocialsType['fetchMore'], // Type assertion
      };
    }
    data.getGlobalSocials.errors = ['Unknown error'];
    return {
      socials: data.getGlobalSocials
        ? (data.getGlobalSocials as SocialType[])
        : [],
      loading,
      refetch,
      fetchMore: fetchMore as UseGlobalSocialsType['fetchMore'], // Type assertion
    };
  }
};

export default useGlobalSocials;
