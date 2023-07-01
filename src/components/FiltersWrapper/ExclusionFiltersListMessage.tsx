import { Tag } from 'antd';
import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';

import { incrementItem } from '@/app/store';
import { useAppSelector } from '@/app/hooks';
import useArrayMemo from './useArrayMemo';
import { CorrectFiltersKeys } from '@/features/homeGameFiltersSlice';

export type ExclusionFiltersListMessageProps = {
  title: string;
  entries: string[];
  states: StateObject2<string[]>[];
  category: CorrectFiltersKeys;
};

export type EntryProps2 = {
  title: string;
  // states: StateObject2<string[]>[];
  state: StateObject2<string[]>;
  onChange: () => void;
};

export type StateObject2<ValueType> = {
  id: string;
  values: ValueType;
  color: string;
};

export default function ExclusionFiltersListMessage({
  title,
  entries,
  states,
  category,
}: // filterValue,
// predicate,
ExclusionFiltersListMessageProps) {
  const dispatch = useDispatch();
  const homeGameFilters = useAppSelector((state) => state.homeGameFilters);

  // Checks if the states array has changed
  const statesArrayMemo = useArrayMemo<
    ExclusionFiltersListMessageProps['states']
  >(
    () => states,
    states,
    (prev, next) => {
      if (prev.length !== next.length) return true;

      for (let i = 0; i < prev.length; i += 1) {
        if (prev[i].values !== next[i].values) {
          return true;
        }
      }

      return false;
    }
  );

  const entriesMemo = useMemo(() => {
    console.log('running');
    return entries.map((entry) => {
      console.log('is everyone running?');
      let color;
      if (states[0].values.includes(entry)) {
        color = 'green';
      } else if (states[1].values.includes(entry)) {
        color = 'red';
      } else {
        color = 'default';
      }
      return (
        <Tag
          key={entry}
          style={{ userSelect: 'none' }}
          color={color}
          onClick={() => {
            dispatch(
              incrementItem({
                category,
                entry,
              })
            );
          }}
        >
          {entry}
        </Tag>
      );
    });
  }, [category, dispatch, entries, states]);

  return (
    <div>
      <h3 className={filterFieldStyles.h3FilterFieldTitle}>{title}</h3>
      <div style={{ width: '600px' }}>{entriesMemo}</div>
    </div>
  );
}
