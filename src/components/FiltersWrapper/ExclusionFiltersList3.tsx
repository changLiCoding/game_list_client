import { Tag } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import useArrayMemo from './useArrayMemo';
import useTestHook from './useTestHook';
import { useAppSelector } from '@/app/hooks';
import { incrementItem, toggleItem } from '@/app/store';

export type ExclusionFiltersList2Props = {
  title: string;
  entries: string[];
  states: StateObject2<string[]>[];
  included: string[];
  excluded: string[];
  // states: StateObject2<string[]>[];
  onChange: (included: string[], excluded: string[]) => void;
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

function Entry({ title, onChange, state }: EntryProps2) {
  return (
    <Tag style={{ userSelect: 'none' }} color="default">
      {title}
    </Tag>
  );
}

// options={data?.getGameFilters.platforms ?? []}
// includedValues: gameFilters.platforms || [],
// excludedValues: gameFilters.excludedPlatforms || [],

export default function ExclusionFiltersList3({
  title,
  entries,
  states,
  included,
  excluded,
  onChange,
  setFunc,
}: ExclusionFiltersList2Props) {
  const dispatch = useDispatch();
  const bigTest = useAppSelector((state) => state.bigTest);
  const t = useStore();

  let color;
  if (bigTest.state === 'off') {
    color = 'default';
  } else if (bigTest.state === 'included') {
    color = 'green';
  } else if (bigTest.state === 'excluded') {
    color = 'red';
  }

  return (
    <div>
      <h3 className={filterFieldStyles.h3FilterFieldTitle}>{title}</h3>
      <div style={{ width: '600px' }}>
        <Tag
          style={{ userSelect: 'none' }}
          color="default"
          onClick={() => {
            dispatch(
              toggleItem({
                payload: {
                  category: 'genres',
                  entry: 'Puzzle',
                },
              })
            );
          }}
        >
          Toggle
        </Tag>
        <Tag
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
          Increment
        </Tag>
        <Tag style={{ userSelect: 'none' }} color={color}>
          State
        </Tag>
      </div>
    </div>
  );
}
