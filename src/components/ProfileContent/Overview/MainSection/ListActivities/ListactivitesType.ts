import {
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
} from '@apollo/client';

import type { Social as SocialType } from '@/graphql/__generated__/graphql';

export type ListActivitiesProps = {
  socials: SocialType[];
  loading: boolean;
  refetch: () => Promise<
    ApolloQueryResult<{
      getGlobalSocials: SocialType[];
    }>
  >;
  fetchMore: <
    TFetchData = {
      getGlobalSocials: SocialType[];
    },
    TFetchVars extends OperationVariables = {
      limit: number;
      offset: number;
      type?: string | undefined;
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
  fetchLimitation: number;
};
