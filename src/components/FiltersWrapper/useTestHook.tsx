import { useCallback, useEffect, useMemo } from 'react';
import { isExpired } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/hooks';
import { setLoading, setUser } from '@/features/userSlice';
import useGetUser from '@/services/user/useGetUser';
import type { UseTokenAuthType } from '@/hooks/types';
import type { StateObject2 } from './ExclusionFiltersList2';

export default function useTestHook(statesArrayMemo: StateObject2<string[]>[]) {
  // If something has changed, we need to 'rebuild' the states.
  const data = useMemo(() => {
    console.log('Test changed in useMemo');

    const initialMap = new Map<string, number>(); // EntryId -> State
    const initialMap2 = new Map<string, string[]>(); // StateID -> string[]

    // entries.forEach((entry) => {
    //   initialMap.set(entry, undefined);
    // });

    if (statesArrayMemo) {
      statesArrayMemo.forEach((state) => {
        initialMap2.set(state.id, state.values);
        state.values.forEach((value, index) => {
          initialMap.set(value, index);
        });
      });
    }

    console.log('initialMap ', initialMap);
    console.log('initialMap2 ', initialMap2);

    return {
      initialMap,
      initialMap2,
    };
  }, [statesArrayMemo]);

  const reduce = useCallback(() => {
    console.log('reduce');

    const included = [];
    const excluded = [];
    for (const s of data.initialMap.entries()) {
      if (s[1] === 0) {
        included.push(s[0]);
      } else {
        excluded.push(s[0]);
      }
    }
    return [included, excluded];
  }, [data]);

  const onClick = (entry, index) => {
    console.log('got clicked', entry, index);
    const currentState = data.initialMap.get(entry);
    console.log('start', currentState);
    if (currentState !== undefined) {
      if (currentState >= 1) {
        data.initialMap.delete(entry);
      } else {
        data.initialMap.set(entry, currentState + 1);
      }
    } else {
      data.initialMap.set(entry, 0);
    }
    console.log('end', currentState);
    return data.initialMap.get(entry);
  };

  return { data, onClick, reduce };
}
