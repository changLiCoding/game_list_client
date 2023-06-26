import { Tag } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import useArrayMemo from './useArrayMemo';
import useTestHook from './useTestHook';

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

// export type StateObject<ValueType> = {
//   [key: string]: {
//     values: ValueType[];
//     color: string;
//   };
// };

export type StateObject2<ValueType> = {
  id: string;
  values: ValueType;
  color: string;
};

// type EntryProps2StateIDs = {
//   [K in keyof EntryProps2['states']]: EntryProps2['states'][number]['id'];
// };

// export type YourObject<T extends string = string> = {
//   states: StateObject<T>[];
// };

function Entry({
  title,
  onChange,
  state,
  index,
  controller,
  afterClick,
}: EntryProps2) {
  // console.log('Current state ', title, currentState);
  const [stateIndex, setStateIndex] = useState(0);
  const [color, setColor] = useState('');
  const transitionState = () => {
    // setStateIndex((prevState) => {
    //   if (prevState === undefined) {
    //     return 0;
    //   }
    //   if (prevState === states.length - 1) {
    //     return undefined;
    //   }
    //   return prevState + 1;
    // });
    // TODO: Let controller know I want to transition
  };
  console.log('Entry here', title, state);
  return (
    <Tag
      style={{ userSelect: 'none' }}
      color={color}
      onClick={() => {
        const statee = controller.onClick(title, index);
        console.log('new state = ', statee);
        setStateIndex(statee);
        if (statee === undefined) {
          setColor('default');
        } else {
          setColor(statee === 0 ? 'green' : 'red');
        }
        afterClick();
        // console.log('d');
      }}
    >
      {title}
    </Tag>
  );
}

// options={data?.getGameFilters.platforms ?? []}
// includedValues: gameFilters.platforms || [],
// excludedValues: gameFilters.excludedPlatforms || [],

// entries={data?.getGameFilters.platforms ?? []}
// states={[
//   {
//     id: 'included',
//     values: gameFilters.platforms || [],
//     color: 'green',
//   },
//   {
//     id: 'excluded',
//     values: gameFilters.excludedPlatforms || [],
//     color: 'red',
//   },
// ]}

export default function ExclusionFiltersList2({
  title,
  entries,
  states,
  included,
  excluded,
  onChange,
  setFunc,
}: ExclusionFiltersList2Props) {
  // This will only get run if the included or excluded array is changed (User selected an option with the other fields/cleared all filters)
  const statesArrayMemo = useArrayMemo(
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

  const testHook = useTestHook(statesArrayMemo);

  const test = useMemo(() => {
    console.log('render test');
    return entries.map((entry, indexx) => {
      return (
        <Entry
          key={entry}
          title={entry}
          controller={testHook}
          index={indexx}
          afterClick={() => {
            const t = testHook.reduce();
            console.log('t = ', t);
            setFunc(t[0], t[1]);
          }}
          // onChange={() => {
          //   console.log('on change');
          //   const index = initialMap.get(entry);
          //   if (index !== undefined) {
          //     if (index >= statesArrayMemo?.length - 1) {
          //       initialMap.delete(entry);
          //     } else {
          //       initialMap.set(entry, index + 1);
          //     }
          //   } else {
          //     initialMap.set(entry, 0);
          //   }
          //   console.log('end: ', initialMap.get(entry));
          // }}
        />
      );
    });
  }, [entries]);

  return (
    <div>
      <h3 className={filterFieldStyles.h3FilterFieldTitle}>{title}</h3>
      <div style={{ width: '600px' }}>
        {/* {Object.entries(map.entries()).map((e) => {
          console.log(e);
          return e;
        })} */}
        {test}
      </div>
    </div>
  );

  // console.log('statesArrayMemo ', statesArrayMemo);
  // console.log('statesArrayMemo ', entriesMemo);

  // const state = useMemo(() => {
  //   const entryToState = new Map<string, number>();
  //   const stateToEntries = new Map<number, string[]>();
  //   const set = new Set();

  //   console.log('1 included = ', included);
  //   console.log('2 excluded = ', excluded);
  //   return entries.map((entry) => {
  //     return (
  //       <Entry
  //         key={entry}
  //         title={entry}
  //         // states={states}
  //         onChange={() => {}}
  //       />
  //     );
  //   });
  // }, [included, excluded, entries]);

  // console.log('included = ', included);
  // console.log('excluded = ', excluded);

  // const entriesMemo = useMemo(() => {
  //   console.log('entries memo changed');
  // return entries.map((entry) => {
  //   console.log('ran meme: ', entry);
  //   return (
  //     <Entry
  //       key={entry}
  //       map={map}
  //       title={entry}
  //       // states={states}
  //       onChange={() => {}}
  //     />
  //   );
  // });
  // }, [entries, map1]);

  // const dd = useMemo(() => {
  //   return Array.from(map1).map(([key, value]) => {
  //     console.log('rendering ', key);
  //     return (
  //       <Tag
  //         key={key}
  //         style={{ userSelect: 'none' }}
  //         color={value ? value.color : 'default'}
  //       >
  //         {key}
  //       </Tag>
  //     );
  //   });
  // }, [map1]);

  // useEffect(() => {
  //   console.log('is useeffect updating');
  //   console.log('states: ', states);
  //   states.forEach((state) => {
  //     state.values.forEach((value) => {
  //       console.log('map set -> ', value, state);
  //       map1.set(value, state);
  //     });
  //   });
  // }, [map1, states]);

  // const entriesMemo = useMemo(() => {
  //   console.log('entries memo changed');
  //   const a: JSX.Element[] = [];
  //   Array.from(map1, ([key, value]) => {
  //     const tag = (
  // <Tag
  //   key={key}
  //   style={{ userSelect: 'none' }}
  //   color={value ? value.color : 'default'}
  // >
  //   {key}
  // </Tag>
  //     );
  //     a.push(tag);
  //     return tag;
  //   });
  //   return a;
  // }, [map1]);

  // const map = useMemo(() => {
  //   const initialMap = new Map<string, StateObject2<string[]> | undefined>();
  //   states.forEach((state) => {
  //     state.values.forEach((value) => {
  //       initialMap.set(value, state);
  //       map1.set(value, state);
  //     });
  //   });
  //   // entries.forEach((entry) => {
  //   //   initialMap.set(entry, undefined);
  //   // });
  //   return initialMap;
  // }, [map1, states]);

  // Flatten the map?
  // go through all the string entries
  //

  // Map entry to component?
  // 'id' - > <Entry />
  // 'entry -> state

  // const entriesMemo = useMemo(() => {
  //   console.log('entries memo changed');
  //   return entries.map((entry) => {
  //     console.log('ran meme: ', entry);
  //     return (
  //       <Entry
  //         key={entry}
  //         map={map}
  //         title={entry}
  //         // states={states}
  //         onChange={() => {}}
  //       />
  //     );
  //   });
  // }, [entries, map1]);

  // console.log('states: ', states);
  // console.log('initialMap: ', map1);
}

export const MemoizedExclusionFiltersList2 = React.memo(ExclusionFiltersList2);
