import { useQuery, ApolloQueryResult } from '@apollo/client';

import { GET_GLOBAL_SOCIALS } from './queries';
import { getTokenFromLocalStorage } from '@/constants';
import { Social as SocialType } from '@/graphql/__generated__/graphql';

type UseGlobalSocialsType = {};

const useGlobalSocials = (): UseGlobalSocialsType => {
  const { data, loading, refetch, fetchMore } = useQuery(GET_GLOBAL_SOCIALS, {
    variables: {
      limit: 20,
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
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const socials = data ? (data.getGlobalSocials as SocialType[]) : [];

      return {
        socials,
        loading,
        refetch,
        fetchMore,
      };
    }
    data.getGlobalSocials.errors = ['Unknown error'];
    return {
      socials: data.getGlobalSocials
        ? (data.getGlobalSocials as SocialType[])
        : [],
      loading,
      refetch,
      fetchMore,
    };
  }
};

export default useGlobalSocials;
