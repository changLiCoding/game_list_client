import { useState } from 'react';
import { Tag } from 'antd';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import { EntryProps, ExclusionFiltersListProps, State, StateId } from './types';
import { remove } from '@/utils/utils';

const states: Record<State['id'], State> = {
  not_added: {
    id: 'not_added',
    color: 'default',
  },

  included: {
    id: 'included',
    color: 'green',
  },

  excluded: {
    id: 'excluded',
    color: 'red',
  },
};

function Entry({ title, onChange }: EntryProps) {
  const [state, setState] = useState<State>(states.not_added);

  const transitionState = () => {
    let newState: State;
    if (state.id === 'not_added') {
      newState = states.included;
    } else if (state.id === 'included') {
      newState = states.excluded;
    } else {
      newState = states.not_added;
    }

    onChange(state, newState);
    setState(newState);
  };

  return (
    <Tag
      style={{ userSelect: 'none' }}
      color={state.color}
      onClick={transitionState}
    >
      {title}
    </Tag>
  );
}

export default function ExclusionFiltersList({
  title,
  entries,
  onChange,
}: ExclusionFiltersListProps) {
  /*
    activeTag = {
      title: title,
      state: included
    },
    activeTag = {
      title: title,
      state: excluded
    }
    
    ---------------
    
    included: []
    excluded: []
    
    ---

    Map<State, string[]>

  */
  /*
    Put the entire list into memory (Map?)
    - Since we have to render each tag - we loop through that map instead, which will have extra data (state) so we can render accordantly
    - To track the state of something, we can have an array of indexes that point to specific entry in the map
    - That way we can loop through only the ones were interested in and have direct access to it
    TODO: Find out how to structure this
  */

  // const [map, setMap] = useState(new Map<string, State>());
  // const [map2, setMap2] = useState(new Map<State, string[]>());
  const [map, setMap] = useState<Map<StateId, string[]>>(() => {
    const initialMap = new Map<StateId, string[]>();

    // Loop through the states object
    Object.keys(states).forEach((key) => {
      const state = states[key as keyof typeof states];
      if (state.id !== 'not_added') {
        initialMap.set(state.id, []);
      }
    });

    return initialMap;
  });
  // const [map3, setMap3] = useState(new Map<State, Map<string, string[]>>());

  // const entriresMemo = useMemo(() => {
  //   const entriesWithIndex = entries.map((entry, index) => {
  //     return {
  //       index,
  //       entry,
  //     };
  //   });

  //   return entriesWithIndex;
  // }, [entries]);

  // const onInternalChange = (entry: string, newState: State) => {
  //   console.log(entry, newState.id);
  //   if (newState.id === 'not_added') {
  //     map.delete(entry);
  //   } else {
  //     const found = map.get(entry);
  //     if (!found) {
  //       map.set(entry, newState);
  //     }
  //   }

  const onInternalChange = (
    prevState: State,
    newState: State,
    entry: string
  ) => {
    console.log('');
    console.log('');
    console.log(prevState.id, newState.id, entry);
    if (prevState.id !== 'not_added') {
      const t = map.get(prevState.id);
      if (t) {
        map.set(prevState.id, remove(t, entry));
      }
    }

    if (newState.id !== 'not_added') {
      const newArr = map.get(newState.id);
      console.log('newArr', newArr);
      console.log('entry', entry);
      if (newArr) {
        const copy = [...newArr];
        copy.push(entry);
        console.log('newArr found');
        console.log('Array.isArray', Array.isArray(newArr));
        // newArr.push(`1`);
        console.log('after push: ', newArr);
        map.set(newState.id, copy);
      }
    }
    // if (newState.id === 'not_added') {
    //   map.delete(entry);
    // } else {
    //   const found = map.get(entry);
    //   if (!found) {
    //     map.set(entry, newState);
    //   }
    // }

    console.log('Map (included): ', map.get('included'));
    console.log('Map (excluded): ', map.get('excluded'));
    console.log('Map: ', map);
    onChange(map.get('included'), map.get('excluded'));
  };

  return (
    <div>
      <h3 className={filterFieldStyles.h3FilterFieldTitle}>{title}</h3>
      <div style={{ width: '600px' }}>
        {entries.map((entry) => (
          <Entry
            key={entry}
            title={entry}
            onChange={(prevState, state) =>
              onInternalChange(prevState, state, entry)
            }
          />
        ))}
      </div>
    </div>
  );
}
