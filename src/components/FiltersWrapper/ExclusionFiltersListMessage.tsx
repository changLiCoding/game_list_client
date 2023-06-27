import { Tag } from 'antd';
import { useMemo } from 'react';

import { useDispatch, useStore } from 'react-redux';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';

import { useAppSelector } from '@/app/hooks';
import { incrementItem } from '@/app/store';

export type ExclusionFiltersListMessageProps = {
  title: string;
  entries: string[];
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
}: // filterValue,
// predicate,
ExclusionFiltersListMessageProps) {
  const dispatch = useDispatch();
  const bigTest = useAppSelector((state) => state.bigTest);
  const t = useStore();

  const entriesMemo = useMemo(() => {
    return entries.map((entry) => {
      return (
        <Tag
          key={entry}
          style={{ userSelect: 'none' }}
          color="default"
          onClick={() => {
            dispatch(
              incrementItem({
                category: 'genres',
                entry: 'Puzzle',
              })
            );
          }}
        >
          {entry}
        </Tag>
      );
    });
  }, [dispatch, entries]);

  return (
    <div>
      <h3 className={filterFieldStyles.h3FilterFieldTitle}>{title}</h3>
      <div style={{ width: '600px' }}>{entriesMemo}</div>
    </div>
  );
}
